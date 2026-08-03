"use client";
import { CreditCard, TrendingUp, Clock, CheckCircle, ArrowRight, Download } from "lucide-react";

const payments = [
  { vendor: "Punjab Agro Traders",  amount: "₹84,000", due: "Jan 14, 2025", status: "overdue",   daysOverdue: 3,  daysLeft: 0  },
  { vendor: "Gujarat Oil Mills",    amount: "₹42,600", due: "Jan 18, 2025", status: "pending",   daysOverdue: 0,  daysLeft: 1  },
  { vendor: "Assam Tea Estate",     amount: "₹28,900", due: "Jan 22, 2025", status: "pending",   daysOverdue: 0,  daysLeft: 5  },
  { vendor: "Kerala Spice Garden",  amount: "₹16,800", due: "Jan 28, 2025", status: "scheduled", daysOverdue: 0,  daysLeft: 11 },
  { vendor: "Haryana Flour Mills",  amount: "₹61,200", due: "Feb 02, 2025", status: "scheduled", daysOverdue: 0,  daysLeft: 16 },
  { vendor: "Rajasthan Oils Co.",   amount: "₹33,400", due: "Feb 08, 2025", status: "scheduled", daysOverdue: 0,  daysLeft: 22 },
];

const sBadge = (s: string) => {
  if (s === "overdue")   return "bg-[#DC2626]/10 text-[#DC2626]";
  if (s === "pending")   return "bg-[#D97706]/10 text-[#D97706]";
  if (s === "scheduled") return "bg-[#9CA3AF]/15 text-[#9CA3AF]";
  return "bg-[#0F8F83]/10 text-[#0F8F83]";
};

export default function PaymentsPage() {
  const card = "rounded-[20px] border border-[var(--border)] shadow-[0_2px_16px_-6px_rgba(0,0,0,0.08)]";

  return (
    <div className="flex flex-col gap-8">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight" style={{ color: "var(--heading)" }}>
            Payments
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>
            Track vendor payments, receivables and cash flow
          </p>
        </div>
        <button className="h-9 px-4 rounded-xl text-sm font-medium transition-colors flex items-center gap-2 hover:opacity-80"
          style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--heading)" }}>
          <Download className="w-4 h-4" /> Export
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        {[
          { label: "Total Payable",    value: "₹7.4L",   icon: CreditCard,  bg: "bg-[#DC2626]/10", col: "text-[#DC2626]", badge: "3 Overdue",   bc: "bg-[#DC2626]/10 text-[#DC2626]" },
          { label: "Total Receivable", value: "₹4.2L",   icon: TrendingUp,  bg: "bg-[#D97706]/10", col: "text-[#D97706]", badge: "7 Pending",   bc: "bg-[#D97706]/10 text-[#D97706]" },
          { label: "Paid This Month",  value: "₹12.8L",  icon: CheckCircle, bg: "bg-[#0F8F83]/10", col: "text-[#0F8F83]", badge: "On Track",    bc: "bg-[#0F8F83]/10 text-[#0F8F83]" },
          { label: "Avg Payment Days", value: "22 days", icon: Clock,       bg: "bg-[#9CA3AF]/10", col: "text-[#9CA3AF]", badge: "Net 30",      bc: "bg-[#9CA3AF]/15 text-[#9CA3AF]" },
        ].map((s, i) => (
          <div key={i} className={`${card} p-5 flex flex-col gap-3`} style={{ background: "var(--surface)" }}>
            <div className="flex items-center justify-between">
              <div className={`w-9 h-9 rounded-xl ${s.bg} flex items-center justify-center`}>
                <s.icon className={s.col} style={{ width: 18, height: 18 }} />
              </div>
              <span className={`rounded-full text-xs px-2.5 py-0.5 font-medium ${s.bc}`}>{s.badge}</span>
            </div>
            <div>
              <p className="text-[13px] font-medium" style={{ color: "var(--muted)" }}>{s.label}</p>
              <p className="text-2xl font-bold mt-0.5" style={{ color: "var(--heading)" }}>{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Payments Table */}
      <div className={`${card} overflow-hidden`} style={{ background: "var(--surface)" }}>
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-[var(--border)]">
          <h2 className="font-semibold text-sm" style={{ color: "var(--heading)" }}>Upcoming Payments</h2>
          <button className="text-sm flex items-center gap-1 transition-colors hover:opacity-80"
            style={{ color: "var(--muted)" }}>
            View All <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[540px]">
          <thead>
            <tr style={{ background: "var(--surface-2)" }}>
              {["Vendor","Amount","Due Date","Status","Action"].map((h, i) => (
                <th key={h} className={`px-6 py-3 text-xs font-semibold uppercase tracking-wider ${i === 1 ? "text-right" : "text-left"}`}
                  style={{ color: "var(--neutral)" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {payments.map((p, i) => (
              <tr key={i} className="border-t border-[var(--border)] transition-colors"
                style={{ background: "var(--surface)" }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "var(--surface-2)"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "var(--surface)"}>
                <td className="px-6 py-4 text-sm font-medium" style={{ color: "var(--heading)" }}>{p.vendor}</td>
                <td className="px-6 py-4 text-sm font-semibold text-right" style={{ color: "var(--heading)" }}>{p.amount}</td>
                <td className="px-6 py-4 text-sm" style={{ color: "var(--body)" }}>{p.due}</td>
                <td className="px-6 py-4">
                  <span className={`rounded-full text-xs px-2.5 py-0.5 font-medium ${sBadge(p.status)}`}>
                    {p.status === "overdue" ? `Overdue ${p.daysOverdue}d`
                      : p.status === "pending" ? `Due in ${p.daysLeft}d`
                      : "Scheduled"}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <button className="h-7 px-3 rounded-xl text-xs font-medium transition-colors hover:opacity-90"
                    style={
                      p.status === "overdue"
                        ? { background: "#DC2626", color: "#fff" }
                        : { background: "var(--primary)", color: "var(--primary-fg)" }
                    }>
                    {p.status === "overdue" ? "Pay Now" : "Schedule"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>{/* overflow-x-auto */}
      </div>
    </div>
  );
}
