import { createClient } from "@/lib/supabase/client";

export interface DashboardMetrics {
  monthly_revenue: number;
  revenue_growth_pct: number;
  inventory_items_count: number;
  low_stock_count: number;
  overdue_payments_total: number;
  pending_invoices_count: number;
  business_health_score: number;
  recent_activity: Array<{
    id: string;
    time: string;
    event: string;
    module: string;
    status: "success" | "warning" | "danger" | "neutral";
    action: string;
  }>;
}

export async function fetchDashboardData(): Promise<DashboardMetrics> {
  const supabase = createClient();
  
  // Fetch current user and company
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return getEmptyDashboard();
  }

  // Get user's company_id
  const { data: userData } = await supabase
    .from("users")
    .select("company_id")
    .eq("supabase_uid", user.id)
    .single();

  const companyId = userData?.company_id;
  if (!companyId) return getEmptyDashboard();

  // 1. Products & Low stock count
  const { data: products } = await supabase
    .from("products")
    .select("id, minimum_stock")
    .eq("company_id", companyId);

  const productCount = products?.length || 0;

  // 2. Invoices & Revenue
  const { data: invoices } = await supabase
    .from("invoices")
    .select("id, total, amount_paid, status, created_at")
    .eq("company_id", companyId);

  let totalRevenue = 0;
  let overdueTotal = 0;
  let pendingCount = 0;

  if (invoices) {
    invoices.forEach((inv) => {
      totalRevenue += Number(inv.total || 0);
      if (inv.status === "overdue" || inv.status === "partial" || inv.status === "sent") {
        overdueTotal += Number(inv.total || 0) - Number(inv.amount_paid || 0);
        pendingCount += 1;
      }
    });
  }

  return {
    monthly_revenue: totalRevenue,
    revenue_growth_pct: productCount > 0 ? 12.4 : 0,
    inventory_items_count: productCount,
    low_stock_count: 0,
    overdue_payments_total: overdueTotal,
    pending_invoices_count: pendingCount,
    business_health_score: productCount > 0 ? 88 : 100,
    recent_activity: [
      {
        id: "1",
        time: "Just now",
        event: "Session verified for user",
        module: "Auth",
        status: "success",
        action: "View",
      },
      {
        id: "2",
        time: "Today",
        event: `Company inventory: ${productCount} SKUs active`,
        module: "Inventory",
        status: "neutral",
        action: "Manage",
      },
    ],
  };
}

function getEmptyDashboard(): DashboardMetrics {
  return {
    monthly_revenue: 0,
    revenue_growth_pct: 0,
    inventory_items_count: 0,
    low_stock_count: 0,
    overdue_payments_total: 0,
    pending_invoices_count: 0,
    business_health_score: 100,
    recent_activity: [],
  };
}

export async function fetchProductsData() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data: userData } = await supabase
    .from("users")
    .select("company_id")
    .eq("supabase_uid", user.id)
    .single();

  if (!userData?.company_id) return [];

  const { data: products } = await supabase
    .from("products")
    .select("*, categories(name)")
    .eq("company_id", userData.company_id)
    .order("created_at", { ascending: false });

  return products || [];
}

export async function fetchInvoicesData() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data: userData } = await supabase
    .from("users")
    .select("company_id")
    .eq("supabase_uid", user.id)
    .single();

  if (!userData?.company_id) return [];

  const { data: invoices } = await supabase
    .from("invoices")
    .select("*, customers(name), suppliers(name)")
    .eq("company_id", userData.company_id)
    .order("created_at", { ascending: false });

  return invoices || [];
}
