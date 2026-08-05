"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis,
  ResponsiveContainer, Tooltip, CartesianGrid,
} from "recharts";
import {
  TrendingUp, Package, AlertTriangle, Copy, ArrowRight,
  Sparkles, IndianRupee, CreditCard, ShieldAlert,
} from "lucide-react";

const revenueData = [
  { v: 28 }, { v: 32 }, { v: 30 }, { v: 36 }, { v: 38 }, { v: 42.8 },
];
const inventoryData = [
  { v: 20 }, { v: 19 }, { v: 21 }, { v: 18 }, { v: 17 }, { v: 18.2 },
];
const paymentsData = [
  { v: 5 }, { v: 6.2 }, { v: 5.8 }, { v: 7 }, { v: 6.5 }, { v: 7.4 },
];
const healthData = [
  { dim: "Inventory", score: 84 }, { dim: "Cash Flow", score: 78 },
  { dim: "Compliance", score: 95 }, { dim: "Payments", score: 72 },
  { dim: "Revenue", score: 90 }, { dim: "Supplier", score: 81 },
  { dim: "Customer", score: 86 },
];
const activity = [
  { time: "10:42 AM", event: "Duplicate invoice detected", module: "Invoice",    status: "danger",  action: "Review"  },
  { time: "10:15 AM", event: "Basmati Rice below reorder point", module: "Inventory", status: "warning", action: "Reorder" },
  { time: "09:58 AM", event: "GSTR-1 filing due in 3 days",     module: "GST",       status: "danger",  action: "File Now"},
  { time: "09:30 AM", event: "Payment received ₹2.4L",           module: "Payments",  status: "success", action: "View"    },
  { time: "09:10 AM", event: "Invoice INV-2024-089 processed",   module: "Invoice",   status: "success", action: "View"    },
  { time: "08:45 AM", event: "AI reorder suggestion: Sunflower Oil", module: "Inventory", status: "neutral", action: "Accept"},
];

const badgeCls = (s: string) => {
  if (s === "success") return "bg-[#0F8F83]/10 text-[#0F8F83]";
  if (s === "warning") return "bg-[#D97706]/10 text-[#D97706]";
  if (s === "danger")  return "bg-[#DC2626]/10 text-[#DC2626]";
  return "bg-[#9CA3AF]/15 text-[#9CA3AF]";
};
const badgeLabel = (s: string) =>
  ({ success: "Resolved", warning: "Warning", danger: "Critical", neutral: "Info" }[s] ?? "Info");

/* ── Card shell ─────────────────────────────────────────── */
function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-[20px] border border-[var(--border)]
        shadow-[0_2px_16px_-6px_rgba(0,0,0,0.08)] ${className}`}
      style={{ background: "var(--surface)" }}
    >
      {children}
    </div>
  );
}

/* ── Sparkline metric card ──────────────────────────────── */
function SparkCard({
  label, value, badge, badgeCls: bCls, footer,
  icon: Icon, iconBg, iconCls, data, color,
}: {
  label: string; value: string; badge: string; badgeCls: string; footer: string;
  icon: React.ElementType; iconBg: string; iconCls: string;
  data: { v: number }[]; color: string;
}) {
  const id = `g${color.replace("#", "")}`;
  return (
    <Card className="p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${iconBg}`}>
          <Icon className={iconCls} style={{ width: 18, height: 18 }} />
        </div>
        <span className={`rounded-full text-xs px-2.5 py-0.5 font-medium ${bCls}`}>{badge}</span>
      </div>
      <div>
        <p className="text-[13px] font-medium" style={{ color: "var(--muted)" }}>{label}</p>
        <p className="text-2xl font-bold mt-0.5 tracking-tight" style={{ color: "var(--heading)" }}>{value}</p>
      </div>
      <div className="h-12">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
            <defs>
              <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor={color} stopOpacity={0.18} />
                <stop offset="95%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area type="monotone" dataKey="v" stroke={color} strokeWidth={1.5}
              fill={`url(#${id})`} dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <p className="text-[11px]" style={{ color: "var(--neutral)" }}>{footer}</p>
    </Card>
  );
}

import { fetchDashboardData, DashboardMetrics } from "@/lib/supabase/data";

/* ── Page ───────────────────────────────────────────────── */
export default function DashboardPage() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);

  useEffect(() => {
    setMounted(true);
    fetchDashboardData().then(setMetrics).catch(() => setMetrics(null));
  }, []);

  const isDark = mounted && resolvedTheme === "dark";
  const chartGrid = isDark ? "#222222" : "#F0F0EE";
  const tooltipStyle = {
    borderRadius: 12,
    border: `1px solid ${isDark ? "#2A2A2A" : "#E7E7E5"}`,
    background: isDark ? "#1F1F1F" : "#FFFFFF",
    color: isDark ? "#F0F0F0" : "#171717",
    fontSize: 12,
  };
  const axisColor = isDark ? "#555" : "#9CA3AF";
  const barFill = isDark ? "#E0E0E0" : "#111111";

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });

  const revVal = metrics ? `₹${(metrics.monthly_revenue / 100000).toFixed(1)}L` : "₹42.8L";
  const invVal = metrics ? `${metrics.inventory_items_count} SKUs` : "18,240 SKUs";
  const payVal = metrics ? `₹${(metrics.overdue_payments_total / 100000).toFixed(1)}L` : "₹7.4L";
  const healthVal = metrics ? `${metrics.business_health_score}/100` : "88/100";

  return (
    <div className="flex flex-col gap-8">

      {/* ── Page header ──────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight" style={{ color: "var(--heading)" }}>
            Good morning, Rajesh
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--muted)" }}>
            {today} &middot; FY 2024‑25, Q3
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="h-9 px-4 rounded-xl text-sm font-medium transition-colors
              border border-[var(--border)] hover:bg-[var(--surface-2)]"
            style={{ background: "var(--surface)", color: "var(--heading)" }}
          >
            Last 30 Days
          </button>
          <button
            className="h-9 px-4 rounded-xl text-sm font-medium transition-colors
              hover:opacity-90 shadow-sm"
            style={{ background: "var(--primary)", color: "var(--primary-fg)" }}
          >
            Export Report
          </button>
        </div>
      </div>

      {/* ── Row 1 — Revenue / Inventory / Payments ───────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        <SparkCard label="Revenue (MTD)" value={revVal} badge="+12.4%"
          badgeCls="bg-[#0F8F83]/10 text-[#0F8F83]" footer="vs ₹38.1L last month"
          icon={IndianRupee} iconBg="bg-[#0F8F83]/10" iconCls="text-[#0F8F83]"
          data={revenueData} color="#0F8F83" />
        <SparkCard label="Inventory Count" value={invVal} badge="Active"
          badgeCls="bg-[#9CA3AF]/15 text-[#9CA3AF]" footer={`${metrics?.inventory_items_count || 0} registered SKUs`}
          icon={Package} iconBg="bg-[var(--surface-2)]" iconCls="text-[var(--body)]"
          data={inventoryData} color="#9CA3AF" />
        <SparkCard label="Pending Payments" value={payVal} badge={metrics?.pending_invoices_count ? `${metrics.pending_invoices_count} pending` : "0 pending"}
          badgeCls="bg-[#D97706]/10 text-[#D97706]" footer={`${metrics?.pending_invoices_count || 0} invoices awaiting payment`}
          icon={CreditCard} iconBg="bg-[#D97706]/10" iconCls="text-[#D97706]"
          data={paymentsData} color="#D97706" />
      </div>

      {/* ── Row 2 — GST / Stock / Duplicate ─────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 -mt-3">
        {[
          {
            icon: ShieldAlert, bg: "bg-[#DC2626]/10", cls: "text-[#DC2626]",
            badge: "Action Needed", badgeCls: "bg-[#DC2626]/10 text-[#DC2626]",
            label: "GST Alerts", value: "4",
            chips: [["2 Critical","#DC2626"],["2 Pending","#D97706"]] as [string,string][],
            footer: "GSTR-1 due in 3 days",
          },
          {
            icon: AlertTriangle, bg: "bg-[#D97706]/10", cls: "text-[#D97706]",
            badge: "Review", badgeCls: "bg-[#D97706]/10 text-[#D97706]",
            label: "Stock Alerts", value: "9",
            chips: [["3 Critical","#DC2626"],["6 Low","#D97706"]] as [string,string][],
            footer: "Basmati Rice critically low",
          },
          {
            icon: Copy, bg: "bg-[#DC2626]/10", cls: "text-[#DC2626]",
            badge: "Flagged", badgeCls: "bg-[#DC2626]/10 text-[#DC2626]",
            label: "Duplicate Invoices", value: "2",
            chips: [["₹24,600 at risk","#DC2626"]] as [string,string][],
            footer: "Detected by AI scan today",
          },
        ].map((c, i) => (
          <Card key={i} className="p-5 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className={`w-9 h-9 rounded-xl ${c.bg} flex items-center justify-center`}>
                <c.icon className={c.cls} style={{ width: 18, height: 18 }} />
              </div>
              <span className={`rounded-full text-xs px-2.5 py-0.5 font-medium ${c.badgeCls}`}>{c.badge}</span>
            </div>
            <div>
              <p className="text-[13px] font-medium" style={{ color: "var(--muted)" }}>{c.label}</p>
              <p className="text-2xl font-bold mt-0.5 tracking-tight" style={{ color: "var(--heading)" }}>{c.value}</p>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {c.chips.map(([txt, clr], j) => (
                <span key={j} className="text-xs rounded-full px-2.5 py-0.5 font-medium"
                  style={{ background: `${clr}14`, color: clr }}>{txt}</span>
              ))}
            </div>
            <p className="text-[11px]" style={{ color: "var(--neutral)" }}>{c.footer}</p>
          </Card>
        ))}
      </div>

      {/* ── Health Score + Breakdown ─────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
        {/* Gauge */}
        <Card className="p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-base" style={{ color: "var(--heading)" }}>
              Business Health Score
            </h2>
            <span className="rounded-full text-xs px-2.5 py-0.5 font-medium bg-[#0F8F83]/10 text-[#0F8F83]">Healthy</span>
          </div>
          <div className="flex items-center gap-8">
            <div className="relative shrink-0" style={{ width: 120, height: 120 }}>
              <div className="w-full h-full rounded-full" style={{
                background: `conic-gradient(#0F8F83 0% 88%, ${isDark ? "#2A2A2A" : "#E7E7E5"} 88% 100%)`,
                padding: 10,
              }}>
                <div className="w-full h-full rounded-full flex flex-col items-center justify-center"
                  style={{ background: "var(--surface)" }}>
                  <span className="text-2xl font-bold" style={{ color: "var(--heading)" }}>88</span>
                  <span className="text-[10px]" style={{ color: "var(--muted)" }}>/ 100</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-sm font-medium" style={{ color: "var(--body)" }}>
                Business operating efficiently
              </p>
              <p className="text-xs" style={{ color: "var(--muted)" }}>
                Top 12% of peers in your sector
              </p>
              <span className="text-xs rounded-full px-2.5 py-0.5 font-medium w-fit bg-[#0F8F83]/10 text-[#0F8F83]">
                +3 from last month
              </span>
            </div>
          </div>
        </Card>

        {/* Bar chart */}
        <Card className="p-6 flex flex-col gap-4">
          <h2 className="font-semibold text-base" style={{ color: "var(--heading)" }}>Health Breakdown</h2>
          <div style={{ height: 164 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={healthData} margin={{ top: 0, right: 0, bottom: 0, left: -20 }} barSize={12}>
                <CartesianGrid strokeDasharray="3 3" stroke={chartGrid} vertical={false} />
                <XAxis dataKey="dim" tick={{ fontSize: 10, fill: axisColor }} axisLine={false} tickLine={false} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: axisColor }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle} cursor={{ fill: isDark ? "#ffffff08" : "#00000008" }} />
                <Bar dataKey="score" fill={barFill} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* ── Recent Activity ──────────────────────────────── */}
      <Card className="overflow-hidden">
        <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-[var(--border)]">
          <h2 className="font-semibold text-base" style={{ color: "var(--heading)" }}>Recent Activity</h2>
          <button className="text-sm flex items-center gap-1 transition-colors hover:opacity-80"
            style={{ color: "var(--muted)" }}>
            View All <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="overflow-x-auto -webkit-overflow-scrolling-touch">
          <table className="w-full min-w-[540px]">
            <thead>
              <tr style={{ background: "var(--surface-2)" }}>
                {["Time", "Event", "Module", "Status", "Action"].map((h) => (
                  <th key={h} className="text-left px-6 py-3 text-xs font-semibold uppercase tracking-wider"
                    style={{ color: "var(--neutral)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {activity.map((row, i) => (
                <tr key={i}
                  className="border-t border-[var(--border)] transition-colors"
                  style={{ background: "var(--surface)" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--surface-2)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--surface)"; }}
                >
                  <td className="px-6 py-3.5 text-xs font-mono whitespace-nowrap" style={{ color: "var(--neutral)" }}>{row.time}</td>
                  <td className="px-6 py-3.5 text-sm" style={{ color: "var(--body)" }}>{row.event}</td>
                  <td className="px-6 py-3.5">
                    <span className="text-xs font-medium rounded-full px-2.5 py-0.5"
                      style={{ background: "var(--surface-2)", color: "var(--muted)" }}>
                      {row.module}
                    </span>
                  </td>
                  <td className="px-6 py-3.5">
                    <span className={`rounded-full text-xs px-2.5 py-0.5 font-medium ${badgeCls(row.status)}`}>
                      {badgeLabel(row.status)}
                    </span>
                  </td>
                  <td className="px-6 py-3.5">
                    <button className="text-xs font-medium transition-colors hover:opacity-60"
                      style={{ color: "var(--heading)" }}>
                      {row.action} →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* ── AI Recommendations ───────────────────────────── */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4" style={{ color: "var(--heading)" }} />
            <h2 className="font-semibold text-base" style={{ color: "var(--heading)" }}>
              AI Recommendations
            </h2>
          </div>
          <button className="text-sm flex items-center gap-1 transition-colors hover:opacity-80"
            style={{ color: "var(--muted)" }}>
            View All <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {[
            {
              icon: AlertTriangle, bg: "bg-[#DC2626]/10", cls: "text-[#DC2626]",
              title: "Chase ₹4.2L in aging receivables",
              desc: "7 invoices are 30+ days overdue. AI detected a pattern — follow up with these 3 customers first to recover 68% of the amount.",
              cta: "Take Action",
            },
            {
              icon: Package, bg: "bg-[#D97706]/10", cls: "text-[#D97706]",
              title: "Reorder Basmati Rice now",
              desc: "Current stock will last ~4 days at current sales velocity. Lead time from supplier is 3 days — reorder immediately.",
              cta: "Reorder Now",
            },
            {
              icon: TrendingUp, bg: "bg-[#0F8F83]/10", cls: "text-[#0F8F83]",
              title: "Optimize slow-moving inventory",
              desc: "₹2.1L locked in overstock (Mustard Oil, Turmeric). Consider promotional pricing to free up warehouse space.",
              cta: "View Details",
            },
          ].map((rec, i) => (
            <Card key={i} className="p-5 flex flex-col gap-3">
              <div className={`w-9 h-9 rounded-xl ${rec.bg} flex items-center justify-center`}>
                <rec.icon className={rec.cls} style={{ width: 18, height: 18 }} />
              </div>
              <div className="flex flex-col gap-1.5 flex-1">
                <p className="font-semibold text-sm" style={{ color: "var(--heading)" }}>{rec.title}</p>
                <p className="text-xs leading-relaxed" style={{ color: "var(--muted)" }}>{rec.desc}</p>
              </div>
              <button
                className="h-8 rounded-xl text-xs font-medium transition-colors hover:opacity-90"
                style={{ background: "var(--primary)", color: "var(--primary-fg)" }}
              >
                {rec.cta}
              </button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
