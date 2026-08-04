import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url);
    const code = searchParams.get("code");
    const next = searchParams.get("next") ?? "/dashboard";
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? origin;

    // No code — check if user is already authenticated
    if (!code) {
        try {
            const supabase = await createClient();
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                // Already signed in — route them appropriately
                if (!user.user_metadata?.onboarded) {
                    return NextResponse.redirect(`${siteUrl}/onboarding`);
                }
                return NextResponse.redirect(`${siteUrl}/dashboard`);
            }
        } catch { /* ignore */ }
        return NextResponse.redirect(`${siteUrl}/login?error=auth_callback_failed`);
    }

    try {
        const supabase = await createClient();

        // Try to exchange the code — may fail if already used
        const { error } = await supabase.auth.exchangeCodeForSession(code);

        if (error) {
            // Code may be stale — check if user is already signed in
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                if (!user.user_metadata?.onboarded) {
                    return NextResponse.redirect(`${siteUrl}/onboarding`);
                }
                return NextResponse.redirect(`${siteUrl}/dashboard`);
            }
            console.error("exchangeCodeForSession error:", error.message);
            return NextResponse.redirect(`${siteUrl}/login?error=auth_callback_failed`);
        }

        // Successful exchange
        const { data: { user } } = await supabase.auth.getUser();
        if (user && !user.user_metadata?.onboarded) {
            return NextResponse.redirect(`${siteUrl}/onboarding`);
        }
        return NextResponse.redirect(`${siteUrl}${next}`);

    } catch (err) {
        console.error("Auth callback unexpected error:", err);
        // Last resort — check session
        try {
            const supabase = await createClient();
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                if (!user.user_metadata?.onboarded) {
                    return NextResponse.redirect(`${siteUrl}/onboarding`);
                }
                return NextResponse.redirect(`${siteUrl}/dashboard`);
            }
        } catch { /* ignore */ }
        return NextResponse.redirect(`${siteUrl}/login?error=auth_callback_failed`);
    }
}
