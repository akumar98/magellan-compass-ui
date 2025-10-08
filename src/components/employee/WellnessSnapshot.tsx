import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Info } from 'lucide-react';
import { cn } from '@/lib/utils';

interface WellnessSnapshotProps {
  riskLevel: 'Low' | 'Medium' | 'High';
  score: number;
  maxScore: number;
}

export const WellnessSnapshot: React.FC<WellnessSnapshotProps> = ({
  riskLevel,
  score,
  maxScore,
}) => {
  const getRiskColor = () => {
    switch (riskLevel) {
      case 'Low':
        return 'text-success';
      case 'Medium':
        return 'text-warning';
      case 'High':
        return 'text-destructive';
    }
  };

  const getProgressColor = () => {
    switch (riskLevel) {
      case 'Low':
        return 'bg-success';
      case 'Medium':
        return 'bg-warning';
      case 'High':
        return 'bg-destructive';
    }
  };

  const percentage = (score / maxScore) * 100;

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Wellness Snapshot</CardTitle>
          <Info className="h-4 w-4 text-muted-foreground" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm text-muted-foreground mb-2">Your burnout risk is</p>
          <p className={cn('text-3xl font-bold', getRiskColor())}>{riskLevel}</p>
          <p className="text-xs text-muted-foreground mt-1">Score: {score}/{maxScore}</p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>High Risk</span>
            <span>Low Risk</span>
          </div>
          <div className="relative h-2 w-full bg-muted rounded-full overflow-hidden">
            <div
              className={cn('h-full rounded-full transition-all duration-500', getProgressColor())}
              style={{ width: `${percentage}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Based on:</span>
            <div className="flex gap-3">
              <span>Work Hours</span>
              <span>Time Off</span>
              <span>Activity</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};