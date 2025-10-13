-- Create function to check if user can access employee data
CREATE OR REPLACE FUNCTION can_access_employee_data(
  requesting_user_id UUID,
  target_employee_id UUID
)
RETURNS BOOLEAN
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT (
    -- User can access their own data
    requesting_user_id = target_employee_id
    -- Or user is admin
    OR has_role(requesting_user_id, 'admin')
    -- Or user is the employee's manager
    OR EXISTS (
      SELECT 1 FROM profiles
      WHERE id = target_employee_id
      AND manager_id = requesting_user_id
    )
  );
$$ LANGUAGE SQL STABLE;

-- Update burnout_predictions policy to restrict to managers only
DROP POLICY IF EXISTS "Employers can view company burnout predictions" ON burnout_predictions;
CREATE POLICY "Admins and managers can view relevant burnout predictions"
ON burnout_predictions FOR SELECT
USING (
  employee_id = auth.uid()
  OR has_role(auth.uid(), 'admin')
  OR EXISTS (
    SELECT 1 FROM profiles
    WHERE id = burnout_predictions.employee_id
    AND manager_id = auth.uid()
  )
);

-- Update wellness_scores policy to restrict to managers only
DROP POLICY IF EXISTS "Employers can view company wellness scores" ON wellness_scores;
CREATE POLICY "Admins and managers can view relevant wellness scores"
ON wellness_scores FOR SELECT
USING (
  employee_id = auth.uid()
  OR has_role(auth.uid(), 'admin')
  OR EXISTS (
    SELECT 1 FROM profiles
    WHERE id = wellness_scores.employee_id
    AND manager_id = auth.uid()
  )
);

-- Update profiles policy to restrict to managers only
DROP POLICY IF EXISTS "Employers can view company profiles" ON profiles;
CREATE POLICY "Admins and managers can view relevant profiles"
ON profiles FOR SELECT
USING (
  id = auth.uid()
  OR has_role(auth.uid(), 'admin')
  OR manager_id = auth.uid()
);

-- Update employee_preferences policy to restrict to managers only
DROP POLICY IF EXISTS "Employers can view company preferences" ON employee_preferences;
CREATE POLICY "Admins and managers can view relevant preferences"
ON employee_preferences FOR SELECT
USING (
  employee_id = auth.uid()
  OR has_role(auth.uid(), 'admin')
  OR EXISTS (
    SELECT 1 FROM profiles
    WHERE id = employee_preferences.employee_id
    AND manager_id = auth.uid()
  )
);