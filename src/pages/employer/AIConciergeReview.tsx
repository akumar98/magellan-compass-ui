import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import {
  CheckCircle2,
  X,
  RefreshCw,
  Mountain,
  Utensils,
  Plane,
  Wifi,
  MapPin,
  Star,
  Shield,
  FileText,
  MessageSquare,
  BarChart3,
  Calendar,
  DollarSign,
  Users,
  AlertTriangle,
  TrendingUp,
  Activity,
  Check,
  Eye,
  BookOpen
} from 'lucide-react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useDetectionCycle } from '@/hooks/useDetectionCycle';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';

const AIConciergeReview = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const cycleId = searchParams.get('cycleId');
  const { cycle, loading } = useDetectionCycle(cycleId || undefined);
  const { toast } = useToast();
  const { user } = useAuth();
  const [approvedItems, setApprovedItems] = useState<Set<string>>(new Set());
  const [employeeProfiles, setEmployeeProfiles] = useState<Record<string, any>>({});

  useEffect(() => {
    if (!cycleId) {
      navigate('/employer/ai-concierge');
    }
  }, [cycleId, navigate]);

  useEffect(() => {
    const fetchEmployeeProfiles = async () => {
      if (!cycle?.result_summary_json?.recommendations) return;
      
      const recommendations = cycle.result_summary_json.recommendations || [];
      const employeeIds = recommendations.map((rec: any) => rec.employee_id).filter(Boolean);
      
      if (employeeIds.length === 0) return;
      
      const { data, error } = await supabase
        .from('profiles')
        .select('id, full_name, email, avatar_url')
        .in('id', employeeIds);
      
      if (error) {
        console.error('Error fetching employee profiles:', error);
        return;
      }
      
      const profilesMap = (data || []).reduce((acc: Record<string, any>, profile: any) => {
        acc[profile.id] = profile;
        return acc;
      }, {});
      
      setEmployeeProfiles(profilesMap);
    };
    
    fetchEmployeeProfiles();
  }, [cycle]);

  if (loading || !cycle) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </DashboardLayout>
    );
  }

  const results = cycle.result_summary_json || {};
  const recommendations = results.recommendations || [];

  const handleApprove = async (employeeId: string, recommendation: any) => {
    if (!user?.id || !cycleId) return;

    const itemKey = `${employeeId}-${recommendation.title}`;
    
    try {
      const { error } = await supabase
        .from('approved_recommendations')
        .insert({
          employee_id: employeeId,
          cycle_id: cycleId,
          recommendation_data: recommendation,
          approved_by: user.id,
          status: 'pending',
        });

      if (error) throw error;

      setApprovedItems(prev => new Set(prev).add(itemKey));
      
      toast({
        title: 'Recommendation Approved',
        description: 'The employee will be notified of their new reward.',
      });
    } catch (error) {
      console.error('Error approving recommendation:', error);
      toast({
        title: 'Error',
        description: 'Failed to approve recommendation',
        variant: 'destructive',
      });
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Review & Approve AI Recommendations</h1>
          <p className="text-muted-foreground mt-1">Review suggested resets, see funding breakdowns, and approve the one that best fits your team members' needs.</p>
        </div>

        {/* Employee Header */}
        {recommendations.length > 0 && (
          <Card className="border-destructive/20 bg-destructive/5">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <h2 className="text-lg font-semibold">Analyzing {recommendations.length} Employee{recommendations.length > 1 ? 's' : ''}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {recommendations.map((rec: any, idx: number) => {
                    const employee = employeeProfiles[rec.employee_id];
                    const initials = employee?.full_name
                      ?.split(' ')
                      .map((n: string) => n[0])
                      .join('')
                      .toUpperCase() || rec.employee_name?.split(' ').map((n: string) => n[0]).join('') || 'U';
                    
                    return (
                      <div key={idx} className="flex items-center gap-3 p-3 bg-background rounded-lg">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={employee?.avatar_url} />
                          <AvatarFallback>{initials}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold truncate">{employee?.full_name || rec.employee_name || 'Loading...'}</p>
                          <p className="text-sm text-muted-foreground truncate">{rec.department || 'Unknown Department'}</p>
                          <Badge variant="destructive" className="text-xs mt-1">
                            <AlertTriangle className="w-3 h-3 mr-1" />
                            {rec.burnout_risk || 'Risk'} Risk
                          </Badge>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {!recommendations.length && (
          <Card className="border-destructive/20 bg-destructive/5">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" />
                  <AvatarFallback>SM</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <h2 className="text-xl font-bold">Employee: Sarah Mitchell</h2>
                    <Badge variant="destructive" className="text-xs">
                      <AlertTriangle className="w-3 h-3 mr-1" />
                      Burnout Risk Signal
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Senior Engineer · Design Team · 3 years</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recommendations Column */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">AI-Curated Recommendations</h2>
              <p className="text-sm text-muted-foreground mb-6">Compare tailored reset options tailored to Sarah's needs and preferences</p>

              <div className="space-y-6">
                {recommendations.map((emp: any, empIdx: number) => (
                  <div key={empIdx} className="space-y-4">
                    <h3 className="font-semibold text-lg">Recommendations for {emp.employee_name || `Employee ${empIdx + 1}`}</h3>
                    {emp.options?.map((rec: any, idx: number) => (
                      <Card key={idx} className="overflow-hidden">
                        <div className="relative">
                          <img src={rec.image_url || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&auto=format&fit=crop'} alt={rec.title} className="w-full h-48 object-cover" />
                          <Badge 
                            variant={rec.policy === 'within_budget' ? 'default' : 'secondary'}
                            className={`absolute top-4 right-4 ${
                              rec.policy === 'within_budget' ? 'bg-success text-success-foreground' : 'bg-warning text-warning-foreground'
                            }`}
                          >
                            {rec.policy === 'within_budget' ? 'Within Budget' : 'Co-Fund Required'}
                          </Badge>
                        </div>
                        <CardContent className="pt-6 space-y-4">
                          <div>
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h3 className="text-xl font-bold">{rec.title}</h3>
                                <p className="text-sm text-muted-foreground">{rec.desc}</p>
                              </div>
                        </div>
                        
                        {/* Cost */}
                        <div className="mt-3">
                          <Badge variant="outline" className="text-xs">
                            <DollarSign className="w-3 h-3 mr-1" />
                            ${rec.cost} total
                          </Badge>
                        </div>
                      </div>

                      <Separator />

                      {/* Funding Breakdown */}
                      <div>
                        <p className="text-sm font-semibold mb-3">Funding Breakdown</p>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-primary" />
                              <span className="text-muted-foreground">Company Contribution</span>
                            </div>
                            <span className="font-semibold">${rec.company}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-success" />
                              <span className="text-muted-foreground">Employee Contribution</span>
                            </div>
                            <span className="font-semibold">${rec.employee}</span>
                          </div>
                          <Separator className="my-2" />
                          <div className="flex justify-between font-semibold">
                            <span>Total Cost</span>
                            <span className="text-xl">${rec.totalCost}</span>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      {/* Why This Fits */}
                      <div className="bg-primary/5 rounded-lg p-4">
                        <div className="flex items-start gap-2 mb-2">
                          <TrendingUp className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                          <p className="text-sm font-semibold">Why This Fits</p>
                        </div>
                        <p className="text-sm text-muted-foreground">{rec.whyThisFits}</p>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        {approvedItems.has(`${emp.employee_id || `emp_${empIdx + 1}`}-${rec.title}`) ? (
                          <Button className="flex-1" variant="secondary" disabled>
                            <Check className="w-4 h-4 mr-2" />
                            Approved
                          </Button>
                        ) : (
                          <Button 
                            className="flex-1"
                            onClick={() => handleApprove(emp.employee_id || `emp_${empIdx + 1}`, rec)}
                          >
                            <CheckCircle2 className="w-4 h-4 mr-2" />
                            Approve This
                          </Button>
                        )}
                        <Button variant="outline">
                          <RefreshCw className="w-4 h-4 mr-2" />
                          Swap Option
                        </Button>
                        <Button variant="ghost" size="icon">
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Comparison Matrix */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Comparison Matrix</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-2 font-semibold">Feature</th>
                        <th className="text-center py-3 px-2 font-semibold">Dilijan Forest</th>
                        <th className="text-center py-3 px-2 font-semibold">Batumi Coastal</th>
                        <th className="text-center py-3 px-2 font-semibold">Tsaghkadzor Mountain</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-3 px-2 text-muted-foreground">Duration</td>
                        <td className="py-3 px-2 text-center">3 days</td>
                        <td className="py-3 px-2 text-center">4 days</td>
                        <td className="py-3 px-2 text-center">3 days</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-2 text-muted-foreground">Travel Time</td>
                        <td className="py-3 px-2 text-center">2 hours</td>
                        <td className="py-3 px-2 text-center">6 hours</td>
                        <td className="py-3 px-2 text-center">1.5 hours</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-2 text-muted-foreground">Activity Level</td>
                        <td className="py-3 px-2 text-center">
                          <Badge variant="secondary" className="text-xs bg-success/20 text-success">Low</Badge>
                        </td>
                        <td className="py-3 px-2 text-center">
                          <Badge variant="secondary" className="text-xs bg-warning/20 text-warning">Medium</Badge>
                        </td>
                        <td className="py-3 px-2 text-center">
                          <Badge variant="secondary" className="text-xs bg-warning/20 text-warning">Medium</Badge>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-2 text-muted-foreground">Spa/Wellness</td>
                        <td className="py-3 px-2 text-center">
                          <Check className="w-4 h-4 mx-auto text-success" />
                        </td>
                        <td className="py-3 px-2 text-center">
                          <Check className="w-4 h-4 mx-auto text-success" />
                        </td>
                        <td className="py-3 px-2 text-center">
                          <Check className="w-4 h-4 mx-auto text-success" />
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-2 text-muted-foreground">All Meals Included</td>
                        <td className="py-3 px-2 text-center">
                          <Check className="w-4 h-4 mx-auto text-success" />
                        </td>
                        <td className="py-3 px-2 text-center">
                          <X className="w-4 h-4 mx-auto text-destructive" />
                        </td>
                        <td className="py-3 px-2 text-center">
                          <X className="w-4 h-4 mx-auto text-destructive" />
                        </td>
                      </tr>
                      <tr>
                        <td className="py-3 px-2 text-muted-foreground font-semibold">Total Cost</td>
                        <td className="py-3 px-2 text-center font-bold">$640</td>
                        <td className="py-3 px-2 text-center font-bold">$780</td>
                        <td className="py-3 px-2 text-center font-bold">$500</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Employee Snapshot */}
            <Card className="bg-primary/5 border-primary/20">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Activity className="w-5 h-5 text-primary" />
                  <CardTitle className="text-base">Employee Snapshot</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" />
                    <AvatarFallback>SM</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">Sarah Mitchell</p>
                    <p className="text-sm text-muted-foreground">Senior Engineer</p>
                    <p className="text-xs text-muted-foreground">Design Team · 3 years</p>
                  </div>
                </div>

                <Separator />

                <div>
                  <Badge variant="destructive" className="mb-2">
                    <AlertTriangle className="w-3 h-3 mr-1" />
                    Signal Type
                  </Badge>
                  <p className="text-sm font-semibold">Burnout Risk</p>
                  <p className="text-xs text-muted-foreground">Confidence: <span className="text-destructive font-semibold">91%</span></p>
                  <p className="text-xs text-muted-foreground mt-1">HoF: Consecutive</p>
                </div>

                <Separator />

                <div>
                  <Badge variant="secondary" className="mb-2 bg-warning/20 text-warning">
                    <Calendar className="w-3 h-3 mr-1" />
                    PTO Gap
                  </Badge>
                  <p className="text-2xl font-bold text-warning">142 days</p>
                  <p className="text-xs text-muted-foreground">Since last break</p>
                </div>

                <Separator />

                <div>
                  <p className="text-sm font-semibold mb-2">Key Indicators</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Work Hours (3wk/Wk)</span>
                      <span className="font-semibold">52h</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Weekend Work</span>
                      <span className="font-semibold">High</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Meeting Load</span>
                      <Badge variant="secondary" className="text-xs bg-warning/20 text-warning">Above Average</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Stress Survey Score</span>
                      <span className="font-semibold text-destructive">73/100</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* AI Logic Summary */}
            <Card className="bg-primary/5 border-primary/20">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  <CardTitle className="text-base">AI Logic Summary</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm font-semibold mb-1">Recommendations Generated</p>
                  <p className="text-3xl font-bold">3</p>
                  <p className="text-xs text-muted-foreground">Best-matching employee profile</p>
                </div>
                <Separator />
                <div>
                  <p className="text-sm font-semibold mb-1">Compliance Status</p>
                  <Badge variant="outline" className="text-xs">
                    <CheckCircle2 className="w-3 h-3 mr-1 text-primary" />
                    All Within Policy
                  </Badge>
                </div>
                <Separator />
                <div>
                  <p className="text-sm font-semibold mb-1">Average Cost</p>
                  <p className="text-2xl font-bold">$640</p>
                  <p className="text-xs text-muted-foreground">Company funded</p>
                </div>
              </CardContent>
            </Card>

            {/* Funding Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Funding Distribution</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-center text-sm text-muted-foreground mb-4">
                  Chart unavailable
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span>Company Average</span>
                    </div>
                    <span className="font-semibold">$480</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-success" />
                      <span>Employee Average</span>
                    </div>
                    <span className="font-semibold">$180</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Privacy & Data Usage */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  <CardTitle className="text-base">Privacy & Data Usage</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  AI uses approved performance and wellbeing data only. All recommendations comply with company privacy policies and data ethics.
                </p>
                <Button variant="link" size="sm" className="text-primary p-0 h-auto">
                  <Eye className="w-3 h-3 mr-1" />
                  Learn more about AI ethics →
                </Button>
              </CardContent>
            </Card>

            {/* Manager Resources */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Manager Resources</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  <FileText className="w-4 h-4 mr-2" />
                  Burnout Prevention Guide
                  →
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Conversation Templates
                  →
                </Button>
                <Button variant="ghost" size="sm" className="w-full justify-start">
                  <Users className="w-4 h-4 mr-2" />
                  Team Wellness Dashboard
                  →
                </Button>
              </CardContent>
            </Card>

            {/* Historical Context */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary" />
                  <CardTitle className="text-base">Historical Context & Previous Resets</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Star className="w-4 h-4 text-warning fill-warning" />
                    <p className="text-sm font-semibold">Lake Sevan Wellness Retreat</p>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">June 2024 • 3 days</p>
                  <p className="text-xs text-muted-foreground">"Perfect blend of relaxation and outdoor activities. The lake views were stunning and the wellness center had exactly what I needed."</p>
                  <div className="flex gap-1 mt-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 text-warning fill-warning" />
                    ))}
                  </div>
                </div>

                <div className="p-3 bg-muted rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <Star className="w-4 h-4 text-warning fill-warning" />
                    <p className="text-sm font-semibold">Lake Sevan Wellness Retreat</p>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">June 2024 • 3 days</p>
                  <p className="text-xs text-muted-foreground">"The quiet environment was perfect for decompressing, and the hiking structure. The quiet environment was exactly what I needed"</p>
                  <div className="flex gap-1 mt-2">
                    {[...Array(4)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 text-warning fill-warning" />
                    ))}
                    <Star className="w-3 h-3 text-muted-foreground" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AIConciergeReview;
