"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard, Package, FileText, CheckCircle, CreditCard,
  TrendingUp, Sparkles, BarChart3, FileBarChart, Settings,
  HelpCircle, Boxes, X, Menu, Search, Bell, ChevronDown, LogOut,
} from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import type { User as SupabaseUser } from "@supabase/supabase-js";

const navItems = [
  { href: "/dashboard", label: "Dashboard",             icon: LayoutDashboard },
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

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router   = useRouter();

  // Create client once, lazily — never at module level
  const supabase = createClient();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser]               = useState<SupabaseUser | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  // ── Auth gate: nothing renders until we confirm a valid session ──
  const [authChecked, setAuthChecked] = useState(false);

  const close = () => setSidebarOpen(false);

  // ── Shared auth verification (uses getUser = server roundtrip, not stale cache) ──
  const verifyAuth = async () => {
    try {
      const { data: { user: currentUser } } = await supabase.auth.getUser();
      if (!currentUser) {
        // No valid session — kick to login immediately
        window.location.replace("/login");
        return false;
      }
      setUser(currentUser);
      setAuthChecked(true);
      return true;
    } catch {
      window.location.replace("/login");
      return false;
    }
  };

  /* ── Load user session + handle expiry ── */
  useEffect(() => {
    // Initial auth check — server-verified
    verifyAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED" || event === "INITIAL_SESSION") {
        setUser(session?.user ?? null);
        setAuthChecked(true);
      } else if (event === "SIGNED_OUT") {
        setUser(null);
        setAuthChecked(false);
        window.location.replace("/login");
      }
    });

    // ── bfcache fix ──────────────────────────────────────────────────────────
    // Browser back-forward cache restores a full page snapshot in memory,
    // bypassing server-side auth checks. When pageshow fires with
    // persisted=true, we hide everything and re-verify via server call.
    const handlePageShow = (e: PageTransitionEvent) => {
      if (e.persisted) {
        // Immediately hide content until re-verified
        setAuthChecked(false);
        verifyAuth();
      }
    };

    // ── Back/Forward button detection ────────────────────────────────────
    // popstate fires when the user hits back/forward — re-verify auth
    const handlePopState = () => {
      setAuthChecked(false);
      verifyAuth();
    };

    // ── Multi-tab logout detection ────────────────────────────────────────
    // When user switches back to this tab after logging out in another tab,
    // re-verify the session immediately.
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        verifyAuth();
      }
    };

    window.addEventListener("pageshow", handlePageShow);
    window.addEventListener("popstate", handlePopState);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      subscription.unsubscribe();
      window.removeEventListener("pageshow", handlePageShow);
      window.removeEventListener("popstate", handlePopState);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── Logout (Instagram-style) ── */
  const handleLogout = async () => {
    // 1. Immediately hide all content
    setAuthChecked(false);
    setUser(null);

    // 2. Sign out from Supabase (clears server-side session + cookies)
    await supabase.auth.signOut();

    // 3. Nuke ALL Supabase tokens from localStorage AND sessionStorage
    try {
      const keysToRemove: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && (key.startsWith("sb-") || key.includes("supabase") || key.includes("auth"))) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach((key) => localStorage.removeItem(key));
      // Also clear sessionStorage
      sessionStorage.clear();
    } catch {
      // Safe to ignore
    }

    toast.success("Signed out successfully");

    // 4. Replace the entire history entry so the back button cannot
    //    return to any dashboard page. This is the Instagram pattern:
    //    after logout, hitting back just shows /login again.
    window.history.replaceState(null, "", "/login");
    window.location.replace("/login");
  };

  /* ── Auth gate: show loading spinner until verified ── */
  if (!authChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--bg)" }}>
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-[var(--border)] border-t-[var(--primary)] rounded-full animate-spin" />
          <span className="text-xs text-[var(--muted)]">Verifying session…</span>
        </div>
      </div>
    );
  }

  /* ── User display helpers ── */
  const displayName = user?.user_metadata?.full_name
    ?? user?.email?.split("@")[0]
    ?? "User";
  const initials = displayName
    .split(" ")
    .map((w: string) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
  const avatarUrl = user?.user_metadata?.avatar_url as string | undefined;

  /* ── Shared nav list ── */
  const NavList = () => (
    <nav className="flex-1 flex flex-col gap-0.5 px-3 py-4 overflow-y-auto">
      {navItems.map(({ href, label, icon: Icon }) => {
        const active = pathname === href;
        return (
          <Link key={href} href={href} onClick={close}
            className={`relative flex items-center gap-3 px-3 py-2 rounded-lg text-sm
              transition-colors duration-150
              ${active ? "font-semibold" : "font-medium hover:text-[var(--heading)]"}`}
            style={{
              color: active ? "var(--heading)" : "var(--muted)",
              background: active
                ? "color-mix(in srgb, var(--primary) 8%, transparent)"
                : undefined,
            }}>
            {active && (
              <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-full
                bg-[var(--primary)]" />
            )}
            <Icon className={`w-4 h-4 shrink-0 ${active ? "text-[var(--heading)]" : "text-[var(--disabled)]"}`} />
            <span className="leading-5">{label}</span>
          </Link>
        );
      })}
    </nav>
  );

  /* ── Shared sidebar content ── */
  const SidebarContent = ({ showClose = false }: { showClose?: boolean }) => (
    <>
      <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--border)]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center shadow-sm
            bg-[var(--primary)]">
            <Boxes className="w-5 h-5 text-[var(--primary-fg)]" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-semibold text-sm tracking-tight text-[var(--heading)]">ÉLOITE</span>
            <span className="text-[11px] text-[var(--muted)]">Business Intelligence</span>
          </div>
        </div>
        {showClose && (
          <button onClick={close}
            className="w-8 h-8 rounded-lg flex items-center justify-center
              bg-[var(--surface-2)] hover:bg-[var(--surface-3)] transition-colors">
            <X className="w-4 h-4 text-[var(--muted)]" />
          </button>
        )}
      </div>

      <NavList />

      {/* AI Copilot CTA */}
      <div className="mx-3 mb-4 rounded-xl p-4 flex flex-col gap-2 border border-[var(--border)]"
        style={{ background: "color-mix(in srgb, var(--primary) 4%, transparent)" }}>
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[var(--heading)]" />
          <span className="font-semibold text-xs text-[var(--heading)]">AI Copilot</span>
        </div>
        <p className="text-[11px] text-[var(--muted)] leading-relaxed">
          Ask anything about your business health.
        </p>
        <button className="mt-1 h-8 w-full rounded-xl text-xs font-medium transition-colors
          hover:opacity-90 bg-[var(--primary)] text-[var(--primary-fg)]">
          Open Assistant
        </button>
      </div>
    </>
  );

  return (
    <div className="flex min-h-screen" style={{ background: "var(--bg)" }}>

      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={close} />
      )}

      {/* Mobile drawer */}
      <aside className="fixed inset-y-0 left-0 z-50 flex flex-col w-72 shrink-0
          border-r border-[var(--border)] transition-transform duration-250 ease-in-out lg:hidden"
        style={{
          background: "var(--sidebar-bg)",
          transform: sidebarOpen ? "translateX(0)" : "translateX(-100%)",
        }}>
        <SidebarContent showClose />
      </aside>

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-64 shrink-0 min-h-screen
          border-r border-[var(--border)] transition-colors"
        style={{ background: "var(--sidebar-bg)" }}>
        <SidebarContent />
      </aside>

      {/* Main column */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">

        {/* Header */}
        <header className="sticky top-0 z-30 flex items-center gap-2 sm:gap-4
            px-4 sm:px-8 h-16 backdrop-blur-sm border-b border-[var(--border)]"
          style={{ background: "color-mix(in srgb, var(--surface) 95%, transparent)" }}>

          {/* Hamburger */}
          <button onClick={() => setSidebarOpen(true)}
            className="lg:hidden w-9 h-9 rounded-xl flex items-center justify-center
              bg-[var(--surface-2)] border border-[var(--border)]
              hover:bg-[var(--surface-3)] text-[var(--muted)]"
            aria-label="Open menu">
            <Menu className="w-4 h-4" />
          </button>

          {/* Search — desktop */}
          <div className="relative flex-1 max-w-md hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4
              text-[var(--neutral)]" />
            <input className="w-full h-10 pl-9 pr-10 rounded-xl text-sm outline-none
                transition-all bg-[var(--surface-2)] border border-transparent
                text-[var(--body)] placeholder:text-[var(--disabled)]
                focus:ring-2 focus:ring-[var(--primary)]/10 focus:border-[var(--border)]"
              placeholder="Search or ask AI…" />
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-medium
              px-1.5 py-0.5 rounded border border-[var(--border)]
              bg-[var(--surface)] text-[var(--muted)]">⌘K</kbd>
          </div>

          {/* Search icon — mobile */}
          <button className="sm:hidden w-9 h-9 rounded-xl flex items-center justify-center
            bg-[var(--surface-2)] border border-[var(--border)] text-[var(--muted)]">
            <Search className="w-4 h-4" />
          </button>

          {/* Right actions */}
          <div className="flex items-center gap-1.5 sm:gap-2 ml-auto">

            {/* AI Assistant */}
            <button className="hidden sm:flex items-center gap-2 h-10 px-4 rounded-xl text-sm
              font-medium transition-colors shadow-sm hover:opacity-90
              bg-[var(--primary)] text-[var(--primary-fg)]">
              <Sparkles className="w-4 h-4" />
              <span className="hidden md:block">AI Assistant</span>
            </button>

            <ThemeToggle />

            {/* Notifications */}
            <button className="relative w-9 h-9 rounded-xl flex items-center justify-center
              bg-[var(--surface-2)] border border-[var(--border)]
              hover:bg-[var(--surface-3)] text-[var(--body)]">
              <Bell className="w-4 h-4" />
              <span className="absolute right-2 top-2 w-2 h-2 rounded-full bg-[#DC2626]" />
            </button>

            {/* Avatar + profile dropdown */}
            <div className="relative">
              <button
                onClick={() => setProfileOpen(o => !o)}
                className="flex items-center gap-2 h-10 px-2 sm:px-3 rounded-xl transition-colors
                  hover:bg-[var(--surface-2)] border border-transparent
                  hover:border-[var(--border)]"
              >
                {/* Avatar */}
                {avatarUrl ? (
                  <img src={avatarUrl} alt={displayName}
                    className="w-7 h-7 rounded-full object-cover" />
                ) : (
                  <div className="w-7 h-7 rounded-full flex items-center justify-center
                    text-white text-xs font-semibold shrink-0"
                    style={{ background: "linear-gradient(135deg,#374151,#6B7280)" }}>
                    {initials}
                  </div>
                )}
                <span className="hidden md:block text-sm font-medium max-w-[120px] truncate"
                  style={{ color: "var(--heading)" }}>
                  {displayName}
                </span>
                <ChevronDown className="hidden md:block w-3.5 h-3.5 text-[var(--muted)]" />
              </button>

              {/* Dropdown */}
              {profileOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setProfileOpen(false)} />
                  <div className="absolute right-0 top-12 z-20 w-56 rounded-[16px] border
                    border-[var(--border)] shadow-[0_8px_32px_-8px_rgba(0,0,0,0.16)] p-1.5"
                    style={{ background: "var(--surface)" }}>

                    {/* User info */}
                    <div className="px-3 py-2.5 mb-1 border-b border-[var(--border)]">
                      <p className="text-sm font-semibold truncate" style={{ color: "var(--heading)" }}>
                        {displayName}
                      </p>
                      <p className="text-xs truncate mt-0.5" style={{ color: "var(--muted)" }}>
                        {user?.email}
                      </p>
                    </div>

                    <Link href="/settings"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm
                        font-medium transition-colors hover:bg-[var(--surface-2)]"
                      style={{ color: "var(--body)" }}>
                      <Settings className="w-4 h-4" />
                      Settings
                    </Link>

                    <button onClick={() => { setProfileOpen(false); handleLogout(); }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm
                        font-medium transition-colors hover:bg-[#DC2626]/08 text-[#DC2626]">
                      <LogOut className="w-4 h-4" />
                      Sign out
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
