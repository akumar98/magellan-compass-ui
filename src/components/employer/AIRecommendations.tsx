import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles } from 'lucide-react';

export const AIRecommendations: React.FC = () => {
  const recommendations = [
    {
      text: 'Consider increasing match rate for Engineering team to boost engagement to 95%+',
    },
    {
      text: 'Consider increasing match rate for Engineering team to boost engagement to 95%+',
    },
  ];

  return (
    <Card className="bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-accent" />
          AI Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {recommendations.map((rec, index) => (
          <div key={index} className="flex gap-3 text-sm">
            <span className="text-muted-foreground">•</span>
            <p className="flex-1">{rec.text}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};