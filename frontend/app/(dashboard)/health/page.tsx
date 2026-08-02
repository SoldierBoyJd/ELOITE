"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import {
  AreaChart, Area, RadarChart, Radar, PolarGrid, PolarAngleAxis,
  ResponsiveContainer, Tooltip, CartesianGrid, XAxis, YAxis, Line,
} from "recharts";
import { TrendingUp, AlertTriangle, Package, CheckCircle, Sparkles, BarChart3 } from "lucide-react";

const radarData = [
  { dim: "Inventory",  score: 84 },
  { dim: "Cash Flow",  score: 78 },
  { dim: "Compliance", score: 95 },
  { dim: "Payments",   score: 72 },
  { dim: "Revenue",    score: 90 },
  { dim: "Supplier",   score: 81 },
  { dim: "Customer",   score: 86 },
];

const trendData = [
  { month: "Aug", score: 76, peer: 74 },
  { month: "Sep", score: 79, peer: 74 },
  { month: "Oct", score: 81, peer: 75 },
  { month: "Nov", score: 82, peer: 75 },
  { month: "Dec", score: 85, peer: 76 },
  { month: "Jan", score: 88, peer: 76 },
];

const recs = [
  {
    icon: AlertTriangle, bg: "bg-[#DC2626]/10", col: "text-[#DC2626]",
    title: "Chase ₹4.2L in aging receivables",
    desc: "7 invoices are 30+ days overdue. AI detected a pattern — follow up with these 3 customers first.",
    btn: "Take Action", primary: true,
  },
  {
    icon: Package, bg: "bg-[#D97706]/10", col: "text-[#D97706]",
    title: "Reorder Basmati Rice now",
    desc: "Current stock will last ~4 days. Lead time is 3 days — reorder immediately to avoid stockout.",
    btn: "Reorder", primary: false,
  },
  {
    icon: TrendingUp, bg: "bg-[#9CA3AF]/10", col: "text-[#9CA3AF]",
    title: "Unblock ₹2.1L in overstock",
    desc: "Mustard Oil and Turmeric are overstocked. Consider promotional pricing to free up capital.",
    btn: "View Details", primary: false,
  },
  {
    icon: CheckCircle, bg: "bg-[#0F8F83]/10", col: "text-[#0F8F83]",
    title: "Compliance is excellent",
    desc: "GST score 95/100 — your best quarter yet. All filings on track, ITC fully reconciled.",
    btn: "View Report", primary: false,
  },
];

export default function HealthPage() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted]       = useState(false);
  const [trendRange, setTrendRange] = useState("6M");
  const [comparePeer, setComparePeer] = useState(true);
  useEffect(() => setMounted(true), []);

  const isDark    = mounted && resolvedTheme === "dark";
  const gridCol   = isDark ? "#222" : "#F0F0EE";
  const axisCol   = isDark ? "#555" : "#9CA3AF";
  const radarGrid = isDark ? "#2A2A2A" : "#E7E7E5";
  const radarFill = isDark ? "#EFEFEF" : "#111111";
  const tt = {
    borderRadius: 12, fontSize: 12,
    border: `1px solid ${isDark ? "#2A2A2A" : "#E7E7E5"}`,
    background: isDark ? "#1F1F1F" : "#FFFFFF",
    color: isDark ? "#F0F0F0" : "#171717",
  };

  const card = "rounded-[20px] border border-[var(--border)] shadow-[0_2px_16px_-6px_rgba(0,0,0,0.08)]";

  return (
    <div className="flex flex-col gap-8">

      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold tracking-tight" style={{ color: "var(--heading)" }}>
            Business Health
          </h1>
          <span className="rounded-full text-xs px-2.5 py-0.5 font-medium bg-[#0F8F83]/10 text-[#0F8F83]">
            Healthy
          </span>
        </div>
        <label className="flex items-center gap-2 cursor-pointer">
          <span className="text-sm font-medium" style={{ color: "var(--body)" }}>Compare last period</span>
          <button
            onClick={() => setComparePeer(!comparePeer)}
            className="relative w-10 h-5 rounded-full transition-colors"
            style={{ background: comparePeer ? "#0F8F83" : "var(--surface-3)" }}
          >
            <div className="absolute top-0.5 w-4 h-4 rounded-full shadow-sm transition-transform"
              style={{
                background: "var(--surface)",
                transform: comparePeer ? "translateX(20px)" : "translateX(2px)",
              }} />
          </button>
        </label>
      </div>

      {/* Score + Radar */}
      <div className="grid grid-cols-2 gap-5">

        {/* Overall Score */}
        <div className={`${card} p-6 flex flex-col gap-5`} style={{ background: "var(--surface)" }}>
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-base" style={{ color: "var(--heading)" }}>Overall Health Score</h2>
            <span className="rounded-full text-xs px-2.5 py-0.5 font-medium bg-[#0F8F83]/10 text-[#0F8F83]">+3 MoM</span>
          </div>
          <div className="flex items-center gap-6">
            <div className="relative shrink-0" style={{ width: 140, height: 140 }}>
              <div className="w-full h-full rounded-full" style={{
                background: `conic-gradient(
                  #0F8F83 0% 30%,
                  ${isDark ? "#EFEFEF" : "#111111"} 30% 55%,
                  #D97706 55% 70%,
                  #9CA3AF 70% 88%,
                  ${isDark ? "#2A2A2A" : "#E7E7E5"} 88% 100%
                )`,
                padding: 12,
              }}>
                <div className="w-full h-full rounded-full flex items-center justify-center flex-col"
                  style={{ background: "var(--surface)" }}>
                  <span className="text-3xl font-bold" style={{ color: "var(--heading)" }}>88</span>
                  <span className="text-[11px]" style={{ color: "var(--muted)" }}>/ 100</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-sm font-semibold" style={{ color: "var(--heading)" }}>
                Business operating efficiently
              </p>
              <p className="text-xs leading-relaxed" style={{ color: "var(--muted)" }}>
                Top 12% of peers in your sector (Wholesale FMCG)
              </p>
              <div className="flex gap-2 flex-wrap">
                <span className="text-xs bg-[#0F8F83]/10 text-[#0F8F83] rounded-full px-2.5 py-0.5 font-medium">
                  Excellent Compliance
                </span>
                <span className="text-xs bg-[#D97706]/10 text-[#D97706] rounded-full px-2.5 py-0.5 font-medium">
                  Cash Flow Watch
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Radar */}
        <div className={`${card} p-6 flex flex-col gap-4`} style={{ background: "var(--surface)" }}>
          <h2 className="font-semibold text-base" style={{ color: "var(--heading)" }}>Dimension Breakdown</h2>
          <div className="flex items-center gap-4">
            <div style={{ height: 200, width: 200 }} className="shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData} margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
                  <PolarGrid stroke={radarGrid} />
                  <PolarAngleAxis dataKey="dim" tick={{ fontSize: 10, fill: axisCol }} />
                  <Radar name="Score" dataKey="score"
                    stroke={radarFill} fill={radarFill} fillOpacity={0.08} strokeWidth={1.5} />
                  <Tooltip contentStyle={tt} formatter={(v) => [`${v}/100`, "Score"]} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-col gap-2 flex-1">
              {radarData.map((d, i) => (
                <div key={i} className="flex items-center justify-between gap-2">
                  <span className="text-[11px] truncate" style={{ color: "var(--muted)" }}>{d.dim}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 rounded-full overflow-hidden"
                      style={{ background: "var(--surface-2)" }}>
                      <div className="h-full rounded-full"
                        style={{
                          width: `${d.score}%`,
                          backgroundColor: d.score >= 88 ? "#0F8F83" : d.score >= 75 ? (isDark ? "#EFEFEF" : "#111111") : "#D97706",
                        }} />
                    </div>
                    <span className="text-[11px] font-semibold w-6 text-right"
                      style={{ color: "var(--heading)" }}>{d.score}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Trend */}
      <div className={`${card} p-6 flex flex-col gap-5`} style={{ background: "var(--surface)" }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" style={{ color: "var(--body)" }} />
            <h2 className="font-semibold text-base" style={{ color: "var(--heading)" }}>Health Score Trend</h2>
          </div>
          <div className="flex items-center gap-3">
            {comparePeer && (
              <div className="flex items-center gap-1.5">
                <div className="w-4 border-t-2 border-dashed border-[#9CA3AF]" />
                <span className="text-xs" style={{ color: "var(--neutral)" }}>Peer Avg</span>
              </div>
            )}
            <div className="flex items-center gap-1 rounded-xl p-1" style={{ background: "var(--surface-2)" }}>
              {["3M","6M","12M"].map((r) => (
                <button key={r} onClick={() => setTrendRange(r)}
                  className="h-7 px-3 rounded-lg text-xs font-medium transition-colors"
                  style={trendRange === r
                    ? { background: "var(--surface)", color: "var(--heading)" }
                    : { color: "var(--muted)" }
                  }>{r}</button>
              ))}
            </div>
          </div>
        </div>
        <div style={{ height: 200 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trendData} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
              <defs>
                <linearGradient id="hg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor={isDark ? "#EFEFEF" : "#111111"} stopOpacity={0.12} />
                  <stop offset="95%" stopColor={isDark ? "#EFEFEF" : "#111111"} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={gridCol} vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: axisCol }} axisLine={false} tickLine={false} />
              <YAxis domain={[60,100]} tick={{ fontSize: 11, fill: axisCol }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tt}
                formatter={(v, n) => [v, n === "score" ? "Your Score" : "Peer Average"]} />
              <Area type="monotone" dataKey="score"
                stroke={isDark ? "#EFEFEF" : "#111111"} strokeWidth={2}
                fill="url(#hg)" dot={false} />
              {comparePeer && (
                <Line type="monotone" dataKey="peer"
                  stroke="#9CA3AF" strokeWidth={1.5} strokeDasharray="4 4" dot={false} />
              )}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* AI Recommendations */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4" style={{ color: "var(--heading)" }} />
          <h2 className="font-semibold text-base" style={{ color: "var(--heading)" }}>AI Recommendations</h2>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {recs.map((r, i) => (
            <div key={i} className={`${card} p-5 flex flex-col gap-3`} style={{ background: "var(--surface)" }}>
              <div className={`w-9 h-9 rounded-xl ${r.bg} flex items-center justify-center`}>
                <r.icon className={r.col} style={{ width: 18, height: 18 }} />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-sm" style={{ color: "var(--heading)" }}>{r.title}</p>
                <p className="text-[11px] mt-1.5 leading-relaxed" style={{ color: "var(--muted)" }}>{r.desc}</p>
              </div>
              <button
                className="h-8 rounded-xl text-xs font-medium transition-colors hover:opacity-90"
                style={r.primary
                  ? { background: "var(--primary)", color: "var(--primary-fg)" }
                  : { background: "var(--surface-2)", color: "var(--heading)", border: "1px solid var(--border)" }
                }>{r.btn}</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
