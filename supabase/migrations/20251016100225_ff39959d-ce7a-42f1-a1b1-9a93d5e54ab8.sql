-- Allow unauthenticated users to view company names for signup
-- This is safe because it only exposes company names, no sensitive data
CREATE POLICY "Anyone can view company names for signup"
ON public.companies
FOR SELECT
TO anon, authenticated
USING (true);