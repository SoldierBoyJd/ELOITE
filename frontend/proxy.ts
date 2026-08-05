import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

// Dashboard routes that must never be cached
const PROTECTED_ROUTE_PREFIXES = [
    "/dashboard", "/inventory", "/invoice", "/gst",
    "/payments", "/health", "/ai", "/forecast",
    "/reports", "/settings", "/support",
];

// Inject no-store headers so the browser never puts these pages in bfcache
function addNoCacheHeaders(response: NextResponse): NextResponse {
    response.headers.set("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0");
    return response;
}

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

    // Unauthenticated → redirect to login
    if (!user && !isPublic) {
        const url = request.nextUrl.clone();
        url.pathname = "/login";
        url.searchParams.set("next", pathname);
        return NextResponse.redirect(url);
    }

    // Authenticated + on login/signup → go to dashboard
    if (user && (pathname === "/login" || pathname === "/signup")) {
        const url = request.nextUrl.clone();
        url.pathname = "/dashboard";
        return NextResponse.redirect(url);
    }

    // Onboarded user on onboarding → dashboard
    if (user && pathname === "/onboarding" && user.user_metadata?.onboarded) {
        const url = request.nextUrl.clone();
        url.pathname = "/dashboard";
        return NextResponse.redirect(url);
    }

    // Authenticated but not onboarded → onboarding
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
