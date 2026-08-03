"use client";
import { Suspense, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Boxes, AlertCircle, CheckCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

function ForgotPasswordForm() {
  const [email, setEmail]     = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");
  const [sent, setSent]       = useState(false);

  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${location.origin}/auth/confirm?next=/reset-password`,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }
    toast.success("Reset link sent! Check your inbox.");
    setSent(true);
    setLoading(false);
  };

  const input = `w-full h-11 px-4 rounded-xl text-sm outline-none transition-all
    bg-[var(--surface-2)] border border-[var(--border)]
    text-[var(--heading)] placeholder:text-[var(--disabled)]
    focus:ring-2 focus:ring-[var(--primary)]/15 focus:border-[var(--primary)]/30`;

  if (sent) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4"
        style={{ background: "var(--bg)" }}>
        <div className="w-full max-w-md text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#0F8F83]/10 flex items-center
            justify-center mx-auto mb-5">
            <CheckCircle className="w-8 h-8 text-[#0F8F83]" />
          </div>
          <h1 className="text-xl font-bold mb-2" style={{ color: "var(--heading)" }}>
            Check your email
          </h1>
          <p className="text-sm leading-relaxed mb-2" style={{ color: "var(--muted)" }}>
            We sent a password reset link to
          </p>
          <p className="text-sm font-semibold mb-6" style={{ color: "var(--heading)" }}>
            {email}
          </p>
          <p className="text-xs mb-8 leading-relaxed" style={{ color: "var(--muted)" }}>
            The link expires in 1 hour. Check your spam folder if you don&apos;t see it.
          </p>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => { setSent(false); setEmail(""); }}
              className="w-full h-11 rounded-xl border border-[var(--border)] text-sm
                font-medium transition-colors hover:bg-[var(--surface-2)]"
              style={{ background: "var(--surface)", color: "var(--heading)" }}
            >
              Try a different email
            </button>
            <Link href="/login"
              className="flex items-center justify-center gap-2 text-sm font-medium
                hover:opacity-70 transition-colors"
              style={{ color: "var(--muted)" }}>
              <ArrowLeft className="w-4 h-4" />
              Back to sign in
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4"
      style={{ background: "var(--bg)" }}>
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center
            shadow-sm bg-[var(--primary)]">
            <Boxes className="w-5 h-5 text-[var(--primary-fg)]" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-semibold text-base tracking-tight
              text-[var(--heading)]">ÉLOITE</span>
            <span className="text-[11px] text-[var(--muted)]">Business Intelligence</span>
          </div>
        </div>

        {/* Card */}
        <div className="rounded-[24px] border border-[var(--border)]
          shadow-[0_8px_40px_-12px_rgba(0,0,0,0.12)] p-8"
          style={{ background: "var(--surface)" }}>

          <Link href="/login"
            className="flex items-center gap-1.5 text-xs font-medium mb-6
              hover:opacity-70 transition-colors w-fit"
            style={{ color: "var(--muted)" }}>
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to sign in
          </Link>

          <h1 className="text-xl font-bold tracking-tight mb-1"
            style={{ color: "var(--heading)" }}>
            Reset your password
          </h1>
          <p className="text-sm mb-6" style={{ color: "var(--muted)" }}>
            Enter the email address associated with your account and we&apos;ll send you a
            reset link.
          </p>

          {error && (
            <div className="flex items-start gap-2.5 rounded-xl p-3.5 mb-5
              border border-[#DC2626]/20"
              style={{ background: "rgba(220,38,38,.06)" }}>
              <AlertCircle className="w-4 h-4 text-[#DC2626] shrink-0 mt-0.5" />
              <p className="text-xs text-[#DC2626] leading-relaxed">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold" style={{ color: "var(--body)" }}>
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@company.com"
                required
                autoComplete="email"
                className={input}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 rounded-xl text-sm font-semibold transition-colors
                hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed
                flex items-center justify-center gap-2"
              style={{ background: "var(--primary)", color: "var(--primary-fg)" }}
            >
              {loading && (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white
                  rounded-full animate-spin" />
              )}
              {loading ? "Sending link…" : "Send reset link"}
            </button>
          </form>
        </div>

        <p className="text-center text-xs mt-5 leading-relaxed"
          style={{ color: "var(--muted)" }}>
          Remember your password?{" "}
          <Link href="/login"
            className="font-semibold hover:opacity-70 transition-colors"
            style={{ color: "var(--heading)" }}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function ForgotPasswordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center"
        style={{ background: "var(--bg)" }}>
        <div className="w-8 h-8 border-2 border-[var(--border)] border-t-[var(--primary)]
          rounded-full animate-spin" />
      </div>
    }>
      <ForgotPasswordForm />
    </Suspense>
  );
}
