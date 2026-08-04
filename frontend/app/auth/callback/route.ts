import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const url = new URL(request.url);
    const code = url.searchParams.get("code");
    const siteUrl = url.origin; // always use the actual request origin — reliable on Vercel

    // Guard: no code
    if (!code) {
        return NextResponse.redirect(`${siteUrl}/login?error=no_code`);
    }

    // Env vars — use the values baked in at build time via NEXT_PUBLIC_ prefix
    // These ARE available in route handlers when set in Vercel env vars
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
        // Fallback: redirect to login without crashing — user can retry
        console.error("[/auth/callback] Supabase env vars missing at runtime");
        return NextResponse.redirect(`${siteUrl}/login`);
    }

    // Mutable response — gets updated as cookies are set
    let redirectTo = `${siteUrl}/dashboard`;
    let response = NextResponse.redirect(redirectTo);

    const supabase = createServerClient(supabaseUrl, supabaseKey, {
        cookies: {
            getAll: () => request.cookies.getAll(),
            setAll: (cookiesToSet) => {
                // Apply to request
                cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
                // Rebuild response with cookies
                response = NextResponse.redirect(redirectTo);
                cookiesToSet.forEach(({ name, value, options }) =>
                    response.cookies.set(name, value, options)
                );
            },
        },
    });

    // Exchange the PKCE code for a session
    const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);

    if (exchangeError) {
        console.error("[/auth/callback] exchange failed:", exchangeError.message);
        return NextResponse.redirect(`${siteUrl}/login?error=auth_failed`);
    }

    // Determine where to send the user
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.redirect(`${siteUrl}/login?error=auth_failed`);
    }

    if (!user.user_metadata?.onboarded) {
        redirectTo = `${siteUrl}/onboarding`;
        const onboardResp = NextResponse.redirect(redirectTo);
        response.cookies.getAll().forEach(({ name, value }) =>
            onboardResp.cookies.set(name, value)
        );
        return onboardResp;
    }

    return response;
}
