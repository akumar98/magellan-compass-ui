-- Drop all existing policies on detection_cycles
DROP POLICY IF EXISTS "Employers can insert their own cycles" ON detection_cycles;
DROP POLICY IF EXISTS "Employers can view their own cycles" ON detection_cycles;
DROP POLICY IF EXISTS "Employers can update their own cycles" ON detection_cycles;

-- Recreate clean policies without has_role check
CREATE POLICY "Employers can view their detection cycles"
ON detection_cycles
FOR SELECT
USING (auth.uid() = employer_id OR auth.uid() = started_by);

CREATE POLICY "Employers can insert detection cycles"
ON detection_cycles
FOR INSERT
WITH CHECK (auth.uid() = employer_id AND auth.uid() = started_by);

CREATE POLICY "Employers can update detection cycles"
ON detection_cycles
FOR UPDATE
USING (auth.uid() = employer_id);