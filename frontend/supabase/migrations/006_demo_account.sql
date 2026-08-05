-- ============================================================
-- ÉLOITE — Demo Company & Seed Data Migration
-- ============================================================

DO $$
DECLARE
  cid           UUID;
  wid           UUID;
  cat_grains    UUID;
  cat_oils      UUID;
  cat_beverages UUID;
  cat_spices    UUID;
  p_rice        UUID;
  p_oil         UUID;
  p_tea         UUID;
  p_flour       UUID;
  p_turmeric    UUID;
  sup_agro      UUID;
  sup_oil       UUID;
  cust_sunrise  UUID;
  cust_apex     UUID;
  inv_1         UUID;
  inv_2         UUID;
BEGIN
  -- 1. Create or fetch Demo Company
  SELECT id INTO cid FROM companies WHERE name = 'ÉLOITE Demo Traders' LIMIT 1;
  IF cid IS NULL THEN
    INSERT INTO companies (name, gst_number, industry, currency, subscription_plan)
    VALUES ('ÉLOITE Demo Traders', '27DEMO1234F1Z9', 'Wholesale & Distribution', 'INR', 'pro')
    RETURNING id INTO cid;
  END IF;

  -- 2. Warehouse
  SELECT id INTO wid FROM warehouses WHERE company_id = cid LIMIT 1;
  IF wid IS NULL THEN
    INSERT INTO warehouses (company_id, name, location, city, state)
    VALUES (cid, 'Central Distribution Warehouse', 'Plot 45, MIDC Industrial Area', 'Mumbai', 'Maharashtra')
    RETURNING id INTO wid;
  END IF;

  -- 3. Categories
  INSERT INTO categories (company_id, name) VALUES (cid, 'Grains & Cereals') ON CONFLICT DO NOTHING;
  INSERT INTO categories (company_id, name) VALUES (cid, 'Edible Oils')       ON CONFLICT DO NOTHING;
  INSERT INTO categories (company_id, name) VALUES (cid, 'Beverages')         ON CONFLICT DO NOTHING;
  INSERT INTO categories (company_id, name) VALUES (cid, 'Spices')            ON CONFLICT DO NOTHING;

  SELECT id INTO cat_grains    FROM categories WHERE company_id = cid AND name = 'Grains & Cereals' LIMIT 1;
  SELECT id INTO cat_oils      FROM categories WHERE company_id = cid AND name = 'Edible Oils' LIMIT 1;
  SELECT id INTO cat_beverages FROM categories WHERE company_id = cid AND name = 'Beverages' LIMIT 1;
  SELECT id INTO cat_spices    FROM categories WHERE company_id = cid AND name = 'Spices' LIMIT 1;

  -- 4. Products
  INSERT INTO products (company_id, category_id, sku, name, hsn_code, gst_rate, unit, cost_price, selling_price, minimum_stock)
  VALUES (cid, cat_grains, 'GRN-001', 'Basmati Rice Premium 25kg', '1006', 5, 'bag', 720, 840, 50)
  ON CONFLICT (company_id, sku) DO UPDATE SET name = EXCLUDED.name
  RETURNING id INTO p_rice;

  INSERT INTO products (company_id, category_id, sku, name, hsn_code, gst_rate, unit, cost_price, selling_price, minimum_stock)
  VALUES (cid, cat_oils, 'OIL-001', 'Sunflower Oil Refined 15L', '1512', 5, 'can', 780, 920, 30)
  ON CONFLICT (company_id, sku) DO UPDATE SET name = EXCLUDED.name
  RETURNING id INTO p_oil;

  INSERT INTO products (company_id, category_id, sku, name, hsn_code, gst_rate, unit, cost_price, selling_price, minimum_stock)
  VALUES (cid, cat_beverages, 'BEV-001', 'Assam Orthodox Tea 5kg', '0902', 5, 'box', 480, 580, 20)
  ON CONFLICT (company_id, sku) DO UPDATE SET name = EXCLUDED.name
  RETURNING id INTO p_tea;

  INSERT INTO products (company_id, category_id, sku, name, hsn_code, gst_rate, unit, cost_price, selling_price, minimum_stock)
  VALUES (cid, cat_grains, 'GRN-002', 'Whole Wheat Flour (Atta) 50kg', '1101', 0, 'bag', 1050, 1200, 40)
  ON CONFLICT (company_id, sku) DO UPDATE SET name = EXCLUDED.name
  RETURNING id INTO p_flour;

  INSERT INTO products (company_id, category_id, sku, name, hsn_code, gst_rate, unit, cost_price, selling_price, minimum_stock)
  VALUES (cid, cat_spices, 'SPC-001', 'Organic Turmeric Powder 10kg', '0910', 5, 'bag', 1200, 1450, 15)
  ON CONFLICT (company_id, sku) DO UPDATE SET name = EXCLUDED.name
  RETURNING id INTO p_turmeric;

  -- 5. Inventory
  INSERT INTO inventory (warehouse_id, product_id, quantity) VALUES
    (wid, p_rice,  48),
    (wid, p_oil,  114),
    (wid, p_tea,  213),
    (wid, p_flour, 50),
    (wid, p_turmeric, 12)
  ON CONFLICT (warehouse_id, product_id) DO UPDATE SET quantity = EXCLUDED.quantity;

  -- 6. Suppliers & Customers
  INSERT INTO suppliers (company_id, name, gst_number, phone, email, city, state, payment_terms)
  VALUES (cid, 'Punjab Agro Traders', '03AABCP1234Q1Z5', '9876543210', 'punjab@agro.com', 'Amritsar', 'Punjab', 30)
  RETURNING id INTO sup_agro;

  INSERT INTO suppliers (company_id, name, gst_number, phone, email, city, state, payment_terms)
  VALUES (cid, 'Gujarat Oil Mills', '24AABCG5678R2Z6', '9123456780', 'gom@oils.com', 'Ahmedabad', 'Gujarat', 45)
  RETURNING id INTO sup_oil;

  INSERT INTO customers (company_id, name, gst_number, phone, email, city, state, payment_terms, credit_limit)
  VALUES (cid, 'Sunrise Wholesale Supermarket', '27AABCS9876T1Z3', '9999988888', 'sunrise@wholesale.com', 'Mumbai', 'Maharashtra', 30, 500000)
  RETURNING id INTO cust_sunrise;

  INSERT INTO customers (company_id, name, gst_number, phone, email, city, state, payment_terms, credit_limit)
  VALUES (cid, 'Apex Retail Mart', '27APEXM1122K1Z4', '9888877777', 'orders@apexmart.in', 'Pune', 'Maharashtra', 15, 300000)
  RETURNING id INTO cust_apex;

  -- 7. Sample Invoices
  INSERT INTO invoices (company_id, invoice_number, type, customer_id, invoice_date, due_date, subtotal, gst_amount, total, amount_paid, status)
  VALUES (cid, 'INV-2024-001', 'SALE', cust_sunrise, CURRENT_DATE - INTERVAL '10 days', CURRENT_DATE + INTERVAL '20 days', 42000, 2100, 44100, 44100, 'paid')
  RETURNING id INTO inv_1;

  INSERT INTO invoices (company_id, invoice_number, type, customer_id, invoice_date, due_date, subtotal, gst_amount, total, amount_paid, status)
  VALUES (cid, 'INV-2024-002', 'SALE', cust_apex, CURRENT_DATE - INTERVAL '5 days', CURRENT_DATE + INTERVAL '10 days', 27600, 1380, 28980, 10000, 'partial')
  RETURNING id INTO inv_2;

  -- 8. Payments
  INSERT INTO payments (company_id, invoice_id, amount, payment_date, mode, transaction_reference, notes)
  VALUES (cid, inv_1, 44100, CURRENT_DATE - INTERVAL '8 days', 'NEFT', 'NEFT998234', 'Full payment for INV-2024-001');

  INSERT INTO payments (company_id, invoice_id, amount, payment_date, mode, transaction_reference, notes)
  VALUES (cid, inv_2, 10000, CURRENT_DATE - INTERVAL '3 days', 'UPI', 'UPI772615', 'Advance payment for INV-2024-002');

  RAISE NOTICE 'Demo company created and seeded successfully with ID: %', cid;
END;
$$;
