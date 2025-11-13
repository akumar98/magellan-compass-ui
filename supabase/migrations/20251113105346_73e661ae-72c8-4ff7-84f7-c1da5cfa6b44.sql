-- Drop the duplicate policy that was just added
DROP POLICY IF EXISTS "Employers can view company burnout predictions" ON burnout_predictions;

-- Create a corrected policy that properly checks company_id
CREATE POLICY "Employers can view company burnout predictions"
ON burnout_predictions
FOR SELECT
USING (
  EXISTS (
    SELECT 1 
    FROM profiles p
    WHERE p.id = burnout_predictions.employee_id
    AND p.company_id IN (
      SELECT ur.company_id 
      FROM user_roles ur 
      WHERE ur.user_id = auth.uid() 
      AND ur.role = 'employer'
    )
  )
);