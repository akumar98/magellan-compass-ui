import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';

interface MatchScoreProps {
  score: number;
}

export const MatchScore: React.FC<MatchScoreProps> = ({ score }) => {
  return (
    <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
      <CardContent className="pt-6">
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
            <Star className="h-5 w-5 text-primary fill-primary" />
          </div>
          <div className="flex-1">
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-2xl font-bold text-primary">{score}%</span>
              <span className="text-sm text-muted-foreground">match with your preferences and wellness goals</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};