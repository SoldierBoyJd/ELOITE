"use client";
import { useState } from "react";
import {
  Download, Calendar, AlertTriangle, XCircle,
  CheckCircle, ArrowRight, Sparkles, ChevronDown,
} from "lucide-react";

const riskItems = [
  {
    title: "HSN Code 1006 Mismatch",
    desc: "4 invoices use incorrect HSN code for Basmati Rice. Should be 1006.30 not 1006.10.",
    level: "danger",
  },
  {
    title: "ITC Claim Variance",
    desc: "Input Tax Credit claimed exceeds supplier GSTR-1 by ₹18,400. Reconcile before filing.",
    level: "warning",
  },
  {
    title: "Inter-state Transaction Reported as Intra-state",
    desc: "2 transactions with Maharashtra GSTIN incorrectly filed under CGST/SGST instead of IGST.",
    level: "warning",
  },
];

const calendarItems = [
  { title: "GSTR-1 Filing",         date: "Jan 11, 2025", note: "Due in 3 days",  level: "danger"  },
  { title: "GSTR-3B Filing",        date: "Jan 20, 2025", note: "Due in 12 days", level: "warning" },
  { title: "GSTR-9 Annual Return",  date: "Jan 31, 2025", note: "Due in 23 days", level: "neutral" },
  { title: "GSTR-1 Filing",         date: "Feb 11, 2025", note: "Due in 34 days", level: "neutral" },
];

const badge = (l: string) => {
  if (l === "danger")  return "bg-[#DC2626]/10 text-[#DC2626]";
  if (l === "warning") return "bg-[#D97706]/10 text-[#D97706]";
  if (l === "success") return "bg-[#0F8F83]/10 text-[#0F8F83]";
  return "bg-[#9CA3AF]/15 text-[#9CA3AF]";
};
const dot = (l: string) => {
  if (l === "danger")  return "#DC2626";
  if (l === "warning") return "#D97706";
  if (l === "success") return "#0F8F83";
  return "#9CA3AF";
};

export default function GSTPage() {
  const [quarter, setQuarter] = useState("Q3 FY 2024-25");
  const card = "rounded-[20px] border border-[var(--border)] shadow-[0_2px_16px_-6px_rgba(0,0,0,0.08)]";

  return (
    <div className="flex flex-col gap-8">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight" style={{ color: "var(--heading)" }}>
            GST Compliance
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>
            Monitor filings, detect mismatches, and stay compliant
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <select value={quarter} onChange={e => setQuarter(e.target.value)}
              className="h-9 pl-3 pr-8 rounded-xl text-sm outline-none appearance-none"
              style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--body)" }}>
              <option>Q3 FY 2024-25</option>
              <option>Q2 FY 2024-25</option>
              <option>Q1 FY 2024-25</option>
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none"
              style={{ color: "var(--neutral)" }} />
          </div>
          <button className="h-9 px-4 rounded-xl text-sm font-medium transition-colors flex items-center gap-2 hover:opacity-80"
            style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--heading)" }}>
            <Download className="w-4 h-4" /> Export
          </button>
        </div>
      </div>

      {/* Score + Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">

        {/* Compliance Score */}
        <div className={`col-span-1 ${card} p-6 flex flex-col gap-5`} style={{ background: "var(--surface)" }}>
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-base" style={{ color: "var(--heading)" }}>Compliance Score</h2>
            <span className="rounded-full text-xs px-2.5 py-0.5 font-medium bg-[#0F8F83]/10 text-[#0F8F83]">
              Good Standing
            </span>
          </div>
          <div className="flex items-center gap-5">
            <div className="relative shrink-0" style={{ width: 100, height: 100 }}>
              <div className="w-full h-full rounded-full"
                style={{ background: `conic-gradient(#0F8F83 0% 89%, var(--border) 89% 100%)`, padding: 9 }}>
                <div className="w-full h-full rounded-full flex items-center justify-center flex-col"
                  style={{ background: "var(--surface)" }}>
                  <span className="text-xl font-bold" style={{ color: "var(--heading)" }}>89</span>
                  <span className="text-[9px]" style={{ color: "var(--muted)" }}>/ 100</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <p className="text-xs font-medium" style={{ color: "var(--body)" }}>vs Last Quarter</p>
              <div className="flex items-center gap-1">
                <span className="text-sm font-bold text-[#0F8F83]">+4</span>
                <span className="text-xs" style={{ color: "var(--muted)" }}>points</span>
              </div>
              <span className="text-[11px] bg-[#0F8F83]/10 text-[#0F8F83] rounded-full px-2.5 py-0.5 font-medium w-fit">
                Improving
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {[["Filed on Time","92%","text-[#0F8F83]"],["Total Tax Paid","₹8.4L","text-[var(--heading)]"]].map(([l,v,c],i) => (
              <div key={i} className="rounded-xl p-3" style={{ background: "var(--surface-2)" }}>
                <p className="text-[11px]" style={{ color: "var(--muted)" }}>{l}</p>
                <p className={`text-base font-bold ${c}`}>{v}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 2x2 Metric Cards */}
        <div className="col-span-1 lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {[
            { label: "Missing GST Entries", value: "12", status: "danger",   icon: XCircle,       desc: "Invoices without GST number — action needed" },
            { label: "Tax Mismatch",         value: "7",  status: "warning",  icon: AlertTriangle, desc: "Tax amount difference between invoice and return" },
            { label: "HSN Mismatch",         value: "4",  status: "warning",  icon: AlertTriangle, desc: "Incorrect HSN codes detected across 4 invoices" },
            { label: "IGST/CGST Issues",     value: "2",  status: "success",  icon: CheckCircle,   desc: "Inter/intra state classification errors — resolved" },
          ].map((m, i) => {
            const iCol = m.status === "danger" ? "text-[#DC2626]" : m.status === "warning" ? "text-[#D97706]" : "text-[#0F8F83]";
            const iBg  = m.status === "danger" ? "bg-[#DC2626]/10" : m.status === "warning" ? "bg-[#D97706]/10" : "bg-[#0F8F83]/10";
            const vCol = m.status === "danger" ? "#DC2626" : m.status === "warning" ? "#D97706" : "#0F8F83";
            return (
              <div key={i} className={`${card} p-5 flex flex-col gap-3`} style={{ background: "var(--surface)" }}>
                <div className="flex items-center justify-between">
                  <div className={`w-9 h-9 rounded-xl ${iBg} flex items-center justify-center`}>
                    <m.icon className={`${iCol}`} style={{ width: 18, height: 18 }} />
                  </div>
                  <span className={`rounded-full text-xs px-2.5 py-0.5 font-medium ${badge(m.status)}`}>
                    {m.status === "success" ? "Resolved" : m.status === "danger" ? "Critical" : "Review"}
                  </span>
                </div>
                <div>
                  <p className="text-[13px] font-medium" style={{ color: "var(--muted)" }}>{m.label}</p>
                  <p className="text-2xl font-bold mt-0.5" style={{ color: vCol }}>{m.value}</p>
                </div>
                <p className="text-[11px] leading-relaxed" style={{ color: "var(--neutral)" }}>{m.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Calendar + AI Risk */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">

        {/* Compliance Calendar */}
        <div className={`${card} overflow-hidden`} style={{ background: "var(--surface)" }}>
          <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border)]">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" style={{ color: "var(--body)" }} />
              <h2 className="font-semibold text-sm" style={{ color: "var(--heading)" }}>Compliance Calendar</h2>
            </div>
            <button className="text-xs font-medium rounded-lg px-3 py-1.5 transition-colors flex items-center gap-1.5 hover:opacity-80"
              style={{ background: "var(--surface-2)", color: "var(--muted)" }}>
              <Calendar className="w-3 h-3" /> List View
            </button>
          </div>
          <div className="flex flex-col divide-y divide-[var(--border)]">
            {calendarItems.map((item, i) => (
              <div key={i} className="flex items-center gap-4 px-6 py-4 transition-colors"
                style={{ background: "var(--surface)" }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "var(--surface-2)"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "var(--surface)"}>
                <span className="w-2 h-2 rounded-full shrink-0" style={{ background: dot(item.level) }} />
                <div className="flex-1">
                  <p className="text-sm font-semibold" style={{ color: "var(--heading)" }}>{item.title}</p>
                  <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>{item.date}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`rounded-full text-[11px] px-2.5 py-0.5 font-medium ${badge(item.level)}`}>
                    {item.note}
                  </span>
                  {item.level === "danger" && (
                    <button className="h-7 px-3 rounded-xl bg-[#DC2626] text-white text-[11px] font-medium hover:bg-[#b91c1c] transition-colors">
                      File Now
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Risk Analysis */}
        <div className={`${card} overflow-hidden`} style={{ background: "var(--surface)" }}>
          <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border)]">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" style={{ color: "var(--heading)" }} />
              <h2 className="font-semibold text-sm" style={{ color: "var(--heading)" }}>AI Risk Analysis</h2>
            </div>
            <span className="text-[11px] rounded-full px-2.5 py-0.5"
              style={{ background: "var(--surface-2)", color: "var(--muted)" }}>
              3 issues found
            </span>
          </div>
          <div className="flex flex-col divide-y divide-[var(--border)]">
            {riskItems.map((risk, i) => (
              <div key={i} className="px-6 py-4 transition-colors"
                style={{ background: "var(--surface)" }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "var(--surface-2)"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "var(--surface)"}>
                <div className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                    risk.level === "danger" ? "bg-[#DC2626]/10" : "bg-[#D97706]/10"
                  }`}>
                    <AlertTriangle className={`w-4 h-4 ${risk.level === "danger" ? "text-[#DC2626]" : "text-[#D97706]"}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-semibold" style={{ color: "var(--heading)" }}>{risk.title}</p>
                      <span className={`rounded-full text-[10px] px-2 py-0.5 font-medium shrink-0 ${badge(risk.level)}`}>
                        {risk.level === "danger" ? "High Risk" : "Medium Risk"}
                      </span>
                    </div>
                    <p className="text-xs mt-1 leading-relaxed" style={{ color: "var(--muted)" }}>{risk.desc}</p>
                    <button className="mt-2 text-xs font-medium flex items-center gap-1 hover:opacity-70 transition-opacity"
                      style={{ color: "var(--heading)" }}>
                      Resolve now <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
