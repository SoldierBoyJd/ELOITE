import Link from "next/link";
import {
  Boxes, ArrowRight, BarChart3, Package, FileText,
  CheckCircle, CreditCard, Sparkles, TrendingUp,
  ShieldCheck, Zap, Globe,
} from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

const features = [
  {
    icon: Package,
    title: "Inventory Intelligence",
    desc: "AI-powered reorder predictions, 14-day demand forecasting, and real-time stock alerts before you run out.",
  },
  {
    icon: FileText,
    title: "Invoice Intelligence",
    desc: "OCR extraction, duplicate detection, GST validation, and fraud scoring — all automated.",
  },
  {
    icon: CheckCircle,
    title: "GST Compliance",
    desc: "Filing calendar, HSN mismatch detection, ITC reconciliation, and AI risk analysis in one place.",
  },
  {
    icon: CreditCard,
    title: "Payments Tracking",
    desc: "Vendor payment aging, overdue alerts, and cash flow forecasting across all your accounts.",
  },
  {
    icon: TrendingUp,
    title: "Business Health Score",
    desc: "A single AI-scored view of your operational resilience across 7 key dimensions.",
  },
  {
    icon: BarChart3,
    title: "Forecast Analytics",
    desc: "Demand prediction with confidence bands, seasonality insights, and product-level forecasting.",
  },
];

const stats = [
  { value: "98.2%", label: "Invoice extraction accuracy" },
  { value: "94.6%", label: "Demand forecast accuracy" },
  { value: "3 min", label: "Average invoice processing time" },
  { value: "₹2.1L", label: "Average capital freed per month" },
];

const testimonials = [
  {
    quote: "ÉLOITE flagged a duplicate invoice worth ₹84,000 before payment. Paid for itself on day one.",
    name: "Rajesh Sharma",
    role: "Owner, Sharma Traders",
    initials: "RS",
  },
  {
    quote: "We used to miss GST deadlines regularly. Now the compliance calendar keeps us ahead of every filing.",
    name: "Priya Mehta",
    role: "Finance Manager, Mehta Wholesale",
    initials: "PM",
  },
  {
    quote: "The demand forecasting reduced our overstock by 30% in the first quarter.",
    name: "Arjun Patel",
    role: "Operations Head, Patel Distribution",
    initials: "AP",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg)", color: "var(--heading)" }}>

      {/* ── Nav ───────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 border-b border-[var(--border)] backdrop-blur-sm"
        style={{ background: "color-mix(in srgb, var(--surface) 90%, transparent)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center shadow-sm bg-[var(--primary)]">
              <Boxes className="w-5 h-5 text-[var(--primary-fg)]" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="font-semibold text-sm tracking-tight text-[var(--heading)]">ÉLOITE</span>
              <span className="text-[10px] text-[var(--muted)]">Business Intelligence</span>
            </div>
          </Link>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle />
            <Link href="/login"
              className="h-9 px-4 rounded-xl py-2 text-sm font-medium transition-colors
                border border-[var(--border)] hover:bg-[var(--surface-2)]"
              style={{ color: "var(--heading)" }}>
              Sign in
            </Link>
            <Link href="/signup"
              className="h-9 px-4 rounded-xl text-sm font-semibold transition-colors
                hover:opacity-90 hidden sm:flex items-center gap-1.5"
              style={{ background: "var(--primary)", color: "var(--primary-fg)" }}>
              Get started free
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>          </div>
        </div>
      </nav>

      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8 pt-20 pb-24 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-8 text-xs font-medium
          border border-[var(--border)]"
          style={{ background: "var(--surface)" }}>
          <Sparkles className="w-3.5 h-3.5 text-[#0F8F83]" />
          <span style={{ color: "var(--body)" }}>AI-powered business intelligence for Indian businesses</span>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-6 max-w-4xl mx-auto"
          style={{ color: "var(--heading)" }}>
          Run your business<br />
          <span style={{ color: "#0F8F83" }}>with confidence</span>
        </h1>

        <p className="text-lg sm:text-xl leading-relaxed mb-10 max-w-2xl mx-auto"
          style={{ color: "var(--muted)" }}>
          ÉLOITE gives CFOs, warehouse managers, and business owners a single view of inventory,
          invoices, GST compliance, and payments — powered by AI.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16">
          <Link href="/login"
            className="w-full sm:w-auto h-12 px-8 rounded-xl text-base font-semibold
              flex items-center justify-center gap-2 transition-colors hover:opacity-90"
            style={{ background: "var(--primary)", color: "var(--primary-fg)" }}>
            Start for free
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/login"
            className="w-full sm:w-auto h-12 px-8 rounded-xl text-base font-medium
              flex items-center justify-center gap-2 transition-colors
              border border-[var(--border)] hover:bg-[var(--surface-2)]"
            style={{ color: "var(--heading)" }}>
            Sign in to your account
          </Link>
        </div>

        {/* Hero stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {stats.map((s) => (
            <div key={s.label}
              className="rounded-[16px] p-4 border border-[var(--border)]"
              style={{ background: "var(--surface)" }}>
              <p className="text-2xl font-bold tracking-tight" style={{ color: "#0F8F83" }}>{s.value}</p>
              <p className="text-xs mt-1" style={{ color: "var(--muted)" }}>{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ──────────────────────────────────────────── */}
      <section className="border-t border-[var(--border)]" style={{ background: "var(--surface)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-20">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4"
              style={{ color: "var(--heading)" }}>
              Everything your business needs
            </h2>
            <p className="text-base max-w-xl mx-auto" style={{ color: "var(--muted)" }}>
              Built for wholesale traders, distributors, and manufacturers managing high-volume
              inventory, invoicing, and compliance.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f) => (
              <div key={f.title}
                className="rounded-[20px] p-6 flex flex-col gap-4 border border-[var(--border)]
                  hover:border-[#0F8F83]/30 transition-colors"
                style={{ background: "var(--bg)" }}>
                <div className="w-10 h-10 rounded-xl bg-[#0F8F83]/10 flex items-center justify-center">
                  <f.icon className="w-5 h-5 text-[#0F8F83]" />
                </div>
                <div>
                  <h3 className="font-semibold text-base mb-1.5" style={{ color: "var(--heading)" }}>
                    {f.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                    {f.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ──────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8 py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4"
            style={{ color: "var(--heading)" }}>
            Up and running in minutes
          </h2>
          <p className="text-base max-w-xl mx-auto" style={{ color: "var(--muted)" }}>
            No complex setup. No IT team required.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            {
              step: "01",
              icon: Zap,
              title: "Create your account",
              desc: "Sign up with email or Google. Set up your business profile and GSTIN in under 2 minutes.",
            },
            {
              step: "02",
              icon: Globe,
              title: "Connect your data",
              desc: "Upload invoices, import inventory from Excel, or connect via API. ÉLOITE handles the rest.",
            },
            {
              step: "03",
              icon: Sparkles,
              title: "Get AI insights",
              desc: "Your dashboard is live. AI starts predicting, flagging, and recommending from day one.",
            },
          ].map((step) => (
            <div key={step.step} className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <span className="text-4xl font-bold" style={{ color: "var(--surface-3)" }}>
                  {step.step}
                </span>
                <div className="w-10 h-10 rounded-xl bg-[#0F8F83]/10 flex items-center justify-center">
                  <step.icon className="w-5 h-5 text-[#0F8F83]" />
                </div>
              </div>
              <h3 className="font-semibold text-base" style={{ color: "var(--heading)" }}>
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Testimonials ──────────────────────────────────────── */}
      <section className="border-t border-[var(--border)]" style={{ background: "var(--surface)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-20">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4"
              style={{ color: "var(--heading)" }}>
              Trusted by growing businesses
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {testimonials.map((t) => (
              <div key={t.name}
                className="rounded-[20px] p-6 flex flex-col gap-5 border border-[var(--border)]"
                style={{ background: "var(--bg)" }}>
                <p className="text-sm leading-relaxed flex-1 italic"
                  style={{ color: "var(--body)" }}>
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center
                    text-white text-xs font-semibold shrink-0"
                    style={{ background: "linear-gradient(135deg,#374151,#6B7280)" }}>
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: "var(--heading)" }}>{t.name}</p>
                    <p className="text-[11px]" style={{ color: "var(--muted)" }}>{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 sm:px-8 py-24">
        <div className="rounded-[24px] p-10 sm:p-16 text-center border border-[var(--border)]"
          style={{ background: "var(--surface)" }}>
          <div className="w-14 h-14 rounded-2xl bg-[#0F8F83]/10 flex items-center justify-center mx-auto mb-6">
            <ShieldCheck className="w-7 h-7 text-[#0F8F83]" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4"
            style={{ color: "var(--heading)" }}>
            Ready to take control of your business?
          </h2>
          <p className="text-base mb-8 max-w-md mx-auto" style={{ color: "var(--muted)" }}>
            Free to start. No credit card required. Set up in under 5 minutes.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/signup"
              className="w-full sm:w-auto h-12 px-8 rounded-xl text-base font-semibold
                flex items-center justify-center gap-2 transition-colors hover:opacity-90"
              style={{ background: "var(--primary)", color: "var(--primary-fg)" }}>
              Create free account
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/login"
              className="w-full sm:w-auto h-12 px-8 rounded-xl text-base font-medium
                flex items-center justify-center gap-2 transition-colors
                border border-[var(--border)] hover:bg-[var(--surface-2)]"
              style={{ color: "var(--heading)" }}>
              Already have an account?
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────────── */}
      <footer className="border-t border-[var(--border)]" style={{ background: "var(--surface)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-10 flex flex-col sm:flex-row
          items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-[var(--primary)]">
              <Boxes className="w-4 h-4 text-[var(--primary-fg)]" />
            </div>
            <span className="font-semibold text-sm" style={{ color: "var(--heading)" }}>ÉLOITE</span>
          </div>
          <p className="text-xs" style={{ color: "var(--muted)" }}>
            © 2025 ÉLOITE Business Intelligence. Built for India&apos;s growing businesses.
          </p>
          <div className="flex items-center gap-4 text-xs" style={{ color: "var(--muted)" }}>
            <Link href="/login" className="hover:opacity-70 transition-opacity">Sign in</Link>
            <Link href="/signup" className="hover:opacity-70 transition-opacity">Sign up</Link>
            <Link href="/support" className="hover:opacity-70 transition-opacity">Support</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
