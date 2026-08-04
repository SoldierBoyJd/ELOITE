-- ============================================================
-- ÉLOITE — Auth Hooks
-- Auto-creates a user + company record when someone signs up
-- ============================================================

-- Function: called by Supabase Auth after every new signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  new_company_id UUID;
  owner_role_id  UUID;
BEGIN
  -- Get owner role id
  SELECT id INTO owner_role_id FROM roles WHERE name = 'owner';

  -- Create company from onboarding metadata (if available)
  INSERT INTO companies (name, gst_number, industry, currency)
  VALUES (
    COALESCE(NEW.raw_user_meta_data->>'business_name', 'My Company'),
    NEW.raw_user_meta_data->>'gstin',
    NEW.raw_user_meta_data->>'industry',
    COALESCE(NEW.raw_user_meta_data->>'currency', 'INR')
  )
  RETURNING id INTO new_company_id;

  -- Create user record linked to company
  INSERT INTO users (supabase_uid, company_id, name, email, role_id)
  VALUES (
    NEW.id,
    new_company_id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    NEW.email,
    owner_role_id
  );

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger: fires after insert on auth.users
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- ============================================================
-- Function: update user record when profile is updated in Auth
-- ============================================================
CREATE OR REPLACE FUNCTION handle_user_update()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE users SET
    name       = COALESCE(NEW.raw_user_meta_data->>'full_name', name),
    email      = COALESCE(NEW.email, email),
    updated_at = NOW()
  WHERE supabase_uid = NEW.id;

  -- Update company name/gstin if onboarding data changed
  UPDATE companies SET
    name       = COALESCE(NEW.raw_user_meta_data->>'business_name', name),
    gst_number = COALESCE(NEW.raw_user_meta_data->>'gstin', gst_number),
    industry   = COALESCE(NEW.raw_user_meta_data->>'industry', industry),
    currency   = COALESCE(NEW.raw_user_meta_data->>'currency', currency),
    updated_at = NOW()
  WHERE id = (SELECT company_id FROM users WHERE supabase_uid = NEW.id);

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_updated
  AFTER UPDATE ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_user_update();
