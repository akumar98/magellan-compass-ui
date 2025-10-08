import { useNavigate } from 'react-router-dom';
import { StatsWithChart } from '@/components/employer/StatsWithChart';
import { ContributionsVsMatch } from '@/components/employer/ContributionsVsMatch';
import { RedemptionFunnel } from '@/components/employer/RedemptionFunnel';
import { SentimentHeatmap } from '@/components/employer/SentimentHeatmap';
import { EngagementBreakdown } from '@/components/employer/EngagementBreakdown';
import { MilestoneOverview } from '@/components/employer/MilestoneOverview';
import { UpcomingMilestonesCards } from '@/components/employer/UpcomingMilestonesCards';
import { QuickActionsEmployer } from '@/components/employer/QuickActionsEmployer';
import { AIRecommendations } from '@/components/employer/AIRecommendations';
import { Users, Gift, DollarSign, TrendingUp } from 'lucide-react';

export default function EmployerDashboard() {
  const navigate = useNavigate();

  const participationData = [65, 68, 70, 72, 75, 76, 78];
  const redemptionData = [58, 60, 61, 63, 64, 65, 65];
  const contributionsData = [220, 225, 230, 235, 240, 245, 248];
  const roiData = [1.0, 1.05, 1.1, 1.15, 1.18, 1.2, 1.2];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Employer Dashboard</h1>
        <p className="text-muted-foreground">Overview of employee engagement and reward performance</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsWithChart
          title="Employee Participation Rate"
          value="78%"
          change="↑4.2%"
          isPositive={true}
          icon={<Users className="h-4 w-4" />}
          iconColor="bg-accent/10 text-accent"
          data={participationData}
          chartColor="hsl(var(--chart-2))"
        />
        <StatsWithChart
          title="Experience Redemption Rate"
          value="65%"
          change="↑2.8%"
          isPositive={true}
          icon={<Gift className="h-4 w-4" />}
          iconColor="bg-secondary/10 text-secondary"
          data={redemptionData}
          chartColor="hsl(var(--chart-3))"
        />
        <StatsWithChart
          title="Total Contributions"
          value="$248K"
          change="↑12.4%"
          isPositive={true}
          icon={<DollarSign className="h-4 w-4" />}
          iconColor="bg-warning/10 text-warning"
          data={contributionsData}
          chartColor="hsl(var(--chart-4))"
        />
        <StatsWithChart
          title="Estimated ROI"
          value="$1.2M"
          change="↑8.7%"
          isPositive={true}
          icon={<TrendingUp className="h-4 w-4" />}
          iconColor="bg-primary/10 text-primary"
          data={roiData}
          chartColor="hsl(var(--chart-1))"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ContributionsVsMatch />
        <RedemptionFunnel />
      </div>

      {/* Heatmap and Engagement */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SentimentHeatmap />
        </div>
        <EngagementBreakdown />
      </div>

      {/* Milestone Overview */}
      <MilestoneOverview />

      {/* Upcoming Milestones and Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <UpcomingMilestonesCards />
        </div>
        <QuickActionsEmployer
          onAddEmployees={() => navigate('/employer/team')}
          onAdjustPolicy={() => navigate('/settings')}
          onExportReport={() => navigate('/employer/reports')}
        />
      </div>

      {/* AI Recommendations */}
      <AIRecommendations />
    </div>
  );
}