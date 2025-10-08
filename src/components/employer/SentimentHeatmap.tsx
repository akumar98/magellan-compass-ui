import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

type SentimentLevel = 'low' | 'medium' | 'high';

interface DayData {
  sentiment: SentimentLevel;
}

export const SentimentHeatmap: React.FC = () => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  // Mock 7 weeks of data
  const heatmapData: DayData[][] = Array(7).fill(null).map(() =>
    Array(7).fill(null).map(() => ({
      sentiment: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)] as SentimentLevel,
    }))
  );

  const getSentimentColor = (sentiment: SentimentLevel) => {
    switch (sentiment) {
      case 'low':
        return 'bg-destructive/70';
      case 'medium':
        return 'bg-warning/70';
      case 'high':
        return 'bg-success/70';
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
          <span>Sentiment Heatmap</span>
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded bg-destructive/70" />
              <span className="text-muted-foreground">Low</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded bg-warning/70" />
              <span className="text-muted-foreground">Medium</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded bg-success/70" />
              <span className="text-muted-foreground">High</span>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="grid grid-cols-8 gap-2 text-xs text-muted-foreground mb-1">
            <div />
            {days.map((day) => (
              <div key={day} className="text-center">
                {day}
              </div>
            ))}
          </div>
          
          {heatmapData.map((week, weekIndex) => (
            <div key={weekIndex} className="grid grid-cols-8 gap-2">
              <div className="text-xs text-muted-foreground flex items-center">
                Week {weekIndex + 1}
              </div>
              {week.map((day, dayIndex) => (
                <div
                  key={dayIndex}
                  className={cn(
                    'aspect-square rounded transition-colors hover:opacity-80',
                    getSentimentColor(day.sentiment)
                  )}
                />
              ))}
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground text-center mt-4">
          Last 7 Weeks Employee Sentiment
        </p>
      </CardContent>
    </Card>
  );
};