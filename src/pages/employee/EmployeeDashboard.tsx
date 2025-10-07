import { StatsCard } from '@/components/shared/StatsCard';
import { useAuth } from '@/context/AuthContext';
import { Award, Gift, TrendingUp, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { BurnoutInsights } from '@/components/burnout/BurnoutInsights';

export default function EmployeeDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.full_name?.split(' ')[0]}! 👋</h1>
        <p className="text-muted-foreground">Track your milestones and explore travel rewards</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Wallet Balance"
          value="Coming Soon"
          subtitle="Funds available"
          icon={<Award className="h-6 w-6" />}
          color="primary"
        />
        <StatsCard
          title="Travel Rewards Claimed"
          value="8"
          subtitle="This year"
          icon={<Gift className="h-6 w-6" />}
          color="secondary"
          trend={{ value: 25, isPositive: true }}
        />
        <StatsCard
          title="Points Earned"
          value="3,240"
          subtitle="Last 30 days"
          icon={<TrendingUp className="h-6 w-6" />}
          color="accent"
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="Rank"
          value="#12"
          subtitle="In your company"
          icon={<Trophy className="h-6 w-6" />}
          color="success"
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card-stat bg-gradient-to-br from-primary/10 to-primary/5">
          <h3 className="text-lg font-semibold mb-2">Browse Travel Rewards</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Discover amazing travel experiences and destinations with your points
          </p>
          <Button onClick={() => navigate('/rewards')}>
            View Catalog
          </Button>
        </div>

        <div className="card-stat bg-gradient-to-br from-secondary/10 to-secondary/5">
          <h3 className="text-lg font-semibold mb-2">Recent Activity</h3>
          <p className="text-sm text-muted-foreground mb-4">
            View your points history and claimed travel rewards
          </p>
          <Button variant="outline" onClick={() => navigate('/employee/activity')}>
            View Activity
          </Button>
        </div>
      </div>

      {/* Burnout Insights Section */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Wellness & Burnout Prevention</h2>
        <BurnoutInsights />
      </div>

      {/* Featured Travel Rewards */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Featured Travel Rewards</h2>
          <Button variant="ghost" onClick={() => navigate('/rewards')}>
            View All
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card-reward hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate('/rewards')}>
            <div className="h-48 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
              <Gift className="h-16 w-16 text-primary" />
            </div>
            <div className="p-4">
              <h3 className="font-semibold mb-1">Explore Travel Rewards</h3>
              <p className="text-sm text-muted-foreground mb-3">Browse our full catalog of amazing destinations</p>
              <Button size="sm" className="w-full">View Catalog</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
