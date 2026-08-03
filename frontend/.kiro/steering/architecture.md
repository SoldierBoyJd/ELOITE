# ÉLOITE — Platform Architecture & Design Decisions

## Stack
- **Frontend:** Next.js 16 (App Router), TypeScript, Tailwind CSS v4, Recharts, Lucide React
- **Auth:** Supabase Auth (email/password + Google OAuth)
- **Database:** PostgreSQL via Supabase
- **Storage:** Supabase Storage
- **Email:** Brevo SMTP via Supabase
- **Future Backend:** FastAPI
- **Future AI:** OCR, Demand Forecasting, Anomaly Detection, LLM Insights
- **Future Jobs:** Celery + Redis

## Multi-Tenant Architecture
One database serves many companies. Every company's data is fully isolated.

```
Platform
├── Company A
│   ├── Users, Warehouses, Products, Vendors, Customers
│   ├── Inventory, Invoices, Payments, GST, AI Insights
└── Company B
    └── ...
```

## User Roles
1. **Super Admin** — Platform owner, manages all companies
2. **Company Owner** — Full access, billing, delete company
3. **Admin** — Manage users, inventory, invoices (no billing/delete)
4. **Finance Manager** — Payments, GST, invoices only
5. **Inventory Manager** — Products, warehouses, stock (no finance)
6. **Sales Manager** — Customers, sales invoices, orders
7. **Warehouse Staff** — Receive/dispatch stock, barcode scan
8. **Auditor** — Read-only access to everything

## Core Database Tables

### Auth / Tenancy
- `companies` — id, name, gst_number, pan, email, subscription_plan
- `users` — id, supabase_uid, company_id, name, role_id, status
- `roles` — id, name, description
- `permissions` — id, module, action (Read/Write/Delete)
- `role_permissions` — role_id, permission_id

### Operations
- `warehouses` — id, company_id, name, location, manager_id
- `categories` — id, company_id, name
- `products` — id, company_id, sku, barcode, name, hsn_code, gst_rate, cost_price, selling_price, minimum_stock
- `product_images` — id, product_id, url
- `inventory` — id, warehouse_id, product_id, quantity, reserved_quantity, damaged_quantity
- `stock_movements` — id, product_id, warehouse_id, type (IN/OUT/RETURN/TRANSFER/ADJUSTMENT), quantity, reference_type, performed_by

### Suppliers & Customers
- `suppliers` — id, company_id, name, gst, phone, email, payment_terms
- `customers` — id, company_id, name, gst, phone, email, credit_limit, payment_terms

### Orders & Invoices
- `purchase_orders` — id, company_id, supplier_id, po_number, status, total_amount
- `purchase_items` — id, purchase_order_id, product_id, quantity, price, gst
- `sales_orders` — id, customer_id, status, invoice_generated
- `invoices` — id, company_id, invoice_number, type (SALE/PURCHASE/RETURN), supplier_id, customer_id, subtotal, gst_amount, total, status (draft/paid/pending/overdue)
- `invoice_items` — id, invoice_id, product_id, quantity, price, gst, discount

### Finance
- `payments` — id, invoice_id, amount, payment_date, mode (UPI/Bank/Cash/Cheque), transaction_reference, status
- `gst_records` — id, invoice_id, gstin, cgst, sgst, igst, taxable_value, hsn, filing_status
- `eway_bills` — id, invoice_id, eway_number, vehicle_number, distance, valid_until, status

### AI
- `ai_predictions` — id, company_id, type (Stock/Overstock/PaymentDelay/Fraud/DuplicateInvoice), confidence, result_json
- `ai_alerts` — id, company_id, severity (LOW/MEDIUM/HIGH/CRITICAL), title, description, module, status
- `demand_forecasts` — id, product_id, predicted_quantity, prediction_date, confidence, algorithm
- `duplicate_invoice_checks` — id, invoice1, invoice2, similarity, status
- `payment_predictions` — id, customer_id, predicted_delay_days, risk_score, confidence
- `fraud_detection` — id, invoice_id, risk_score, reason, status

### System
- `notifications` — id, user_id, title, message, read, created_at
- `audit_logs` — id, company_id, user_id, module, action (Created/Updated/Deleted), old_value, new_value, ip, device, created_at
- `files` — id, company_id, entity_type (Invoice/Product/Supplier), entity_id, url, mime_type, uploaded_by

## Development Phases

### Phase 1 — MVP (Current)
- ✅ Authentication (Supabase)
- ✅ Frontend UI (all 11 pages)
- ✅ Dark mode
- ✅ Responsive design
- 🔜 Companies & multi-tenant setup
- 🔜 Users & Roles
- 🔜 Products & Warehouses
- 🔜 Inventory management
- 🔜 Suppliers & Customers
- 🔜 Invoices & Payments
- 🔜 Dashboard with real data

### Phase 2 — AI Features
- AI demand forecasting
- Overstock/stock-out prediction
- Duplicate invoice detection
- Payment risk prediction
- AI insights copilot

### Phase 3 — Compliance & Integrations
- GST validation & filing calendar
- E-Way Bill validation
- Fraud detection
- Audit logs
- Multi-warehouse transfers
- Email/WhatsApp notifications
- Tally/Zoho integrations

## JWT Flow (Future FastAPI Backend)
```
Frontend (Next.js)
    │
    ▼
Supabase Auth → JWT Access Token
    │
    ▼
FastAPI Backend → Verify JWT → Extract user + company_id
    │
    ▼
PostgreSQL (row-level security by company_id)
```

## Key Principles
- Never trust authentication on the frontend alone
- FastAPI backend must verify Supabase JWT on every protected endpoint
- Every database query must filter by company_id (row-level security)
- Audit every destructive action (delete, update financial records)
- No company should ever see another company's data
