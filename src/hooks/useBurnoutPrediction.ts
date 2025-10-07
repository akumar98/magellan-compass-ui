import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface BurnoutPrediction {
  id: string;
  employee_id: string;
  risk_level: 'low' | 'medium' | 'high';
  risk_score: number;
  predicted_burnout_date: string | null;
  confidence_score: number | null;
  contributing_factors: string[] | null;
  recommended_intervention: string | null;
  created_at: string;
}

export function useBurnoutPrediction() {
  const [prediction, setPrediction] = useState<BurnoutPrediction | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPrediction();
  }, []);

  const loadPrediction = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('burnout_predictions')
        .select('*')
        .eq('employee_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error loading burnout prediction:', error);
        setLoading(false);
        return;
      }

      if (data) {
        setPrediction(data as BurnoutPrediction);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error loading burnout prediction:', error);
      setLoading(false);
    }
  };

  return { prediction, loading, refreshPrediction: loadPrediction };
}
