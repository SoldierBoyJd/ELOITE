"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Boxes, CheckCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function VerifiedPage() {
  const router = useRouter();

  /* Auto-redirect to onboarding or dashboard after 2 seconds */
  useEffect(() => {
    const timer = setTimeout(async () => {
      const supabase = createClient();
      const { data } = await supabase.auth.getUser();
      if (data.user && !data.user.user_metadata?.onboarded) {
        router.push("/onboarding");
      } else {
        router.push("/");
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4"
      style={{ background: "var(--bg)" }}>
      <div className="w-full max-w-md text-center">

        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-sm
            bg-[var(--primary)]">
            <Boxes className="w-5 h-5 text-[var(--primary-fg)]" />
          </div>
          <div className="flex flex-col leading-tight text-left">
            <span className="font-semibold text-base tracking-tight text-[var(--heading)]">
              ÉLOITE
            </span>
            <span className="text-[11px] text-[var(--muted)]">Business Intelligence</span>
          </div>
        </div>

        {/* Success icon */}
        <div className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6"
          style={{ background: "rgba(15,143,131,.10)" }}>
          <CheckCircle className="w-10 h-10 text-[#0F8F83]" />
        </div>

        <h1 className="text-2xl font-bold tracking-tight mb-2" style={{ color: "var(--heading)" }}>
          Email confirmed!
        </h1>
        <p className="text-sm leading-relaxed mb-2" style={{ color: "var(--muted)" }}>
          Your ÉLOITE account is now active. You&apos;re all set to start managing your
          business intelligence.
        </p>
        <p className="text-xs mb-8" style={{ color: "var(--neutral)" }}>
          Setting up your account…
        </p>

        {/* Spinner */}
        <div className="w-8 h-8 border-2 rounded-full animate-spin mx-auto mb-8"
          style={{ borderColor: "var(--border)", borderTopColor: "#0F8F83" }} />

        {/* Manual fallback */}
        <Link href="/"
          className="inline-flex items-center gap-2 h-11 px-6 rounded-xl text-sm font-semibold
            transition-colors hover:opacity-90"
          style={{ background: "var(--primary)", color: "var(--primary-fg)" }}>
          Go to Dashboard
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
