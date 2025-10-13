import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter, Download, AlertCircle, CheckCircle, Info, XCircle } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function AuditLogs() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const logs = [
    { id: '1', action: 'User Login', user: 'admin@magellan.ai', type: 'auth', severity: 'info', timestamp: '2024-03-15 10:32:15', details: 'Successful login from IP 192.168.1.1' },
    { id: '2', action: 'Company Created', user: 'admin@magellan.ai', type: 'admin', severity: 'success', timestamp: '2024-03-15 09:15:42', details: 'New company "Acme Corp" added' },
    { id: '3', action: 'Failed Login Attempt', user: 'unknown@email.com', type: 'auth', severity: 'warning', timestamp: '2024-03-15 08:45:33', details: 'Multiple failed login attempts detected' },
    { id: '4', action: 'Reward Approved', user: 'employer@acme.com', type: 'approval', severity: 'success', timestamp: '2024-03-14 16:22:18', details: 'Weekend in Paris approved for Sarah Johnson' },
    { id: '5', action: 'Database Backup', user: 'system', type: 'system', severity: 'info', timestamp: '2024-03-14 03:00:00', details: 'Automated daily backup completed' },
    { id: '6', action: 'Settings Changed', user: 'admin@magellan.ai', type: 'admin', severity: 'warning', timestamp: '2024-03-13 14:55:07', details: 'Platform maintenance mode enabled' },
    { id: '7', action: 'API Rate Limit Exceeded', user: 'api_user', type: 'system', severity: 'error', timestamp: '2024-03-13 11:30:45', details: 'API rate limit exceeded for user' },
    { id: '8', action: 'Reward Deleted', user: 'admin@magellan.ai', type: 'admin', severity: 'warning', timestamp: '2024-03-12 13:18:29', details: 'Reward "Old Package" removed from catalog' },
  ];

  const getSeverityConfig = (severity: string) => {
    switch (severity) {
      case 'success': return { color: 'bg-success text-success-foreground', icon: CheckCircle };
      case 'info': return { color: 'bg-info text-info-foreground', icon: Info };
      case 'warning': return { color: 'bg-warning text-warning-foreground', icon: AlertCircle };
      case 'error': return { color: 'bg-destructive text-destructive-foreground', icon: XCircle };
      default: return { color: 'bg-muted text-muted-foreground', icon: Info };
    }
  };

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.details.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || log.type === filterType;
    return matchesSearch && matchesFilter;
  });

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Audit Logs</h1>
            <p className="text-muted-foreground">Monitor system activities and security events</p>
          </div>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export Logs
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Events</p>
                  <p className="text-2xl font-bold">{logs.length}</p>
                </div>
                <Info className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Warnings</p>
                  <p className="text-2xl font-bold">{logs.filter(l => l.severity === 'warning').length}</p>
                </div>
                <AlertCircle className="h-8 w-8 text-warning" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Errors</p>
                  <p className="text-2xl font-bold">{logs.filter(l => l.severity === 'error').length}</p>
                </div>
                <XCircle className="h-8 w-8 text-destructive" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Success</p>
                  <p className="text-2xl font-bold">{logs.filter(l => l.severity === 'success').length}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-success" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search logs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-full md:w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="auth">Authentication</SelectItem>
                  <SelectItem value="admin">Admin Actions</SelectItem>
                  <SelectItem value="approval">Approvals</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {filteredLogs.map((log) => {
                const severityConfig = getSeverityConfig(log.severity);
                const SeverityIcon = severityConfig.icon;

                return (
                  <div
                    key={log.id}
                    className="flex items-start gap-4 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                  >
                    <div className={`h-10 w-10 rounded-lg flex items-center justify-center flex-shrink-0 ${severityConfig.color}`}>
                      <SeverityIcon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{log.action}</h3>
                        <Badge variant="outline">{log.type}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{log.details}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>User: {log.user}</span>
                        <span>•</span>
                        <span>{log.timestamp}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
