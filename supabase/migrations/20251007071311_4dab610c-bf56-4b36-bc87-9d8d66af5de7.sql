-- Update the signup trigger to automatically assign 'employee' role to new users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Insert profile
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email)
  );
  
  -- Auto-assign 'employee' role to new signups
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'employee');
  
  RETURN NEW;
END;
$$;

-- Create a demo company
INSERT INTO public.companies (name, industry, employee_count, wallet_balance, monthly_budget)
VALUES 
  ('Acme Corporation', 'Technology', 50, 50000.00, 10000.00)
ON CONFLICT DO NOTHING;