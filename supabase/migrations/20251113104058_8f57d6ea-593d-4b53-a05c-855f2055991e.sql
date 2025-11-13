-- Fix RLS policies for detection_cycles table to allow employers to create cycles

-- Drop existing policies
DROP POLICY IF EXISTS "Users can view their own detection cycles" ON detection_cycles;
DROP POLICY IF EXISTS "Users can create their own detection cycles" ON detection_cycles;
DROP POLICY IF EXISTS "Users can update their own detection cycles" ON detection_cycles;

-- Create new policies that allow employers to manage detection cycles
CREATE POLICY "Employers can view their own detection cycles"
ON detection_cycles
FOR SELECT
USING (auth.uid() = employer_id);

CREATE POLICY "Employers can create detection cycles"
ON detection_cycles
FOR INSERT
WITH CHECK (auth.uid() = employer_id AND auth.uid() = started_by);

CREATE POLICY "Employers can update their own detection cycles"
ON detection_cycles
FOR UPDATE
USING (auth.uid() = employer_id);

-- Also check detection_steps policies
DROP POLICY IF EXISTS "Users can view detection steps" ON detection_steps;
DROP POLICY IF EXISTS "Users can create detection steps" ON detection_steps;
DROP POLICY IF EXISTS "Users can update detection steps" ON detection_steps;

-- Create policies for detection_steps
CREATE POLICY "Users can view detection steps for their cycles"
ON detection_steps
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM detection_cycles
    WHERE detection_cycles.id = detection_steps.cycle_id
    AND detection_cycles.employer_id = auth.uid()
  )
);

CREATE POLICY "Users can create detection steps for their cycles"
ON detection_steps
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM detection_cycles
    WHERE detection_cycles.id = detection_steps.cycle_id
    AND detection_cycles.employer_id = auth.uid()
  )
);

CREATE POLICY "Users can update detection steps for their cycles"
ON detection_steps
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM detection_cycles
    WHERE detection_cycles.id = detection_steps.cycle_id
    AND detection_cycles.employer_id = auth.uid()
  )
);