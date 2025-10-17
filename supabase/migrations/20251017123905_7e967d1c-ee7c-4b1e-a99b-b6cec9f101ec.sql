CREATE POLICY "Enable insert for authenticated users" ON public.companies
FOR INSERT TO authenticated
WITH CHECK (true);