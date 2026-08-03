"use client";
import { Download, FileBarChart, Calendar, Filter, FileText, TrendingUp, Package, ShieldCheck } from "lucide-react";

const reports = [
  { name: "Monthly P&L Statement",     desc: "Revenue, expenses, and net profit for January 2025",
    date: "Jan 31", type: "Financial",  icon: TrendingUp,   iBg: "bg-[#0F8F83]/10", iCol: "text-[#0F8F83]", size: "2.4 MB", fmt: "PDF"   },
  { name: "Inventory Valuation Report", desc: "Stock levels, valuation, and movement analysis",
    date: "Jan 30", type: "Inventory",  icon: Package,      iBg: "bg-[#D97706]/10", iCol: "text-[#D97706]", size: "1.8 MB", fmt: "Excel" },
  { name: "GST Filing Summary Q3",      desc: "GSTR-1, GSTR-3B data with reconciliation status",
    date: "Jan 15", type: "Compliance", icon: ShieldCheck,  iBg: "bg-[var(--surface-2)]", iCol: "text-[var(--body)]", size: "3.2 MB", fmt: "PDF"   },
  { name: "Accounts Payable Aging",     desc: "Vendor-wise payment aging and overdue analysis",
    date: "Jan 12", type: "Payments",   icon: FileText,     iBg: "bg-[#9CA3AF]/10", iCol: "text-[#9CA3AF]", size: "1.1 MB", fmt: "Excel" },
  { name: "AI Business Health Report",  desc: "Comprehensive health score and dimension analysis",
    date: "Jan 10", type: "AI Analysis",icon: FileBarChart, iBg: "bg-[var(--surface-2)]", iCol: "text-[var(--body)]", size: "4.6 MB", fmt: "PDF"   },
];

export default function ReportsPage() {
  const card = "rounded-[20px] border border-[var(--border)] shadow-[0_2px_16px_-6px_rgba(0,0,0,0.08)]";

  return (
    <div className="flex flex-col gap-8">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight" style={{ color: "var(--heading)" }}>Reports</h1>
          <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>
            Generate, schedule and export business reports
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="h-9 px-4 rounded-xl text-sm font-medium transition-colors flex items-center gap-2 hover:opacity-80"
            style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--heading)" }}>
            <Filter className="w-4 h-4" /> Filter
          </button>
          <button className="h-9 px-4 rounded-xl text-sm font-medium transition-colors flex items-center gap-2 hover:opacity-90"
            style={{ background: "var(--primary)", color: "var(--primary-fg)" }}>
            <FileBarChart className="w-4 h-4" /> Generate Report
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        {[
          { label: "Reports This Month", value: "24",    icon: FileBarChart, bg: "var(--surface-2)", col: "text-[var(--body)]" },
          { label: "Scheduled Reports",  value: "8",     icon: Calendar,     bg: "rgba(15,143,131,.10)", col: "text-[#0F8F83]" },
          { label: "Total Size",         value: "128 MB",icon: Download,     bg: "rgba(156,163,175,.10)", col: "text-[#9CA3AF]" },
        ].map((s, i) => (
          <div key={i} className={`${card} p-5 flex items-center gap-4`} style={{ background: "var(--surface)" }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: s.bg }}>
              <s.icon className={`w-5 h-5 ${s.col}`} />
            </div>
            <div>
              <p className="text-2xl font-bold" style={{ color: "var(--heading)" }}>{s.value}</p>
              <p className="text-xs font-medium" style={{ color: "var(--muted)" }}>{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Reports List */}
      <div className={`${card} overflow-hidden`} style={{ background: "var(--surface)" }}>
        <div className="px-6 py-4 border-b border-[var(--border)]">
          <h2 className="font-semibold text-sm" style={{ color: "var(--heading)" }}>Recent Reports</h2>
        </div>
        <div className="flex flex-col divide-y divide-[var(--border)]">
          {reports.map((r, i) => (
            <div key={i} className="flex items-center gap-3 sm:gap-4 px-4 sm:px-6 py-4 transition-colors"
              style={{ background: "var(--surface)" }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "var(--surface-2)"}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "var(--surface)"}>
              <div className={`w-10 h-10 rounded-xl ${r.iBg} flex items-center justify-center shrink-0`}>
                <r.icon className={`w-5 h-5 ${r.iCol}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold truncate" style={{ color: "var(--heading)" }}>{r.name}</p>
                <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>{r.desc}</p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <div className="text-right hidden md:block">
                  <p className="text-xs font-medium" style={{ color: "var(--body)" }}>{r.date}</p>
                  <p className="text-[11px]" style={{ color: "var(--neutral)" }}>{r.size} · {r.fmt}</p>
                </div>
                <span className="rounded-full text-[11px] px-2.5 py-0.5 font-medium"
                  style={{ background: "var(--surface-2)", color: "var(--muted)" }}>{r.type}</span>
                <button className="h-8 px-3 rounded-xl text-xs font-medium transition-colors flex items-center gap-1.5 hover:opacity-90"
                  style={{ background: "var(--primary)", color: "var(--primary-fg)" }}>
                  <Download className="w-3 h-3" /> Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
