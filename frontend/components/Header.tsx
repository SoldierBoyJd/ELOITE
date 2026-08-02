"use client";
import { Search, Bell, ChevronDown, Sparkles, Building2 } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Header() {
  return (
    <header
      className="sticky top-0 z-10 flex items-center gap-4 px-8 h-16 backdrop-blur-sm
        border-b border-[var(--border)]"
      style={{ background: "color-mix(in srgb, var(--surface) 95%, transparent)" }}
    >
      {/* Search */}
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--neutral)]" />
        <input
          className="w-full h-10 pl-9 pr-10 rounded-xl text-sm outline-none transition-all
            bg-[var(--surface-2)] border border-transparent
            text-[var(--body)] placeholder:text-[var(--disabled)]
            focus:ring-2 focus:ring-[var(--primary)]/10 focus:border-[var(--border)]"
          placeholder="Search or ask AI…"
        />
        <kbd
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-medium
            px-1.5 py-0.5 rounded border border-[var(--border)]
            bg-[var(--surface)] text-[var(--muted)]"
        >
          ⌘K
        </kbd>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-2 ml-auto">
        {/* AI Assistant */}
        <button
          className="flex items-center gap-2 h-10 px-4 rounded-xl text-sm font-medium
            transition-colors shadow-sm
            bg-[var(--primary)] text-[var(--primary-fg)]
            hover:opacity-90"
        >
          <Sparkles className="w-4 h-4" />
          AI Assistant
        </button>

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Notifications */}
        <button
          className="relative w-10 h-10 rounded-xl flex items-center justify-center transition-colors
            bg-[var(--surface-2)] border border-[var(--border)]
            hover:bg-[var(--surface-3)] text-[var(--body)]"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute right-2 top-2 w-2 h-2 rounded-full bg-[var(--danger)]" />
        </button>

        {/* Company Switcher */}
        <button
          className="flex items-center gap-2 h-10 px-3 rounded-xl text-sm font-medium transition-colors
            bg-[var(--surface-2)] border border-[var(--border)]
            text-[var(--heading)] hover:bg-[var(--surface-3)]"
        >
          <div className="w-5 h-5 rounded-md bg-[var(--primary)] flex items-center justify-center">
            <Building2 className="w-3 h-3 text-[var(--primary-fg)]" />
          </div>
          <span>Sharma Traders</span>
          <ChevronDown className="w-3.5 h-3.5 text-[var(--muted)]" />
        </button>

        {/* Avatar */}
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center
            text-white text-sm font-semibold"
          style={{ background: "linear-gradient(135deg, #374151, #6B7280)" }}
        >
          RS
        </div>
      </div>
    </header>
  );
}
