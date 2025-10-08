import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface MilestoneCard {
  title: string;
  count: number;
  color: string;
  bgColor: string;
}

export const UpcomingMilestonesCards: React.FC = () => {
  const milestones: MilestoneCard[] = [
    {
      title: 'Employees eligible for wellness bonus next week',
      count: 8,
      color: 'text-accent',
      bgColor: 'bg-accent/10',
    },
    {
      title: 'Employees reaching Level 3 next week',
      count: 12,
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
    },
    {
      title: 'Teams completed group challenge',
      count: 5,
      color: 'text-warning',
      bgColor: 'bg-warning/10',
    },
  ];

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Upcoming Milestones</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {milestones.map((milestone, index) => (
            <div key={index} className={`rounded-lg p-4 ${milestone.bgColor}`}>
              <p className="text-sm text-muted-foreground mb-2">{milestone.title}</p>
              <p className={`text-3xl font-bold ${milestone.color}`}>{milestone.count}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};