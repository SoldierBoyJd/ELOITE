-- ============================================================
-- ÉLOITE — Row Level Security (RLS)
-- Every user can only see their own company's data
-- ============================================================

-- Enable RLS on all tables
ALTER TABLE companies          ENABLE ROW LEVEL SECURITY;
ALTER TABLE users              ENABLE ROW LEVEL SECURITY;
ALTER TABLE warehouses         ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories         ENABLE ROW LEVEL SECURITY;
ALTER TABLE products           ENABLE ROW LEVEL SECURITY;
ALTER TABLE inventory          ENABLE ROW LEVEL SECURITY;
ALTER TABLE stock_movements    ENABLE ROW LEVEL SECURITY;
ALTER TABLE suppliers          ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers          ENABLE ROW LEVEL SECURITY;
ALTER TABLE purchase_orders    ENABLE ROW LEVEL SECURITY;
ALTER TABLE purchase_order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices           ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoice_items      ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments           ENABLE ROW LEVEL SECURITY;
ALTER TABLE gst_records        ENABLE ROW LEVEL SECURITY;
ALTER TABLE files              ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications      ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs         ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_alerts          ENABLE ROW LEVEL SECURITY;
ALTER TABLE demand_forecasts   ENABLE ROW LEVEL SECURITY;
ALTER TABLE duplicate_invoice_checks ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- Helper function: get current user's company_id
-- ============================================================
CREATE OR REPLACE FUNCTION get_user_company_id()
RETURNS UUID AS $$
  SELECT company_id FROM users WHERE supabase_uid = auth.uid()
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- ============================================================
-- Helper function: get current user's role name
-- ============================================================
CREATE OR REPLACE FUNCTION get_user_role()
RETURNS TEXT AS $$
  SELECT r.name FROM users u
  JOIN roles r ON r.id = u.role_id
  WHERE u.supabase_uid = auth.uid()
$$ LANGUAGE SQL SECURITY DEFINER STABLE;

-- ============================================================
-- COMPANIES — user can only see their own company
-- ============================================================
CREATE POLICY "users_see_own_company" ON companies
  FOR ALL USING (id = get_user_company_id());

-- ============================================================
-- USERS — users in same company
-- ============================================================
CREATE POLICY "users_see_company_users" ON users
  FOR SELECT USING (company_id = get_user_company_id());

CREATE POLICY "users_update_own_profile" ON users
  FOR UPDATE USING (supabase_uid = auth.uid());

CREATE POLICY "owners_admins_manage_users" ON users
  FOR ALL USING (
    company_id = get_user_company_id()
    AND get_user_role() IN ('owner', 'admin')
  );

-- ============================================================
-- Standard company-scoped policy (SELECT only for all, write for owners/admins)
-- Used for: warehouses, categories, products, suppliers, customers
-- ============================================================

-- WAREHOUSES
CREATE POLICY "read_own_company" ON warehouses
  FOR SELECT USING (company_id = get_user_company_id());
CREATE POLICY "write_own_company" ON warehouses
  FOR ALL USING (
    company_id = get_user_company_id()
    AND get_user_role() IN ('owner', 'admin', 'inventory_manager')
  );

-- CATEGORIES
CREATE POLICY "read_own_company" ON categories
  FOR SELECT USING (company_id = get_user_company_id());
CREATE POLICY "write_own_company" ON categories
  FOR ALL USING (company_id = get_user_company_id() AND get_user_role() IN ('owner', 'admin', 'inventory_manager'));

-- PRODUCTS
CREATE POLICY "read_own_company" ON products
  FOR SELECT USING (company_id = get_user_company_id());
CREATE POLICY "write_own_company" ON products
  FOR ALL USING (company_id = get_user_company_id() AND get_user_role() IN ('owner', 'admin', 'inventory_manager'));

-- INVENTORY
CREATE POLICY "read_own_company" ON inventory
  FOR SELECT USING (
    warehouse_id IN (SELECT id FROM warehouses WHERE company_id = get_user_company_id())
  );
CREATE POLICY "write_own_company" ON inventory
  FOR ALL USING (
    warehouse_id IN (SELECT id FROM warehouses WHERE company_id = get_user_company_id())
    AND get_user_role() IN ('owner', 'admin', 'inventory_manager', 'warehouse_staff')
  );

-- STOCK MOVEMENTS
CREATE POLICY "read_own_company" ON stock_movements
  FOR SELECT USING (company_id = get_user_company_id());
CREATE POLICY "write_own_company" ON stock_movements
  FOR INSERT WITH CHECK (
    company_id = get_user_company_id()
    AND get_user_role() IN ('owner', 'admin', 'inventory_manager', 'warehouse_staff')
  );

-- SUPPLIERS
CREATE POLICY "read_own_company" ON suppliers
  FOR SELECT USING (company_id = get_user_company_id());
CREATE POLICY "write_own_company" ON suppliers
  FOR ALL USING (company_id = get_user_company_id() AND get_user_role() IN ('owner', 'admin', 'inventory_manager', 'finance_manager'));

-- CUSTOMERS
CREATE POLICY "read_own_company" ON customers
  FOR SELECT USING (company_id = get_user_company_id());
CREATE POLICY "write_own_company" ON customers
  FOR ALL USING (company_id = get_user_company_id() AND get_user_role() IN ('owner', 'admin', 'sales_manager', 'finance_manager'));

-- PURCHASE ORDERS
CREATE POLICY "read_own_company" ON purchase_orders
  FOR SELECT USING (company_id = get_user_company_id());
CREATE POLICY "write_own_company" ON purchase_orders
  FOR ALL USING (company_id = get_user_company_id() AND get_user_role() IN ('owner', 'admin', 'inventory_manager'));

CREATE POLICY "read_own_company" ON purchase_order_items
  FOR SELECT USING (
    purchase_order_id IN (SELECT id FROM purchase_orders WHERE company_id = get_user_company_id())
  );
CREATE POLICY "write_own_company" ON purchase_order_items
  FOR ALL USING (
    purchase_order_id IN (SELECT id FROM purchase_orders WHERE company_id = get_user_company_id())
    AND get_user_role() IN ('owner', 'admin', 'inventory_manager')
  );

-- INVOICES
CREATE POLICY "read_own_company" ON invoices
  FOR SELECT USING (company_id = get_user_company_id());
CREATE POLICY "write_own_company" ON invoices
  FOR ALL USING (
    company_id = get_user_company_id()
    AND get_user_role() IN ('owner', 'admin', 'finance_manager', 'sales_manager')
  );

CREATE POLICY "read_own_company" ON invoice_items
  FOR SELECT USING (
    invoice_id IN (SELECT id FROM invoices WHERE company_id = get_user_company_id())
  );
CREATE POLICY "write_own_company" ON invoice_items
  FOR ALL USING (
    invoice_id IN (SELECT id FROM invoices WHERE company_id = get_user_company_id())
    AND get_user_role() IN ('owner', 'admin', 'finance_manager', 'sales_manager')
  );

-- PAYMENTS
CREATE POLICY "read_own_company" ON payments
  FOR SELECT USING (company_id = get_user_company_id());
CREATE POLICY "write_own_company" ON payments
  FOR ALL USING (company_id = get_user_company_id() AND get_user_role() IN ('owner', 'admin', 'finance_manager'));

-- GST RECORDS
CREATE POLICY "read_own_company" ON gst_records
  FOR SELECT USING (company_id = get_user_company_id());
CREATE POLICY "write_own_company" ON gst_records
  FOR ALL USING (company_id = get_user_company_id() AND get_user_role() IN ('owner', 'admin', 'finance_manager'));

-- FILES
CREATE POLICY "read_own_company" ON files
  FOR SELECT USING (company_id = get_user_company_id());
CREATE POLICY "write_own_company" ON files
  FOR ALL USING (company_id = get_user_company_id());

-- NOTIFICATIONS — user sees only their own
CREATE POLICY "own_notifications" ON notifications
  FOR ALL USING (user_id IN (SELECT id FROM users WHERE supabase_uid = auth.uid()));

-- AUDIT LOGS — read-only, company-scoped
CREATE POLICY "read_own_company" ON audit_logs
  FOR SELECT USING (company_id = get_user_company_id());
-- No write policy — only server/service role can insert

-- AI TABLES
CREATE POLICY "read_own_company" ON ai_alerts
  FOR SELECT USING (company_id = get_user_company_id());
CREATE POLICY "update_own_company" ON ai_alerts
  FOR UPDATE USING (company_id = get_user_company_id() AND get_user_role() IN ('owner', 'admin'));

CREATE POLICY "read_own_company" ON demand_forecasts
  FOR SELECT USING (company_id = get_user_company_id());

CREATE POLICY "read_own_company" ON duplicate_invoice_checks
  FOR SELECT USING (company_id = get_user_company_id());
