import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface FunnelStage {
  label: string;
  value: number;
  maxValue: number;
}

export const RedemptionFunnel: React.FC = () => {
  const stages: FunnelStage[] = [
    { label: 'Onboarded', value: 850, maxValue: 850 },
    { label: 'Milestone Reached', value: 680, maxValue: 850 },
    { label: 'Reward Selected', value: 520, maxValue: 850 },
    { label: 'Redeemed', value: 380, maxValue: 850 },
  ];

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Redemption Funnel</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {stages.map((stage, index) => {
            const percentage = (stage.value / stage.maxValue) * 100;
            return (
              <div key={index} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{stage.label}</span>
                  <span className="text-muted-foreground">{stage.value}</span>
                </div>
                <div className="h-10 bg-muted rounded-lg overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-accent to-accent/80 flex items-center justify-end pr-3"
                    style={{ width: `${percentage}%` }}
                  >
                    <span className="text-xs font-medium text-white">
                      {Math.round(percentage)}%
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};