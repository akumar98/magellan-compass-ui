import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { WellnessSnapshot } from '@/components/employee/WellnessSnapshot';
import { UpcomingMilestones } from '@/components/employee/UpcomingMilestones';
import { ContributionsChart } from '@/components/employee/ContributionsChart';
import { RewardPreview } from '@/components/employee/RewardPreview';
import { QuickActions } from '@/components/employee/QuickActions';
import { NotificationsList } from '@/components/employee/NotificationsList';
import { AIInsight } from '@/components/employee/AIInsight';
import { Badge } from '@/components/ui/badge';
import { Clock } from 'lucide-react';

export default function EmployeeDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const mockMilestones = [
    {
      title: 'Weekend Getaway',
      unlockDate: 'August 25, 2023',
      requiredPoints: 500,
      currentPoints: 390,
      daysLeft: 14,
    },
    {
      title: 'Wellness Retreat',
      unlockDate: 'October 10, 2023',
      requiredPoints: 1200,
      currentPoints: 420,
      daysLeft: 60,
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Section */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, {user?.full_name?.split(' ')[0]}!
          </h1>
          <p className="text-muted-foreground">Let's check your progress and rewards.</p>
        </div>
        <Badge variant="secondary" className="gap-2">
          <Clock className="h-3 w-3" />
          2 weeks to next unlock!
        </Badge>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Wellness Snapshot */}
          <WellnessSnapshot riskLevel="Low" score={82} maxScore={100} />

          {/* Upcoming Milestones */}
          <UpcomingMilestones
            milestones={mockMilestones}
            onViewAll={() => navigate('/rewards')}
          />

          {/* Contributions Overview */}
          <ContributionsChart onAdjust={() => navigate('/settings')} />
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          {/* Reward Preview */}
          <RewardPreview onExploreAll={() => navigate('/rewards')} />

          {/* Quick Actions */}
          <QuickActions
            onUpdatePreferences={() => navigate('/settings')}
            onRedeemReward={() => navigate('/rewards')}
            onContactSupport={() => navigate('/support')}
          />

          {/* Notifications */}
          <NotificationsList onViewAll={() => {}} />
        </div>
      </div>

      {/* AI Insight */}
      <AIInsight
        message="Your wellness score has increased by 12% this month!"
        trend="+12%"
        onViewDetails={() => {}}
      />
    </div>
  );
}