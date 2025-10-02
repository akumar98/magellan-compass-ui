import { StatsCard } from '@/components/shared/StatsCard';
import { Users, ClipboardCheck, TrendingUp, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function EmployerDashboard() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Employer Dashboard</h1>
        <p className="text-muted-foreground">Manage your team and review reward requests</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Employees"
          value="42"
          subtitle="Active team members"
          icon={<Users className="h-6 w-6" />}
          color="primary"
        />
        <StatsCard
          title="Pending Approvals"
          value="7"
          subtitle="Reward requests"
          icon={<ClipboardCheck className="h-6 w-6" />}
          color="warning"
        />
        <StatsCard
          title="Active Rewards"
          value="156"
          subtitle="This month"
          icon={<Award className="h-6 w-6" />}
          color="secondary"
          trend={{ value: 18, isPositive: true }}
        />
        <StatsCard
          title="Team Contributions"
          value="8.2/10"
          subtitle="Average score"
          icon={<TrendingUp className="h-6 w-6" />}
          color="success"
          trend={{ value: 5, isPositive: true }}
        />
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card-stat bg-gradient-to-br from-warning/10 to-warning/5 border-warning/20">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Pending Approvals</h3>
              <p className="text-sm text-muted-foreground">
                7 reward requests need your attention
              </p>
            </div>
            <div className="h-12 w-12 rounded-xl bg-warning/10 flex items-center justify-center">
              <ClipboardCheck className="h-6 w-6 text-warning" />
            </div>
          </div>
          <Button onClick={() => navigate('/employer/approvals')}>
            Review Requests
          </Button>
        </div>

        <div className="card-stat bg-gradient-to-br from-primary/10 to-primary/5">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Team Management</h3>
              <p className="text-sm text-muted-foreground">
                View and manage your team members
              </p>
            </div>
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Users className="h-6 w-6 text-primary" />
            </div>
          </div>
          <Button variant="outline" onClick={() => navigate('/employer/team')}>
            Manage Team
          </Button>
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Recent Team Activity</h2>
        <div className="card-stat space-y-4">
          {[
            { name: 'Sarah Johnson', action: 'claimed Premium Headphones', points: '500 pts', time: '2 hours ago' },
            { name: 'Mike Chen', action: 'earned points for project completion', points: '+350 pts', time: '5 hours ago' },
            { name: 'Emily Davis', action: 'requested Gift Card', points: '300 pts', time: '1 day ago' },
          ].map((activity, index) => (
            <div key={index} className="flex items-center justify-between py-3 border-b border-border last:border-0">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-semibold text-sm">
                    {activity.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-sm">{activity.name}</p>
                  <p className="text-xs text-muted-foreground">{activity.action}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-sm">{activity.points}</p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
