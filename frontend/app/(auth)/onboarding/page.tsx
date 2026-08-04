"use client";
import { Suspense, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Boxes, Building2, ChevronRight, Loader2, AlertCircle } from "lucide-react";
import { toast } from "sonner";

const INDUSTRIES = [
  "Wholesale & Distribution",
  "Retail",
  "Manufacturing",
  "Food & Beverages",
  "Pharmaceuticals",
  "Textiles & Apparel",
  "Electronics",
  "Agriculture",
  "Construction & Materials",
  "Other",
];

const CURRENCIES = [
  { code: "INR", label: "₹ Indian Rupee" },
  { code: "USD", label: "$ US Dollar" },
  { code: "EUR", label: "€ Euro" },
  { code: "GBP", label: "£ British Pound" },
  { code: "AED", label: "د.إ UAE Dirham" },
];

function OnboardingForm() {
  const router = useRouter();

  const [step, setStep]     = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError]   = useState("");
  const [fullName, setFullName]         = useState("");
  const [businessName, setBusinessName] = useState("");
  const [industry, setIndustry]         = useState("");
  const [gstin, setGstin]               = useState("");
  const [currency, setCurrency]         = useState("INR");

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      if (data.user?.user_metadata?.full_name) {
        setFullName(data.user.user_metadata.full_name);
      }
      if (data.user?.user_metadata?.onboarded) {
        router.replace("/dashboard");
      }
    });
  }, []);

  const handleFinish = async () => {
    if (!businessName.trim()) { setError("Business name is required."); return; }
    if (!industry) { setError("Please select your industry."); return; }
    setLoading(true);
    setError("");
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({
      data: {
        full_name:     fullName,
        business_name: businessName,
        industry,
        gstin,
        currency,
        onboarded:     true,
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    toast.success(`Welcome to ÉLOITE, ${fullName || businessName}!`);
    router.push("/dashboard");
    router.refresh();
  };

  const input = `w-full h-11 px-4 rounded-xl text-sm outline-none transition-all
    bg-[var(--surface-2)] border border-[var(--border)]
    text-[var(--heading)] placeholder:text-[var(--disabled)]
    focus:ring-2 focus:ring-[var(--primary)]/15 focus:border-[var(--primary)]/30`;

  const totalSteps = 2;
  const progress = (step / totalSteps) * 100;

  return (
    <div className="min-h-screen flex items-center justify-center p-4"
      style={{ background: "var(--bg)" }}>
      <div className="w-full max-w-lg">

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

        {/* Progress */}
        <div className="flex items-center gap-3 mb-8">
          <div className="flex-1 h-1.5 rounded-full overflow-hidden"
            style={{ background: "var(--surface-2)" }}>
            <div className="h-full rounded-full bg-[#0F8F83] transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }} />
          </div>
          <span className="text-xs font-medium shrink-0" style={{ color: "var(--muted)" }}>
            {step} of {totalSteps}
          </span>
        </div>

        {/* Card */}
        <div className="rounded-[24px] border border-[var(--border)]
          shadow-[0_8px_40px_-12px_rgba(0,0,0,0.12)] p-8"
          style={{ background: "var(--surface)" }}>

          {error && (
            <div className="flex items-start gap-2.5 rounded-xl p-3.5 mb-5
              border border-[#DC2626]/20"
              style={{ background: "rgba(220,38,38,.06)" }}>
              <AlertCircle className="w-4 h-4 text-[#DC2626] shrink-0 mt-0.5" />
              <p className="text-xs text-[#DC2626] leading-relaxed">{error}</p>
            </div>
          )}

          {/* ── Step 1: Your name ── */}
          {step === 1 && (
            <div className="flex flex-col gap-6">
              <div>
                <h1 className="text-xl font-bold tracking-tight mb-1" style={{ color: "var(--heading)" }}>
                  Welcome! Let&apos;s set up your account
                </h1>
                <p className="text-sm" style={{ color: "var(--muted)" }}>
                  Tell us your name so we can personalise your experience.
                </p>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold" style={{ color: "var(--body)" }}>
                  Your full name
                </label>
                <input type="text" value={fullName} onChange={e => setFullName(e.target.value)}
                  placeholder="Rajesh Sharma" autoFocus className={input} />
              </div>

              <button
                onClick={() => {
                  if (!fullName.trim()) { setError("Please enter your name."); return; }
                  setError("");
                  setStep(2);
                }}
                className="w-full h-11 rounded-xl text-sm font-semibold transition-colors
                  hover:opacity-90 flex items-center justify-center gap-2"
                style={{ background: "var(--primary)", color: "var(--primary-fg)" }}>
                Continue
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* ── Step 2: Business details ── */}
          {step === 2 && (
            <div className="flex flex-col gap-5">
              <div>
                <h1 className="text-xl font-bold tracking-tight mb-1" style={{ color: "var(--heading)" }}>
                  Your business details
                </h1>
                <p className="text-sm" style={{ color: "var(--muted)" }}>
                  This helps us customise ÉLOITE for your business type.
                </p>
              </div>

              {/* Business name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold" style={{ color: "var(--body)" }}>
                  Business name <span className="text-[#DC2626]">*</span>
                </label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
                    style={{ color: "var(--neutral)" }} />
                  <input type="text" value={businessName}
                    onChange={e => setBusinessName(e.target.value)}
                    placeholder="Sharma Traders Pvt. Ltd."
                    autoFocus className={`${input} pl-10`} />
                </div>
              </div>

              {/* Industry */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold" style={{ color: "var(--body)" }}>
                  Industry <span className="text-[#DC2626]">*</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {INDUSTRIES.map((ind) => (
                    <button key={ind} type="button"
                      onClick={() => setIndustry(ind)}
                      className="h-10 px-3 rounded-xl text-xs font-medium text-left
                        transition-all border"
                      style={industry === ind
                        ? {
                            background: "color-mix(in srgb, var(--primary) 8%, transparent)",
                            borderColor: "color-mix(in srgb, var(--primary) 30%, transparent)",
                            color: "var(--heading)",
                          }
                        : {
                            background: "var(--surface-2)",
                            borderColor: "var(--border)",
                            color: "var(--muted)",
                          }
                      }>
                      {ind}
                    </button>
                  ))}
                </div>
              </div>

              {/* GSTIN */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold" style={{ color: "var(--body)" }}>
                  GSTIN <span className="text-[11px] font-normal" style={{ color: "var(--muted)" }}>
                    (optional — can be added later)
                  </span>
                </label>
                <input type="text" value={gstin}
                  onChange={e => setGstin(e.target.value.toUpperCase())}
                  placeholder="22AAAAA0000A1Z5" maxLength={15} className={input} />
              </div>

              {/* Currency */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold" style={{ color: "var(--body)" }}>
                  Default currency
                </label>
                <select value={currency} onChange={e => setCurrency(e.target.value)}
                  className={input} style={{ appearance: "none" }}>
                  {CURRENCIES.map(c => (
                    <option key={c.code} value={c.code}>{c.label}</option>
                  ))}
                </select>
              </div>

              <div className="flex gap-3 pt-1">
                <button onClick={() => { setStep(1); setError(""); }}
                  className="h-11 px-5 rounded-xl text-sm font-medium transition-colors
                    hover:opacity-80 border border-[var(--border)]"
                  style={{ background: "var(--surface)", color: "var(--heading)" }}>
                  Back
                </button>
                <button onClick={handleFinish} disabled={loading}
                  className="flex-1 h-11 rounded-xl text-sm font-semibold transition-colors
                    hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed
                    flex items-center justify-center gap-2"
                  style={{ background: "var(--primary)", color: "var(--primary-fg)" }}>
                  {loading
                    ? <Loader2 className="w-4 h-4 animate-spin" />
                    : null}
                  {loading ? "Setting up…" : "Get started"}
                </button>
              </div>
            </div>
          )}
        </div>

        <p className="text-center text-xs mt-5" style={{ color: "var(--muted)" }}>
          You can update these details anytime in{" "}
          <span className="font-medium" style={{ color: "var(--heading)" }}>Settings</span>.
        </p>
      </div>
    </div>
  );
}

export default function OnboardingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center"
        style={{ background: "var(--bg)" }}>
        <Loader2 className="w-8 h-8 animate-spin" style={{ color: "var(--neutral)" }} />
      </div>
    }>
      <OnboardingForm />
    </Suspense>
  );
}
