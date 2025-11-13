-- Drop the existing policy
DROP POLICY IF EXISTS "Employers can view company burnout predictions" ON public.burnout_predictions;

-- Create a security definer function to check if employer can view burnout prediction
CREATE OR REPLACE FUNCTION public.employer_can_view_burnout_prediction(
  _user_id uuid,
  _employee_id uuid
)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT has_role(_user_id, 'employer'::app_role)
  AND EXISTS (
    SELECT 1 
    FROM profiles p1
    JOIN user_roles ur ON ur.user_id = _user_id AND ur.role = 'employer'::app_role
    JOIN profiles p2 ON p2.id = _employee_id
    WHERE ur.company_id = p2.company_id
  );
$$;

-- Create the new policy using the function
CREATE POLICY "Employers can view company burnout predictions" 
ON public.burnout_predictions
FOR SELECT 
USING (
  employer_can_view_burnout_prediction(auth.uid(), employee_id)
);