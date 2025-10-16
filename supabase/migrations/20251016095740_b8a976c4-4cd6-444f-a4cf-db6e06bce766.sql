-- Add approval_status column to user_roles
ALTER TABLE public.user_roles 
ADD COLUMN IF NOT EXISTS approval_status TEXT DEFAULT 'pending' CHECK (approval_status IN ('pending', 'approved', 'rejected'));

-- Add approved_by and approved_at columns
ALTER TABLE public.user_roles 
ADD COLUMN IF NOT EXISTS approved_by UUID REFERENCES auth.users(id),
ADD COLUMN IF NOT EXISTS approved_at TIMESTAMP WITH TIME ZONE;

-- Update RLS policy to allow users to insert their own role during signup
DROP POLICY IF EXISTS "Users can insert their own role during signup" ON public.user_roles;

CREATE POLICY "Users can insert their own role during signup"
ON public.user_roles
FOR INSERT
TO authenticated
WITH CHECK (
  auth.uid() = user_id 
  AND role IN ('employee', 'employer')
);

-- Policy for users to view their own roles (already exists but let's ensure it's correct)
DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;

CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

-- Admins and managers can approve employee requests
CREATE POLICY "Admins and managers can update approval status"
ON public.user_roles
FOR UPDATE
TO authenticated
USING (
  has_role(auth.uid(), 'admin') 
  OR has_role(auth.uid(), 'employer')
)
WITH CHECK (
  has_role(auth.uid(), 'admin') 
  OR has_role(auth.uid(), 'employer')
);