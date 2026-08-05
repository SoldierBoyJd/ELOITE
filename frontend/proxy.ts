import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Instagram-style auth proxy (Next.js 16).
 *
 * ── How it works ──
 * 1. Every request matching `config.matcher` is intercepted.
 * 2. We refresh the Supabase session from cookies (handles token rotation).
 * 3. Protected routes: no valid session → redirect to /login.
 * 4. Auth pages (login/signup/forgot): already authenticated → redirect to /dashboard.
 * 5. All protected responses get aggressive no-cache headers so the browser
 *    NEVER serves a stale page from bfcache or disk cache after logout.
 */

// Dashboard routes that must never be cached
const PROTECTED_ROUTE_PREFIXES = [
    "/dashboard", "/inventory", "/invoice", "/gst",
    "/payments", "/health", "/ai", "/forecast",
    "/reports", "/settings", "/support",
];

// Inject aggressive no-store headers so the browser never puts these pages
// in bfcache, disk cache, or any intermediary cache.
function addNoCacheHeaders(response: NextResponse): NextResponse {
    response.headers.set(
        "Cache-Control",
        "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0"
    );
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0");
    response.headers.set("Surrogate-Control", "no-store");
    // Tells reverse proxies (nginx, etc.) to never cache
    response.headers.set("X-Accel-Expires", "0");
    return response;
}

// Auth pages where an already-logged-in user should be redirected to dashboard
const AUTH_PAGES = new Set(["/login", "/signup", "/forgot-password"]);

export async function proxy(request: NextRequest) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    const { pathname } = request.nextUrl;

    const isProtected = PROTECTED_ROUTE_PREFIXES.some((p) => pathname.startsWith(p));

    if (!supabaseUrl || !supabaseKey) {
        console.error("Missing Supabase env vars — skipping auth check");
        const resp = NextResponse.next({ request });
        if (isProtected) addNoCacheHeaders(resp);
        return resp;
    }

    let supabaseResponse = NextResponse.next({ request });
    if (isProtected) addNoCacheHeaders(supabaseResponse);

    const supabase = createServerClient(supabaseUrl, supabaseKey, {
        cookies: {
            getAll() { return request.cookies.getAll(); },
            setAll(cookiesToSet) {
                cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
                supabaseResponse = NextResponse.next({ request });
                if (isProtected) addNoCacheHeaders(supabaseResponse);
                cookiesToSet.forEach(({ name, value, options }) =>
                    supabaseResponse.cookies.set(name, value, options)
                );
            },
        },
    });

    let user = null;
    try {
        const { data } = await supabase.auth.getUser();
        user = data.user;
    } catch {
        user = null;
    }

    const publicRoutes = [
        "/", "/login", "/signup",
        "/auth/callback", "/auth/confirm",
        "/forgot-password", "/reset-password",
        "/verified", "/onboarding",
    ];
    const isPublic = publicRoutes.some((r) => pathname.startsWith(r));

    // ── Unauthenticated on protected route → redirect to login ──
    if (!user && !isPublic) {
        const url = request.nextUrl.clone();
        url.pathname = "/login";
        url.searchParams.set("next", pathname);
        const redirectResponse = NextResponse.redirect(url);

        // Forward any cookie updates from the Supabase client
        supabaseResponse.cookies.getAll().forEach((cookie) => {
            redirectResponse.cookies.set(cookie.name, cookie.value);
        });

        return redirectResponse;
    }

    // ── Authenticated on auth page → redirect to dashboard ──
    if (user && AUTH_PAGES.has(pathname)) {
        const url = request.nextUrl.clone();
        url.pathname = "/dashboard";
        url.search = "";
        const redirectResponse = NextResponse.redirect(url);

        supabaseResponse.cookies.getAll().forEach((cookie) => {
            redirectResponse.cookies.set(cookie.name, cookie.value);
        });

        return redirectResponse;
    }

    // ── Onboarded user on /onboarding → dashboard ──
    if (user && pathname === "/onboarding" && user.user_metadata?.onboarded) {
        const url = request.nextUrl.clone();
        url.pathname = "/dashboard";
        return NextResponse.redirect(url);
    }

    // ── Authenticated but not onboarded → force onboarding ──
    const skipOnboarding = ["/onboarding", "/verified", "/auth", "/reset-password"]
        .some((r) => pathname.startsWith(r));
    if (user && !skipOnboarding && !user.user_metadata?.onboarded) {
        const url = request.nextUrl.clone();
        url.pathname = "/onboarding";
        return NextResponse.redirect(url);
    }

    return supabaseResponse;
}

export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
};
