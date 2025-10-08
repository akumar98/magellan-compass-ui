import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, MoreVertical } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface RewardPreviewProps {
  onExploreAll?: () => void;
}

export const RewardPreview: React.FC<RewardPreviewProps> = ({ onExploreAll }) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold">Your Reward Preview</CardTitle>
          <MoreVertical className="h-4 w-4 text-muted-foreground" />
        </div>
        <p className="text-xs text-muted-foreground">AI-picked just for you</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="relative rounded-lg overflow-hidden">
          <div className="absolute top-2 right-2 z-10">
            <Badge className="bg-primary text-primary-foreground text-xs gap-1">
              <Sparkles className="h-3 w-3" />
              Suggested by AI
            </Badge>
          </div>
          <div className="aspect-video bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 rounded-lg" />
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold">3-Day Spa Retreat in Colorado</h3>
          <div className="flex gap-2 flex-wrap">
            <Badge variant="secondary" className="text-xs">Wellness</Badge>
            <Badge variant="secondary" className="text-xs">Solo</Badge>
            <Badge variant="secondary" className="text-xs">$1K-3K</Badge>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progress to unlock</span>
            <span className="font-medium text-primary">78%</span>
          </div>
          <Progress value={78} className="h-2" />
        </div>

        <Button className="w-full" onClick={onExploreAll}>
          Explore All Rewards
        </Button>
      </CardContent>
    </Card>
  );
};