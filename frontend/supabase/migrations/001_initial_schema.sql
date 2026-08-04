-- ============================================================
-- ÉLOITE — Database Schema
-- Phase 1 MVP
-- Run in Supabase SQL Editor
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm"; -- for fuzzy search on names/SKUs

-- ============================================================
-- 1. ROLES & PERMISSIONS
-- ============================================================

CREATE TABLE IF NOT EXISTS roles (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name        TEXT NOT NULL UNIQUE,         -- owner, admin, finance_manager, inventory_manager, sales_manager, warehouse_staff, auditor
  description TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS permissions (
  id     UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  module TEXT NOT NULL,  -- inventory, invoices, payments, gst, users, reports, settings
  action TEXT NOT NULL,  -- read, write, delete
  UNIQUE(module, action)
);

CREATE TABLE IF NOT EXISTS role_permissions (
  role_id       UUID REFERENCES roles(id) ON DELETE CASCADE,
  permission_id UUID REFERENCES permissions(id) ON DELETE CASCADE,
  PRIMARY KEY (role_id, permission_id)
);

-- ============================================================
-- 2. COMPANIES (tenants)
-- ============================================================

CREATE TABLE IF NOT EXISTS companies (
  id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name                TEXT NOT NULL,
  gst_number          TEXT,
  pan                 TEXT,
  email               TEXT,
  phone               TEXT,
  address             TEXT,
  city                TEXT,
  state               TEXT,
  industry            TEXT,
  currency            TEXT NOT NULL DEFAULT 'INR',
  subscription_plan   TEXT NOT NULL DEFAULT 'free',  -- free, starter, pro, enterprise
  subscription_status TEXT NOT NULL DEFAULT 'active', -- active, paused, cancelled
  logo_url            TEXT,
  created_at          TIMESTAMPTZ DEFAULT NOW(),
  updated_at          TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 3. USERS
-- ============================================================

CREATE TABLE IF NOT EXISTS users (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  supabase_uid  UUID NOT NULL UNIQUE,  -- links to auth.users.id
  company_id    UUID REFERENCES companies(id) ON DELETE CASCADE,
  name          TEXT NOT NULL,
  email         TEXT NOT NULL,
  phone         TEXT,
  role_id       UUID REFERENCES roles(id),
  status        TEXT NOT NULL DEFAULT 'active',  -- active, inactive, suspended
  last_login    TIMESTAMPTZ,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_users_supabase_uid ON users(supabase_uid);
CREATE INDEX idx_users_company_id   ON users(company_id);

-- ============================================================
-- 4. WAREHOUSES
-- ============================================================

CREATE TABLE IF NOT EXISTS warehouses (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  name       TEXT NOT NULL,
  location   TEXT,
  city       TEXT,
  state      TEXT,
  manager_id UUID REFERENCES users(id),
  is_active  BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_warehouses_company_id ON warehouses(company_id);

-- ============================================================
-- 5. CATEGORIES & PRODUCTS
-- ============================================================

CREATE TABLE IF NOT EXISTS categories (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  name       TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS products (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id    UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  category_id   UUID REFERENCES categories(id),
  sku           TEXT,
  barcode       TEXT,
  name          TEXT NOT NULL,
  description   TEXT,
  hsn_code      TEXT,
  gst_rate      NUMERIC(5,2) DEFAULT 18,  -- percentage: 0, 5, 12, 18, 28
  unit          TEXT DEFAULT 'pcs',        -- pcs, kg, litre, box, etc.
  cost_price    NUMERIC(12,2) DEFAULT 0,
  selling_price NUMERIC(12,2) DEFAULT 0,
  minimum_stock INTEGER DEFAULT 0,
  maximum_stock INTEGER,
  image_url     TEXT,
  is_active     BOOLEAN DEFAULT TRUE,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(company_id, sku)
);

CREATE INDEX idx_products_company_id  ON products(company_id);
CREATE INDEX idx_products_sku         ON products(company_id, sku);
CREATE INDEX idx_products_name_trgm   ON products USING gin(name gin_trgm_ops);

-- ============================================================
-- 6. INVENTORY (current stock per warehouse)
-- ============================================================

CREATE TABLE IF NOT EXISTS inventory (
  id                 UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  warehouse_id       UUID NOT NULL REFERENCES warehouses(id) ON DELETE CASCADE,
  product_id         UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  quantity           INTEGER NOT NULL DEFAULT 0,
  reserved_quantity  INTEGER NOT NULL DEFAULT 0,  -- reserved for pending orders
  damaged_quantity   INTEGER NOT NULL DEFAULT 0,
  updated_at         TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(warehouse_id, product_id)
);

CREATE INDEX idx_inventory_warehouse ON inventory(warehouse_id);
CREATE INDEX idx_inventory_product   ON inventory(product_id);

-- ============================================================
-- 7. STOCK MOVEMENTS (every change is recorded)
-- ============================================================

CREATE TABLE IF NOT EXISTS stock_movements (
  id             UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id     UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  product_id     UUID NOT NULL REFERENCES products(id),
  warehouse_id   UUID NOT NULL REFERENCES warehouses(id),
  type           TEXT NOT NULL,  -- IN, OUT, RETURN, TRANSFER, ADJUSTMENT
  quantity       INTEGER NOT NULL,
  reference_type TEXT,           -- invoice, purchase_order, manual, transfer
  reference_id   UUID,           -- id of the referenced document
  notes          TEXT,
  performed_by   UUID REFERENCES users(id),
  created_at     TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_stock_movements_company  ON stock_movements(company_id);
CREATE INDEX idx_stock_movements_product  ON stock_movements(product_id);
CREATE INDEX idx_stock_movements_created  ON stock_movements(created_at DESC);

-- ============================================================
-- 8. SUPPLIERS & CUSTOMERS
-- ============================================================

CREATE TABLE IF NOT EXISTS suppliers (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id    UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  name          TEXT NOT NULL,
  gst_number    TEXT,
  phone         TEXT,
  email         TEXT,
  address       TEXT,
  city          TEXT,
  state         TEXT,
  payment_terms INTEGER DEFAULT 30,  -- days
  credit_limit  NUMERIC(12,2),
  is_active     BOOLEAN DEFAULT TRUE,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS customers (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id    UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  name          TEXT NOT NULL,
  gst_number    TEXT,
  phone         TEXT,
  email         TEXT,
  address       TEXT,
  city          TEXT,
  state         TEXT,
  payment_terms INTEGER DEFAULT 30,
  credit_limit  NUMERIC(12,2),
  is_active     BOOLEAN DEFAULT TRUE,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_suppliers_company ON suppliers(company_id);
CREATE INDEX idx_customers_company ON customers(company_id);

-- ============================================================
-- 9. PURCHASE ORDERS
-- ============================================================

CREATE TABLE IF NOT EXISTS purchase_orders (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id        UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  supplier_id       UUID NOT NULL REFERENCES suppliers(id),
  po_number         TEXT NOT NULL,
  status            TEXT NOT NULL DEFAULT 'draft',  -- draft, sent, partial, received, cancelled
  expected_delivery DATE,
  subtotal          NUMERIC(12,2) DEFAULT 0,
  gst_amount        NUMERIC(12,2) DEFAULT 0,
  total_amount      NUMERIC(12,2) DEFAULT 0,
  notes             TEXT,
  created_by        UUID REFERENCES users(id),
  created_at        TIMESTAMPTZ DEFAULT NOW(),
  updated_at        TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(company_id, po_number)
);

CREATE TABLE IF NOT EXISTS purchase_order_items (
  id                 UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  purchase_order_id  UUID NOT NULL REFERENCES purchase_orders(id) ON DELETE CASCADE,
  product_id         UUID NOT NULL REFERENCES products(id),
  quantity           INTEGER NOT NULL,
  received_quantity  INTEGER DEFAULT 0,
  unit_price         NUMERIC(12,2) NOT NULL,
  gst_rate           NUMERIC(5,2),
  gst_amount         NUMERIC(12,2),
  subtotal           NUMERIC(12,2) NOT NULL
);

-- ============================================================
-- 10. INVOICES
-- ============================================================

CREATE TABLE IF NOT EXISTS invoices (
  id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id       UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  invoice_number   TEXT NOT NULL,
  type             TEXT NOT NULL,  -- SALE, PURCHASE, RETURN, DEBIT_NOTE, CREDIT_NOTE
  supplier_id      UUID REFERENCES suppliers(id),
  customer_id      UUID REFERENCES customers(id),
  invoice_date     DATE NOT NULL DEFAULT CURRENT_DATE,
  due_date         DATE,
  subtotal         NUMERIC(12,2) DEFAULT 0,
  discount         NUMERIC(12,2) DEFAULT 0,
  gst_amount       NUMERIC(12,2) DEFAULT 0,
  total            NUMERIC(12,2) DEFAULT 0,
  amount_paid      NUMERIC(12,2) DEFAULT 0,
  status           TEXT NOT NULL DEFAULT 'draft',  -- draft, sent, paid, partial, overdue, cancelled
  eway_bill_number TEXT,
  eway_status      TEXT,
  notes            TEXT,
  created_by       UUID REFERENCES users(id),
  created_at       TIMESTAMPTZ DEFAULT NOW(),
  updated_at       TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(company_id, invoice_number)
);

CREATE TABLE IF NOT EXISTS invoice_items (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  invoice_id  UUID NOT NULL REFERENCES invoices(id) ON DELETE CASCADE,
  product_id  UUID REFERENCES products(id),
  description TEXT,
  quantity    NUMERIC(10,3) NOT NULL,
  unit_price  NUMERIC(12,2) NOT NULL,
  gst_rate    NUMERIC(5,2),
  gst_amount  NUMERIC(12,2),
  discount    NUMERIC(12,2) DEFAULT 0,
  subtotal    NUMERIC(12,2) NOT NULL
);

CREATE INDEX idx_invoices_company    ON invoices(company_id);
CREATE INDEX idx_invoices_customer   ON invoices(customer_id);
CREATE INDEX idx_invoices_supplier   ON invoices(supplier_id);
CREATE INDEX idx_invoices_status     ON invoices(status);
CREATE INDEX idx_invoices_date       ON invoices(invoice_date DESC);

-- ============================================================
-- 11. PAYMENTS
-- ============================================================

CREATE TABLE IF NOT EXISTS payments (
  id                    UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id            UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  invoice_id            UUID NOT NULL REFERENCES invoices(id),
  amount                NUMERIC(12,2) NOT NULL,
  payment_date          DATE NOT NULL DEFAULT CURRENT_DATE,
  mode                  TEXT NOT NULL,  -- UPI, Bank, Cash, Cheque, NEFT, RTGS
  transaction_reference TEXT,
  bank_name             TEXT,
  cheque_number         TEXT,
  notes                 TEXT,
  status                TEXT DEFAULT 'completed',  -- completed, pending, failed, refunded
  created_by            UUID REFERENCES users(id),
  created_at            TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_payments_company  ON payments(company_id);
CREATE INDEX idx_payments_invoice  ON payments(invoice_id);

-- ============================================================
-- 12. GST RECORDS
-- ============================================================

CREATE TABLE IF NOT EXISTS gst_records (
  id             UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id     UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  invoice_id     UUID NOT NULL REFERENCES invoices(id),
  gstin          TEXT,
  hsn_code       TEXT,
  taxable_value  NUMERIC(12,2),
  cgst_rate      NUMERIC(5,2),
  sgst_rate      NUMERIC(5,2),
  igst_rate      NUMERIC(5,2),
  cgst_amount    NUMERIC(12,2),
  sgst_amount    NUMERIC(12,2),
  igst_amount    NUMERIC(12,2),
  filing_status  TEXT DEFAULT 'pending',  -- pending, filed, error
  filing_period  TEXT,                     -- e.g. "2024-01" for Jan 2024
  created_at     TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 13. FILES / ATTACHMENTS
-- ============================================================

CREATE TABLE IF NOT EXISTS files (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id  UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  entity_type TEXT NOT NULL,  -- invoice, product, supplier, customer, purchase_order
  entity_id   UUID NOT NULL,
  url         TEXT NOT NULL,
  filename    TEXT,
  mime_type   TEXT,
  size_bytes  INTEGER,
  uploaded_by UUID REFERENCES users(id),
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 14. NOTIFICATIONS
-- ============================================================

CREATE TABLE IF NOT EXISTS notifications (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  user_id    UUID REFERENCES users(id) ON DELETE CASCADE,
  title      TEXT NOT NULL,
  message    TEXT,
  type       TEXT DEFAULT 'info',  -- info, warning, danger, success
  module     TEXT,                  -- inventory, invoice, payment, gst
  entity_id  UUID,
  is_read    BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_notifications_user    ON notifications(user_id, is_read);
CREATE INDEX idx_notifications_company ON notifications(company_id);

-- ============================================================
-- 15. AUDIT LOGS (immutable — never update or delete)
-- ============================================================

CREATE TABLE IF NOT EXISTS audit_logs (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  user_id    UUID REFERENCES users(id),
  module     TEXT NOT NULL,   -- inventory, invoices, payments, gst, users, settings
  action     TEXT NOT NULL,   -- created, updated, deleted, viewed, exported
  entity_id  UUID,
  old_value  JSONB,
  new_value  JSONB,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_audit_logs_company ON audit_logs(company_id, created_at DESC);
CREATE INDEX idx_audit_logs_user    ON audit_logs(user_id);

-- ============================================================
-- 16. AI TABLES (Phase 2 — created now, populated later)
-- ============================================================

CREATE TABLE IF NOT EXISTS ai_alerts (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id  UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  severity    TEXT NOT NULL DEFAULT 'medium',  -- low, medium, high, critical
  title       TEXT NOT NULL,
  description TEXT,
  module      TEXT,      -- inventory, gst, invoice, payment
  entity_id   UUID,
  status      TEXT DEFAULT 'open',  -- open, acknowledged, resolved
  resolved_by UUID REFERENCES users(id),
  resolved_at TIMESTAMPTZ,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS demand_forecasts (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id        UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  product_id        UUID NOT NULL REFERENCES products(id),
  predicted_qty     NUMERIC(10,2),
  confidence        NUMERIC(5,2),
  prediction_date   DATE NOT NULL,
  forecast_horizon  INTEGER DEFAULT 14,  -- days ahead
  algorithm         TEXT DEFAULT 'moving_average',
  created_at        TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS duplicate_invoice_checks (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id  UUID NOT NULL REFERENCES companies(id) ON DELETE CASCADE,
  invoice_1   UUID NOT NULL REFERENCES invoices(id),
  invoice_2   UUID NOT NULL REFERENCES invoices(id),
  similarity  NUMERIC(5,2),  -- 0-100 percent
  status      TEXT DEFAULT 'pending',  -- pending, confirmed_duplicate, false_positive
  checked_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 17. UPDATED_AT TRIGGER (auto-update on any row change)
-- ============================================================

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_companies_updated_at
  BEFORE UPDATE ON companies
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_invoices_updated_at
  BEFORE UPDATE ON invoices
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_purchase_orders_updated_at
  BEFORE UPDATE ON purchase_orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
