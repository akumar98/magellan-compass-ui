import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Settings, Gift, Headphones, ChevronRight } from 'lucide-react';

interface QuickActionsProps {
  onUpdatePreferences?: () => void;
  onRedeemReward?: () => void;
  onContactSupport?: () => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({
  onUpdatePreferences,
  onRedeemReward,
  onContactSupport,
}) => {
  const actions = [
    {
      icon: Settings,
      label: 'Update Preferences',
      onClick: onUpdatePreferences,
      color: 'text-primary bg-primary/10',
    },
    {
      icon: Gift,
      label: 'Redeem Reward',
      onClick: onRedeemReward,
      color: 'text-accent bg-accent/10',
    },
    {
      icon: Headphones,
      label: 'Contact Support',
      onClick: onContactSupport,
      color: 'text-muted-foreground bg-muted',
    },
  ];

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {actions.map((action, index) => (
          <Button
            key={index}
            variant="ghost"
            className="w-full justify-between h-auto py-3 px-4"
            onClick={action.onClick}
          >
            <div className="flex items-center gap-3">
              <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${action.color}`}>
                <action.icon className="h-4 w-4" />
              </div>
              <span className="text-sm font-medium">{action.label}</span>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </Button>
        ))}
      </CardContent>
    </Card>
  );
};