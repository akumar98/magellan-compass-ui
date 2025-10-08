import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DollarSign, Award, Sparkles } from 'lucide-react';

interface Notification {
  id: string;
  type: 'contribution' | 'milestone' | 'suggestion';
  title: string;
  description: string;
  time: string;
}

interface NotificationsListProps {
  onViewAll?: () => void;
}

export const NotificationsList: React.FC<NotificationsListProps> = ({ onViewAll }) => {
  const notifications: Notification[] = [
    {
      id: '1',
      type: 'contribution',
      title: 'Contribution Confirmed',
      description: 'Your monthly contribution of $400 was processed successfully.',
      time: '2 hours ago',
    },
    {
      id: '2',
      type: 'milestone',
      title: 'Milestone Reached',
      description: 'You\'ve reached 75% of your "Weekend Getaway" milestone!',
      time: 'Yesterday',
    },
    {
      id: '3',
      type: 'suggestion',
      title: 'New Reward Suggestion',
      description: 'Based on your preferences, we\'ve added a new reward option.',
      time: '2 days ago',
    },
  ];

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'contribution':
        return <DollarSign className="h-4 w-4" />;
      case 'milestone':
        return <Award className="h-4 w-4" />;
      case 'suggestion':
        return <Sparkles className="h-4 w-4" />;
    }
  };

  const getIconColor = (type: Notification['type']) => {
    switch (type) {
      case 'contribution':
        return 'bg-primary/10 text-primary';
      case 'milestone':
        return 'bg-success/10 text-success';
      case 'suggestion':
        return 'bg-accent/10 text-accent';
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold">Notifications</CardTitle>
          {onViewAll && (
            <Button variant="link" size="sm" onClick={onViewAll} className="text-primary h-auto p-0">
              View all
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {notifications.map((notification) => (
          <div key={notification.id} className="flex gap-3 pb-3 border-b last:border-0 last:pb-0">
            <div className={`h-9 w-9 rounded-full flex items-center justify-center flex-shrink-0 ${getIconColor(notification.type)}`}>
              {getIcon(notification.type)}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium">{notification.title}</h4>
              <p className="text-xs text-muted-foreground line-clamp-2">{notification.description}</p>
              <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};