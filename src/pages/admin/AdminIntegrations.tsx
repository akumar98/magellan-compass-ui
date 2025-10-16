import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Plus, CheckCircle, XCircle, Settings } from 'lucide-react';

export default function AdminIntegrations() {
  // Mock integration data
  const integrations = [
    {
      id: '1',
      name: 'Workday',
      description: 'Enterprise HR and finance management',
      category: 'HRIS',
      status: 'connected',
      lastSync: '2 hours ago',
      logo: '🏢',
    },
    {
      id: '2',
      name: 'ADP Workforce Now',
      description: 'Payroll and HR management',
      category: 'HRIS',
      status: 'connected',
      lastSync: '1 hour ago',
      logo: '💼',
    },
    {
      id: '3',
      name: 'BambooHR',
      description: 'HR software for small & medium businesses',
      category: 'HRIS',
      status: 'disconnected',
      lastSync: 'Never',
      logo: '🎋',
    },
    {
      id: '4',
      name: 'Slack',
      description: 'Team communication and collaboration',
      category: 'Communication',
      status: 'connected',
      lastSync: '10 minutes ago',
      logo: '💬',
    },
    {
      id: '5',
      name: 'Microsoft Teams',
      description: 'Chat, meetings, and collaboration',
      category: 'Communication',
      status: 'disconnected',
      lastSync: 'Never',
      logo: '📞',
    },
    {
      id: '6',
      name: 'Google Workspace',
      description: 'Email, calendar, and productivity tools',
      category: 'Productivity',
      status: 'connected',
      lastSync: '30 minutes ago',
      logo: '📧',
    },
    {
      id: '7',
      name: 'Expedia Partner Solutions',
      description: 'Travel booking and management API',
      category: 'Travel',
      status: 'connected',
      lastSync: '4 hours ago',
      logo: '✈️',
    },
    {
      id: '8',
      name: 'Stripe',
      description: 'Payment processing and billing',
      category: 'Finance',
      status: 'connected',
      lastSync: '15 minutes ago',
      logo: '💳',
    },
  ];

  const categories = Array.from(new Set(integrations.map(i => i.category)));

  const getStatusBadge = (status: string) => {
    if (status === 'connected') {
      return (
        <Badge className="bg-success/10 text-success border-success/20">
          <CheckCircle className="h-3 w-3 mr-1" />
          Connected
        </Badge>
      );
    }
    return (
      <Badge variant="outline" className="text-muted-foreground">
        <XCircle className="h-3 w-3 mr-1" />
        Disconnected
      </Badge>
    );
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Integrations</h1>
            <p className="text-muted-foreground">
              Manage third-party integrations and API connections
            </p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Integration
          </Button>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Integrations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{integrations.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Active</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-success">
                {integrations.filter(i => i.status === 'connected').length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Inactive</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-muted-foreground">
                {integrations.filter(i => i.status === 'disconnected').length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{categories.length}</div>
            </CardContent>
          </Card>
        </div>

        {/* Integrations by Category */}
        {categories.map((category) => (
          <div key={category} className="space-y-4">
            <h2 className="text-xl font-semibold">{category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {integrations
                .filter(integration => integration.category === category)
                .map((integration) => (
                  <Card key={integration.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="text-4xl">{integration.logo}</div>
                          <div>
                            <CardTitle className="text-base">{integration.name}</CardTitle>
                            <CardDescription className="text-xs mt-1">
                              {integration.description}
                            </CardDescription>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          {getStatusBadge(integration.status)}
                          <span className="text-xs text-muted-foreground">
                            Last sync: {integration.lastSync}
                          </span>
                        </div>
                        <div className="flex gap-2">
                          {integration.status === 'connected' ? (
                            <>
                              <Button variant="outline" size="sm" className="flex-1">
                                <Settings className="h-3 w-3 mr-1" />
                                Configure
                              </Button>
                              <Button variant="outline" size="sm" className="flex-1">
                                Disconnect
                              </Button>
                            </>
                          ) : (
                            <Button size="sm" className="w-full">
                              Connect
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        ))}
      </div>
    </DashboardLayout>
  );
}
