import { StatsCard } from '@/components/shared/StatsCard';
import { Building2, Users, Gift, TrendingUp, Plus, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

export default function AdminDashboard() {
  const navigate = useNavigate();

  // Mock data for engagement trends
  const engagementData = [
    { month: 'Jan', acme: 85, techstart: 78, global: 92, innovation: 70 },
    { month: 'Feb', acme: 88, techstart: 82, global: 90, innovation: 75 },
    { month: 'Mar', acme: 87, techstart: 85, global: 93, innovation: 78 },
    { month: 'Apr', acme: 90, techstart: 88, global: 95, innovation: 82 },
    { month: 'May', acme: 92, techstart: 90, global: 94, innovation: 85 },
    { month: 'Jun', acme: 94, techstart: 91, global: 96, innovation: 88 },
  ];

  // Mock data for reward redemptions
  const redemptionData = [
    { month: 'Jan', redemptions: 45 },
    { month: 'Feb', redemptions: 52 },
    { month: 'Mar', redemptions: 48 },
    { month: 'Apr', redemptions: 65 },
    { month: 'May', redemptions: 73 },
    { month: 'Jun', redemptions: 68 },
  ];

  // Mock data for burnout risk distribution
  const burnoutData = [
    { name: 'Low Risk', value: 856, color: 'hsl(var(--success))' },
    { name: 'Medium Risk', value: 284, color: 'hsl(var(--warning))' },
    { name: 'High Risk', value: 108, color: 'hsl(var(--destructive))' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">Platform overview and management</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Companies"
          value="24"
          subtitle="Active organizations"
          icon={<Building2 className="h-6 w-6" />}
          color="primary"
          trend={{ value: 8, isPositive: true }}
        />
        <StatsCard
          title="Total Employees"
          value="1,248"
          subtitle="Across all companies"
          icon={<Users className="h-6 w-6" />}
          color="secondary"
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="Travel Rewards"
          value="89"
          subtitle="Destinations available"
          icon={<Gift className="h-6 w-6" />}
          color="accent"
        />
        <StatsCard
          title="Platform Activity"
          value="94%"
          subtitle="Engagement rate"
          icon={<TrendingUp className="h-6 w-6" />}
          color="success"
          trend={{ value: 3, isPositive: true }}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Engagement Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Engagement Trends by Company</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={engagementData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="acme" stroke="hsl(var(--primary))" name="Acme Corp" />
                <Line type="monotone" dataKey="techstart" stroke="hsl(var(--secondary))" name="TechStart Inc" />
                <Line type="monotone" dataKey="global" stroke="hsl(var(--accent))" name="Global Solutions" />
                <Line type="monotone" dataKey="innovation" stroke="hsl(var(--warning))" name="Innovation Labs" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Reward Redemptions */}
        <Card>
          <CardHeader>
            <CardTitle>Reward Redemptions Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={redemptionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="redemptions" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Burnout Risk & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Burnout Risk Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Burnout Risk Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={burnoutData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {burnoutData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {burnoutData.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span>{item.name}</span>
                  </div>
                  <span className="font-medium">{item.value} employees</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              className="w-full justify-start" 
              variant="outline"
              onClick={() => navigate('/admin/companies')}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add New Company
            </Button>
            <Button 
              className="w-full justify-start" 
              variant="outline"
              onClick={() => navigate('/admin/rewards')}
            >
              <Gift className="h-4 w-4 mr-2" />
              Add New Reward
            </Button>
            <Button 
              className="w-full justify-start" 
              variant="outline"
              onClick={() => navigate('/admin/logs')}
            >
              <FileText className="h-4 w-4 mr-2" />
              View System Logs
            </Button>
            <Button 
              className="w-full justify-start" 
              variant="outline"
              onClick={() => navigate('/admin/budgets')}
            >
              <TrendingUp className="h-4 w-4 mr-2" />
              Manage Budgets
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Management Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card-stat bg-gradient-to-br from-primary/10 to-primary/5">
          <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
            <Building2 className="h-6 w-6 text-primary" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Manage Companies</h3>
          <p className="text-sm text-muted-foreground mb-4">
            View and manage registered companies
          </p>
          <Button onClick={() => navigate('/admin/companies')}>
            View Companies
          </Button>
        </div>

        <div className="card-stat bg-gradient-to-br from-secondary/10 to-secondary/5">
          <div className="h-12 w-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-4">
            <Users className="h-6 w-6 text-secondary" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Manage Employees</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Overview of all platform users
          </p>
          <Button variant="outline" onClick={() => navigate('/admin/employees')}>
            View Employees
          </Button>
        </div>

        <div className="card-stat bg-gradient-to-br from-accent/10 to-accent/5">
          <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
            <Gift className="h-6 w-6 text-accent" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Manage Travel Rewards</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Add and edit travel experiences catalog
          </p>
          <Button variant="outline" onClick={() => navigate('/admin/rewards')}>
            Manage Catalog
          </Button>
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Recent Platform Activity</h2>
        <div className="card-stat space-y-3">
          {[
            { company: 'Acme Corp', event: 'New company registered', time: '2 hours ago', type: 'company' },
            { company: 'TechStart Inc', event: '15 new employees added', time: '5 hours ago', type: 'users' },
            { company: 'Global Solutions', event: 'Travel rewards catalog updated', time: '1 day ago', type: 'reward' },
            { company: 'Innovation Labs', event: 'Monthly report generated', time: '2 days ago', type: 'report' },
          ].map((activity, index) => (
            <div key={index} className="flex items-center justify-between py-3 border-b border-border last:border-0">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  {activity.type === 'company' && <Building2 className="h-5 w-5 text-primary" />}
                  {activity.type === 'users' && <Users className="h-5 w-5 text-secondary" />}
                  {activity.type === 'reward' && <Gift className="h-5 w-5 text-accent" />}
                  {activity.type === 'report' && <TrendingUp className="h-5 w-5 text-success" />}
                </div>
                <div>
                  <p className="font-medium text-sm">{activity.company}</p>
                  <p className="text-xs text-muted-foreground">{activity.event}</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">{activity.time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
