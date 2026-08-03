"use client";
import { Suspense, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Boxes, Eye, EyeOff, AlertCircle, CheckCircle, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

function ResetPasswordForm() {
  const router = useRouter();
  const supabase = createClient();

  const [password, setPassword]       = useState("");
  const [confirm, setConfirm]         = useState("");
  const [showPass, setShowPass]       = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading]         = useState(false);
  const [error, setError]             = useState("");
  const [success, setSuccess]         = useState(false);
  const [sessionReady, setSessionReady] = useState(false);

  /* Supabase sends the session via URL hash after confirm route.
     Listen for the PASSWORD_RECOVERY event. */
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event) => {
        if (event === "PASSWORD_RECOVERY" || event === "SIGNED_IN") {
          setSessionReady(true);
        }
      }
    );
    // Also check if session already exists (user navigated here after confirm)
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) setSessionReady(true);
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    toast.success("Password updated successfully!");
    setSuccess(true);
    setLoading(false);

    // Sign out so user logs in fresh with new password
    await supabase.auth.signOut();
    setTimeout(() => { window.location.href = "/login"; }, 2500);
  };

  const input = `w-full h-11 px-4 rounded-xl text-sm outline-none transition-all
    bg-[var(--surface-2)] border border-[var(--border)]
    text-[var(--heading)] placeholder:text-[var(--disabled)]
    focus:ring-2 focus:ring-[var(--primary)]/15 focus:border-[var(--primary)]/30`;

  /* Success state */
  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4"
        style={{ background: "var(--bg)" }}>
        <div className="w-full max-w-md text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#0F8F83]/10 flex items-center
            justify-center mx-auto mb-5">
            <CheckCircle className="w-8 h-8 text-[#0F8F83]" />
          </div>
          <h1 className="text-xl font-bold mb-2" style={{ color: "var(--heading)" }}>
            Password updated
          </h1>
          <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--muted)" }}>
            Your password has been changed successfully. Redirecting you to sign in…
          </p>
          <div className="w-8 h-8 border-2 border-[var(--border)] border-t-[#0F8F83]
            rounded-full animate-spin mx-auto" />
        </div>
      </div>
    );
  }

  /* Session not ready (link invalid / expired) */
  if (!sessionReady) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4"
        style={{ background: "var(--bg)" }}>
        <div className="w-full max-w-md text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#D97706]/10 flex items-center
            justify-center mx-auto mb-5">
            <ShieldCheck className="w-8 h-8 text-[#D97706]" />
          </div>
          <h1 className="text-xl font-bold mb-2" style={{ color: "var(--heading)" }}>
            Verifying reset link…
          </h1>
          <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--muted)" }}>
            Please wait while we verify your reset link.
          </p>
          <div className="w-8 h-8 border-2 border-[var(--border)] border-t-[var(--primary)]
            rounded-full animate-spin mx-auto" />
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

          <h1 className="text-xl font-bold tracking-tight mb-1"
            style={{ color: "var(--heading)" }}>
            Set new password
          </h1>
          <p className="text-sm mb-6" style={{ color: "var(--muted)" }}>
            Choose a strong password for your account.
          </p>

          {error && (
            <div className="flex items-start gap-2.5 rounded-xl p-3.5 mb-5
              border border-[#DC2626]/20"
              style={{ background: "rgba(220,38,38,.06)" }}>
              <AlertCircle className="w-4 h-4 text-[#DC2626] shrink-0 mt-0.5" />
              <p className="text-xs text-[#DC2626] leading-relaxed">{error}</p>
            </div>
          )}

          <form onSubmit={handleReset} className="flex flex-col gap-4">
            {/* New password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold" style={{ color: "var(--body)" }}>
                New password
              </label>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Min. 8 characters"
                  required
                  minLength={8}
                  autoComplete="new-password"
                  className={`${input} pr-11`}
                />
                <button type="button" onClick={() => setShowPass(s => !s)} tabIndex={-1}
                  className="absolute right-3 top-1/2 -translate-y-1/2
                    text-[var(--neutral)] hover:text-[var(--heading)] transition-colors">
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Confirm password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold" style={{ color: "var(--body)" }}>
                Confirm new password
              </label>
              <div className="relative">
                <input
                  type={showConfirm ? "text" : "password"}
                  value={confirm}
                  onChange={e => setConfirm(e.target.value)}
                  placeholder="Re-enter your password"
                  required
                  minLength={8}
                  autoComplete="new-password"
                  className={`${input} pr-11 ${
                    confirm && password !== confirm
                      ? "border-[#DC2626]/40 focus:ring-[#DC2626]/20"
                      : ""
                  }`}
                />
                <button type="button" onClick={() => setShowConfirm(s => !s)} tabIndex={-1}
                  className="absolute right-3 top-1/2 -translate-y-1/2
                    text-[var(--neutral)] hover:text-[var(--heading)] transition-colors">
                  {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {confirm && password !== confirm && (
                <p className="text-[11px] text-[#DC2626] mt-0.5">Passwords do not match</p>
              )}
            </div>

            {/* Password strength hint */}
            <div className="rounded-xl p-3 flex flex-col gap-1.5"
              style={{ background: "var(--surface-2)" }}>
              <p className="text-[11px] font-semibold" style={{ color: "var(--muted)" }}>
                Password requirements
              </p>
              {[
                { label: "At least 8 characters", met: password.length >= 8 },
                { label: "Contains a number", met: /\d/.test(password) },
                { label: "Contains a letter", met: /[a-zA-Z]/.test(password) },
              ].map(({ label, met }) => (
                <div key={label} className="flex items-center gap-2">
                  <div className={`w-1.5 h-1.5 rounded-full ${met ? "bg-[#0F8F83]" : "bg-[var(--border-2)]"}`} />
                  <span className={`text-[11px] ${met ? "text-[#0F8F83]" : ""}`}
                    style={met ? {} : { color: "var(--neutral)" }}>
                    {label}
                  </span>
                </div>
              ))}
            </div>

            <button
              type="submit"
              disabled={loading || (!!confirm && password !== confirm)}
              className="w-full h-11 rounded-xl text-sm font-semibold transition-colors mt-1
                hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed
                flex items-center justify-center gap-2"
              style={{ background: "var(--primary)", color: "var(--primary-fg)" }}
            >
              {loading && (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white
                  rounded-full animate-spin" />
              )}
              {loading ? "Updating password…" : "Update password"}
            </button>
          </form>
        </div>

        <p className="text-center text-xs mt-5" style={{ color: "var(--muted)" }}>
          Remember it now?{" "}
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

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center"
        style={{ background: "var(--bg)" }}>
        <div className="w-8 h-8 border-2 border-[var(--border)] border-t-[var(--primary)]
          rounded-full animate-spin" />
      </div>
    }>
      <ResetPasswordForm />
    </Suspense>
  );
}
