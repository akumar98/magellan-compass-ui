-- Create enum for burnout risk levels
CREATE TYPE public.burnout_risk_level AS ENUM ('low', 'medium', 'high', 'critical');

-- Create burnout_predictions table
CREATE TABLE IF NOT EXISTS public.burnout_predictions (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  employee_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Risk Assessment
  risk_level burnout_risk_level NOT NULL DEFAULT 'low',
  risk_score numeric NOT NULL CHECK (risk_score >= 0 AND risk_score <= 100),
  predicted_burnout_date date,
  confidence_score numeric CHECK (confidence_score >= 0 AND confidence_score <= 1),
  
  -- Behavioral Signals
  work_intensity_score numeric,
  engagement_score numeric,
  time_since_last_break integer, -- days
  overtime_hours numeric,
  missed_deadlines integer,
  sentiment_score numeric,
  stress_indicators jsonb DEFAULT '{}',
  
  -- AI Analysis
  ai_reasoning text,
  contributing_factors text[],
  recommended_intervention text,
  
  -- Preventive Actions
  preventive_rewards_suggested boolean DEFAULT false,
  notification_sent boolean DEFAULT false,
  manager_notified boolean DEFAULT false,
  
  -- Metadata
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  last_analyzed_at timestamp with time zone DEFAULT now(),
  
  CONSTRAINT unique_active_prediction UNIQUE(employee_id, created_at)
);

-- Create index for efficient queries
CREATE INDEX idx_burnout_predictions_employee ON public.burnout_predictions(employee_id);
CREATE INDEX idx_burnout_predictions_risk_level ON public.burnout_predictions(risk_level);
CREATE INDEX idx_burnout_predictions_date ON public.burnout_predictions(predicted_burnout_date);

-- Enable RLS
ALTER TABLE public.burnout_predictions ENABLE ROW LEVEL SECURITY;

-- Policies: Employees can view their own predictions
CREATE POLICY "Employees can view own burnout predictions"
  ON public.burnout_predictions
  FOR SELECT
  USING (employee_id = auth.uid());

-- Employers can view company predictions
CREATE POLICY "Employers can view company burnout predictions"
  ON public.burnout_predictions
  FOR SELECT
  USING (
    has_role(auth.uid(), 'employer'::app_role) AND
    employee_id IN (
      SELECT id FROM public.profiles 
      WHERE company_id = get_user_company_id(auth.uid())
    )
  );

-- Admins can manage all predictions
CREATE POLICY "Admins can manage all burnout predictions"
  ON public.burnout_predictions
  FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Trigger for updated_at
CREATE TRIGGER update_burnout_predictions_updated_at
  BEFORE UPDATE ON public.burnout_predictions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create wellness_scores table for tracking over time
CREATE TABLE IF NOT EXISTS public.wellness_scores (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  employee_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  
  overall_score numeric NOT NULL CHECK (overall_score >= 0 AND overall_score <= 100),
  work_life_balance numeric,
  engagement_level numeric,
  stress_level numeric,
  energy_level numeric,
  
  -- Data sources
  data_sources jsonb DEFAULT '{}',
  
  created_at timestamp with time zone DEFAULT now()
);

-- Create index for wellness scores
CREATE INDEX idx_wellness_scores_employee ON public.wellness_scores(employee_id);
CREATE INDEX idx_wellness_scores_date ON public.wellness_scores(created_at);

-- Enable RLS
ALTER TABLE public.wellness_scores ENABLE ROW LEVEL SECURITY;

-- Policies for wellness scores
CREATE POLICY "Employees can view own wellness scores"
  ON public.wellness_scores
  FOR SELECT
  USING (employee_id = auth.uid());

CREATE POLICY "Employers can view company wellness scores"
  ON public.wellness_scores
  FOR SELECT
  USING (
    has_role(auth.uid(), 'employer'::app_role) AND
    employee_id IN (
      SELECT id FROM public.profiles 
      WHERE company_id = get_user_company_id(auth.uid())
    )
  );

CREATE POLICY "Admins can manage all wellness scores"
  ON public.wellness_scores
  FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role));