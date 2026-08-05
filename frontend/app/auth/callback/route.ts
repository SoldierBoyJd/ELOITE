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
        return NextResponse.redirect(`${siteUrl}/login?error=env_missing`);
    }

    const cookiesToForward: { name: string; value: string; options: Record<string, unknown> }[] = [];

    const supabase = createServerClient(supabaseUrl, supabaseKey, {
        cookies: {
            getAll: () => request.cookies.getAll(),
            setAll: (cookiesToSet) => {
                cookiesToSet.forEach(({ name, value, options }) => {
                    cookiesToForward.push({ name, value, options });
                });
                cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
            },
        },
    });

    const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);

    if (exchangeError) {
        return NextResponse.redirect(`${siteUrl}/login?error=exchange_failed`);
    }

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return NextResponse.redirect(`${siteUrl}/login?error=no_user_after_exchange`);
    }

    const destination = user.user_metadata?.onboarded
        ? `${siteUrl}/dashboard`
        : `${siteUrl}/onboarding`;

    const finalResponse = NextResponse.redirect(destination);
    cookiesToForward.forEach(({ name, value, options }) => {
        finalResponse.cookies.set(name, value, options as Parameters<typeof finalResponse.cookies.set>[2]);
    });

    return finalResponse;
}
