"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { AreaChart, Area, ResponsiveContainer, Tooltip } from "recharts";
import {
  Package, Minus, Plus, RefreshCw, Truck, AlertTriangle,
  TrendingDown, Wheat, Droplets, Coffee, Leaf,
} from "lucide-react";

const products = [
  {
    id: 1, name: "Basmati Rice 25kg", category: "Grains", stockPct: 12,
    status: "Critical", statusColor: "danger", currentQty: 48, totalQty: 400,
    daysLeft: 4, demand: "High", supplier: "Punjab Agro Traders", confidence: 94, reorderQty: 200,
    forecast: [
      {v:48},{v:40},{v:32},{v:24},{v:16},{v:8},{v:0},
      {v:null},{v:null},{v:null},{v:null},{v:null},{v:null},{v:null},
    ],
    icon: Wheat, iconColor: "text-[#D97706]", iconBg: "bg-[#D97706]/10",
  },
  {
    id: 2, name: "Sunflower Oil 15L", category: "Oils", stockPct: 38,
    status: "Watch", statusColor: "warning", currentQty: 114, totalQty: 300,
    daysLeft: 14, demand: "Medium", supplier: "Gujarat Oil Mills", confidence: 87, reorderQty: 100,
    forecast: [
      {v:114},{v:106},{v:98},{v:90},{v:82},{v:74},{v:66},
      {v:58},{v:50},{v:42},{v:34},{v:26},{v:18},{v:10},
    ],
    icon: Droplets, iconColor: "text-[#D97706]", iconBg: "bg-[#D97706]/10",
  },
  {
    id: 3, name: "Assam Tea 5kg", category: "Beverages", stockPct: 71,
    status: "Healthy", statusColor: "success", currentQty: 213, totalQty: 300,
    daysLeft: 45, demand: "Moderate", supplier: "Assam Tea Estate", confidence: 91, reorderQty: 80,
    forecast: [
      {v:213},{v:208},{v:203},{v:198},{v:193},{v:188},{v:183},
      {v:178},{v:173},{v:168},{v:163},{v:158},{v:153},{v:148},
    ],
    icon: Coffee, iconColor: "text-[#0F8F83]", iconBg: "bg-[#0F8F83]/10",
  },
  {
    id: 4, name: "Wheat Flour 50kg", category: "Grains", stockPct: 25,
    status: "Warning", statusColor: "warning", currentQty: 50, totalQty: 200,
    daysLeft: 8, demand: "High", supplier: "Haryana Flour Mills", confidence: 89, reorderQty: 120,
    forecast: [
      {v:50},{v:44},{v:38},{v:32},{v:26},{v:20},{v:14},
      {v:8},{v:2},{v:null},{v:null},{v:null},{v:null},{v:null},
    ],
    icon: Wheat, iconColor: "text-[var(--body)]", iconBg: "bg-[var(--surface-2)]",
  },
  {
    id: 5, name: "Mustard Oil 5L", category: "Oils", stockPct: 55,
    status: "Healthy", statusColor: "success", currentQty: 165, totalQty: 300,
    daysLeft: 28, demand: "Low", supplier: "Rajasthan Oils Co.", confidence: 82, reorderQty: 60,
    forecast: [
      {v:165},{v:159},{v:153},{v:147},{v:141},{v:135},{v:129},
      {v:123},{v:117},{v:111},{v:105},{v:99},{v:93},{v:87},
    ],
    icon: Droplets, iconColor: "text-[#0F8F83]", iconBg: "bg-[#0F8F83]/10",
  },
  {
    id: 6, name: "Turmeric 1kg", category: "Spices", stockPct: 8,
    status: "Critical", statusColor: "danger", currentQty: 16, totalQty: 200,
    daysLeft: 2, demand: "Medium", supplier: "Kerala Spice Garden", confidence: 96, reorderQty: 150,
    forecast: [
      {v:16},{v:8},{v:0},
      {v:null},{v:null},{v:null},{v:null},{v:null},{v:null},{v:null},{v:null},{v:null},{v:null},{v:null},
    ],
    icon: Leaf, iconColor: "text-[#D97706]", iconBg: "bg-[#D97706]/10",
  },
];

const statusConfig: Record<string, { badge: string }> = {
  danger:  { badge: "bg-[#DC2626]/10 text-[#DC2626]" },
  warning: { badge: "bg-[#D97706]/10 text-[#D97706]"  },
  success: { badge: "bg-[#0F8F83]/10 text-[#0F8F83]"  },
};

export default function InventoryPage() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = mounted && resolvedTheme === "dark";

  const tt = {
    borderRadius: 8,
    border: `1px solid ${isDark ? "#2A2A2A" : "#E7E7E5"}`,
    background: isDark ? "#1F1F1F" : "#FFFFFF",
    color: isDark ? "#F0F0F0" : "#171717",
    fontSize: 11, padding: "4px 8px",
  };

  const [filter, setFilter]     = useState("All");
  const [quantities, setQuantities] = useState<Record<number, number>>(
    Object.fromEntries(products.map((p) => [p.id, p.reorderQty]))
  );

  const filtered = products.filter((p) => {
    if (filter === "Critical") return p.statusColor === "danger";
    if (filter === "Watch")    return p.statusColor === "warning";
    if (filter === "Healthy")  return p.statusColor === "success";
    return true;
  });

  const card = "rounded-[20px] border border-[var(--border)] shadow-[0_2px_16px_-6px_rgba(0,0,0,0.08)]";

  return (
    <div className="flex flex-col gap-8">

      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-bold tracking-tight" style={{ color: "var(--heading)" }}>
            Inventory Intelligence
          </h1>
          <span className="flex items-center gap-1.5 rounded-full text-xs px-2.5 py-1 font-medium bg-[#0F8F83]/10 text-[#0F8F83]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0F8F83] animate-pulse" />
            Live
          </span>
        </div>
        <label className="flex items-center gap-2 text-sm cursor-pointer" style={{ color: "var(--body)" }}>
          <div className="relative w-9 h-5 bg-[#0F8F83] rounded-full">
            <div className="absolute right-0.5 top-0.5 w-4 h-4 rounded-full shadow-sm"
              style={{ background: "var(--surface)" }} />
          </div>
          Auto-reorder
        </label>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 -mt-4">
        {["All Warehouses", "All Categories"].map((ph, i) => (
          <select key={i} className="h-9 px-3 rounded-xl text-sm outline-none"
            style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--body)" }}>
            <option>{ph}</option>
            {i === 0
              ? ["Mumbai HQ", "Delhi Branch"].map(o => <option key={o}>{o}</option>)
              : ["Grains","Oils","Beverages","Spices"].map(o => <option key={o}>{o}</option>)
            }
          </select>
        ))}
        <div className="flex items-center gap-1 rounded-xl p-1"
          style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
          {["All","Critical","Watch","Healthy"].map((f) => (
            <button key={f} onClick={() => setFilter(f)}
              className="h-7 px-3 rounded-lg text-xs font-medium transition-colors"
              style={filter === f
                ? { background: "var(--primary)", color: "var(--primary-fg)" }
                : { color: "var(--muted)" }
              }>{f}</button>
          ))}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Total SKUs",    value: "247", icon: Package,     cls: "text-[var(--body)]",   bg: "var(--surface-2)" },
          { label: "Critical Stock", value: "9",  icon: AlertTriangle, cls: "text-[#DC2626]",      bg: "rgba(220,38,38,.10)" },
          { label: "In Transit",    value: "34",  icon: Truck,       cls: "text-[#D97706]",        bg: "rgba(217,119,6,.10)"  },
          { label: "Overstocked",   value: "12",  icon: TrendingDown, cls: "text-[#9CA3AF]",       bg: "rgba(156,163,175,.10)"},
        ].map((s, i) => (
          <div key={i} className={`${card} p-5 flex items-center gap-4`} style={{ background: "var(--surface)" }}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: s.bg }}>
              <s.icon className={`w-5 h-5 ${s.cls}`} />
            </div>
            <div>
              <p className="text-2xl font-bold" style={{ color: "var(--heading)" }}>{s.value}</p>
              <p className="text-xs font-medium" style={{ color: "var(--muted)" }}>{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-3 gap-5">
        {filtered.map((product) => {
          const sc = statusConfig[product.statusColor];
          const col = product.stockPct < 15 ? "#DC2626" : product.stockPct < 40 ? "#D97706" : "#0F8F83";
          const dayCol = product.daysLeft <= 4 ? "#DC2626" : product.daysLeft <= 14 ? "#D97706" : "#0F8F83";
          const btnStyle = product.statusColor === "danger"
            ? { background: "#DC2626", color: "#fff" }
            : product.statusColor === "warning"
            ? { background: "#D97706", color: "#fff" }
            : { background: "var(--primary)", color: "var(--primary-fg)" };

          return (
            <div key={product.id} className={`${card} p-5 flex flex-col gap-4`}
              style={{ background: "var(--surface)" }}>

              {/* Header */}
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-xl ${product.iconBg} flex items-center justify-center flex-shrink-0`}>
                  <product.icon className={`w-5 h-5 ${product.iconColor}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm truncate" style={{ color: "var(--heading)" }}>
                    {product.name}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[11px] font-medium rounded-full px-2 py-0.5"
                      style={{ background: "var(--surface-2)", color: "var(--muted)" }}>
                      {product.category}
                    </span>
                    <span className={`rounded-full text-[11px] px-2 py-0.5 font-medium ${sc.badge}`}>
                      {product.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Stock bar */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px]" style={{ color: "var(--muted)" }}>Stock Level</span>
                  <span className="text-[11px] font-semibold" style={{ color: "var(--heading)" }}>
                    {product.stockPct}%
                  </span>
                </div>
                <div className="h-2 rounded-full overflow-hidden" style={{ background: "var(--surface-2)" }}>
                  <div className="h-full rounded-full transition-all"
                    style={{ width: `${product.stockPct}%`, backgroundColor: col }} />
                </div>
                <p className="text-[11px]" style={{ color: "var(--neutral)" }}>
                  {product.currentQty} / {product.totalQty} units
                </p>
              </div>

              {/* Forecast chart */}
              <div>
                <p className="text-[11px] mb-1.5 font-medium" style={{ color: "var(--muted)" }}>
                  14-Day Forecast
                </p>
                <div style={{ height: 56 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={product.forecast} margin={{ top: 2, right: 0, bottom: 0, left: 0 }}>
                      <defs>
                        <linearGradient id={`fg${product.id}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%"  stopColor={col} stopOpacity={0.15} />
                          <stop offset="95%" stopColor={col} stopOpacity={0}    />
                        </linearGradient>
                      </defs>
                      <Area type="monotone" dataKey="v" stroke={col} strokeWidth={1.5}
                        fill={`url(#fg${product.id})`} dot={false} connectNulls={false} />
                      <Tooltip contentStyle={tt} formatter={(v) => [`${v} units`, "Stock"]} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Days / Demand */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[11px]" style={{ color: "var(--muted)" }}>Days Remaining</p>
                  <p className="text-sm font-bold" style={{ color: dayCol }}>{product.daysLeft} days</p>
                </div>
                <div className="text-right">
                  <p className="text-[11px]" style={{ color: "var(--muted)" }}>Demand</p>
                  <p className="text-sm font-semibold" style={{ color: "var(--heading)" }}>{product.demand}</p>
                </div>
              </div>

              {/* Reorder controls */}
              <div className="flex flex-col gap-2 pt-2 border-t border-[var(--border)]">
                <div className="flex items-center justify-between">
                  <span className="text-[11px]" style={{ color: "var(--muted)" }}>Suggested Reorder Qty</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setQuantities(q => ({ ...q, [product.id]: Math.max(0, q[product.id] - 10) }))}
                      className="w-6 h-6 rounded-lg flex items-center justify-center transition-colors hover:opacity-80"
                      style={{ background: "var(--surface-2)" }}>
                      <Minus className="w-3 h-3" style={{ color: "var(--body)" }} />
                    </button>
                    <span className="text-sm font-semibold min-w-[3ch] text-center"
                      style={{ color: "var(--heading)" }}>{quantities[product.id]}</span>
                    <button
                      onClick={() => setQuantities(q => ({ ...q, [product.id]: q[product.id] + 10 }))}
                      className="w-6 h-6 rounded-lg flex items-center justify-center transition-colors hover:opacity-80"
                      style={{ background: "var(--surface-2)" }}>
                      <Plus className="w-3 h-3" style={{ color: "var(--body)" }} />
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[11px]" style={{ color: "var(--neutral)" }}>{product.supplier}</p>
                    <p className="text-[11px] mt-0.5" style={{ color: "var(--muted)" }}>
                      AI Confidence:{" "}
                      <span className="font-semibold" style={{ color: "var(--heading)" }}>
                        {product.confidence}%
                      </span>
                    </p>
                  </div>
                  <button className="h-8 px-3 rounded-xl text-xs font-medium transition-colors hover:opacity-90"
                    style={btnStyle}>
                    <RefreshCw className="w-3 h-3 inline mr-1" />
                    Reorder
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
