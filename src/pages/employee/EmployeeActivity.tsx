import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Award, Gift, TrendingUp, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function EmployeeActivity() {
  const activities = [
    { type: 'earned', description: 'Project completion bonus', points: '+500', date: '2024-01-15', icon: TrendingUp, color: 'success' },
    { type: 'claimed', description: 'Paris Weekend Getaway', points: '-2500', date: '2024-01-12', icon: Gift, color: 'primary' },
    { type: 'earned', description: 'Monthly achievement', points: '+350', date: '2024-01-10', icon: Award, color: 'accent' },
    { type: 'earned', description: 'Team collaboration', points: '+200', date: '2024-01-08', icon: TrendingUp, color: 'success' },
    { type: 'claimed', description: 'Flight Voucher to Europe', points: '-3000', date: '2024-01-05', icon: Gift, color: 'primary' },
    { type: 'earned', description: 'Customer satisfaction', points: '+450', date: '2024-01-03', icon: Award, color: 'accent' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2">My Activity</h1>
          <p className="text-muted-foreground">Track your points history and claimed travel rewards</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card-stat bg-gradient-to-br from-success/10 to-success/5">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-success/10 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Earned</p>
                <p className="text-2xl font-bold text-success">+1,500 pts</p>
              </div>
            </div>
          </div>
          
          <div className="card-stat bg-gradient-to-br from-primary/10 to-primary/5">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Gift className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Redeemed</p>
                <p className="text-2xl font-bold text-primary">-1,100 pts</p>
              </div>
            </div>
          </div>
          
          <div className="card-stat bg-gradient-to-br from-accent/10 to-accent/5">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center">
                <Award className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Net Balance</p>
                <p className="text-2xl font-bold text-accent">+400 pts</p>
              </div>
            </div>
          </div>
        </div>

        {/* Activity Timeline */}
        <div className="card-stat">
          <h2 className="text-xl font-bold mb-6">Activity Timeline</h2>
          <div className="space-y-4">
            {activities.map((activity, index) => {
              const Icon = activity.icon;
              const colorClasses = {
                success: 'bg-success/10 text-success',
                primary: 'bg-primary/10 text-primary',
                accent: 'bg-accent/10 text-accent',
              };
              
              return (
                <div key={index} className="flex items-center gap-4 pb-4 border-b border-border last:border-0">
                  <div className={`h-12 w-12 rounded-xl flex items-center justify-center ${colorClasses[activity.color as keyof typeof colorClasses]}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{activity.description}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Calendar className="h-3 w-3 text-muted-foreground" />
                      <p className="text-xs text-muted-foreground">{activity.date}</p>
                    </div>
                  </div>
                  <Badge 
                    variant={activity.type === 'earned' ? 'default' : 'secondary'}
                    className="text-sm font-bold"
                  >
                    {activity.points}
                  </Badge>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
