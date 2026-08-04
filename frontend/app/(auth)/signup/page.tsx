"use client";
import { Suspense, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Boxes, Eye, EyeOff, AlertCircle, CheckCircle } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

function SignupForm() {
  const [email, setEmail]         = useState("");
  const [password, setPassword]   = useState("");
  const [fullName, setFullName]   = useState("");
  const [showPass, setShowPass]   = useState(false);
  const [loading, setLoading]     = useState(false);
  const [googleLoading, setGL]    = useState(false);
  const [error, setError]         = useState("");
  const [success, setSuccess]     = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const supabase = createClient();
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? location.origin;
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
        emailRedirectTo: `${siteUrl}/auth/callback`,
      },
    });
    if (error) { setError(error.message); setLoading(false); return; }
    toast.success("Account created! Check your email to confirm.");
    setSuccess(true);
    setLoading(false);
  };

  const handleGoogle = async () => {
    setGL(true);
    setError("");
    const supabase = createClient();
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? location.origin;
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${siteUrl}/auth/callback` },
    });
    if (error) { setError(error.message); setGL(false); }
  };

  const input = `w-full h-11 px-4 rounded-xl text-sm outline-none transition-all
    bg-[var(--surface-2)] border border-[var(--border)]
    text-[var(--heading)] placeholder:text-[var(--disabled)]
    focus:ring-2 focus:ring-[var(--primary)]/15 focus:border-[var(--primary)]/30`;

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4"
        style={{ background: "var(--bg)" }}>
        <div className="w-full max-w-md text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#0F8F83]/10 flex items-center justify-center mx-auto mb-5">
            <CheckCircle className="w-8 h-8 text-[#0F8F83]" />
          </div>
          <h1 className="text-xl font-bold mb-2" style={{ color: "var(--heading)" }}>
            Check your email
          </h1>
          <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--muted)" }}>
            We sent a confirmation link to{" "}
            <span className="font-semibold" style={{ color: "var(--heading)" }}>{email}</span>.
            Click the link to activate your account.
          </p>
          <Link href="/login" className="text-sm font-semibold hover:opacity-70 transition-colors"
            style={{ color: "var(--heading)" }}>
            ← Back to sign in
          </Link>
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
          <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-sm bg-[var(--primary)]">
            <Boxes className="w-5 h-5 text-[var(--primary-fg)]" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-semibold text-base tracking-tight text-[var(--heading)]">ÉLOITE</span>
            <span className="text-[11px] text-[var(--muted)]">Business Intelligence</span>
          </div>
        </div>

        {/* Card */}
        <div className="rounded-[24px] border border-[var(--border)]
          shadow-[0_8px_40px_-12px_rgba(0,0,0,0.12)] p-8"
          style={{ background: "var(--surface)" }}>

          <h1 className="text-xl font-bold tracking-tight mb-1" style={{ color: "var(--heading)" }}>
            Create your account
          </h1>
          <p className="text-sm mb-6" style={{ color: "var(--muted)" }}>
            Start managing your business intelligence
          </p>

          {error && (
            <div className="flex items-start gap-2.5 rounded-xl p-3.5 mb-5
              border border-[#DC2626]/20" style={{ background: "rgba(220,38,38,.06)" }}>
              <AlertCircle className="w-4 h-4 text-[#DC2626] shrink-0 mt-0.5" />
              <p className="text-xs text-[#DC2626] leading-relaxed">{error}</p>
            </div>
          )}

          {/* Google */}
          <button onClick={handleGoogle} disabled={googleLoading}
            className="w-full h-11 rounded-xl border border-[var(--border)] text-sm font-medium
              flex items-center justify-center gap-3 transition-colors hover:bg-[var(--surface-2)]
              disabled:opacity-50 disabled:cursor-not-allowed mb-5"
            style={{ background: "var(--surface)", color: "var(--heading)" }}>
            {googleLoading
              ? <div className="w-4 h-4 border-2 border-[var(--border)] border-t-[var(--primary)] rounded-full animate-spin" />
              : <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615Z" fill="#4285F4"/>
                  <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18Z" fill="#34A853"/>
                  <path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332Z" fill="#FBBC05"/>
                  <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58Z" fill="#EA4335"/>
                </svg>}
            {googleLoading ? "Redirecting…" : "Continue with Google"}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-[var(--border)]" />
            <span className="text-xs font-medium text-[var(--disabled)]">or</span>
            <div className="flex-1 h-px bg-[var(--border)]" />
          </div>

          <form onSubmit={handleSignup} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold" style={{ color: "var(--body)" }}>Full name</label>
              <input type="text" value={fullName} onChange={e => setFullName(e.target.value)}
                placeholder="Rajesh Sharma" required autoComplete="name" className={input} />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold" style={{ color: "var(--body)" }}>Email address</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="you@company.com" required autoComplete="email" className={input} />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold" style={{ color: "var(--body)" }}>Password</label>
              <div className="relative">
                <input type={showPass ? "text" : "password"} value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Min. 8 characters" required minLength={8}
                  autoComplete="new-password" className={`${input} pr-11`} />
                <button type="button" onClick={() => setShowPass(s => !s)} tabIndex={-1}
                  className="absolute right-3 top-1/2 -translate-y-1/2
                    text-[var(--neutral)] hover:text-[var(--heading)] transition-colors">
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="w-full h-11 rounded-xl text-sm font-semibold transition-colors mt-1
                hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed
                flex items-center justify-center gap-2"
              style={{ background: "var(--primary)", color: "var(--primary-fg)" }}>
              {loading && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
              {loading ? "Creating account…" : "Create account"}
            </button>
          </form>
        </div>

        <p className="text-center text-sm mt-5" style={{ color: "var(--muted)" }}>
          Already have an account?{" "}
          <Link href="/login" className="font-semibold hover:opacity-70 transition-colors"
            style={{ color: "var(--heading)" }}>Sign in</Link>
        </p>
      </div>
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--bg)" }}>
        <div className="w-8 h-8 border-2 border-[var(--border)] border-t-[var(--primary)] rounded-full animate-spin" />
      </div>
    }>
      <SignupForm />
    </Suspense>
  );
}
