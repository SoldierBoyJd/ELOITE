-- ============================================================
-- ÉLOITE — Auth Hooks
-- Auto-creates a user + company record when someone signs up
-- Run AFTER 003_seed_roles_permissions.sql
-- ============================================================

-- Function: called by Supabase Auth after every new signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  new_company_id UUID;
  owner_role_id  UUID;
BEGIN
  -- Get owner role id (inserted in migration 003)
  SELECT id INTO owner_role_id FROM public.roles WHERE name = 'owner';

  -- If roles table is empty (migrations not run in order), use NULL role
  -- and log a warning — user can be assigned role later
  IF owner_role_id IS NULL THEN
    RAISE WARNING 'Owner role not found — run 003_seed_roles_permissions.sql';
  END IF;

  -- Create company from onboarding metadata (set after onboarding step)
  -- On first OAuth signup, business_name may be empty — that's OK
  INSERT INTO public.companies (name, gst_number, industry, currency)
  VALUES (
    COALESCE(
      NULLIF(TRIM(NEW.raw_user_meta_data->>'business_name'), ''),
      COALESCE(
        SPLIT_PART(NEW.email, '@', 1),
        'My Company'
      )
    ),
    NULLIF(TRIM(COALESCE(NEW.raw_user_meta_data->>'gstin', '')), ''),
    NULLIF(TRIM(COALESCE(NEW.raw_user_meta_data->>'industry', '')), ''),
    COALESCE(NULLIF(TRIM(NEW.raw_user_meta_data->>'currency'), ''), 'INR')
  )
  RETURNING id INTO new_company_id;

  -- Create user record linked to company
  INSERT INTO public.users (supabase_uid, company_id, name, email, role_id)
  VALUES (
    NEW.id,
    new_company_id,
    COALESCE(
      NULLIF(TRIM(NEW.raw_user_meta_data->>'full_name'), ''),
      SPLIT_PART(NEW.email, '@', 1)
    ),
    NEW.email,
    owner_role_id  -- may be NULL if roles not seeded, update later
  );

  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Log the error but don't block signup
    RAISE WARNING 'handle_new_user failed: % %', SQLERRM, SQLSTATE;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop and recreate trigger to ensure it's up to date
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ============================================================
-- Function: update user/company when profile metadata changes
-- ============================================================
CREATE OR REPLACE FUNCTION handle_user_update()
RETURNS TRIGGER AS $$
BEGIN
  -- Only update if relevant metadata changed
  UPDATE public.users SET
    name       = COALESCE(
                   NULLIF(TRIM(NEW.raw_user_meta_data->>'full_name'), ''),
                   name
                 ),
    email      = COALESCE(NEW.email, email),
    updated_at = NOW()
  WHERE supabase_uid = NEW.id;

  -- Update company details from onboarding metadata
  UPDATE public.companies SET
    name       = COALESCE(
                   NULLIF(TRIM(NEW.raw_user_meta_data->>'business_name'), ''),
                   name
                 ),
    gst_number = COALESCE(
                   NULLIF(TRIM(NEW.raw_user_meta_data->>'gstin'), ''),
                   gst_number
                 ),
    industry   = COALESCE(
                   NULLIF(TRIM(NEW.raw_user_meta_data->>'industry'), ''),
                   industry
                 ),
    currency   = COALESCE(
                   NULLIF(TRIM(NEW.raw_user_meta_data->>'currency'), ''),
                   currency
                 ),
    updated_at = NOW()
  WHERE id = (
    SELECT company_id FROM public.users WHERE supabase_uid = NEW.id
  );

  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    RAISE WARNING 'handle_user_update failed: % %', SQLERRM, SQLSTATE;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_updated ON auth.users;

CREATE TRIGGER on_auth_user_updated
  AFTER UPDATE ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_user_update();
