import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bell, UserCheck, AlertTriangle, DollarSign, Settings, FileText } from 'lucide-react';

interface Notification {
  id: string;
  type: 'approval' | 'budget' | 'policy' | 'submission' | 'alert' | 'system';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

interface EmployerNotificationsListProps {
  onViewAll?: () => void;
}

export const EmployerNotificationsList = ({ onViewAll }: EmployerNotificationsListProps) => {
  const notifications: Notification[] = [
    {
      id: '1',
      type: 'submission',
      title: 'New Reward Submission',
      message: 'John Smith submitted a new reward request for approval',
      time: '5 minutes ago',
      read: false,
    },
    {
      id: '2',
      type: 'approval',
      title: 'Employee Access Approved',
      message: 'Sarah Johnson has been granted platform access',
      time: '1 hour ago',
      read: false,
    },
    {
      id: '3',
      type: 'budget',
      title: 'Budget Threshold Alert',
      message: 'Company matching budget has reached 75% capacity',
      time: '3 hours ago',
      read: true,
    },
    {
      id: '4',
      type: 'policy',
      title: 'Policy Change Applied',
      message: 'Updated matching policy is now active',
      time: '1 day ago',
      read: true,
    },
    {
      id: '5',
      type: 'alert',
      title: 'Burnout Risk Detected',
      message: '3 employees showing elevated burnout indicators',
      time: '2 days ago',
      read: true,
    },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'submission':
        return FileText;
      case 'approval':
        return UserCheck;
      case 'budget':
        return DollarSign;
      case 'policy':
        return Settings;
      case 'alert':
        return AlertTriangle;
      case 'system':
        return Bell;
      default:
        return Bell;
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case 'submission':
        return 'bg-accent/10 text-accent';
      case 'approval':
        return 'bg-success/10 text-success';
      case 'budget':
        return 'bg-warning/10 text-warning';
      case 'policy':
        return 'bg-primary/10 text-primary';
      case 'alert':
        return 'bg-destructive/10 text-destructive';
      case 'system':
        return 'bg-secondary/10 text-secondary';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Recent Notifications</h3>
            {unreadCount > 0 && (
              <Badge variant="secondary" className="bg-primary/10 text-primary">
                {unreadCount} new
              </Badge>
            )}
          </div>
        </div>
        <div className="space-y-3">
          {notifications.slice(0, 4).map((notification) => {
            const Icon = getIcon(notification.type);
            return (
              <div
                key={notification.id}
                className={`flex items-start gap-3 p-3 rounded-lg transition-colors ${
                  !notification.read ? 'bg-muted/50' : 'hover:bg-muted/30'
                }`}
              >
                <div className={`h-10 w-10 rounded-lg flex items-center justify-center flex-shrink-0 ${getIconColor(notification.type)}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h4 className="font-medium text-sm">{notification.title}</h4>
                    {!notification.read && (
                      <div className="h-2 w-2 rounded-full bg-primary flex-shrink-0 mt-1" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-1">{notification.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
                </div>
              </div>
            );
          })}
        </div>
        {onViewAll && (
          <Button variant="ghost" className="w-full mt-4" onClick={onViewAll}>
            View all notifications
          </Button>
        )}
      </CardContent>
    </Card>
  );
};