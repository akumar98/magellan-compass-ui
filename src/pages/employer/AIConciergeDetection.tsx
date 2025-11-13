import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import {
  Sparkles,
  CheckCircle2,
  Clock,
  DollarSign,
  Users,
  Shield,
  FileText,
  Eye,
  Lock,
  Brain,
  Lightbulb,
  Settings,
  Gift,
  AlertTriangle,
  XCircle
} from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { useDetectionCycle } from '@/hooks/useDetectionCycle';
import { useEffect, useState } from 'react';

const AIConciergeDetection = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const cycleId = searchParams.get('cycleId');
  const [showLogs, setShowLogs] = useState(false);

  const {
    cycle,
    steps,
    loading,
    fastMode,
    setFastMode,
    cancelCycle,
    retryCycle,
    getStepProgress,
    isRunning,
    isCompleted,
    isFailed,
    isCancelled,
  } = useDetectionCycle(cycleId || undefined);

  useEffect(() => {
    if (!cycleId) {
      navigate('/employer/ai-concierge');
    }
  }, [cycleId, navigate]);

  useEffect(() => {
    if (isCompleted && cycle?.result_summary_json) {
      setTimeout(() => {
        navigate(`/employer/ai-concierge/review?cycleId=${cycle.id}`);
      }, 2000);
    }
  }, [isCompleted, cycle, navigate]);

  const getStepStatus = (stepName: string) => {
    const step = steps.find(s => s.step === stepName);
    if (!step) return 'pending';
    return step.status;
  };

  const processingSteps = [
    {
      title: 'Context Analysis',
      subtitle: 'Analyzing behavioral patterns...',
      status: getStepStatus('context_analysis'),
      icon: <Brain className="w-5 h-5" />
    },
    {
      title: 'Preference Match',
      subtitle: 'Cross-referencing employee preferences and past activity...',
      status: getStepStatus('preference_match'),
      icon: <Lightbulb className="w-5 h-5" />
    },
    {
      title: 'Policy Alignment',
      subtitle: 'Cross-checking company policy and compliance requirements...',
      status: getStepStatus('policy_alignment'),
      icon: <Shield className="w-5 h-5" />
    },
    {
      title: 'Budget Fit Check',
      subtitle: 'Computing funding split...',
      status: getStepStatus('budget_fit_check'),
      icon: <DollarSign className="w-5 h-5" />
    },
    {
      title: 'Generating Rewards',
      subtitle: 'Creating personalized reset recommendations...',
      status: getStepStatus('generating_rewards'),
      icon: <Gift className="w-5 h-5" />
    },
  ];

  const results = cycle?.result_summary_json || {};

  const fundingData = [
    { name: 'Company Funded', value: results?.charts?.funding_distribution?.company * 100 || 75, color: 'hsl(var(--primary))' },
    { name: 'Employee Co-fund', value: results?.charts?.funding_distribution?.employee * 100 || 25, color: 'hsl(var(--success))' }
  ];

  const insightCards = [
    {
      title: 'Behavioral Patterns',
      description: 'Increased late-night activity detected across all 3 employees over the past 45 days',
      color: 'border-primary'
    },
    {
      title: 'Milestone Analysis',
      description: '2 employees approaching 2-year anniversary without extended time off',
      color: 'border-warning'
    },
    {
      title: 'Workload Assessment',
      description: 'Average weekly hours exceed company baseline by 18% for selected group',
      color: 'border-destructive'
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Detection Cycle in Progress</h1>
            <p className="text-muted-foreground mt-1">AI is analyzing wellbeing and milestone signals to generate suitable resets.</p>
          </div>
          <div className="flex items-center gap-3">
            {!isCompleted && !isFailed && !isCancelled && (
              <div className="flex items-center gap-2">
                <Switch
                  id="fast-mode"
                  checked={fastMode}
                  onCheckedChange={setFastMode}
                />
                <Label htmlFor="fast-mode" className="text-sm text-muted-foreground">Fast Mode (Dev)</Label>
              </div>
            )}
            <Badge 
              variant="secondary" 
              className={`${
                isCompleted ? 'bg-success/10 text-success border-success/20' :
                isFailed || isCancelled ? 'bg-destructive/10 text-destructive border-destructive/20' :
                'bg-primary/10 text-primary border-primary/20'
              }`}
            >
              <Sparkles className="w-3 h-3 mr-1" />
              {isCompleted ? 'Completed' : isFailed ? 'Failed' : isCancelled ? 'Cancelled' : 'Processing'}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Processing Steps */}
          <div className="lg:col-span-2 space-y-6">
            {/* Processing Steps */}
            <Card>
              <CardHeader>
                <CardTitle>Processing Steps</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  {/* Connecting Line */}
                  <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-muted" />
                  
                  <div className="space-y-6">
                    {processingSteps.map((step, idx) => (
                      <div key={idx} className="relative flex items-start gap-4">
                        {/* Icon */}
                        <div className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full ${
                          step.status === 'completed' ? 'bg-success/10' :
                          step.status === 'in_progress' ? 'bg-primary/10' :
                          'bg-muted'
                        }`}>
                          {step.status === 'completed' ? (
                            <CheckCircle2 className="w-5 h-5 text-success" />
                          ) : step.status === 'in_progress' ? (
                            <div className="flex items-center justify-center">
                              {step.icon}
                              <div className="absolute w-12 h-12 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                            </div>
                          ) : (
                            <Clock className="w-5 h-5 text-muted-foreground" />
                          )}
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1 pt-2">
                          <p className="font-semibold text-sm">{step.title}</p>
                          <p className="text-sm text-muted-foreground">{step.subtitle}</p>
                          {step.status === 'completed' && (
                            <div className="flex items-center gap-1 mt-1">
                              <CheckCircle2 className="w-3 h-3 text-success" />
                              <span className="text-xs text-success">Completed</span>
                            </div>
                          )}
                          {step.status === 'in_progress' && (
                            <div className="flex items-center gap-1 mt-1">
                              <Clock className="w-3 h-3 text-primary" />
                              <span className="text-xs text-primary">In Progress</span>
                            </div>
                          )}
                          {step.status === 'pending' && (
                            <div className="flex items-center gap-1 mt-1">
                              <Clock className="w-3 h-3 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground">Pending</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* System Health */}
            <Card>
              <CardHeader>
                <CardTitle>System Health</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { name: 'AI Processing Engine', status: 'Operational', color: 'text-success' },
                    { name: 'Data Pipeline', status: 'Active', color: 'text-success' },
                    { name: 'Policy Validator', status: 'Running', color: 'text-success' },
                    { name: 'Budget Calculator', status: 'Ready', color: 'text-success' },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 rounded-lg border">
                      <span className="text-sm font-medium">{item.name}</span>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className={`w-4 h-4 ${item.color}`} />
                        <span className={`text-sm ${item.color}`}>{item.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Detection Insights */}
            <Card>
              <CardHeader>
                <CardTitle>Detection Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {insightCards.map((insight, idx) => (
                    <div key={idx} className={`p-4 rounded-lg border-l-4 bg-muted/30 ${insight.color}`}>
                      <p className="font-semibold text-sm mb-1">{insight.title}</p>
                      <p className="text-sm text-muted-foreground">{insight.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Privacy & Compliance */}
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">Privacy & Compliance</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      MagellanOne AI processes approved contextual signals only. All employee data is encrypted, anonymized where possible, 
                      and processed in accordance with GDPR, CCPA, and company privacy policies.
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Lock className="w-4 h-4" />
                        <span>End-to-End Encryption</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <FileText className="w-4 h-4" />
                        <span>GDPR Compliant</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Settings className="w-4 h-4" />
                        <span>Anonymized Processing</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Users className="w-4 h-4" />
                        <span>Consent-Based</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* What Happens Next */}
            <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
              <CardContent className="pt-6">
                <h3 className="text-lg font-semibold mb-4">What Happens Next?</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    {
                      icon: <Eye className="w-5 h-5" />,
                      title: 'Review Recommendations',
                      description: 'AI will present personalized reset options for each employee'
                    },
                    {
                      icon: <CheckCircle2 className="w-5 h-5" />,
                      title: 'Approve & Customize',
                      description: 'Make adjustments and approve recommendations that fit best'
                    },
                    {
                      icon: <Gift className="w-5 h-5" />,
                      title: 'Send to Employees',
                      description: 'Employees receive personalized reset packages with booking options'
                    },
                  ].map((item, idx) => (
                    <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                      <div className="mb-3">{item.icon}</div>
                      <h4 className="font-semibold text-sm mb-2">{item.title}</h4>
                      <p className="text-xs opacity-90">{item.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Progress Footer */}
            <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/30">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Estimated completion time: <span className="font-semibold text-foreground">45 seconds</span></span>
              </div>
              <Progress value={60} className="w-48" />
            </div>

            <p className="text-xs text-center text-muted-foreground flex items-center justify-center gap-2">
              <Shield className="w-3 h-3" />
              MagellanOne AI processes approved contextual signals only. All data handling complies with company privacy policies.
            </p>
          </div>

          {/* Right Column - AI Summary */}
          <div className="space-y-6">
            {/* AI Summary */}
            <Card className="bg-primary/5 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-primary" />
                  AI Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                    <p className="text-sm">Detected with <span className="font-semibold">3 burnout cases 91% confidence</span></p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                    <p className="text-sm"><span className="font-semibold">2 within budget</span>, 1 requires co-fund approval</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-sm">All employees meet policy compliance requirements</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-warning flex-shrink-0 mt-0.5" />
                    <p className="text-sm">Preference matching suggests for 2 employees <span className="font-semibold">wellness retreats</span></p>
                  </div>
                </div>

                {/* Funding Distribution */}
                <div className="pt-4 border-t">
                  <p className="text-sm font-semibold mb-3">Funding Distribution</p>
                  <div className="flex items-center gap-4">
                    <ResponsiveContainer width={120} height={120}>
                      <PieChart>
                        <Pie
                          data={fundingData}
                          cx="50%"
                          cy="50%"
                          innerRadius={30}
                          outerRadius={50}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {fundingData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-primary" />
                          <span className="text-sm">Company Funded</span>
                        </div>
                        <span className="text-sm font-semibold">$18,750</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-success" />
                          <span className="text-sm">Employee Co-fund</span>
                        </div>
                        <span className="text-sm font-semibold">$6,250</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-white rounded-lg">
                    <div className="text-center">
                      <div className="text-4xl font-bold mb-1">75%</div>
                      <div className="text-xs text-muted-foreground">Company Contribution</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Processing Metrics */}
            <Card>
              <CardHeader>
                <CardTitle>Processing Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Data Points Analyzed</span>
                  <span className="text-2xl font-bold">847</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Confidence Score</span>
                  <span className="text-2xl font-bold">90%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Policy Rules Applied</span>
                  <span className="text-2xl font-bold">12</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Avg. Processing Time</span>
                  <span className="text-2xl font-bold">3.2s</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AIConciergeDetection;
