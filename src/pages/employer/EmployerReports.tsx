import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { TrendingUp, Download, Calendar, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';

export default function EmployerReports() {
  const handleDownload = (reportType: string) => {
    toast.success(`Downloading ${reportType} report...`);
  };

  const reports = [
    { 
      title: 'Monthly Travel Rewards Summary',
      description: 'Overview of all travel rewards booked this month',
      metric: '12 bookings',
      trend: '+8% from last month',
      icon: TrendingUp 
    },
    { 
      title: 'Budget Utilization',
      description: 'Current month spending vs budget allocation',
      metric: '$8,450 / $10,000',
      trend: '84.5% utilized',
      icon: DollarSign 
    },
    { 
      title: 'Employee Engagement',
      description: 'Platform activity and reward redemption rates',
      metric: '92% active',
      trend: '+5% from last month',
      icon: TrendingUp 
    },
  ];

  const monthlyData = [
    { month: 'January', bookings: 8, spending: 21000 },
    { month: 'February', bookings: 12, spending: 31500 },
    { month: 'March', bookings: 15, spending: 42000 },
    { month: 'April', bookings: 10, spending: 28500 },
    { month: 'May', bookings: 14, spending: 38000 },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Reports & Analytics</h1>
            <p className="text-muted-foreground">Track team performance and travel reward usage</p>
          </div>
          <Button onClick={() => handleDownload('comprehensive')}>
            <Download className="h-4 w-4 mr-2" />
            Export All
          </Button>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reports.map((report, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className={`h-12 w-12 rounded-xl bg-${index === 0 ? 'primary' : index === 1 ? 'secondary' : 'accent'}/10 flex items-center justify-center`}>
                  <report.icon className={`h-6 w-6 text-${index === 0 ? 'primary' : index === 1 ? 'secondary' : 'accent'}`} />
                </div>
                <Button variant="ghost" size="sm" onClick={() => handleDownload(report.title)}>
                  <Download className="h-4 w-4" />
                </Button>
              </div>
              <h3 className="font-semibold mb-2">{report.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{report.description}</p>
              <div className="flex items-baseline gap-2">
                <p className="text-2xl font-bold">{report.metric}</p>
                <p className="text-sm text-success">{report.trend}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Monthly Trends */}
        <div className="card-stat">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Travel Reward Trends</h2>
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              Last 5 Months
            </Button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold">Month</th>
                  <th className="text-left py-3 px-4 font-semibold">Bookings</th>
                  <th className="text-left py-3 px-4 font-semibold">Total Spending</th>
                  <th className="text-left py-3 px-4 font-semibold">Avg per Booking</th>
                </tr>
              </thead>
              <tbody>
                {monthlyData.map((data, index) => (
                  <tr key={index} className="border-b border-border last:border-0">
                    <td className="py-3 px-4">{data.month}</td>
                    <td className="py-3 px-4">{data.bookings}</td>
                    <td className="py-3 px-4 font-semibold">${data.spending.toLocaleString()}</td>
                    <td className="py-3 px-4 text-muted-foreground">
                      ${Math.round(data.spending / data.bookings).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="card-stat bg-gradient-to-br from-primary/10 to-primary/5">
            <h3 className="font-semibold mb-2">Generate Custom Report</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Create a custom report with specific date ranges and metrics
            </p>
            <Button variant="outline" onClick={() => toast.info('Custom report builder coming soon!')}>
              Create Report
            </Button>
          </div>
          <div className="card-stat bg-gradient-to-br from-secondary/10 to-secondary/5">
            <h3 className="font-semibold mb-2">Schedule Reports</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Set up automatic report delivery to your email
            </p>
            <Button variant="outline" onClick={() => toast.info('Report scheduling coming soon!')}>
              Configure
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}