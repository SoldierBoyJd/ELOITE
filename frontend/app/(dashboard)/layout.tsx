import { AppShell } from "@/components/AppShell";

// Force server render on every request — never serve from cache
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <AppShell>{children}</AppShell>;
}
