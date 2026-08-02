"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon, Monitor } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => setMounted(true), []);
  if (!mounted) {
    return (
      <div className="w-9 h-9 rounded-xl bg-[var(--surface-2)] border border-[var(--border)]" />
    );
  }

  const cycle = () => {
    if (theme === "light") setTheme("dark");
    else if (theme === "dark") setTheme("system");
    else setTheme("light");
  };

  const Icon = theme === "light" ? Sun : theme === "dark" ? Moon : Monitor;
  const label = theme === "light" ? "Light" : theme === "dark" ? "Dark" : "System";

  return (
    <button
      onClick={cycle}
      title={`Theme: ${label} — click to cycle`}
      className="relative w-9 h-9 rounded-xl flex items-center justify-center transition-colors
        bg-[var(--surface-2)] border border-[var(--border)]
        hover:bg-[var(--surface-3)] text-[var(--muted)] hover:text-[var(--heading)]"
    >
      <Icon className="w-4 h-4" />
    </button>
  );
}
