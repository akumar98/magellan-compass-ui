import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface MilestoneLevel {
  level: string;
  name: string;
  count: number;
  color: string;
  bgColor: string;
}

export const MilestoneOverview: React.FC = () => {
  const levels: MilestoneLevel[] = [
    {
      level: 'Level 1',
      name: 'Explorer',
      count: 136,
      color: 'text-accent',
      bgColor: 'bg-accent/10',
    },
    {
      level: 'Level 2',
      name: 'Voyager',
      count: 284,
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
    },
    {
      level: 'Level 3',
      name: 'Pioneer',
      count: 215,
      color: 'text-warning',
      bgColor: 'bg-warning/10',
    },
    {
      level: 'Level 4',
      name: 'Navigator',
      count: 115,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
    },
  ];

  const totalEmployees = levels.reduce((sum, level) => sum + level.count, 0);

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Milestone Overview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {levels.map((level, index) => (
            <div key={index} className={`rounded-lg p-4 ${level.bgColor}`}>
              <p className={`text-sm font-medium ${level.color} mb-1`}>
                {level.level}: {level.name}
              </p>
              <p className="text-2xl font-bold">{level.count}</p>
              <p className="text-xs text-muted-foreground mt-1">Employees</p>
              <Progress
                value={(level.count / totalEmployees) * 100}
                className="h-1 mt-2"
              />
            </div>
          ))}
        </div>
        <p className="text-sm text-muted-foreground text-center pt-2 border-t">
          {totalEmployees} total active employees across all milestone levels
        </p>
      </CardContent>
    </Card>
  );
};