import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const url = new URL(request.url);
    const code = url.searchParams.get("code");
    const siteUrl = url.origin;

    if (!code) {
        return NextResponse.redirect(`${siteUrl}/login?error=no_code`);
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
        console.error("[/auth/callback] Supabase env vars missing at runtime");
        return NextResponse.redirect(`${siteUrl}/login`);
    }

    // Start with a temporary response — we'll replace it after we know the destination
    const tempResponse = NextResponse.next();
    const cookiesToForward: { name: string; value: string; options: Record<string, unknown> }[] = [];

    const supabase = createServerClient(supabaseUrl, supabaseKey, {
        cookies: {
            getAll: () => request.cookies.getAll(),
            setAll: (cookiesToSet) => {
                // Collect cookies — we'll attach them to the final redirect response
                cookiesToSet.forEach(({ name, value, options }) => {
                    cookiesToForward.push({ name, value, options });
                });
                // Also apply to tempResponse in case Supabase reads them back
                cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
            },
        },
    });

    // Exchange the PKCE code for a session
    const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);

    if (exchangeError) {
        console.error("[/auth/callback] exchange failed:", exchangeError.message);
        return NextResponse.redirect(`${siteUrl}/login?error=auth_failed`);
    }

    // Get the user AFTER exchange so cookies are applied
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.redirect(`${siteUrl}/login?error=auth_failed`);
    }

    // Decide where to send the user
    const destination = user.user_metadata?.onboarded
        ? `${siteUrl}/dashboard`
        : `${siteUrl}/onboarding`;

    // Build the final redirect response and attach all session cookies
    const finalResponse = NextResponse.redirect(destination);
    cookiesToForward.forEach(({ name, value, options }) => {
        finalResponse.cookies.set(name, value, options as Parameters<typeof finalResponse.cookies.set>[2]);
    });

    return finalResponse;
}
