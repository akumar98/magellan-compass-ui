-- Add policy to allow employers to view all burnout predictions for their company

CREATE POLICY "Employers can view company burnout predictions"
ON burnout_predictions
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM profiles p
    INNER JOIN user_roles ur ON ur.user_id = auth.uid()
    WHERE p.id = burnout_predictions.employee_id
    AND ur.role = 'employer'
    AND ur.company_id = p.company_id
  )
);