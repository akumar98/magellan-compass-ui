import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { History, CheckCircle, Clock, XCircle, Download } from 'lucide-react';

export default function RedemptionHistory() {
  const redemptions = [
    {
      id: '1',
      reward: 'Weekend in Paris',
      status: 'completed',
      date: '2024-02-15',
      points: 500,
      imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400',
    },
    {
      id: '2',
      reward: 'Bali Wellness Retreat',
      status: 'pending',
      date: '2024-03-20',
      points: 1200,
      imageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400',
    },
    {
      id: '3',
      reward: 'Tokyo Food Tour',
      status: 'approved',
      date: '2024-04-10',
      points: 800,
      imageUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400',
    },
    {
      id: '4',
      reward: 'Swiss Alps Skiing',
      status: 'cancelled',
      date: '2024-01-05',
      points: 1500,
      imageUrl: 'https://images.unsplash.com/photo-1551524559-8af4e6624178?w=400',
    },
  ];

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'completed':
        return { color: 'bg-success text-success-foreground', icon: CheckCircle, label: 'Completed' };
      case 'pending':
        return { color: 'bg-warning text-warning-foreground', icon: Clock, label: 'Pending Approval' };
      case 'approved':
        return { color: 'bg-info text-info-foreground', icon: CheckCircle, label: 'Approved' };
      case 'cancelled':
        return { color: 'bg-destructive text-destructive-foreground', icon: XCircle, label: 'Cancelled' };
      default:
        return { color: 'bg-muted text-muted-foreground', icon: Clock, label: 'Unknown' };
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Redemption History</h1>
            <p className="text-muted-foreground">Track all your travel reward redemptions</p>
          </div>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export History
          </Button>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Redeemed</p>
                  <p className="text-2xl font-bold">4,000</p>
                </div>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <History className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Completed</p>
                  <p className="text-2xl font-bold">1</p>
                </div>
                <CheckCircle className="h-8 w-8 text-success" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending</p>
                  <p className="text-2xl font-bold">2</p>
                </div>
                <Clock className="h-8 w-8 text-warning" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Cancelled</p>
                  <p className="text-2xl font-bold">1</p>
                </div>
                <XCircle className="h-8 w-8 text-destructive" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Redemption List */}
        <Card>
          <CardHeader>
            <CardTitle>All Redemptions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {redemptions.map((redemption) => {
              const statusConfig = getStatusConfig(redemption.status);
              const StatusIcon = statusConfig.icon;

              return (
                <div
                  key={redemption.id}
                  className="flex items-center gap-4 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                >
                  <img
                    src={redemption.imageUrl}
                    alt={redemption.reward}
                    className="h-20 w-20 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">{redemption.reward}</h3>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span>{redemption.points} points</span>
                      <span>•</span>
                      <span>{new Date(redemption.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <Badge className={statusConfig.color}>
                    <StatusIcon className="h-3 w-3 mr-1" />
                    {statusConfig.label}
                  </Badge>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
