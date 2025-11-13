-- Drop the problematic policy
DROP POLICY IF EXISTS "Employers can view company burnout predictions" ON burnout_predictions;

-- Create a security definer function to get user's company_id
CREATE OR REPLACE FUNCTION public.get_user_company_id(_user_id uuid)
RETURNS uuid
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = 'public'
AS $$
  SELECT company_id
  FROM public.user_roles
  WHERE user_id = _user_id
  LIMIT 1
$$;

-- Create the corrected policy using the security definer function
CREATE POLICY "Employers can view company burnout predictions"
ON burnout_predictions
FOR SELECT
USING (
  EXISTS (
    SELECT 1 
    FROM profiles p
    WHERE p.id = burnout_predictions.employee_id
    AND p.company_id = get_user_company_id(auth.uid())
  )
  AND has_role(auth.uid(), 'employer')
);