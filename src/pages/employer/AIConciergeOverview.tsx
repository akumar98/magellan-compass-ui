import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import {
  TrendingUp,
  Users,
  Target,
  Calendar,
  Search,
  ChevronLeft,
  ChevronRight,
  Activity,
  Brain,
  Heart,
  AlertTriangle,
  TrendingDown,
  AlertCircle,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip } from 'recharts';
import { useDetectionCycle } from '@/hooks/useDetectionCycle';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

const AIConciergeOverview = () => {
  const navigate = useNavigate();
  const { startCycle, loading } = useDetectionCycle();
  const [isStarting, setIsStarting] = useState(false);
  const { user } = useAuth();

  const handleStartCycle = async () => {
    if (!user?.id) return;
    setIsStarting(true);
    const cycleId = await startCycle(user.id);
    if (cycleId) {
      navigate(`/employer/ai-concierge/detection?cycleId=${cycleId}`);
    }
    setIsStarting(false);
  };

  const historicalTrendData = [
    { week: 'Week 1', burnout: 42, disengagement: 38, events: 35 },
    { week: 'Week 2', burnout: 45, disengagement: 40, events: 38 },
    { week: 'Week 3', burnout: 48, disengagement: 43, events: 41 },
    { week: 'Week 4', burnout: 52, disengagement: 45, events: 44 },
    { week: 'Week 5', burnout: 55, disengagement: 48, events: 47 },
    { week: 'Week 6', burnout: 58, disengagement: 50, events: 49 },
    { week: 'Week 7', burnout: 62, disengagement: 53, events: 52 },
    { week: 'Week 8', burnout: 65, disengagement: 55, events: 54 },
    { week: 'Week 9', burnout: 68, disengagement: 58, events: 57 },
    { week: 'Week 10', burnout: 70, disengagement: 60, events: 59 },
    { week: 'Week 11', burnout: 73, disengagement: 62, events: 61 },
    { week: 'Week 12', burnout: 75, disengagement: 64, events: 63 },
  ];

  const employees = [
    { name: 'Sarah Mitchell', email: 'sarah@company.com', role: 'Senior Engineer', team: 'Engineering', signal: 'Burnout Risk', confidence: 94, status: 'New' },
    { name: 'Marcus Chen', email: 'marcus@company.com', role: 'Product Manager', team: 'Product', signal: 'Disengagement', confidence: 87, status: 'Processing' },
    { name: 'Raya Rodriguez', email: 'raya@company.com', role: 'Marketing Lead', team: 'Marketing', signal: 'Life Event', confidence: 92, status: 'New' },
    { name: 'David Park', email: 'david@company.com', role: 'Sales Director', team: 'Sales', signal: 'Burnout Risk', confidence: 88, status: 'Resolved' },
    { name: 'Emily Johnson', email: 'emily@company.com', role: 'UX Designer', team: 'Design', signal: 'Disengagement', confidence: 81, status: 'Processing' },
    { name: 'James Wilson', email: 'james@company.com', role: 'Data Analyst', team: 'Analytics', signal: 'Life Event', confidence: 96, status: 'New' },
  ];

  const activationQueue = [
    { name: 'Sarah Mitchell', role: 'Senior Engineer', signal: 'Burnout Risk', confidence: '94%' },
    { name: 'Anna Rodriguez', role: 'Marketing Lead', signal: 'Life Event', confidence: '90%' },
    { name: 'Emily Johnson', role: 'UX Designer', signal: 'Disengagement', confidence: '89%' },
  ];

  const activityFeed = [
    {
      title: 'AI Suggested Weekend Retreat',
      detail: 'For Sarah Mitchell',
      time: '5 minutes ago',
      status: 'pending',
      icon: <Brain className="w-4 h-4 text-primary" />
    },
    {
      title: 'Manager Approved',
      detail: 'No Lakare Park Wellness',
      time: '1 hour ago',
      status: 'success',
      icon: <CheckCircle2 className="w-4 h-4 text-success" />
    },
    {
      title: 'Burnout signal detected',
      detail: 'For Sarah Mitchell',
      time: '2 hours ago',
      status: 'alert',
      icon: <AlertCircle className="w-4 h-4 text-destructive" />
    },
  ];

  const heatmapData = [
    ['Eng', [2, 1, 0, 2, 1]],
    ['Sales', [1, 2, 2, 1, 0]],
    ['Mkt', [0, 1, 2, 2, 1]],
    ['Prod', [1, 0, 1, 2, 2]],
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">AI Concierge Overview</h1>
            <p className="text-muted-foreground mt-1">Real-time insights into employee wellbeing and moment detection.</p>
          </div>
          <Button 
            onClick={handleStartCycle} 
            disabled={isStarting || loading}
            className="flex items-center gap-2"
          >
            <Brain className="w-4 h-4" />
            {isStarting ? 'Starting...' : 'Start Detection Cycle'}
          </Button>
        </div>

        {/* Summary Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Signals</p>
                  <p className="text-3xl font-bold mt-2">247</p>
                  <p className="text-xs text-success mt-1 flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" /> 13%
                  </p>
                </div>
                <Activity className="w-10 h-10 text-primary opacity-20" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending Manager Reviews</p>
                  <p className="text-3xl font-bold mt-2">32</p>
                </div>
                <Clock className="w-10 h-10 text-primary opacity-20" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Average Confidence</p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="relative w-16 h-16">
                      <svg className="w-16 h-16 transform -rotate-90">
                        <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="none" className="text-muted" />
                        <circle
                          cx="32"
                          cy="32"
                          r="28"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                          strokeDasharray={`${2 * Math.PI * 28 * 0.91} ${2 * Math.PI * 28}`}
                          className="text-success"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-lg font-bold">91%</span>
                      </div>
                    </div>
                  </div>
                </div>
                <Target className="w-10 h-10 text-primary opacity-20" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Rewards Triggered This Month</p>
                  <p className="text-3xl font-bold mt-2">1,284</p>
                  <div className="mt-2">
                    <ResponsiveContainer width={120} height={30}>
                      <LineChart data={historicalTrendData.slice(-6)}>
                        <Line type="monotone" dataKey="burnout" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <Calendar className="w-10 h-10 text-primary opacity-20" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Employee Table */}
          <div className="lg:col-span-2 space-y-6">
            {/* Employee Signals Table */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Employee Signals</CardTitle>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input placeholder="Search employees..." className="pl-9 w-64" />
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto -mx-6 sm:mx-0">
                  <table className="w-full min-w-[900px]">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">Employee</th>
                        <th className="text-left py-3 px-2 text-xs font-medium text-muted-foreground">Role</th>
                        <th className="text-left py-3 px-2 text-xs font-medium text-muted-foreground">Team</th>
                        <th className="text-left py-3 px-2 text-xs font-medium text-muted-foreground">Signal Type</th>
                        <th className="text-left py-3 px-2 text-xs font-medium text-muted-foreground">Confidence</th>
                        <th className="text-left py-3 px-2 text-xs font-medium text-muted-foreground">Status</th>
                        <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {employees.map((emp, idx) => (
                        <tr key={idx} className="border-b hover:bg-muted/50">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8 flex-shrink-0">
                                <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${emp.name}`} />
                                <AvatarFallback>{emp.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                              </Avatar>
                              <div className="min-w-0">
                                <p className="text-sm font-medium truncate">{emp.name}</p>
                                <p className="text-xs text-muted-foreground truncate">{emp.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-2 text-sm">{emp.role}</td>
                          <td className="py-3 px-2 text-sm">{emp.team}</td>
                          <td className="py-3 px-2">
                            <Badge variant={emp.signal === 'Burnout Risk' ? 'destructive' : emp.signal === 'Disengagement' ? 'default' : 'secondary'} className="text-xs whitespace-nowrap">
                              {emp.signal}
                            </Badge>
                          </td>
                          <td className="py-3 px-2">
                            <div className="flex items-center gap-2">
                              <Progress value={emp.confidence} className="w-16 h-2" />
                              <span className="text-xs font-medium whitespace-nowrap">{emp.confidence}%</span>
                            </div>
                          </td>
                          <td className="py-3 px-2">
                            <Badge variant={emp.status === 'New' ? 'default' : emp.status === 'Processing' ? 'secondary' : 'outline'} className="text-xs whitespace-nowrap">
                              {emp.status}
                            </Badge>
                          </td>
                          <td className="py-3 px-4">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={async () => {
                                if (!user?.id) return;
                                const cycleId = await startCycle(user.id);
                                if (cycleId) {
                                  navigate(`/employer/ai-concierge/detection?cycleId=${cycleId}&employeeId=${emp.name}`);
                                }
                              }}
                              disabled={isStarting || loading}
                              className="whitespace-nowrap"
                            >
                              <Brain className="w-3 h-3 mr-1" />
                              Start Detection
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {/* Pagination */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t">
                  <p className="text-sm text-muted-foreground">Showing 1-6 of 247</p>
                  <div className="flex items-center gap-1">
                    <Button variant="outline" size="icon" className="h-8 w-8">
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="default" size="icon" className="h-8 w-8">1</Button>
                    <Button variant="outline" size="icon" className="h-8 w-8">2</Button>
                    <Button variant="outline" size="icon" className="h-8 w-8">3</Button>
                    <Button variant="outline" size="icon" className="h-8 w-8">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Signal Detection Monitor */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Signal Detection Monitor</CardTitle>
                  <Button size="sm" variant="outline">
                    <Search className="w-4 h-4 mr-2" />
                    Search
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">Live tracking of employee wellbeing signals across your organization</p>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Showing 1-6 of 247</p>
              </CardContent>
            </Card>

            {/* Concierge Activation Queue */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  Concierge Activation Queue
                  <Badge variant="secondary" className="ml-2">Privacy-First AI</Badge>
                </CardTitle>
                <p className="text-sm text-muted-foreground">Employees ready for Concierge recommendations</p>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-6 mb-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold">
                          3
                        </div>
                        <p className="font-semibold">3 employees ready for Concierge activation</p>
                      </div>
                      <p className="text-sm text-muted-foreground">No message content read</p>
                    </div>
                    <Button onClick={handleStartCycle} disabled={isStarting || loading}>
                      {isStarting || loading ? 'Starting...' : '▶ Start Detection Cycle'}
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {activationQueue.map((emp, idx) => (
                    <Card key={idx}>
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-3">
                          <Avatar>
                            <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${emp.name}`} />
                            <AvatarFallback>{emp.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <p className="font-semibold text-sm">{emp.name}</p>
                            <p className="text-xs text-muted-foreground">{emp.role}</p>
                            <Badge variant={emp.signal === 'Burnout Risk' ? 'destructive' : emp.signal === 'Disengagement' ? 'default' : 'secondary'} className="text-xs mt-2">
                              {emp.signal}
                            </Badge>
                            <p className="text-xs text-muted-foreground mt-1">Confidence: {emp.confidence}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* AI Activity Feed */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">AI Activity Feed</CardTitle>
                  <Button variant="link" size="sm" className="text-primary">View All</Button>
                </div>
                <p className="text-xs text-muted-foreground">Real-time AI concierge actions and recommendations</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activityFeed.map((item, idx) => (
                    <div key={idx} className="flex gap-3">
                      <div className="mt-1">{item.icon}</div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{item.title}</p>
                        <p className="text-xs text-muted-foreground">{item.detail}</p>
                        <p className="text-xs text-muted-foreground mt-1">{item.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Sentiment Heatmap */}
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Sentiment Heatmap</CardTitle>
                  <Button variant="outline" size="sm">Export ↓</Button>
                </div>
                <p className="text-xs text-muted-foreground">Signal density by team and day of week</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="grid grid-cols-6 gap-1 text-xs text-muted-foreground mb-2">
                    <div></div>
                    <div>Mon</div>
                    <div>Tue</div>
                    <div>Wed</div>
                    <div>Thu</div>
                    <div>Fri</div>
                  </div>
                  {heatmapData.map(([team, values]: any, idx) => (
                    <div key={idx} className="grid grid-cols-6 gap-1 items-center">
                      <div className="text-xs font-medium">{team}</div>
                      {values.map((val: number, i: number) => (
                        <div
                          key={i}
                          className={`h-8 rounded ${
                            val === 0 ? 'bg-success/20' :
                            val === 1 ? 'bg-warning/40' :
                            'bg-destructive/60'
                          }`}
                        />
                      ))}
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-center gap-4 mt-4 text-xs">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded bg-success/20" />
                    <span>Stable</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded bg-warning/40" />
                    <span>Mild</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded bg-destructive/60" />
                    <span>Alert</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Detection Model Insights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Brain className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-base">Burnout Detection Model</CardTitle>
                  <Badge variant="outline" className="text-xs mt-1">Active</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-muted-foreground">Neural network trained on 500K employee interactions</p>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Accuracy:</span>
                <span className="font-semibold">94%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">False Positive Rate:</span>
                <span className="font-semibold">3.1%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Last Updated:</span>
                <span className="font-semibold">2 days ago</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-warning/10 rounded-lg">
                  <TrendingDown className="w-5 h-5 text-warning" />
                </div>
                <div>
                  <CardTitle className="text-base">Engagement Tracking</CardTitle>
                  <Badge variant="outline" className="text-xs mt-1">Active</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-muted-foreground">Sentiment analysis across communication channels</p>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Accuracy:</span>
                <span className="font-semibold">91%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">False Positive Rate:</span>
                <span className="font-semibold">3.4%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Last Updated:</span>
                <span className="font-semibold">5 days ago</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-success/10 rounded-lg">
                  <Heart className="w-5 h-5 text-success" />
                </div>
                <div>
                  <CardTitle className="text-base">Life Event Recognition</CardTitle>
                  <Badge variant="outline" className="text-xs mt-1">Active</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm text-muted-foreground">Pattern watching for major life transitions</p>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Accuracy:</span>
                <span className="font-semibold">88.6%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">False Positive Rate:</span>
                <span className="font-semibold">1.2%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Last Updated:</span>
                <span className="font-semibold">1 day ago</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Historical Signal Trends */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Historical Signal Trends</CardTitle>
                <p className="text-sm text-muted-foreground">90-day view of wellbeing signals across your organization</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">30 Days</Button>
                <Button variant="default" size="sm">90 Days</Button>
                <Button variant="outline" size="sm">1 Year</Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={historicalTrendData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="week" className="text-xs" />
                <YAxis className="text-xs" />
                <RechartsTooltip />
                <Line type="monotone" dataKey="burnout" stroke="hsl(var(--destructive))" strokeWidth={2} name="Burnout Signals" />
                <Line type="monotone" dataKey="disengagement" stroke="hsl(var(--warning))" strokeWidth={2} name="Disengagement" />
                <Line type="monotone" dataKey="events" stroke="hsl(var(--primary))" strokeWidth={2} name="Life Events" />
              </LineChart>
            </ResponsiveContainer>
            <div className="flex items-center justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-destructive" />
                <span className="text-sm">Burnout Signals</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-warning" />
                <span className="text-sm">Disengagement</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <span className="text-sm">Life Events</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Team-Level Signal Distribution */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Team-Level Signal Distribution</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { team: 'Engineering', total: 87, burnout: 32, disengagement: 29, events: 26, icon: '💻' },
              { team: 'Sales', total: 62, burnout: 21, disengagement: 24, events: 17, icon: '💼' },
              { team: 'Marketing', total: 54, burnout: 18, disengagement: 19, events: 17, icon: '📱' },
              { team: 'Product', total: 44, burnout: 15, disengagement: 16, events: 13, icon: '💡' },
            ].map((dept, idx) => (
              <Card key={idx}>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-3xl">{dept.icon}</div>
                    <div>
                      <p className="font-semibold">{dept.team}</p>
                      <p className="text-2xl font-bold">{dept.total}</p>
                    </div>
                  </div>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Burnout</span>
                      <span className="text-destructive font-semibold">{dept.burnout}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Disengagement</span>
                      <span className="text-warning font-semibold">{dept.disengagement}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Life Events</span>
                      <span className="text-primary font-semibold">{dept.events}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* AI-Recommended Actions */}
        <Card>
          <CardHeader>
            <CardTitle>AI-Recommended Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-start gap-4 p-4 border border-destructive/20 rounded-lg bg-destructive/5">
              <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="destructive" className="text-xs">Critical</Badge>
                  <span className="text-sm font-semibold">High Priority: Engineering Team Burnout</span>
                </div>
                <p className="text-sm text-muted-foreground">34 engineers showing burnout signals—highest concentration in backend team. Recommend immediate intervention.</p>
                <p className="text-xs text-muted-foreground mt-1">Detected 3 days ago</p>
              </div>
              <Button variant="destructive" size="sm">Take Action</Button>
            </div>

            <div className="flex items-start gap-4 p-4 border border-warning/20 rounded-lg bg-warning/5">
              <AlertCircle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="secondary" className="text-xs bg-warning/20 text-warning">Moderate</Badge>
                  <span className="text-sm font-semibold">Moderate: Sales Team Engagement Drop</span>
                </div>
                <p className="text-sm text-muted-foreground">24 sales reps showing disengagement patterns. Consider team-building activities or one-on-ones.</p>
                <p className="text-xs text-muted-foreground mt-1">Detected 5 hours ago</p>
              </div>
              <Button variant="outline" size="sm" className="border-warning text-warning hover:bg-warning hover:text-warning-foreground">
                Schedule
              </Button>
            </div>

            <div className="flex items-start gap-4 p-4 border border-success/20 rounded-lg bg-success/5">
              <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="secondary" className="text-xs bg-success/20 text-success">Low</Badge>
                  <span className="text-sm font-semibold">Positive: Life Events Recognition Opportunity</span>
                </div>
                <p className="text-sm text-muted-foreground">31 employees with detected life events: anniversaries and milestones. Consider sending personalized wellness or support packages.</p>
                <p className="text-xs text-muted-foreground mt-1">Detected 1 day ago</p>
              </div>
              <Button variant="outline" size="sm" className="border-success text-success hover:bg-success hover:text-success-foreground">
                Schedule
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AIConciergeOverview;
