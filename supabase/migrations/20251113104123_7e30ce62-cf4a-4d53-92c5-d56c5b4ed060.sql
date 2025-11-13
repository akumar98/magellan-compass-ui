-- Final cleanup: Remove duplicate policies
DROP POLICY IF EXISTS "Employers can create detection cycles" ON detection_cycles;
DROP POLICY IF EXISTS "Employers can view their own detection cycles" ON detection_cycles;
DROP POLICY IF EXISTS "Employers can update their own detection cycles" ON detection_cycles;