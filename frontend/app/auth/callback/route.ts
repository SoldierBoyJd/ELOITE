import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
    const url = new URL(request.url);
    const code = url.searchParams.get("code");
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? url.origin;

    if (!code) {
        return NextResponse.redirect(`${siteUrl}/login?error=no_code`);
    }

    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
        console.error("[auth/callback] exchangeCodeForSession failed:", error.message, error.status);
        return NextResponse.redirect(`${siteUrl}/login?error=exchange_failed&msg=${encodeURIComponent(error.message)}`);
    }

    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
        console.error("[auth/callback] getUser failed:", userError?.message);
        return NextResponse.redirect(`${siteUrl}/login?error=no_user`);
    }

    // New user — send to onboarding
    if (!user.user_metadata?.onboarded) {
        return NextResponse.redirect(`${siteUrl}/onboarding`);
    }

    return NextResponse.redirect(`${siteUrl}/dashboard`);
}
