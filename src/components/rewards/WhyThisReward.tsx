import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Trophy, Heart } from 'lucide-react';

interface WhyThisRewardProps {
  achievement?: {
    title: string;
    description: string;
  };
  preferences?: {
    title: string;
    description: string;
  };
}

export const WhyThisReward: React.FC<WhyThisRewardProps> = ({
  achievement,
  preferences,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Why This Reward?</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground leading-relaxed">
          Our AI has analyzed your work patterns, recent achievements, and personal preferences to
          recommend this Alpine retreat specifically for you.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievement && (
            <div className="flex gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Trophy className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-sm mb-1">{achievement.title}</h4>
                <p className="text-xs text-muted-foreground">{achievement.description}</p>
              </div>
            </div>
          )}
          
          {preferences && (
            <div className="flex gap-3">
              <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                <Heart className="h-5 w-5 text-accent" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-sm mb-1">{preferences.title}</h4>
                <p className="text-xs text-muted-foreground">{preferences.description}</p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};