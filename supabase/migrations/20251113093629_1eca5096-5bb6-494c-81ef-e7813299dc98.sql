-- Create detection cycles table
CREATE TABLE IF NOT EXISTS public.detection_cycles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employer_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  started_by UUID NOT NULL REFERENCES auth.users(id),
  state TEXT NOT NULL DEFAULT 'idle',
  started_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE,
  duration_sec INTEGER,
  result_summary_json JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create detection steps table
CREATE TABLE IF NOT EXISTS public.detection_steps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cycle_id UUID NOT NULL REFERENCES public.detection_cycles(id) ON DELETE CASCADE,
  step TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  started_at TIMESTAMP WITH TIME ZONE,
  ended_at TIMESTAMP WITH TIME ZONE,
  details_json JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.detection_cycles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.detection_steps ENABLE ROW LEVEL SECURITY;

-- RLS Policies for detection_cycles
CREATE POLICY "Employers can view their own cycles"
  ON public.detection_cycles
  FOR SELECT
  USING (employer_id = auth.uid() OR started_by = auth.uid());

CREATE POLICY "Employers can insert their own cycles"
  ON public.detection_cycles
  FOR INSERT
  WITH CHECK (started_by = auth.uid() AND has_role(auth.uid(), 'employer'::app_role));

CREATE POLICY "Employers can update their own cycles"
  ON public.detection_cycles
  FOR UPDATE
  USING (started_by = auth.uid());

-- RLS Policies for detection_steps
CREATE POLICY "Employers can view steps for their cycles"
  ON public.detection_steps
  FOR SELECT
  USING (
    cycle_id IN (
      SELECT id FROM public.detection_cycles 
      WHERE employer_id = auth.uid() OR started_by = auth.uid()
    )
  );

CREATE POLICY "Employers can insert steps for their cycles"
  ON public.detection_steps
  FOR INSERT
  WITH CHECK (
    cycle_id IN (
      SELECT id FROM public.detection_cycles 
      WHERE started_by = auth.uid()
    )
  );

CREATE POLICY "Employers can update steps for their cycles"
  ON public.detection_steps
  FOR UPDATE
  USING (
    cycle_id IN (
      SELECT id FROM public.detection_cycles 
      WHERE started_by = auth.uid()
    )
  );

-- Create index for performance
CREATE INDEX idx_detection_cycles_employer ON public.detection_cycles(employer_id);
CREATE INDEX idx_detection_cycles_state ON public.detection_cycles(state);
CREATE INDEX idx_detection_steps_cycle ON public.detection_steps(cycle_id);

-- Trigger to update updated_at
CREATE TRIGGER update_detection_cycles_updated_at
  BEFORE UPDATE ON public.detection_cycles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();