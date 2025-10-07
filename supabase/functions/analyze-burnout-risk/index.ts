import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { employeeId } = await req.json();

    if (!employeeId) {
      return new Response(
        JSON.stringify({ error: 'Employee ID is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Analyzing burnout risk for employee:', employeeId);

    // Fetch employee data
    const { data: profile } = await supabaseClient
      .from('profiles')
      .select('*')
      .eq('id', employeeId)
      .single();

    // Fetch preferences
    const { data: preferences } = await supabaseClient
      .from('employee_preferences')
      .select('*')
      .eq('employee_id', employeeId)
      .single();

    // Fetch recent wellness scores
    const { data: wellnessHistory } = await supabaseClient
      .from('wellness_scores')
      .select('*')
      .eq('employee_id', employeeId)
      .order('created_at', { ascending: false })
      .limit(10);

    // Fetch milestones and engagement
    const { data: milestones } = await supabaseClient
      .from('milestones')
      .select('*')
      .eq('employee_id', employeeId)
      .order('created_at', { ascending: false })
      .limit(5);

    // Fetch reward history
    const { data: transactions } = await supabaseClient
      .from('wallet_transactions')
      .select('*')
      .eq('employee_id', employeeId)
      .order('created_at', { ascending: false })
      .limit(10);

    // Calculate behavioral signals
    const daysSinceLastReward = transactions && transactions.length > 0
      ? Math.floor((Date.now() - new Date(transactions[0].created_at).getTime()) / (1000 * 60 * 60 * 24))
      : 365;

    const recentWellnessScore = wellnessHistory && wellnessHistory.length > 0
      ? wellnessHistory[0].overall_score
      : 50;

    const missedMilestones = milestones?.filter(m => m.status === 'expired').length || 0;

    // Prepare data for AI analysis
    const employeeContext = {
      profile: {
        hire_date: profile?.hire_date,
        department: profile?.department,
      },
      behavioral_signals: {
        days_since_last_reward: daysSinceLastReward,
        recent_wellness_score: recentWellnessScore,
        missed_milestones: missedMilestones,
        wellness_trend: wellnessHistory?.slice(0, 5).map(w => w.overall_score) || [],
      },
      preferences: {
        preferred_travel_types: preferences?.preferred_travel_types || [],
        favorite_destinations: preferences?.favorite_destinations || [],
        work_schedule: preferences?.work_schedule,
        travel_restrictions: preferences?.travel_restrictions,
      },
    };

    // Call Lovable AI for burnout risk analysis
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    
    const systemPrompt = `You are an AI burnout risk analyzer for employee wellness. Analyze the employee's behavioral data and predict burnout risk.

Your analysis should consider:
1. Time since last break/reward (concerning if > 90 days)
2. Wellness score trends (declining scores indicate risk)
3. Missed milestones (sign of disengagement)
4. Work patterns and schedule

Provide your response in the following JSON format:
{
  "risk_level": "low" | "medium" | "high" | "critical",
  "risk_score": 0-100,
  "predicted_burnout_days": number (days until predicted burnout),
  "confidence": 0-1,
  "contributing_factors": ["factor1", "factor2"],
  "reasoning": "Brief explanation",
  "recommended_intervention": "Specific recommendation",
  "suggested_reward_types": ["type1", "type2"]
}`;

    const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { 
            role: 'user', 
            content: `Analyze this employee data for burnout risk:\n\n${JSON.stringify(employeeContext, null, 2)}`
          }
        ],
        response_format: { type: 'json_object' }
      }),
    });

    if (!aiResponse.ok) {
      throw new Error(`AI API error: ${aiResponse.status}`);
    }

    const aiData = await aiResponse.json();
    const analysis = JSON.parse(aiData.choices[0].message.content);

    console.log('AI Analysis:', analysis);

    // Calculate predicted burnout date
    const predictedDate = new Date();
    predictedDate.setDate(predictedDate.getDate() + (analysis.predicted_burnout_days || 30));

    // Save burnout prediction
    const { data: prediction, error: predictionError } = await supabaseClient
      .from('burnout_predictions')
      .insert({
        employee_id: employeeId,
        risk_level: analysis.risk_level,
        risk_score: analysis.risk_score,
        predicted_burnout_date: predictedDate.toISOString().split('T')[0],
        confidence_score: analysis.confidence,
        work_intensity_score: 70, // Mock for now
        engagement_score: recentWellnessScore,
        time_since_last_break: daysSinceLastReward,
        missed_deadlines: missedMilestones,
        ai_reasoning: analysis.reasoning,
        contributing_factors: analysis.contributing_factors,
        recommended_intervention: analysis.recommended_intervention,
        preventive_rewards_suggested: analysis.risk_score > 50,
      })
      .select()
      .single();

    if (predictionError) {
      console.error('Error saving prediction:', predictionError);
      throw predictionError;
    }

    // Create current wellness score entry
    await supabaseClient
      .from('wellness_scores')
      .insert({
        employee_id: employeeId,
        overall_score: recentWellnessScore,
        work_life_balance: 100 - analysis.risk_score,
        engagement_level: recentWellnessScore,
        stress_level: analysis.risk_score,
        energy_level: 100 - analysis.risk_score,
        data_sources: { ai_analysis: true, behavioral_signals: true },
      });

    return new Response(
      JSON.stringify({
        success: true,
        prediction,
        suggested_reward_types: analysis.suggested_reward_types,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Error in analyze-burnout-risk:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
