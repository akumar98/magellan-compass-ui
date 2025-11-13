-- Create approved_recommendations table
CREATE TABLE IF NOT EXISTS public.approved_recommendations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id UUID NOT NULL,
  cycle_id UUID REFERENCES public.detection_cycles(id) ON DELETE CASCADE,
  recommendation_data JSONB NOT NULL,
  approved_by UUID NOT NULL,
  approved_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.approved_recommendations ENABLE ROW LEVEL SECURITY;

-- Employees can view their own approved recommendations
CREATE POLICY "Employees can view their own approved recommendations"
ON public.approved_recommendations
FOR SELECT
USING (employee_id = auth.uid());

-- Employers and admins can insert approved recommendations
CREATE POLICY "Employers and admins can insert approved recommendations"
ON public.approved_recommendations
FOR INSERT
WITH CHECK (
  has_role(auth.uid(), 'employer') OR 
  has_role(auth.uid(), 'admin') OR 
  has_role(auth.uid(), 'super_admin')
);

-- Employers and admins can update approved recommendations
CREATE POLICY "Employers and admins can update approved recommendations"
ON public.approved_recommendations
FOR UPDATE
USING (
  has_role(auth.uid(), 'employer') OR 
  has_role(auth.uid(), 'admin') OR 
  has_role(auth.uid(), 'super_admin')
);

-- Employers can view company approved recommendations
CREATE POLICY "Employers can view company approved recommendations"
ON public.approved_recommendations
FOR SELECT
USING (has_role(auth.uid(), 'employer'));

-- Enable realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.approved_recommendations;

-- Add index for faster queries
CREATE INDEX idx_approved_recommendations_employee_id ON public.approved_recommendations(employee_id);
CREATE INDEX idx_approved_recommendations_status ON public.approved_recommendations(status);

-- Update trigger
CREATE TRIGGER update_approved_recommendations_updated_at
BEFORE UPDATE ON public.approved_recommendations
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();