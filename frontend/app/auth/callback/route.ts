import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url);
    const code = searchParams.get("code");
    const next = searchParams.get("next") ?? "/dashboard";

    // Use the request origin but ensure it uses the correct host on Vercel
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? origin;

    if (!code) {
        return NextResponse.redirect(`${siteUrl}/login?error=auth_callback_failed`);
    }

    try {
        const supabase = await createClient();
        const { error } = await supabase.auth.exchangeCodeForSession(code);

        if (error) {
            console.error("exchangeCodeForSession error:", error.message);
            return NextResponse.redirect(`${siteUrl}/login?error=auth_callback_failed`);
        }

        // Check if user needs onboarding
        const { data: { user } } = await supabase.auth.getUser();
        if (user && !user.user_metadata?.onboarded) {
            return NextResponse.redirect(`${siteUrl}/onboarding`);
        }

        return NextResponse.redirect(`${siteUrl}${next}`);
    } catch (err) {
        console.error("Auth callback error:", err);
        return NextResponse.redirect(`${siteUrl}/login?error=auth_callback_failed`);
    }
}
