-- Drop the problematic burnout predictions policy
DROP POLICY IF EXISTS "Employers can view company burnout predictions" ON burnout_predictions;

-- Create a simpler, more direct RLS policy that doesn't use the function
CREATE POLICY "Employers can view company burnout predictions"
ON burnout_predictions
FOR SELECT
USING (
  EXISTS (
    SELECT 1 
    FROM user_roles ur
    JOIN profiles p ON p.id = burnout_predictions.employee_id
    WHERE ur.user_id = auth.uid()
    AND ur.role = 'employer'
    AND ur.company_id = p.company_id
  )
);