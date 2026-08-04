-- ============================================================
-- ÉLOITE — Seed Roles & Permissions
-- ============================================================

-- ── Roles ────────────────────────────────────────────────────
INSERT INTO roles (name, description) VALUES
  ('owner',             'Company Owner — full access to everything'),
  ('admin',             'Operations Head — manage users, inventory, invoices'),
  ('finance_manager',   'Finance Manager — payments, GST, invoices, reports'),
  ('inventory_manager', 'Inventory Manager — products, warehouses, stock, POs'),
  ('sales_manager',     'Sales Manager — customers, sales invoices, orders'),
  ('warehouse_staff',   'Warehouse Staff — receive/dispatch stock, barcode scan'),
  ('auditor',           'Auditor — read-only access to everything')
ON CONFLICT (name) DO NOTHING;

-- ── Permissions ───────────────────────────────────────────────
INSERT INTO permissions (module, action) VALUES
  -- Inventory
  ('inventory',  'read'),
  ('inventory',  'write'),
  ('inventory',  'delete'),
  -- Products
  ('products',   'read'),
  ('products',   'write'),
  ('products',   'delete'),
  -- Invoices
  ('invoices',   'read'),
  ('invoices',   'write'),
  ('invoices',   'delete'),
  -- Payments
  ('payments',   'read'),
  ('payments',   'write'),
  ('payments',   'delete'),
  -- GST
  ('gst',        'read'),
  ('gst',        'write'),
  ('gst',        'delete'),
  -- Customers
  ('customers',  'read'),
  ('customers',  'write'),
  ('customers',  'delete'),
  -- Suppliers
  ('suppliers',  'read'),
  ('suppliers',  'write'),
  ('suppliers',  'delete'),
  -- Reports
  ('reports',    'read'),
  ('reports',    'export'),
  -- Users
  ('users',      'read'),
  ('users',      'write'),
  ('users',      'delete'),
  -- Settings
  ('settings',   'read'),
  ('settings',   'write'),
  -- AI
  ('ai',         'read')
ON CONFLICT (module, action) DO NOTHING;

-- ── Assign permissions to roles ───────────────────────────────

-- Owner gets everything
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id FROM roles r, permissions p
WHERE r.name = 'owner'
ON CONFLICT DO NOTHING;

-- Admin — everything except billing/delete company
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id FROM roles r, permissions p
WHERE r.name = 'admin'
  AND p.module IN ('inventory','products','invoices','payments','gst','customers','suppliers','reports','users','settings','ai')
ON CONFLICT DO NOTHING;

-- Finance Manager
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id FROM roles r, permissions p
WHERE r.name = 'finance_manager'
  AND (p.module, p.action) IN (
    ('invoices','read'),('invoices','write'),
    ('payments','read'),('payments','write'),
    ('gst','read'),('gst','write'),
    ('reports','read'),('reports','export'),
    ('customers','read'),
    ('suppliers','read'),
    ('ai','read')
  )
ON CONFLICT DO NOTHING;

-- Inventory Manager
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id FROM roles r, permissions p
WHERE r.name = 'inventory_manager'
  AND (p.module, p.action) IN (
    ('inventory','read'),('inventory','write'),
    ('products','read'),('products','write'),
    ('suppliers','read'),('suppliers','write'),
    ('reports','read'),
    ('ai','read')
  )
ON CONFLICT DO NOTHING;

-- Sales Manager
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id FROM roles r, permissions p
WHERE r.name = 'sales_manager'
  AND (p.module, p.action) IN (
    ('invoices','read'),('invoices','write'),
    ('customers','read'),('customers','write'),
    ('inventory','read'),
    ('products','read'),
    ('reports','read'),
    ('ai','read')
  )
ON CONFLICT DO NOTHING;

-- Warehouse Staff
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id FROM roles r, permissions p
WHERE r.name = 'warehouse_staff'
  AND (p.module, p.action) IN (
    ('inventory','read'),('inventory','write'),
    ('products','read')
  )
ON CONFLICT DO NOTHING;

-- Auditor — read only
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id FROM roles r, permissions p
WHERE r.name = 'auditor'
  AND p.action = 'read'
ON CONFLICT DO NOTHING;
