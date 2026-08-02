"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Package, FileText, CheckCircle, CreditCard,
  TrendingUp, Sparkles, BarChart3, FileBarChart, Settings,
  HelpCircle, Boxes,
} from "lucide-react";

const navItems = [
  { href: "/",          label: "Dashboard",             icon: LayoutDashboard },
  { href: "/inventory", label: "Inventory Intelligence", icon: Package },
  { href: "/invoice",   label: "Invoice Intelligence",  icon: FileText },
  { href: "/gst",       label: "GST Compliance",        icon: CheckCircle },
  { href: "/payments",  label: "Payments",              icon: CreditCard },
  { href: "/health",    label: "Business Health",       icon: TrendingUp },
  { href: "/ai",        label: "AI Insights",           icon: Sparkles },
  { href: "/forecast",  label: "Forecast",              icon: BarChart3 },
  { href: "/reports",   label: "Reports",               icon: FileBarChart },
  { href: "/settings",  label: "Settings",              icon: Settings },
  { href: "/support",   label: "Support",               icon: HelpCircle },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="shrink-0 flex flex-col w-64 min-h-screen
        border-r border-[var(--border)] transition-colors"
      style={{ background: "var(--sidebar-bg)" }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-[var(--border)]">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center shadow-sm
            bg-[var(--primary)]"
        >
          <Boxes className="w-5 h-5 text-[var(--primary-fg)]" />
        </div>
        <div className="flex flex-col leading-tight">
          <span className="font-semibold text-sm tracking-tight text-[var(--heading)]">
            ÉLOITE
          </span>
          <span className="text-[11px] text-[var(--muted)]">Business Intelligence</span>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 flex flex-col gap-0.5 px-3 py-4 overflow-y-auto">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`relative flex items-center gap-3 px-3 py-2 rounded-lg text-sm
                transition-colors duration-150 ${
                active
                  ? "font-semibold text-[var(--heading)]"
                  : "font-medium text-[var(--muted)] hover:text-[var(--heading)]"
              }`}
              style={
                active
                  ? { background: "color-mix(in srgb, var(--primary) 8%, transparent)" }
                  : undefined
              }
              onMouseEnter={(e) => {
                if (!active) {
                  (e.currentTarget as HTMLElement).style.background =
                    "color-mix(in srgb, var(--primary) 4%, transparent)";
                }
              }}
              onMouseLeave={(e) => {
                if (!active) {
                  (e.currentTarget as HTMLElement).style.background = "";
                }
              }}
            >
              {active && (
                <span
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-full
                    bg-[var(--primary)]"
                />
              )}
              <Icon
                className={`w-4 h-4 shrink-0 transition-colors ${
                  active ? "text-[var(--heading)]" : "text-[var(--disabled)]"
                }`}
              />
              <span className="leading-5">{label}</span>
            </Link>
          );
        })}
      </nav>

      {/* AI Copilot CTA */}
      <div
        className="mx-3 mb-4 rounded-xl p-4 flex flex-col gap-2
          border border-[var(--border)]"
        style={{ background: "color-mix(in srgb, var(--primary) 4%, transparent)" }}
      >
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[var(--heading)]" />
          <span className="font-semibold text-xs text-[var(--heading)]">AI Copilot</span>
        </div>
        <p className="text-[11px] text-[var(--muted)] leading-relaxed">
          Ask anything about your business health.
        </p>
        <button
          className="mt-1 h-8 w-full rounded-xl text-xs font-medium transition-colors
            bg-[var(--primary)] text-[var(--primary-fg)]
            hover:opacity-90"
        >
          Open Assistant
        </button>
      </div>
    </aside>
  );
}
