import { createClient } from "@/lib/supabase/client";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

async function getAuthHeader(): Promise<Record<string, string>> {
  const supabase = createClient();
  const { data: { session } } = await supabase.auth.getSession();
  if (session?.access_token) {
    return { Authorization: `Bearer ${session.access_token}` };
  }
  return {};
}

export async function apiFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const authHeader = await getAuthHeader();
  const url = `${API_BASE}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;

  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...authHeader,
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ detail: "API Request Failed" }));
    throw new Error(errorData.detail || `HTTP Error ${res.status}`);
  }

  return res.json() as Promise<T>;
}

// ── Backend API Endpoints ─────────────────────────────────────

// 1. Dashboard
export async function getDashboardStatsAPI() {
  return apiFetch<any>("/dashboard/stats");
}

// 2. Products
export async function getProductsAPI() {
  return apiFetch<any[]>("/products");
}

export async function createProductAPI(productData: any) {
  return apiFetch<any>("/products", {
    method: "POST",
    body: JSON.stringify(productData),
  });
}

export async function deleteProductAPI(productId: string) {
  return apiFetch<any>(`/products/${productId}`, {
    method: "DELETE",
  });
}

// 3. Invoices
export async function getInvoicesAPI() {
  return apiFetch<any[]>("/invoices");
}

export async function createInvoiceAPI(invoiceData: any) {
  return apiFetch<any>("/invoices", {
    method: "POST",
    body: JSON.stringify(invoiceData),
  });
}

// 4. Inventory
export async function getInventoryAPI() {
  return apiFetch<any[]>("/inventory");
}

export async function recordStockMovementAPI(movementData: any) {
  return apiFetch<any>("/inventory/movements", {
    method: "POST",
    body: JSON.stringify(movementData),
  });
}

export async function getEoqAPI(annualDemand = 1200, orderingCost = 250, holdingCost = 15) {
  return apiFetch<any>(`/inventory/eoq?annual_demand=${annualDemand}&ordering_cost=${orderingCost}&holding_cost=${holdingCost}`);
}

// 5. Payments
export async function getPaymentsAPI() {
  return apiFetch<any[]>("/payments");
}

export async function createPaymentAPI(paymentData: any) {
  return apiFetch<any>("/payments", {
    method: "POST",
    body: JSON.stringify(paymentData),
  });
}

// 6. Suppliers & Customers
export async function getSuppliersAPI() {
  return apiFetch<any[]>("/suppliers");
}

export async function createSupplierAPI(supplierData: any) {
  return apiFetch<any>("/suppliers", {
    method: "POST",
    body: JSON.stringify(supplierData),
  });
}

export async function getCustomersAPI() {
  return apiFetch<any[]>("/customers");
}

export async function createCustomerAPI(customerData: any) {
  return apiFetch<any>("/customers", {
    method: "POST",
    body: JSON.stringify(customerData),
  });
}

// 7. GST Compliance
export async function getGstDeadlinesAPI() {
  return apiFetch<any>("/gst/deadlines");
}

export async function validateGstinAPI(gstin: string) {
  return apiFetch<any>(`/gst/validate-gstin?gstin=${encodeURIComponent(gstin)}`);
}

// 8. AI Intelligence
export async function askAiCopilotAPI(query: string, context?: any) {
  return apiFetch<any>("/ai/copilot", {
    method: "POST",
    body: JSON.stringify({ query, context }),
  });
}

export async function getDemandForecastAPI(productId?: string, days = 14) {
  const query = productId ? `?product_id=${productId}&forecast_days=${days}` : `?forecast_days=${days}`;
  return apiFetch<any>(`/ai/predict-demand${query}`);
}

export async function checkInvoiceFraudAPI(invoiceAmount: number, historicalAmounts: number[] = [], isDuplicate = false) {
  return apiFetch<any>("/ai/fraud-check", {
    method: "POST",
    body: JSON.stringify({
      invoice_amount: invoiceAmount,
      historical_amounts: historicalAmounts,
      is_duplicate: isDuplicate,
    }),
  });
}

export async function getHealthScoreAPI() {
  return apiFetch<any>("/ai/health-score");
}
