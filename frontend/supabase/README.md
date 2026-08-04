# ÉLOITE — Database Setup

## How to run migrations

Go to **Supabase Dashboard → SQL Editor** and run each file **in order**:

| Order | File | Description |
|---|---|---|
| 1 | `001_initial_schema.sql` | All tables, indexes, triggers |
| 2 | `002_rls_policies.sql` | Row Level Security — company data isolation |
| 3 | `003_seed_roles_permissions.sql` | 7 roles + all permissions seeded |
| 4 | `004_auth_hooks.sql` | Auto-creates company+user on signup |
| 5 | `005_sample_data.sql` | ⚠ Dev only — sample products/suppliers |

## Order matters
Run them strictly in order 1→5. Each file depends on the previous.

## After running migrations

1. **Sign up** at your app — the auth hook automatically creates a `companies` and `users` row
2. **Run 005** (optional) to get sample inventory data for testing the UI
3. **Verify** with: `SELECT * FROM companies;` and `SELECT * FROM users;`

## Database design

- **Multi-tenant** — every table has `company_id`, enforced by RLS
- **No user can ever see another company's data** — PostgreSQL enforces this at the database level
- **Audit logs** are append-only — no delete/update policy
- **Auth hook** (migration 004) fires on every new Supabase signup and creates the company + user record automatically

## Key tables

```
companies          — one per business (tenant)
users              — employees, linked to auth.users via supabase_uid
roles              — owner, admin, finance_manager, inventory_manager, sales_manager, warehouse_staff, auditor
permissions        — module × action (read/write/delete)
role_permissions   — which role gets which permissions

warehouses         — storage locations per company
categories         — product categories
products           — SKUs, pricing, HSN codes
inventory          — current stock per warehouse per product
stock_movements    — every stock change, immutable log

suppliers          — vendor master
customers          — buyer master
purchase_orders    — POs to suppliers
invoices           — SALE / PURCHASE / RETURN
payments           — payments against invoices
gst_records        — CGST/SGST/IGST breakdown per invoice

audit_logs         — immutable action log (who did what, when)
notifications      — per-user notification inbox
files              — invoice PDFs, product images stored in Supabase Storage

ai_alerts          — AI-generated warnings (low stock, fraud, etc.)
demand_forecasts   — predicted demand per product
duplicate_invoice_checks — AI-detected potential duplicates
```

## Useful queries

```sql
-- See all companies
SELECT id, name, industry, subscription_plan FROM companies;

-- See all users with their roles
SELECT u.name, u.email, r.name as role, c.name as company
FROM users u
JOIN roles r ON r.id = u.role_id
JOIN companies c ON c.id = u.company_id;

-- Current inventory levels
SELECT p.name, p.sku, i.quantity, w.name as warehouse
FROM inventory i
JOIN products p ON p.id = i.product_id
JOIN warehouses w ON w.id = i.warehouse_id
ORDER BY i.quantity ASC;

-- Overdue invoices
SELECT invoice_number, total, due_date, status
FROM invoices
WHERE status = 'overdue'
ORDER BY due_date ASC;
```
