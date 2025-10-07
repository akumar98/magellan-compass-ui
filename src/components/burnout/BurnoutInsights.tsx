import { useEffect, useState } from 'react';
import { AlertTriangle, Heart, Sparkles, Calendar, TrendingDown } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface BurnoutPrediction {
  id: string;
  risk_level: 'low' | 'medium' | 'high' | 'critical';
  risk_score: number;
  predicted_burnout_date: string;
  confidence_score: number;
  ai_reasoning: string;
  contributing_factors: string[];
  recommended_intervention: string;
  preventive_rewards_suggested: boolean;
}

interface WellnessScore {
  overall_score: number;
  work_life_balance: number;
  engagement_level: number;
  stress_level: number;
  energy_level: number;
  created_at: string;
}

export function BurnoutInsights() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [prediction, setPrediction] = useState<BurnoutPrediction | null>(null);
  const [wellnessScore, setWellnessScore] = useState<WellnessScore | null>(null);
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Load latest prediction
      const { data: predictionData } = await supabase
        .from('burnout_predictions')
        .select('*')
        .eq('employee_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (predictionData) {
        setPrediction(predictionData as BurnoutPrediction);
      }

      // Load latest wellness score
      const { data: wellnessData } = await supabase
        .from('wellness_scores')
        .select('*')
        .eq('employee_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (wellnessData) {
        setWellnessScore(wellnessData as WellnessScore);
      }

    } catch (error) {
      console.error('Error loading burnout data:', error);
    } finally {
      setLoading(false);
    }
  };

  const runAnalysis = async () => {
    setAnalyzing(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase.functions.invoke('analyze-burnout-risk', {
        body: { employeeId: user.id }
      });

      if (error) throw error;

      toast({
        title: 'Analysis Complete',
        description: 'Your burnout risk assessment has been updated',
      });

      await loadData();
    } catch (error) {
      console.error('Error running analysis:', error);
      toast({
        title: 'Error',
        description: 'Failed to run burnout analysis',
        variant: 'destructive',
      });
    } finally {
      setAnalyzing(false);
    }
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low': return 'text-success';
      case 'medium': return 'text-warning';
      case 'high': return 'text-destructive';
      case 'critical': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  const getRiskBadgeVariant = (level: string) => {
    switch (level) {
      case 'low': return 'secondary';
      case 'medium': return 'default';
      case 'high': return 'destructive';
      case 'critical': return 'destructive';
      default: return 'outline';
    }
  };

  const getWellnessColor = (score: number) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-primary';
    if (score >= 40) return 'text-warning';
    return 'text-destructive';
  };

  const formatDateDistance = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const days = Math.floor((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    
    if (days < 0) return 'Immediate attention needed';
    if (days === 0) return 'Today';
    if (days === 1) return 'Tomorrow';
    if (days < 7) return `in ${days} days`;
    if (days < 30) return `in ${Math.floor(days / 7)} weeks`;
    return `in ${Math.floor(days / 30)} months`;
  };

  if (loading) {
    return (
      <Card className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-muted rounded w-3/4"></div>
          <div className="h-4 bg-muted rounded w-1/2"></div>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Wellness Score Card */}
      <Card className="p-6 gradient-primary text-primary-foreground">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-white/20 flex items-center justify-center">
              <Heart className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Wellness Score</h3>
              <p className="text-sm opacity-90">Your overall wellbeing</p>
            </div>
          </div>
          <Button variant="secondary" size="sm" onClick={runAnalysis} disabled={analyzing}>
            {analyzing ? 'Analyzing...' : 'Run Analysis'}
          </Button>
        </div>
        
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-5xl font-bold">{wellnessScore?.overall_score || 75}</span>
          <span className="text-xl opacity-80">/100</span>
        </div>

        {wellnessScore && (
          <div className="grid grid-cols-2 gap-4 mt-6">
            <div>
              <div className="text-sm opacity-80 mb-1">Work-Life Balance</div>
              <Progress value={wellnessScore.work_life_balance} className="h-2 bg-white/20" />
            </div>
            <div>
              <div className="text-sm opacity-80 mb-1">Engagement</div>
              <Progress value={wellnessScore.engagement_level} className="h-2 bg-white/20" />
            </div>
            <div>
              <div className="text-sm opacity-80 mb-1">Energy Level</div>
              <Progress value={wellnessScore.energy_level} className="h-2 bg-white/20" />
            </div>
            <div>
              <div className="text-sm opacity-80 mb-1">Stress Level</div>
              <Progress value={100 - (wellnessScore.stress_level || 0)} className="h-2 bg-white/20" />
            </div>
          </div>
        )}
      </Card>

      {/* Burnout Risk Card */}
      {prediction && (
        <Card className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${
                prediction.risk_level === 'low' ? 'bg-success/10' :
                prediction.risk_level === 'medium' ? 'bg-warning/10' :
                'bg-destructive/10'
              }`}>
                <AlertTriangle className={`h-5 w-5 ${getRiskColor(prediction.risk_level)}`} />
              </div>
              <div>
                <h3 className="text-lg font-semibold">Burnout Risk Assessment</h3>
                <p className="text-sm text-muted-foreground">AI-powered early detection</p>
              </div>
            </div>
            <Badge variant={getRiskBadgeVariant(prediction.risk_level)} className="capitalize">
              {prediction.risk_level} Risk
            </Badge>
          </div>

          <div className="space-y-4">
            {/* Risk Score */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Risk Level</span>
                <span className={`text-sm font-bold ${getRiskColor(prediction.risk_level)}`}>
                  {prediction.risk_score}%
                </span>
              </div>
              <Progress value={prediction.risk_score} className="h-2" />
            </div>

            {/* Predicted Date */}
            {prediction.predicted_burnout_date && (
              <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <div className="flex-1">
                  <div className="text-sm font-medium">Predicted Risk Window</div>
                  <div className="text-xs text-muted-foreground">
                    {formatDateDistance(prediction.predicted_burnout_date)}
                  </div>
                </div>
              </div>
            )}

            {/* AI Reasoning */}
            {prediction.ai_reasoning && (
              <div className="p-3 bg-muted rounded-lg">
                <div className="text-sm font-medium mb-1 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  AI Analysis
                </div>
                <p className="text-sm text-muted-foreground">{prediction.ai_reasoning}</p>
              </div>
            )}

            {/* Contributing Factors */}
            {prediction.contributing_factors && prediction.contributing_factors.length > 0 && (
              <div>
                <div className="text-sm font-medium mb-2 flex items-center gap-2">
                  <TrendingDown className="h-4 w-4" />
                  Contributing Factors
                </div>
                <div className="flex flex-wrap gap-2">
                  {prediction.contributing_factors.map((factor, idx) => (
                    <Badge key={idx} variant="outline" className="text-xs">
                      {factor}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Recommended Intervention */}
            {prediction.recommended_intervention && (
              <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                <div className="text-sm font-semibold mb-2 text-primary">Recommended Action</div>
                <p className="text-sm">{prediction.recommended_intervention}</p>
              </div>
            )}

            {/* Preventive Rewards CTA */}
            {prediction.preventive_rewards_suggested && (
              <Button 
                onClick={() => navigate('/rewards')}
                className="w-full"
                variant="default"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                View Preventive Travel Rewards
              </Button>
            )}
          </div>
        </Card>
      )}

      {/* No Prediction Yet */}
      {!prediction && (
        <Card className="p-6 text-center">
          <div className="flex flex-col items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Heart className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">No Burnout Analysis Yet</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Run your first burnout risk assessment to get personalized insights
              </p>
              <Button onClick={runAnalysis} disabled={analyzing}>
                {analyzing ? 'Analyzing...' : 'Run Burnout Analysis'}
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
