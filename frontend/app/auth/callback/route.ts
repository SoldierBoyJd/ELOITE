import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const url = new URL(request.url);
    const code = url.searchParams.get("code");
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? url.origin;

    if (!code) {
        return NextResponse.redirect(`${siteUrl}/login?error=no_code`);
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
        console.error("[auth/callback] Missing Supabase env vars");
        return NextResponse.redirect(`${siteUrl}/login?error=config_error`);
    }

    // Build response first so we can set cookies on it
    let response = NextResponse.redirect(`${siteUrl}/dashboard`);

    const supabase = createServerClient(supabaseUrl, supabaseKey, {
        cookies: {
            getAll() {
                return request.cookies.getAll();
            },
            setAll(cookiesToSet) {
                // Set cookies on both request and response
                cookiesToSet.forEach(({ name, value }) =>
                    request.cookies.set(name, value)
                );
                response = NextResponse.redirect(`${siteUrl}/dashboard`);
                cookiesToSet.forEach(({ name, value, options }) =>
                    response.cookies.set(name, value, options)
                );
            },
        },
    });

    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
        console.error("[auth/callback] exchange error:", error.message);
        return NextResponse.redirect(
            `${siteUrl}/login?error=exchange_failed&msg=${encodeURIComponent(error.message)}`
        );
    }

    // Get user and check onboarding status
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.redirect(`${siteUrl}/login?error=no_user`);
    }

    // New user — send to onboarding
    if (!user.user_metadata?.onboarded) {
        const onboardingResponse = NextResponse.redirect(`${siteUrl}/onboarding`);
        // Copy all cookies from the exchange to onboarding redirect
        response.cookies.getAll().forEach(({ name, value }) => {
            onboardingResponse.cookies.set(name, value);
        });
        return onboardingResponse;
    }

    return response;
}
