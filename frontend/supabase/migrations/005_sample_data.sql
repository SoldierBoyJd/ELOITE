-- ============================================================
-- ÉLOITE — Sample Data for Development/Testing
-- ⚠ DO NOT run in production
-- Run AFTER 001, 002, 003, 004
-- ============================================================

-- NOTE: Companies and users are created automatically via
-- the auth hook in 004_auth_hooks.sql when you sign up.
-- This file adds sample products/suppliers/customers to an
-- existing company for quick UI testing.
--
-- Replace 'YOUR_COMPANY_ID' with your actual company UUID
-- from: SELECT id FROM companies LIMIT 1;

DO $$
DECLARE
  cid         UUID;
  wid         UUID;
  cat_grains  UUID;
  cat_oils    UUID;
  cat_beverages UUID;
  cat_spices  UUID;
  p_rice      UUID;
  p_oil       UUID;
  p_tea       UUID;
  p_flour     UUID;
  sup_agro    UUID;
  sup_oil     UUID;
  cust_one    UUID;
BEGIN

  -- Get first company (created via signup)
  SELECT id INTO cid FROM companies LIMIT 1;
  IF cid IS NULL THEN
    RAISE NOTICE 'No company found. Sign up first, then run this script.';
    RETURN;
  END IF;

  -- ── Warehouse ──────────────────────────────────────────────
  INSERT INTO warehouses (company_id, name, location, city, state)
  VALUES (cid, 'Main Warehouse', 'Plot 12, Industrial Area', 'Mumbai', 'Maharashtra')
  RETURNING id INTO wid;

  -- ── Categories ─────────────────────────────────────────────
  INSERT INTO categories (company_id, name) VALUES (cid, 'Grains & Cereals') RETURNING id INTO cat_grains;
  INSERT INTO categories (company_id, name) VALUES (cid, 'Edible Oils')       RETURNING id INTO cat_oils;
  INSERT INTO categories (company_id, name) VALUES (cid, 'Beverages')         RETURNING id INTO cat_beverages;
  INSERT INTO categories (company_id, name) VALUES (cid, 'Spices')            RETURNING id INTO cat_spices;

  -- ── Products ───────────────────────────────────────────────
  INSERT INTO products (company_id, category_id, sku, name, hsn_code, gst_rate, unit, cost_price, selling_price, minimum_stock)
  VALUES (cid, cat_grains, 'GRN-001', 'Basmati Rice 25kg', '1006', 5, 'bag', 720, 840, 50)
  RETURNING id INTO p_rice;

  INSERT INTO products (company_id, category_id, sku, name, hsn_code, gst_rate, unit, cost_price, selling_price, minimum_stock)
  VALUES (cid, cat_oils, 'OIL-001', 'Sunflower Oil 15L', '1512', 5, 'can', 780, 920, 30)
  RETURNING id INTO p_oil;

  INSERT INTO products (company_id, category_id, sku, name, hsn_code, gst_rate, unit, cost_price, selling_price, minimum_stock)
  VALUES (cid, cat_beverages, 'BEV-001', 'Assam Tea 5kg', '0902', 5, 'box', 480, 580, 20)
  RETURNING id INTO p_tea;

  INSERT INTO products (company_id, category_id, sku, name, hsn_code, gst_rate, unit, cost_price, selling_price, minimum_stock)
  VALUES (cid, cat_grains, 'GRN-002', 'Wheat Flour 50kg', '1101', 0, 'bag', 1050, 1200, 40)
  RETURNING id INTO p_flour;

  -- ── Inventory ──────────────────────────────────────────────
  INSERT INTO inventory (warehouse_id, product_id, quantity) VALUES
    (wid, p_rice,  48),
    (wid, p_oil,  114),
    (wid, p_tea,  213),
    (wid, p_flour, 50);

  -- ── Suppliers ──────────────────────────────────────────────
  INSERT INTO suppliers (company_id, name, gst_number, phone, email, city, state, payment_terms)
  VALUES (cid, 'Punjab Agro Traders', '03AABCP1234Q1Z5', '9876543210', 'punjab@agro.com', 'Amritsar', 'Punjab', 30)
  RETURNING id INTO sup_agro;

  INSERT INTO suppliers (company_id, name, gst_number, phone, email, city, state, payment_terms)
  VALUES (cid, 'Gujarat Oil Mills', '24AABCG5678R2Z6', '9123456780', 'gom@oils.com', 'Ahmedabad', 'Gujarat', 45)
  RETURNING id INTO sup_oil;

  -- ── Customers ──────────────────────────────────────────────
  INSERT INTO customers (company_id, name, gst_number, phone, email, city, state, payment_terms, credit_limit)
  VALUES (cid, 'Sunrise Wholesale', '27AABCS9876T1Z3', '9999988888', 'sunrise@wholesale.com', 'Mumbai', 'Maharashtra', 30, 500000)
  RETURNING id INTO cust_one;

  RAISE NOTICE 'Sample data inserted for company: %', cid;
END;
$$;
