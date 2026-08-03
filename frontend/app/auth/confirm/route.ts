import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url);

    // Supabase sends either token_hash (new PKCE flow) or code (older flow)
    const token_hash = searchParams.get("token_hash");
    const code = searchParams.get("code");
    const type = searchParams.get("type") as "email" | "recovery" | "invite" | "signup" | null;
    const next = searchParams.get("next") ?? "/verified";

    const supabase = await createClient();

    // ── PKCE / token_hash flow (email templates with token_hash)
    if (token_hash && type) {
        const { error } = await supabase.auth.verifyOtp({
            type: type as "email" | "recovery" | "invite",
            token_hash,
        });
        if (!error) {
            if (type === "recovery") {
                return NextResponse.redirect(`${origin}/reset-password`);
            }
            return NextResponse.redirect(`${origin}${next}`);
        }
    }

    // ── Code exchange flow (older / magic link flow)
    if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (!error) {
            // Check if this was a password recovery
            const { data: { user } } = await supabase.auth.getUser();
            if (user && type === "recovery") {
                return NextResponse.redirect(`${origin}/reset-password`);
            }
            return NextResponse.redirect(`${origin}${next}`);
        }
    }

    // Token invalid or expired
    return NextResponse.redirect(
        `${origin}/login?error=invalid_or_expired_link`
    );
}
