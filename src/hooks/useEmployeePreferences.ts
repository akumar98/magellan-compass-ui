import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface EmployeePreferences {
  preferred_travel_types: string[];
  favorite_destinations: string[];
  trip_duration_preference: string;
  preferred_activities: string[];
  work_schedule: string;
  travel_restrictions: string;
  vacation_timing_preferences: string[];
  notification_channels: string[];
  opt_in_personalized_recommendations: boolean;
  free_text_preferences: string;
}

export function useEmployeePreferences() {
  const [preferences, setPreferences] = useState<EmployeePreferences | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPreferences();
  }, []);

  const loadPreferences = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('employee_preferences')
        .select('*')
        .eq('employee_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error loading preferences:', error);
        setLoading(false);
        return;
      }

      if (data) {
        setPreferences(data as EmployeePreferences);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error loading preferences:', error);
      setLoading(false);
    }
  };

  return { preferences, loading, refreshPreferences: loadPreferences };
}
