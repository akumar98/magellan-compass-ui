import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Search, Download, Mail, Building2 } from 'lucide-react';
import { useState } from 'react';

export default function EmployeesManagement() {
  const [searchTerm, setSearchTerm] = useState('');

  const employees = [
    { id: '1', name: 'Sarah Johnson', email: 'sarah@acme.com', company: 'Acme Corp', department: 'Engineering', points: 840, status: 'active' },
    { id: '2', name: 'Michael Chen', email: 'michael@techstart.com', company: 'TechStart Inc', department: 'Sales', points: 620, status: 'active' },
    { id: '3', name: 'Emily Rodriguez', email: 'emily@global.com', company: 'Global Solutions', department: 'Marketing', points: 1200, status: 'active' },
    { id: '4', name: 'David Kim', email: 'david@innovation.com', company: 'Innovation Labs', department: 'Research', points: 450, status: 'inactive' },
    { id: '5', name: 'Lisa Wang', email: 'lisa@digital.com', company: 'Digital Ventures', department: 'Product', points: 980, status: 'active' },
    { id: '6', name: 'James Martinez', email: 'james@techcorp.com', company: 'Tech Corp', department: 'Engineering', points: 1450, status: 'active' },
    { id: '7', name: 'Anna Patel', email: 'anna@startup.com', company: 'StartUp Labs', department: 'Design', points: 780, status: 'active' },
    { id: '8', name: 'Robert Taylor', email: 'robert@bigco.com', company: 'BigCo Inc', department: 'Operations', points: 560, status: 'active' },
    { id: '9', name: 'Maria Garcia', email: 'maria@solutions.com', company: 'Solutions Plus', department: 'HR', points: 920, status: 'active' },
    { id: '10', name: 'John Anderson', email: 'john@ventures.com', company: 'Ventures Co', department: 'Finance', points: 340, status: 'inactive' },
    { id: '11', name: 'Jessica Lee', email: 'jessica@innovation.com', company: 'Innovation Hub', department: 'Product', points: 1100, status: 'active' },
    { id: '12', name: 'Chris Thompson', email: 'chris@global.com', company: 'Global Tech', department: 'Sales', points: 890, status: 'active' },
  ];

  const filteredEmployees = employees.filter(emp =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Employees Management</h1>
            <p className="text-muted-foreground">View and manage all platform users</p>
          </div>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Export Data
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-3xl font-bold mb-1">{employees.length}</p>
                <p className="text-sm text-muted-foreground">Total Employees</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-3xl font-bold mb-1">{employees.filter(e => e.status === 'active').length}</p>
                <p className="text-sm text-muted-foreground">Active Users</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-3xl font-bold mb-1">{(employees.reduce((sum, e) => sum + e.points, 0) / 1000).toFixed(1)}K</p>
                <p className="text-sm text-muted-foreground">Total Points</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search employees..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredEmployees.map((employee) => (
                <div
                  key={employee.id}
                  className="flex items-center gap-4 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                >
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {employee.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{employee.name}</h3>
                      <Badge variant={employee.status === 'active' ? 'default' : 'secondary'}>
                        {employee.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {employee.email}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Building2 className="h-3 w-3" />
                        {employee.company}
                      </span>
                      <span>•</span>
                      <span>{employee.department}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-primary">{employee.points} pts</p>
                    <p className="text-xs text-muted-foreground">Current balance</p>
                  </div>
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
