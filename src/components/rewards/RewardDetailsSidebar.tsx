import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';


interface RewardDetailsSidebarProps {
  pointsRequired: number;
  currentPoints: number;
  estimatedValue: string;
  redemptionDate: string;
  progressPercent: number;
  onRedeem?: () => void;
  onSaveForLater?: () => void;
}

export const RewardDetailsSidebar: React.FC<RewardDetailsSidebarProps> = ({
  pointsRequired,
  currentPoints,
  estimatedValue,
  redemptionDate,
  progressPercent,
  onRedeem,
  onSaveForLater,
}) => {
  const additionalOptions = [
    { label: 'Shared accommodation (save 15,000 pts)', value: 15000 },
    { label: 'Extend stay to 10 days (+20,000 pts)', value: 20000 },
    { label: 'Premium travel insurance (+5,000 pts)', value: 5000 },
  ];

  return (
    <Card className="sticky top-6">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold">Reward Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Points Info */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Points Required</span>
            <span className="text-lg font-bold">{pointsRequired.toLocaleString()}</span>
          </div>
          
          <div>
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-muted-foreground">Your Points: {currentPoints.toLocaleString()}</span>
              <span className="font-medium text-primary">{progressPercent}% Complete</span>
            </div>
            <Progress value={progressPercent} className="h-2" />
          </div>
          
          <div className="flex items-center justify-between pt-3 border-t">
            <span className="text-sm text-muted-foreground">Estimated Value</span>
            <span className="font-semibold">{estimatedValue}</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Redemption Date</span>
            <span className="text-sm font-medium">{redemptionDate}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-2">
          <Button className="w-full" size="lg" onClick={onRedeem}>
            Redeem Now
          </Button>
          <Button variant="outline" className="w-full" onClick={onSaveForLater}>
            Save for Later
          </Button>
        </div>

        {/* Additional Options */}
        <div className="pt-6 border-t space-y-3">
          <h4 className="text-sm font-semibold">Additional Options</h4>
          {additionalOptions.map((option, index) => (
            <label key={index} className="flex items-start gap-3 cursor-pointer">
              <input type="radio" name="additional-option" className="mt-1" />
              <span className="text-sm flex-1">{option.label}</span>
            </label>
          ))}
        </div>

        {/* Points Needed */}
        <div className="bg-muted rounded-lg p-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Points Needed</span>
            <span className="text-lg font-bold text-primary">30,000 more</span>
          </div>
          <Button variant="link" size="sm" className="h-auto p-0 text-primary">
            How to earn more points →
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};