import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bell, UserCheck, AlertTriangle, DollarSign, Settings, FileText, CheckCheck, Trash2 } from 'lucide-react';

export default function EmployerNotifications() {
  const notifications = [
    {
      id: '1',
      type: 'submission',
      title: 'New Reward Submission',
      message: 'John Smith submitted a reward request for Barcelona Weekend worth $2,500',
      time: '5 minutes ago',
      read: false,
      icon: FileText,
      color: 'text-accent',
    },
    {
      id: '2',
      type: 'approval',
      title: 'Employee Access Approved',
      message: 'Sarah Johnson has been granted platform access and onboarding completed',
      time: '1 hour ago',
      read: false,
      icon: UserCheck,
      color: 'text-success',
    },
    {
      id: '3',
      type: 'budget',
      title: 'Budget Threshold Alert',
      message: 'Company matching budget has reached 75% capacity ($33,750 of $45,000)',
      time: '3 hours ago',
      read: false,
      icon: DollarSign,
      color: 'text-warning',
    },
    {
      id: '4',
      type: 'policy',
      title: 'Policy Change Applied',
      message: 'Updated matching policy (75% match rate) is now active for all employees',
      time: '1 day ago',
      read: true,
      icon: Settings,
      color: 'text-primary',
    },
    {
      id: '5',
      type: 'alert',
      title: 'Burnout Risk Detected',
      message: '3 employees showing elevated burnout indicators. Review recommended.',
      time: '2 days ago',
      read: true,
      icon: AlertTriangle,
      color: 'text-destructive',
    },
    {
      id: '6',
      type: 'submission',
      title: 'Pending Approvals',
      message: 'You have 5 pending reward approval requests requiring attention',
      time: '2 days ago',
      read: true,
      icon: FileText,
      color: 'text-accent',
    },
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Notifications</h1>
            <p className="text-muted-foreground">
              Stay updated with employee activities, approvals, and system alerts
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <CheckCheck className="h-4 w-4 mr-2" />
              Mark All Read
            </Button>
            <Button variant="outline" size="sm">
              <Trash2 className="h-4 w-4 mr-2" />
              Clear All
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Unread</p>
                  <p className="text-2xl font-bold">{unreadCount}</p>
                </div>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Bell className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total</p>
                  <p className="text-2xl font-bold">{notifications.length}</p>
                </div>
                <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                  <Bell className="h-6 w-6 text-secondary" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending Actions</p>
                  <p className="text-2xl font-bold">8</p>
                </div>
                <div className="h-12 w-12 rounded-lg bg-warning/10 flex items-center justify-center">
                  <FileText className="h-6 w-6 text-warning" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Notifications List */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="unread">Unread ({unreadCount})</TabsTrigger>
            <TabsTrigger value="submissions">Submissions</TabsTrigger>
            <TabsTrigger value="alerts">Alerts</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4 mt-4">
            {notifications.map((notification) => {
              const Icon = notification.icon;
              return (
                <Card key={notification.id} className={!notification.read ? 'border-primary/50' : ''}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className={`h-10 w-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0 ${notification.color}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h3 className="font-semibold">{notification.title}</h3>
                          {!notification.read && (
                            <Badge variant="secondary" className="bg-primary/10 text-primary">New</Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>
                        <p className="text-xs text-muted-foreground">{notification.time}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </TabsContent>

          <TabsContent value="unread" className="space-y-4 mt-4">
            {notifications
              .filter(n => !n.read)
              .map((notification) => {
                const Icon = notification.icon;
                return (
                  <Card key={notification.id} className="border-primary/50">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className={`h-10 w-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0 ${notification.color}`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h3 className="font-semibold">{notification.title}</h3>
                            <Badge variant="secondary" className="bg-primary/10 text-primary">New</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>
                          <p className="text-xs text-muted-foreground">{notification.time}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
          </TabsContent>

          <TabsContent value="submissions" className="space-y-4 mt-4">
            {notifications
              .filter(n => n.type === 'submission')
              .map((notification) => {
                const Icon = notification.icon;
                return (
                  <Card key={notification.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className={`h-10 w-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0 ${notification.color}`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold mb-1">{notification.title}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>
                          <p className="text-xs text-muted-foreground">{notification.time}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
          </TabsContent>

          <TabsContent value="alerts" className="space-y-4 mt-4">
            {notifications
              .filter(n => n.type === 'alert' || n.type === 'budget')
              .map((notification) => {
                const Icon = notification.icon;
                return (
                  <Card key={notification.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        <div className={`h-10 w-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0 ${notification.color}`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold mb-1">{notification.title}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>
                          <p className="text-xs text-muted-foreground">{notification.time}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}