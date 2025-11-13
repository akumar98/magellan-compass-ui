-- Drop the problematic policy
DROP POLICY IF EXISTS "Employers can view company burnout predictions" ON public.burnout_predictions;

-- Create a simpler, more direct policy using our security definer functions
CREATE POLICY "Employers can view company burnout predictions" 
ON public.burnout_predictions
FOR SELECT 
USING (
  has_role(auth.uid(), 'employer'::app_role) 
  AND EXISTS (
    SELECT 1 FROM profiles
    WHERE profiles.id = burnout_predictions.employee_id
    AND profiles.company_id = get_user_company_id(auth.uid())
  )
);