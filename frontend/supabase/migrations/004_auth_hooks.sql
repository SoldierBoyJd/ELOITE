-- ============================================================
-- ÉLOITE — Auth Hooks  (v2 — safe & idempotent)
-- ============================================================
-- IMPORTANT: This trigger MUST NOT throw or block signup.
-- If it fails, the entire OAuth/email signup fails.
-- The EXCEPTION block ensures it always returns NEW.
-- ============================================================

-- Drop old versions first
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP TRIGGER IF EXISTS on_auth_user_updated ON auth.users;
DROP FUNCTION IF EXISTS handle_new_user()   CASCADE;
DROP FUNCTION IF EXISTS handle_user_update() CASCADE;

-- ── Trigger: fires after every new auth.users row ──────────
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_company_id  UUID;
  v_role_id     UUID;
  v_name        TEXT;
BEGIN
  -- Resolve owner role (may be NULL if migration 003 not run yet)
  SELECT id INTO v_role_id FROM public.roles WHERE name = 'owner' LIMIT 1;

  -- Resolve display name
  v_name := COALESCE(
    NULLIF(TRIM(NEW.raw_user_meta_data->>'full_name'), ''),
    SPLIT_PART(COALESCE(NEW.email, ''), '@', 1),
    'User'
  );

  -- Create the company row
  INSERT INTO public.companies (name, currency)
  VALUES (
    COALESCE(
      NULLIF(TRIM(NEW.raw_user_meta_data->>'business_name'), ''),
      v_name
    ),
    COALESCE(NULLIF(TRIM(NEW.raw_user_meta_data->>'currency'), ''), 'INR')
  )
  RETURNING id INTO v_company_id;

  -- Create the user row
  INSERT INTO public.users (supabase_uid, company_id, name, email, role_id)
  VALUES (NEW.id, v_company_id, v_name, COALESCE(NEW.email, ''), v_role_id);

  RETURN NEW;

EXCEPTION WHEN OTHERS THEN
  -- NEVER block signup — just log and continue
  RAISE WARNING '[handle_new_user] error for uid=% : % (%)', NEW.id, SQLERRM, SQLSTATE;
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ── Trigger: sync metadata changes back to public.users ────
CREATE OR REPLACE FUNCTION handle_user_update()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.users
  SET
    name  = COALESCE(NULLIF(TRIM(NEW.raw_user_meta_data->>'full_name'), ''), name),
    email = COALESCE(NEW.email, email),
    updated_at = NOW()
  WHERE supabase_uid = NEW.id;

  UPDATE public.companies
  SET
    name       = COALESCE(NULLIF(TRIM(NEW.raw_user_meta_data->>'business_name'), ''), name),
    gst_number = COALESCE(NULLIF(TRIM(NEW.raw_user_meta_data->>'gstin'),          ''), gst_number),
    industry   = COALESCE(NULLIF(TRIM(NEW.raw_user_meta_data->>'industry'),        ''), industry),
    currency   = COALESCE(NULLIF(TRIM(NEW.raw_user_meta_data->>'currency'),        ''), currency),
    updated_at = NOW()
  WHERE id = (SELECT company_id FROM public.users WHERE supabase_uid = NEW.id LIMIT 1);

  RETURN NEW;

EXCEPTION WHEN OTHERS THEN
  RAISE WARNING '[handle_user_update] error for uid=% : %', NEW.id, SQLERRM;
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_updated
  AFTER UPDATE ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_user_update();
