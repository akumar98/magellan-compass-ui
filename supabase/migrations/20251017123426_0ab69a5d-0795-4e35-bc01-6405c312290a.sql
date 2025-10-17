CREATE POLICY "Employers can create companies during onboarding" 
ON public.companies 
FOR INSERT 
TO authenticated 
WITH CHECK (
  public.has_role(auth.uid(), 'employer'::app_role) OR 
  NOT EXISTS (
    SELECT 1 FROM public.user_roles 
    WHERE user_id = auth.uid()
  )
);