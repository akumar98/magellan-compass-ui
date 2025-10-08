import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface Department {
  name: string;
  engagement: number;
}

export const EngagementBreakdown: React.FC = () => {
  const departments: Department[] = [
    { name: 'Engineering', engagement: 92 },
    { name: 'Marketing', engagement: 87 },
    { name: 'Sales', engagement: 78 },
    { name: 'HR', engagement: 95 },
    { name: 'Operations', engagement: 71 },
  ];

  const stats = [
    { label: 'Average Milestone Level', value: '2.7' },
    { label: 'Avg. Time to Redeem', value: '14 days' },
    { label: 'Overall Engagement', value: '84%' },
  ];

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Engagement Breakdown</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          {departments.map((dept) => (
            <div key={dept.name} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{dept.name}</span>
                <span className="text-muted-foreground">{dept.engagement}%</span>
              </div>
              <Progress value={dept.engagement} className="h-2" />
            </div>
          ))}
        </div>

        <div className="pt-4 border-t space-y-3">
          {stats.map((stat, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{stat.label}</span>
              <span className="text-sm font-semibold">{stat.value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};