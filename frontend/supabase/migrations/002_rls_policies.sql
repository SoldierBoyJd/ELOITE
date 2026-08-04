-- ============================================================
-- ÉLOITE — Row Level Security  (v2 — clean rewrite)
-- ============================================================
-- Run this AFTER 001_initial_schema.sql
-- ============================================================

-- ── Enable RLS on all tables ───────────────────────────────
ALTER TABLE companies              ENABLE ROW LEVEL SECURITY;
ALTER TABLE users                  ENABLE ROW LEVEL SECURITY;
ALTER TABLE warehouses             ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories             ENABLE ROW LEVEL SECURITY;
ALTER TABLE products               ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory              ENABLE ROW LEVEL SECURITY;
ALTER TABLE stock_movements        ENABLE ROW LEVEL SECURITY;
ALTER TABLE suppliers              ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers              ENABLE ROW LEVEL SECURITY;
ALTER TABLE purchase_orders        ENABLE ROW LEVEL SECURITY;
ALTER TABLE purchase_order_items   ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices               ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoice_items          ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments               ENABLE ROW LEVEL SECURITY;
ALTER TABLE gst_records            ENABLE ROW LEVEL SECURITY;
ALTER TABLE files                  ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications          ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs             ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_alerts              ENABLE ROW LEVEL SECURITY;
ALTER TABLE demand_forecasts       ENABLE ROW LEVEL SECURITY;
ALTER TABLE duplicate_invoice_checks ENABLE ROW LEVEL SECURITY;

-- ── Drop all existing policies to start fresh ──────────────
DO $$
DECLARE r RECORD;
BEGIN
  FOR r IN (
    SELECT schemaname, tablename, policyname
    FROM pg_policies
    WHERE schemaname = 'public'
  ) LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON %I.%I',
      r.policyname, r.schemaname, r.tablename);
  END LOOP;
END $$;

-- ── Helper: get caller's company_id ────────────────────────
CREATE OR REPLACE FUNCTION get_my_company_id()
RETURNS UUID
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT company_id FROM public.users WHERE supabase_uid = auth.uid() LIMIT 1;
$$;

-- ── Helper: get caller's role name ─────────────────────────
CREATE OR REPLACE FUNCTION get_my_role()
RETURNS TEXT
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT r.name
  FROM public.users u
  JOIN public.roles r ON r.id = u.role_id
  WHERE u.supabase_uid = auth.uid()
  LIMIT 1;
$$;

-- ============================================================
-- COMPANIES
-- ── SELECT: own company only
-- ── INSERT: allowed (trigger needs this)
-- ── UPDATE: owner only
-- ============================================================
CREATE POLICY "companies_select" ON companies
  FOR SELECT USING (id = get_my_company_id());

CREATE POLICY "companies_insert" ON companies
  FOR INSERT WITH CHECK (true);  -- trigger inserts on behalf of new user

CREATE POLICY "companies_update" ON companies
  FOR UPDATE USING (id = get_my_company_id() AND get_my_role() IN ('owner', 'admin'));

-- ============================================================
-- USERS
-- ── SELECT: same company
-- ── INSERT: allowed (trigger needs this)
-- ── UPDATE: own row or owner/admin
-- ============================================================
CREATE POLICY "users_select" ON users
  FOR SELECT USING (company_id = get_my_company_id());

CREATE POLICY "users_insert" ON users
  FOR INSERT WITH CHECK (true);  -- trigger inserts on signup

CREATE POLICY "users_update_self" ON users
  FOR UPDATE USING (supabase_uid = auth.uid());

CREATE POLICY "users_update_admin" ON users
  FOR UPDATE USING (
    company_id = get_my_company_id()
    AND get_my_role() IN ('owner', 'admin')
  );

-- ============================================================
-- Macro: standard company-scoped policies for most tables
-- ============================================================

-- WAREHOUSES
CREATE POLICY "warehouses_select" ON warehouses FOR SELECT USING (company_id = get_my_company_id());
CREATE POLICY "warehouses_write"  ON warehouses FOR ALL    USING (company_id = get_my_company_id() AND get_my_role() IN ('owner','admin','inventory_manager'));

-- CATEGORIES
CREATE POLICY "categories_select" ON categories FOR SELECT USING (company_id = get_my_company_id());
CREATE POLICY "categories_write"  ON categories FOR ALL    USING (company_id = get_my_company_id() AND get_my_role() IN ('owner','admin','inventory_manager'));

-- PRODUCTS
CREATE POLICY "products_select" ON products FOR SELECT USING (company_id = get_my_company_id());
CREATE POLICY "products_write"  ON products FOR ALL    USING (company_id = get_my_company_id() AND get_my_role() IN ('owner','admin','inventory_manager'));

-- INVENTORY
CREATE POLICY "inventory_select" ON inventory
  FOR SELECT USING (
    warehouse_id IN (SELECT id FROM warehouses WHERE company_id = get_my_company_id())
  );
CREATE POLICY "inventory_write" ON inventory
  FOR ALL USING (
    warehouse_id IN (SELECT id FROM warehouses WHERE company_id = get_my_company_id())
    AND get_my_role() IN ('owner','admin','inventory_manager','warehouse_staff')
  );

-- STOCK MOVEMENTS
CREATE POLICY "stock_select" ON stock_movements FOR SELECT USING (company_id = get_my_company_id());
CREATE POLICY "stock_insert" ON stock_movements FOR INSERT WITH CHECK (
  company_id = get_my_company_id()
  AND get_my_role() IN ('owner','admin','inventory_manager','warehouse_staff')
);

-- SUPPLIERS
CREATE POLICY "suppliers_select" ON suppliers FOR SELECT USING (company_id = get_my_company_id());
CREATE POLICY "suppliers_write"  ON suppliers FOR ALL    USING (company_id = get_my_company_id() AND get_my_role() IN ('owner','admin','inventory_manager','finance_manager'));

-- CUSTOMERS
CREATE POLICY "customers_select" ON customers FOR SELECT USING (company_id = get_my_company_id());
CREATE POLICY "customers_write"  ON customers FOR ALL    USING (company_id = get_my_company_id() AND get_my_role() IN ('owner','admin','sales_manager','finance_manager'));

-- PURCHASE ORDERS
CREATE POLICY "po_select" ON purchase_orders FOR SELECT USING (company_id = get_my_company_id());
CREATE POLICY "po_write"  ON purchase_orders FOR ALL    USING (company_id = get_my_company_id() AND get_my_role() IN ('owner','admin','inventory_manager'));

CREATE POLICY "poi_select" ON purchase_order_items
  FOR SELECT USING (purchase_order_id IN (SELECT id FROM purchase_orders WHERE company_id = get_my_company_id()));
CREATE POLICY "poi_write" ON purchase_order_items
  FOR ALL USING (
    purchase_order_id IN (SELECT id FROM purchase_orders WHERE company_id = get_my_company_id())
    AND get_my_role() IN ('owner','admin','inventory_manager')
  );

-- INVOICES
CREATE POLICY "invoices_select" ON invoices FOR SELECT USING (company_id = get_my_company_id());
CREATE POLICY "invoices_write"  ON invoices FOR ALL    USING (company_id = get_my_company_id() AND get_my_role() IN ('owner','admin','finance_manager','sales_manager'));

CREATE POLICY "invoice_items_select" ON invoice_items
  FOR SELECT USING (invoice_id IN (SELECT id FROM invoices WHERE company_id = get_my_company_id()));
CREATE POLICY "invoice_items_write" ON invoice_items
  FOR ALL USING (
    invoice_id IN (SELECT id FROM invoices WHERE company_id = get_my_company_id())
    AND get_my_role() IN ('owner','admin','finance_manager','sales_manager')
  );

-- PAYMENTS
CREATE POLICY "payments_select" ON payments FOR SELECT USING (company_id = get_my_company_id());
CREATE POLICY "payments_write"  ON payments FOR ALL    USING (company_id = get_my_company_id() AND get_my_role() IN ('owner','admin','finance_manager'));

-- GST RECORDS
CREATE POLICY "gst_select" ON gst_records FOR SELECT USING (company_id = get_my_company_id());
CREATE POLICY "gst_write"  ON gst_records FOR ALL    USING (company_id = get_my_company_id() AND get_my_role() IN ('owner','admin','finance_manager'));

-- FILES
CREATE POLICY "files_select" ON files FOR SELECT USING (company_id = get_my_company_id());
CREATE POLICY "files_write"  ON files FOR ALL    USING (company_id = get_my_company_id());

-- NOTIFICATIONS — own rows only
CREATE POLICY "notif_own" ON notifications
  FOR ALL USING (user_id IN (SELECT id FROM users WHERE supabase_uid = auth.uid()));

-- AUDIT LOGS — read-only, company-scoped
CREATE POLICY "audit_select" ON audit_logs
  FOR SELECT USING (company_id = get_my_company_id());

-- AI TABLES
CREATE POLICY "ai_alerts_select" ON ai_alerts FOR SELECT USING (company_id = get_my_company_id());
CREATE POLICY "ai_alerts_update" ON ai_alerts FOR UPDATE USING (company_id = get_my_company_id() AND get_my_role() IN ('owner','admin'));

CREATE POLICY "forecasts_select"  ON demand_forecasts           FOR SELECT USING (company_id = get_my_company_id());
CREATE POLICY "dupes_select"      ON duplicate_invoice_checks   FOR SELECT USING (company_id = get_my_company_id());
