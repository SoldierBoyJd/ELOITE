"use client";
import { useState } from "react";
import {
  HelpCircle, MessageSquare, Book, Video, Mail,
  Phone, Search, ChevronDown, ChevronRight,
} from "lucide-react";

const faqs = [
  {
    q: "How does AI invoice scanning work?",
    a: "Our AI uses advanced OCR and machine learning to extract data from invoices automatically, achieving 98%+ accuracy across all standard formats including PDFs, images, and scanned documents.",
  },
  {
    q: "How is my GST compliance score calculated?",
    a: "The compliance score is calculated based on filing timeliness, accuracy of HSN codes, ITC reconciliation, and absence of mismatches between GSTR-1 and GSTR-3B data.",
  },
  {
    q: "Can I connect my existing accounting software?",
    a: "Yes, StockPilot AI integrates with Tally, Zoho Books, QuickBooks, and other major accounting platforms via our API or direct connectors available in Settings > Integrations.",
  },
  {
    q: "How often is the forecast model updated?",
    a: "The demand forecast model retrains daily using the latest sales data. Seasonal adjustments are applied automatically based on historical patterns and market signals.",
  },
  {
    q: "Is my business data secure?",
    a: "All data is encrypted at rest and in transit using AES-256 and TLS 1.3. We are SOC 2 Type II certified and fully GDPR compliant. Data is stored in Indian data centres.",
  },
];

const contacts = [
  {
    icon: MessageSquare, label: "Live Chat",       desc: "Avg response: 2 min",
    badge: "Online",   bc: "bg-[#0F8F83]/10 text-[#0F8F83]",
    bg: "bg-[#0F8F83]/10", col: "text-[#0F8F83]",
  },
  {
    icon: Mail,         label: "Email Support",   desc: "support@stockpilot.ai",
    badge: "24h SLA",  bc: "bg-[#9CA3AF]/15 text-[#9CA3AF]",
    bg: "bg-[var(--surface-2)]", col: "text-[var(--body)]",
  },
  {
    icon: Phone,        label: "Phone Support",   desc: "+91 1800-XXX-XXXX",
    badge: "9AM–6PM",  bc: "bg-[#9CA3AF]/15 text-[#9CA3AF]",
    bg: "bg-[var(--surface-2)]", col: "text-[var(--body)]",
  },
  {
    icon: Video,        label: "Schedule Demo",   desc: "30-min onboarding call",
    badge: "Free",     bc: "bg-[#D97706]/10 text-[#D97706]",
    bg: "bg-[#D97706]/10", col: "text-[#D97706]",
  },
];

const docs = [
  "Getting Started Guide",
  "Invoice Intelligence Docs",
  "GST Compliance Setup",
  "API Reference",
  "Integrations Guide",
];

export default function SupportPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [search, setSearch]   = useState("");

  const card = "rounded-[20px] border border-[var(--border)] shadow-[0_2px_16px_-6px_rgba(0,0,0,0.08)]";

  return (
    <div className="flex flex-col gap-8">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight" style={{ color: "var(--heading)" }}>Support</h1>
        <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>
          Get help, browse documentation, or contact our team
        </p>
      </div>

      {/* Search */}
      <div className="relative max-w-lg">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4"
          style={{ color: "var(--neutral)" }} />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search for help articles..."
          className="w-full h-11 pl-10 pr-4 rounded-xl text-sm outline-none transition-all
            focus:ring-2 focus:ring-[var(--primary)]/10 shadow-sm"
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            color: "var(--body)",
          }}
        />
      </div>

      {/* Contact Cards */}
      <div className="grid grid-cols-4 gap-4">
        {contacts.map((c, i) => (
          <div key={i}
            className={`${card} p-5 flex flex-col gap-3 cursor-pointer transition-colors`}
            style={{ background: "var(--surface)" }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "var(--surface-2)"}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "var(--surface)"}>
            <div className="flex items-center justify-between">
              <div className={`w-10 h-10 rounded-xl ${c.bg} flex items-center justify-center`}>
                <c.icon className={`w-5 h-5 ${c.col}`} />
              </div>
              <span className={`rounded-full text-[11px] px-2.5 py-0.5 font-medium ${c.bc}`}>{c.badge}</span>
            </div>
            <div>
              <p className="font-semibold text-sm" style={{ color: "var(--heading)" }}>{c.label}</p>
              <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>{c.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-5">

        {/* FAQs */}
        <div className={`col-span-2 ${card} overflow-hidden`} style={{ background: "var(--surface)" }}>
          <div className="flex items-center gap-2 px-6 py-4 border-b border-[var(--border)]">
            <HelpCircle className="w-4 h-4" style={{ color: "var(--body)" }} />
            <h2 className="font-semibold text-sm" style={{ color: "var(--heading)" }}>
              Frequently Asked Questions
            </h2>
          </div>
          <div className="flex flex-col divide-y divide-[var(--border)]">
            {faqs.map((faq, i) => (
              <div key={i}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-4 text-left transition-colors"
                  style={{ background: "var(--surface)" }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "var(--surface-2)"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "var(--surface)"}>
                  <span className="text-sm font-semibold pr-4" style={{ color: "var(--heading)" }}>
                    {faq.q}
                  </span>
                  {openFaq === i
                    ? <ChevronDown className="w-4 h-4 shrink-0" style={{ color: "var(--neutral)" }} />
                    : <ChevronRight className="w-4 h-4 shrink-0" style={{ color: "var(--neutral)" }} />
                  }
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-4" style={{ background: "var(--surface)" }}>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--body)" }}>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links + Video CTA */}
        <div className="flex flex-col gap-4">

          {/* Documentation */}
          <div className={`${card} overflow-hidden`} style={{ background: "var(--surface)" }}>
            <div className="flex items-center gap-2 px-5 py-4 border-b border-[var(--border)]">
              <Book className="w-4 h-4" style={{ color: "var(--body)" }} />
              <h2 className="font-semibold text-sm" style={{ color: "var(--heading)" }}>Documentation</h2>
            </div>
            <div className="flex flex-col divide-y divide-[var(--border)]">
              {docs.map((doc, i) => (
                <button key={i}
                  className="flex items-center justify-between px-5 py-3 text-sm text-left transition-colors"
                  style={{ color: "var(--body)", background: "var(--surface)" }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.background = "var(--surface-2)";
                    (e.currentTarget as HTMLElement).style.color = "var(--heading)";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.background = "var(--surface)";
                    (e.currentTarget as HTMLElement).style.color = "var(--body)";
                  }}>
                  {doc}
                  <ChevronRight className="w-3.5 h-3.5 shrink-0" style={{ color: "var(--neutral)" }} />
                </button>
              ))}
            </div>
          </div>

          {/* Video CTA */}
          <div className="rounded-[20px] p-5 flex flex-col gap-3"
            style={{ background: "var(--primary)" }}>
            <div className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: "rgba(255,255,255,.12)" }}>
              <Video className="w-4 h-4" style={{ color: "var(--primary-fg)" }} />
            </div>
            <p className="font-semibold text-sm" style={{ color: "var(--primary-fg)" }}>
              Video Tutorials
            </p>
            <p className="text-[11px] leading-relaxed" style={{ color: "color-mix(in srgb, var(--primary-fg) 60%, transparent)" }}>
              Watch step-by-step walkthroughs for all major features.
            </p>
            <button className="h-8 rounded-xl text-xs font-semibold transition-colors hover:opacity-90"
              style={{ background: "var(--primary-fg)", color: "var(--primary)" }}>
              Browse Videos
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
