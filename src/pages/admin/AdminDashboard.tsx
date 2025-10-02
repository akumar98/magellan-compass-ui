import { StatsCard } from '@/components/shared/StatsCard';
import { Building2, Users, Gift, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const navigate = useNavigate();

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
          title="Active Rewards"
          value="89"
          subtitle="In catalog"
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
          <h3 className="text-lg font-semibold mb-2">Manage Rewards</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Add and edit reward catalog
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
            { company: 'Global Solutions', event: 'Reward catalog updated', time: '1 day ago', type: 'reward' },
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
