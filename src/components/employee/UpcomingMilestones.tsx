import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface Milestone {
  title: string;
  unlockDate: string;
  requiredPoints: number;
  currentPoints: number;
  daysLeft: number;
}

interface UpcomingMilestonesProps {
  milestones: Milestone[];
  onViewAll?: () => void;
}

export const UpcomingMilestones: React.FC<UpcomingMilestonesProps> = ({
  milestones,
  onViewAll,
}) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Upcoming Milestones</CardTitle>
          {onViewAll && (
            <Button variant="link" size="sm" onClick={onViewAll} className="text-primary h-auto p-0">
              View all
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {milestones.map((milestone, index) => {
          const progress = (milestone.currentPoints / milestone.requiredPoints) * 100;
          return (
            <div key={index} className="space-y-2 pb-4 border-b last:border-0 last:pb-0">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold text-sm">{milestone.title}</h4>
                  <p className="text-xs text-muted-foreground">
                    Unlock date: {milestone.unlockDate}
                  </p>
                </div>
                <span className="text-xs font-medium text-primary whitespace-nowrap ml-2">
                  {milestone.daysLeft} days left
                </span>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">
                  Required: {milestone.requiredPoints} points
                </p>
                <Progress value={progress} className="h-2" />
                <div className="flex items-center justify-end">
                  <span className="text-xs font-medium text-primary">
                    {Math.round(progress)}% complete
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};