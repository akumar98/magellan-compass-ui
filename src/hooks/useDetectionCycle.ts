import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export type DetectionState = 
  | 'idle' 
  | 'context_analysis' 
  | 'preference_match' 
  | 'policy_alignment' 
  | 'budget_fit_check' 
  | 'generating_rewards' 
  | 'completed' 
  | 'failed' 
  | 'cancelled';

export type DetectionStep = {
  id: string;
  cycle_id: string;
  step: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  started_at?: string;
  ended_at?: string;
  details_json: any;
};

export type DetectionCycle = {
  id: string;
  employer_id: string;
  started_by: string;
  state: DetectionState;
  started_at: string;
  updated_at: string;
  completed_at?: string;
  duration_sec?: number;
  result_summary_json: any;
};

const STEP_DURATIONS = {
  context_analysis: 2000,
  preference_match: 2000,
  policy_alignment: 2000,
  budget_fit_check: 2000,
  generating_rewards: 2000,
};

const FAST_MODE_DURATIONS = {
  context_analysis: 1000,
  preference_match: 1000,
  policy_alignment: 1000,
  budget_fit_check: 1000,
  generating_rewards: 1000,
};

const STEPS_ORDER: DetectionState[] = [
  'context_analysis',
  'preference_match',
  'policy_alignment',
  'budget_fit_check',
  'generating_rewards',
];

export const useDetectionCycle = (cycleId?: string) => {
  const [cycle, setCycle] = useState<DetectionCycle | null>(null);
  const [steps, setSteps] = useState<DetectionStep[]>([]);
  const [loading, setLoading] = useState(false);
  const [fastMode, setFastMode] = useState(false);
  const { toast } = useToast();

  const durations = fastMode ? FAST_MODE_DURATIONS : STEP_DURATIONS;

  // Fetch cycle and steps
  const fetchCycle = useCallback(async () => {
    if (!cycleId) return;

    const { data: cycleData, error: cycleError } = await supabase
      .from('detection_cycles')
      .select('*')
      .eq('id', cycleId)
      .single();

    if (cycleError) {
      console.error('Error fetching cycle:', cycleError);
      return;
    }

    setCycle(cycleData as any);

    const { data: stepsData, error: stepsError } = await supabase
      .from('detection_steps')
      .select('*')
      .eq('cycle_id', cycleId)
      .order('created_at', { ascending: true });

    if (stepsError) {
      console.error('Error fetching steps:', stepsError);
      return;
    }

    setSteps((stepsData || []) as any);
  }, [cycleId]);

  useEffect(() => {
    fetchCycle();
  }, [fetchCycle]);

  // Poll for updates while cycle is running
  useEffect(() => {
    if (!cycle) return;
    
    const isRunning = STEPS_ORDER.includes(cycle.state as DetectionState);
    if (!isRunning) return;

    const interval = setInterval(() => {
      fetchCycle();
    }, 500); // Poll every 500ms for smooth updates

    return () => clearInterval(interval);
  }, [cycle, fetchCycle]);

  // Generate mock results with AI images
  const generateMockResults = async () => {
    const detections = Math.floor(Math.random() * 4) + 2; // 2-5
    const withinBudget = Math.floor(detections * 0.7);
    const needsCofund = detections - withinBudget;
    const avgCost = Math.floor(Math.random() * 200) + 500; // 500-700

    // Generate images for recommendations using edge function
    let images = [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&auto=format&fit=crop',
    ];

    try {
      const imagePrompts = [
        'A serene wellness retreat in Sedona with desert landscapes, modern spa facilities, and yoga pavilions at sunset',
        'A cozy mountain cabin weekend escape surrounded by pine forests with wooden interiors and mountain views',
        'A luxury spa resort with infinity pools, tropical gardens, and elegant massage treatment rooms',
      ];

      const { data, error } = await supabase.functions.invoke('generate-recommendation-images', {
        body: { prompts: imagePrompts },
      });

      if (!error && data?.images) {
        // Use generated images if available, fallback to defaults
        images = data.images.map((img: string | null, idx: number) => img || images[idx]);
      }
    } catch (error) {
      console.error('Error generating images:', error);
      // Use default images on error
    }

    const recommendations = Array.from({ length: detections }, (_, i) => ({
      employee_id: `emp_${i + 1}`,
      employee_name: `Employee ${i + 1}`,
      burnout_risk: 'high',
      options: [
        {
          title: 'Wellness Retreat in Sedona',
          desc: '3-day mindfulness and yoga retreat in serene desert landscape',
          cost: 640,
          company: 480,
          employee: 160,
          policy: i < withinBudget ? 'within_budget' : 'needs_cofund',
          why: 'Matches preference for wellness activities and outdoor settings with proven stress-relief benefits',
          image_url: images[0],
        },
        {
          title: 'Mountain Cabin Weekend',
          desc: '2-day nature escape in the mountains with forest trails',
          cost: 520,
          company: 390,
          employee: 130,
          policy: 'within_budget',
          why: 'Lower cost option with high stress-relief potential in peaceful natural surroundings',
          image_url: images[1],
        },
        {
          title: 'Spa Resort Experience',
          desc: '4-day luxury spa and relaxation with premium amenities',
          cost: 880,
          company: 660,
          employee: 220,
          policy: 'needs_cofund',
          why: 'Premium option for comprehensive wellness reset with world-class facilities',
          image_url: images[2],
        },
      ],
    }));

    return {
      detections,
      within_budget: withinBudget,
      needs_cofund: needsCofund,
      avg_cost: avgCost,
      confidence_score: 0.75 + Math.random() * 0.2, // 0.75-0.95
      recommendations,
      charts: {
        funding_distribution: {
          company: 0.75,
          employee: 0.25,
        },
      },
      data_points_analyzed: 1247,
      policy_rules_applied: 18,
      avg_processing_time_ms: 850,
    };
  };

  // Start a new cycle
  const startCycle = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Create cycle
      const { data: newCycle, error: cycleError } = await supabase
        .from('detection_cycles')
        .insert({
          employer_id: user.id,
          started_by: user.id,
          state: 'context_analysis',
        })
        .select()
        .single();

      if (cycleError) throw cycleError;

      setCycle(newCycle as any);

      // Create initial steps
      const stepsToCreate = STEPS_ORDER.map(step => ({
        cycle_id: newCycle.id,
        step,
        status: 'pending',
      }));

      const { error: stepsError } = await supabase
        .from('detection_steps')
        .insert(stepsToCreate);

      if (stepsError) throw stepsError;

      // Start the state machine in the background (don't await)
      runStateMachine(newCycle.id);

      // Return cycle ID immediately for navigation
      return newCycle.id;
    } catch (error: any) {
      console.error('Error starting cycle:', error);
      toast({
        title: 'Error',
        description: 'Failed to start detection cycle',
        variant: 'destructive',
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Run the state machine
  const runStateMachine = async (cycleId: string) => {
    for (let i = 0; i < STEPS_ORDER.length; i++) {
      const step = STEPS_ORDER[i];
      const duration = durations[step as keyof typeof durations];

      // Update step to in_progress
      await supabase
        .from('detection_steps')
        .update({
          status: 'in_progress',
          started_at: new Date().toISOString(),
        })
        .eq('cycle_id', cycleId)
        .eq('step', step);

      // Update cycle state
      await supabase
        .from('detection_cycles')
        .update({ state: step })
        .eq('id', cycleId);

      await fetchCycle();

      // Wait for step duration
      await new Promise(resolve => setTimeout(resolve, duration));

      // Update step to completed
      await supabase
        .from('detection_steps')
        .update({
          status: 'completed',
          ended_at: new Date().toISOString(),
        })
        .eq('cycle_id', cycleId)
        .eq('step', step);

      await fetchCycle();
    }

    // Generate results with images
    const results = await generateMockResults();

    // Update cycle to completed
    await supabase
      .from('detection_cycles')
      .update({
        state: 'completed',
        completed_at: new Date().toISOString(),
        result_summary_json: results,
        duration_sec: 10,
      })
      .eq('id', cycleId);

    await fetchCycle();

    // Create notification
    toast({
      title: 'Detection Cycle Complete',
      description: `Found ${results.detections} employees needing wellness support`,
    });
  };

  // Cancel cycle
  const cancelCycle = async () => {
    if (!cycle) return;

    await supabase
      .from('detection_cycles')
      .update({ state: 'cancelled' })
      .eq('id', cycle.id);

    await fetchCycle();

    toast({
      title: 'Cycle Cancelled',
      description: 'Detection cycle has been cancelled',
    });
  };

  // Retry cycle
  const retryCycle = async () => {
    return await startCycle();
  };

  const getStepProgress = () => {
    if (!cycle) return 0;
    const currentIndex = STEPS_ORDER.indexOf(cycle.state as DetectionState);
    if (currentIndex === -1) return cycle.state === 'completed' ? 100 : 0;
    return ((currentIndex + 1) / STEPS_ORDER.length) * 100;
  };

  return {
    cycle,
    steps,
    loading,
    fastMode,
    setFastMode,
    startCycle,
    cancelCycle,
    retryCycle,
    fetchCycle,
    getStepProgress,
    isRunning: cycle?.state && STEPS_ORDER.includes(cycle.state as DetectionState),
    isCompleted: cycle?.state === 'completed',
    isFailed: cycle?.state === 'failed',
    isCancelled: cycle?.state === 'cancelled',
  };
};
