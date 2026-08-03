"use client";
import { Toaster as SonnerToaster } from "sonner";
import { useTheme } from "next-themes";

export function Toaster() {
  const { resolvedTheme } = useTheme();
  return (
    <SonnerToaster
      position="bottom-right"
      theme={resolvedTheme === "dark" ? "dark" : "light"}
      toastOptions={{
        style: {
          borderRadius: "14px",
          fontSize: "13px",
          fontFamily: "'Inter', system-ui, sans-serif",
          border: "1px solid var(--border)",
          background: "var(--surface)",
          color: "var(--heading)",
        },
        classNames: {
          success: "!border-[#0F8F83]/20",
          error:   "!border-[#DC2626]/20",
          warning: "!border-[#D97706]/20",
        },
      }}
    />
  );
}
