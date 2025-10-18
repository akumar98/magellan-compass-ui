-- Update RLS policies to include super_admin access

-- Update companies table policies
DROP POLICY IF EXISTS "Admins can manage all companies" ON public.companies;
CREATE POLICY "Admins and super admins can manage all companies" 
ON public.companies 
FOR ALL 
USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'super_admin'));

-- Update profiles table policies
DROP POLICY IF EXISTS "Admins can manage all profiles" ON public.profiles;
CREATE POLICY "Admins and super admins can manage all profiles" 
ON public.profiles 
FOR ALL 
USING (
  id = auth.uid() 
  OR has_role(auth.uid(), 'admin') 
  OR has_role(auth.uid(), 'super_admin') 
  OR manager_id = auth.uid()
);

-- Update user_roles table policies
DROP POLICY IF EXISTS "Admins can manage all roles" ON public.user_roles;
CREATE POLICY "Admins and super admins can manage all roles" 
ON public.user_roles 
FOR ALL 
USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'super_admin'));

-- Update other admin-related policies across tables
DROP POLICY IF EXISTS "Admins can manage all milestones" ON public.milestones;
CREATE POLICY "Admins and super admins can manage all milestones" 
ON public.milestones 
FOR ALL 
USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'super_admin'));

DROP POLICY IF EXISTS "Admins can manage all packages" ON public.reward_packages;
CREATE POLICY "Admins and super admins can manage all packages" 
ON public.reward_packages 
FOR ALL 
USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'super_admin'));

DROP POLICY IF EXISTS "Admins can manage all approvals" ON public.approvals;
CREATE POLICY "Admins and super admins can manage all approvals" 
ON public.approvals 
FOR ALL 
USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'super_admin'));

DROP POLICY IF EXISTS "Admins can manage all transactions" ON public.wallet_transactions;
CREATE POLICY "Admins and super admins can manage all transactions" 
ON public.wallet_transactions 
FOR ALL 
USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'super_admin'));

DROP POLICY IF EXISTS "Admins can manage all preferences" ON public.employee_preferences;
CREATE POLICY "Admins and super admins can manage all preferences" 
ON public.employee_preferences 
FOR ALL 
USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'super_admin'));

DROP POLICY IF EXISTS "Admins can manage all burnout predictions" ON public.burnout_predictions;
CREATE POLICY "Admins and super admins can manage all burnout predictions" 
ON public.burnout_predictions 
FOR ALL 
USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'super_admin'));

DROP POLICY IF EXISTS "Admins can manage all wellness scores" ON public.wellness_scores;
CREATE POLICY "Admins and super admins can manage all wellness scores" 
ON public.wellness_scores 
FOR ALL 
USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'super_admin'));

DROP POLICY IF EXISTS "Admins can manage all events" ON public.hris_events;
CREATE POLICY "Admins and super admins can manage all events" 
ON public.hris_events 
FOR ALL 
USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'super_admin'));

DROP POLICY IF EXISTS "Admins can view all feedback" ON public.package_feedback;
CREATE POLICY "Admins and super admins can view all feedback" 
ON public.package_feedback 
FOR SELECT 
USING (has_role(auth.uid(), 'admin') OR has_role(auth.uid(), 'super_admin'));