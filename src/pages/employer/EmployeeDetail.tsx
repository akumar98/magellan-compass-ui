import { useParams, useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { 
  ArrowLeft, Mail, Calendar, DollarSign, Gift, TrendingUp, 
  AlertTriangle, CheckCircle, Clock 
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function EmployeeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data
  const employee = {
    id: id || '1',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@company.com',
    department: 'Engineering',
    role: 'Senior Developer',
    hireDate: '2022-01-15',
    currentPoints: 840,
    totalRedeemed: 2400,
    burnoutRisk: 'low',
    burnoutScore: 75,
  };

  const engagementData = [
    { month: 'Jan', score: 65 },
    { month: 'Feb', score: 70 },
    { month: 'Mar', score: 68 },
    { month: 'Apr', score: 72 },
    { month: 'May', score: 75 },
    { month: 'Jun', score: 75 },
  ];

  const recentActivity = [
    { action: 'Redeemed Weekend in Paris', date: '2024-02-15', points: 500, type: 'redemption' },
    { action: 'Milestone: 1 Year Anniversary', date: '2024-01-15', points: 200, type: 'milestone' },
    { action: 'Redeemed Spa Day', date: '2023-12-20', points: 150, type: 'redemption' },
  ];

  const getBurnoutColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'text-destructive';
      case 'medium': return 'text-warning';
      case 'low': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/employer/team')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold">Employee Details</h1>
            <p className="text-muted-foreground">View and manage employee information</p>
          </div>
        </div>

        {/* Employee Profile Card */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-start gap-6">
              <Avatar className="h-24 w-24">
                <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                  {employee.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold mb-1">{employee.name}</h2>
                    <p className="text-muted-foreground mb-2">{employee.role} • {employee.department}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Mail className="h-4 w-4" />
                        {employee.email}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Joined {new Date(employee.hireDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline">Send Message</Button>
                    <Button>View Profile</Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Current Points</p>
                  <p className="text-2xl font-bold">{employee.currentPoints}</p>
                </div>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Gift className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Redeemed</p>
                  <p className="text-2xl font-bold">{employee.totalRedeemed}</p>
                </div>
                <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-secondary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Wellness Score</p>
                  <p className="text-2xl font-bold">{employee.burnoutScore}</p>
                </div>
                <div className="h-12 w-12 rounded-lg bg-success/10 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Burnout Risk</p>
                  <Badge className={`${getBurnoutColor(employee.burnoutRisk)} bg-transparent border-current`}>
                    {employee.burnoutRisk.toUpperCase()}
                  </Badge>
                </div>
                <div className={`h-12 w-12 rounded-lg bg-${employee.burnoutRisk === 'low' ? 'success' : 'warning'}/10 flex items-center justify-center`}>
                  <AlertTriangle className={`h-6 w-6 ${getBurnoutColor(employee.burnoutRisk)}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Engagement Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Engagement Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={engagementData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="score" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  dot={{ fill: 'hsl(var(--primary))', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center gap-4 p-4 rounded-lg border border-border">
                <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                  activity.type === 'redemption' ? 'bg-primary/10' : 'bg-accent/10'
                }`}>
                  {activity.type === 'redemption' ? (
                    <Gift className="h-5 w-5 text-primary" />
                  ) : (
                    <CheckCircle className="h-5 w-5 text-accent" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-semibold">{activity.action}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(activity.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-primary">{activity.points} pts</p>
                  <p className="text-xs text-muted-foreground">
                    {activity.type === 'redemption' ? 'Redeemed' : 'Earned'}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
