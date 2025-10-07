-- Create employee_preferences table for personalized AI travel rewards
CREATE TABLE IF NOT EXISTS public.employee_preferences (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  employee_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Travel Preferences
  preferred_travel_types text[] DEFAULT '{}',
  favorite_destinations text[] DEFAULT '{}',
  trip_duration_preference text,
  preferred_activities text[] DEFAULT '{}',
  
  -- Lifestyle & Schedule
  work_schedule text,
  travel_restrictions text,
  vacation_timing_preferences text[] DEFAULT '{}',
  
  -- Notification Preferences
  notification_channels text[] DEFAULT ARRAY['email', 'in_app'],
  opt_in_personalized_recommendations boolean DEFAULT true,
  
  -- Feedback & Ratings
  interests_ranking jsonb DEFAULT '{}',
  free_text_preferences text,
  
  -- Metadata
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  
  CONSTRAINT unique_employee_preferences UNIQUE(employee_id)
);

-- Enable RLS
ALTER TABLE public.employee_preferences ENABLE ROW LEVEL SECURITY;

-- Policies: Employees can view and update their own preferences
CREATE POLICY "Employees can view own preferences"
  ON public.employee_preferences
  FOR SELECT
  USING (employee_id = auth.uid());

CREATE POLICY "Employees can insert own preferences"
  ON public.employee_preferences
  FOR INSERT
  WITH CHECK (employee_id = auth.uid());

CREATE POLICY "Employees can update own preferences"
  ON public.employee_preferences
  FOR UPDATE
  USING (employee_id = auth.uid());

-- Employers can view their company's employee preferences
CREATE POLICY "Employers can view company preferences"
  ON public.employee_preferences
  FOR SELECT
  USING (
    has_role(auth.uid(), 'employer'::app_role) AND
    employee_id IN (
      SELECT id FROM public.profiles 
      WHERE company_id = get_user_company_id(auth.uid())
    )
  );

-- Admins can manage all preferences
CREATE POLICY "Admins can manage all preferences"
  ON public.employee_preferences
  FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Trigger for updated_at
CREATE TRIGGER update_employee_preferences_updated_at
  BEFORE UPDATE ON public.employee_preferences
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();