import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

interface AIInsightProps {
  message: string;
  trend: string;
  onViewDetails?: () => void;
}

export const AIInsight: React.FC<AIInsightProps> = ({ message, trend, onViewDetails }) => {
  return (
    <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
      <CardContent className="pt-6">
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
            <Sparkles className="h-5 w-5 text-accent" />
          </div>
          <div className="flex-1 space-y-2">
            <h3 className="text-sm font-semibold flex items-center gap-2">
              AI Insight
            </h3>
            <p className="text-sm text-muted-foreground">{message}</p>
            {onViewDetails && (
              <Button variant="link" size="sm" className="h-auto p-0 text-accent" onClick={onViewDetails}>
                View Details
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};