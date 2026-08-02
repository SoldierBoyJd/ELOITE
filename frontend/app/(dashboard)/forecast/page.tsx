"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import {
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  ReferenceLine, Line, ComposedChart, Area,
} from "recharts";
import {
  Sparkles, Download, TrendingUp, Target, AlertTriangle,
  BarChart3, ChevronDown, ArrowUpRight, ArrowDownRight,
} from "lucide-react";

const demandData = [
  { month: "Jan", actual: 8200 },
  { month: "Feb", actual: 8900 },
  { month: "Mar", actual: 9400 },
  { month: "Apr", actual: 10200 },
  { month: "May", actual: 9800 },
  { month: "Jun", actual: 10900 },
  { month: "Jul", actual: 11200 },
  { month: "Aug", actual: 11200, forecast: 11600, lower: 10800, upper: 12400 },
  { month: "Sep", forecast: 12100, lower: 11200, upper: 13000 },
  { month: "Oct", forecast: 12840, lower: 11900, upper: 13800 },
  { month: "Nov", forecast: 13500, lower: 12400, upper: 14600 },
  { month: "Dec", forecast: 14200, lower: 13000, upper: 15400 },
];

const productForecasts = [
  { name: "Basmati Rice 25kg",  forecast: 3200, trend: "+18.2%", dir: "up",   conf: 94, variance: "±4.2%" },
  { name: "Sunflower Oil 15L",  forecast: 2100, trend: "+8.6%",  dir: "up",   conf: 87, variance: "±6.1%" },
  { name: "Wheat Flour 50kg",   forecast: 4800, trend: "+22.4%", dir: "up",   conf: 91, variance: "±3.8%" },
  { name: "Turmeric 1kg",       forecast:  890, trend: "-2.1%",  dir: "down", conf: 79, variance: "±8.3%" },
];

const insights = [
  {
    title: "Festival Season Spike (Oct–Nov)", conf: 92,
    desc: "Diwali demand drives 28–35% uplift in FMCG. Pre-stock Basmati Rice and Edible Oils by mid-September.",
    col: "text-[#D97706]",
  },
  {
    title: "Summer Demand Shift (Apr–Jun)", conf: 88,
    desc: "Beverages see +40% demand. Consider expanding Assam Tea SKUs and introducing summer variants.",
    col: "text-[#0F8F83]",
  },
  {
    title: "Year-end Inventory Clear (Mar)", conf: 84,
    desc: "Historical data shows 15–20% price sensitivity in March. Promotional pricing on slow-movers recommended.",
    col: "text-[var(--body)]",
  },
];

export default function ForecastPage() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [range, setRange]     = useState("6M");
  const [category, setCategory] = useState("All Categories");
  useEffect(() => setMounted(true), []);

  const isDark  = mounted && resolvedTheme === "dark";
  const gridCol = isDark ? "#222" : "#F0F0EE";
  const axisCol = isDark ? "#555" : "#9CA3AF";
  const refCol  = isDark ? "#2A2A2A" : "#E7E7E5";
  const confFill = isDark ? "rgba(255,255,255,.06)" : "rgba(156,163,175,.12)";
  const bgErase  = isDark ? "#0D0D0D" : "#F8F8F7";
  const actualLine = isDark ? "#EFEFEF" : "#111111";

  const tt = {
    borderRadius: 12, fontSize: 12,
    border: `1px solid ${isDark ? "#2A2A2A" : "#E7E7E5"}`,
    background: isDark ? "#1F1F1F" : "#FFFFFF",
    color: isDark ? "#F0F0F0" : "#171717",
  };

  const card = "rounded-[20px] border border-[var(--border)] shadow-[0_2px_16px_-6px_rgba(0,0,0,0.08)]";

  const kpis = [
    {
      label: "Predicted Demand", value: "12,840", unit: "units", badge: "+14.2%",
      bCls: "bg-[#0F8F83]/10 text-[#0F8F83]", icon: TrendingUp,
      iBg: "bg-[#0F8F83]/10", iCls: "text-[#0F8F83]", note: "Next 30 days",
    },
    {
      label: "Forecast Accuracy", value: "94.6", unit: "%", badge: "+2.1%",
      bCls: "bg-[#0F8F83]/10 text-[#0F8F83]", icon: Target,
      iBg: "bg-[var(--surface-2)]", iCls: "text-[var(--body)]", note: "vs last quarter",
    },
    {
      label: "Demand Spikes", value: "7", unit: "events", badge: "Predicted",
      bCls: "bg-[#D97706]/10 text-[#D97706]", icon: AlertTriangle,
      iBg: "bg-[#D97706]/10", iCls: "text-[#D97706]", note: "Next 90 days",
    },
    {
      label: "AI Confidence", value: "88", unit: "%", badge: "High",
      bCls: "bg-[#9CA3AF]/15 text-[#9CA3AF]", icon: Sparkles,
      iBg: "bg-[#9CA3AF]/10", iCls: "text-[#9CA3AF]", note: "Model confidence",
    },
  ];

  return (
    <div className="flex flex-col gap-8">

      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold tracking-tight" style={{ color: "var(--heading)" }}>
            Forecast Analytics
          </h1>
          <span className="flex items-center gap-1.5 rounded-full text-xs px-2.5 py-1 font-medium"
            style={{ background: "var(--surface-2)", color: "var(--body)" }}>
            <Sparkles className="w-3 h-3" />AI Powered
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <select value={category} onChange={e => setCategory(e.target.value)}
              className="h-9 pl-3 pr-8 rounded-xl text-sm outline-none appearance-none"
              style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--body)" }}>
              {["All Categories","Grains","Oils","Beverages","Spices"].map(o => <option key={o}>{o}</option>)}
            </select>
            <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none"
              style={{ color: "var(--neutral)" }} />
          </div>
          <div className="flex items-center gap-1 rounded-xl p-1"
            style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
            {["3M","6M","12M"].map(r => (
              <button key={r} onClick={() => setRange(r)}
                className="h-7 px-3 rounded-lg text-xs font-medium transition-colors"
                style={range === r
                  ? { background: "var(--primary)", color: "var(--primary-fg)" }
                  : { color: "var(--muted)" }
                }>{r}</button>
            ))}
          </div>
          <button className="h-9 px-4 rounded-xl text-sm font-medium transition-colors flex items-center gap-2 hover:opacity-80"
            style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--heading)" }}>
            <Download className="w-4 h-4" /> Export
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-4 gap-4">
        {kpis.map((k, i) => (
          <div key={i} className={`${card} p-5 flex flex-col gap-3`} style={{ background: "var(--surface)" }}>
            <div className="flex items-center justify-between">
              <div className={`w-9 h-9 rounded-xl ${k.iBg} flex items-center justify-center`}>
                <k.icon className={k.iCls} style={{ width: 18, height: 18 }} />
              </div>
              <span className={`rounded-full text-xs px-2.5 py-0.5 font-medium ${k.bCls}`}>{k.badge}</span>
            </div>
            <div>
              <p className="text-[13px] font-medium" style={{ color: "var(--muted)" }}>{k.label}</p>
              <p className="text-2xl font-bold mt-0.5 tracking-tight" style={{ color: "var(--heading)" }}>
                {k.value}
                <span className="text-sm font-medium ml-1" style={{ color: "var(--neutral)" }}>{k.unit}</span>
              </p>
            </div>
            <p className="text-[11px]" style={{ color: "var(--neutral)" }}>{k.note}</p>
          </div>
        ))}
      </div>

      {/* Demand Chart */}
      <div className={`${card} p-6 flex flex-col gap-5`} style={{ background: "var(--surface)" }}>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-base" style={{ color: "var(--heading)" }}>Demand Prediction</h2>
            <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>
              Actual demand vs AI forecast with confidence band
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs" style={{ color: "var(--muted)" }}>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-0.5 rounded-full" style={{ background: actualLine }} />Actual
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-px border-t-2 border-dashed border-[#D97706]" />Forecast
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded" style={{ background: confFill, border: "1px solid var(--border)" }} />Band
            </span>
          </div>
        </div>
        <div style={{ height: 280 }}>
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={demandData} margin={{ top: 5, right: 5, bottom: 5, left: -10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridCol} vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: axisCol }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: axisCol }} axisLine={false} tickLine={false}
                tickFormatter={v => `${(v/1000).toFixed(0)}k`} />
              <Tooltip contentStyle={tt}
                formatter={(v, n) => {
                  const labels: Record<string,string> = { actual:"Actual", forecast:"Forecast", upper:"Upper", lower:"Lower" };
                  return [v != null ? `${Number(v).toLocaleString()} units` : "—", labels[String(n)] ?? String(n)];
                }} />
              <ReferenceLine x="Aug" stroke={refCol} strokeDasharray="4 4"
                label={{ value: "Forecast Start", position: "top", fontSize: 10, fill: axisCol }} />
              <Area type="monotone" dataKey="upper" stroke="none" fill={confFill} fillOpacity={1} connectNulls />
              <Area type="monotone" dataKey="lower" stroke="none" fill={bgErase} fillOpacity={1} connectNulls />
              <Line type="monotone" dataKey="actual" stroke={actualLine} strokeWidth={2}
                dot={{ fill: actualLine, r: 3 }} connectNulls={false} />
              <Line type="monotone" dataKey="forecast" stroke="#D97706" strokeWidth={2}
                strokeDasharray="5 4" dot={{ fill: "#D97706", r: 3 }} connectNulls />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Product Table */}
      <div className={`${card} overflow-hidden`} style={{ background: "var(--surface)" }}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border)]">
          <h2 className="font-semibold text-sm" style={{ color: "var(--heading)" }}>
            Product-Level Forecast (Next 30 Days)
          </h2>
          <button className="text-xs font-medium flex items-center gap-1 hover:opacity-80 transition-opacity"
            style={{ color: "var(--muted)" }}>
            View All <BarChart3 className="w-3.5 h-3.5" />
          </button>
        </div>
        <table className="w-full">
          <thead>
            <tr style={{ background: "var(--surface-2)" }}>
              {["Product","Forecast Units","Trend","Confidence","Variance"].map((h, i) => (
                <th key={h} className={`px-6 py-3 text-xs font-semibold uppercase tracking-wider ${i > 0 ? "text-right" : "text-left"}`}
                  style={{ color: "var(--neutral)" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {productForecasts.map((p, i) => (
              <tr key={i} className="border-t border-[var(--border)] transition-colors"
                style={{ background: "var(--surface)" }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "var(--surface-2)"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "var(--surface)"}>
                <td className="px-6 py-4 text-sm font-medium" style={{ color: "var(--heading)" }}>{p.name}</td>
                <td className="px-6 py-4 text-sm font-semibold text-right" style={{ color: "var(--heading)" }}>
                  {p.forecast.toLocaleString()}
                </td>
                <td className="px-6 py-4 text-right">
                  <span className={`flex items-center justify-end gap-1 text-sm font-semibold ${
                    p.dir === "up" ? "text-[#0F8F83]" : "text-[#DC2626]"
                  }`}>
                    {p.dir === "up"
                      ? <ArrowUpRight className="w-3.5 h-3.5" />
                      : <ArrowDownRight className="w-3.5 h-3.5" />}
                    {p.trend}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 rounded-full overflow-hidden max-w-[100px]"
                      style={{ background: "var(--surface-2)" }}>
                      <div className="h-full rounded-full"
                        style={{
                          width: `${p.conf}%`,
                          backgroundColor: p.conf >= 90 ? "#0F8F83" : p.conf >= 80 ? "#D97706" : "#DC2626",
                        }} />
                    </div>
                    <span className="text-xs font-semibold" style={{ color: "var(--heading)" }}>{p.conf}%</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-right" style={{ color: "var(--muted)" }}>{p.variance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Seasonality Insights */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4" style={{ color: "var(--heading)" }} />
          <h2 className="font-semibold text-base" style={{ color: "var(--heading)" }}>Seasonality Insights</h2>
        </div>
        <div className="grid grid-cols-3 gap-5">
          {insights.map((ins, i) => (
            <div key={i} className="rounded-[20px] border border-[var(--border)] p-5 flex flex-col gap-3"
              style={{ background: "var(--surface-2)" }}>
              <div className="flex items-start justify-between">
                <p className={`font-semibold text-sm ${ins.col}`}>{ins.title}</p>
                <span className="text-[10px] rounded-full px-2 py-0.5 font-medium border border-[var(--border)]"
                  style={{ background: "var(--surface)", color: "var(--muted)" }}>
                  {ins.conf}% confidence
                </span>
              </div>
              <p className="text-xs leading-relaxed flex-1" style={{ color: "var(--muted)" }}>{ins.desc}</p>
              <button className={`text-xs font-medium flex items-center gap-1 hover:opacity-75 transition-opacity ${ins.col}`}>
                Plan for this <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
