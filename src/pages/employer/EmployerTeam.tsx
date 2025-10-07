import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Users, Search, Mail, Phone, Calendar } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';

export default function EmployerTeam() {
  const [searchTerm, setSearchTerm] = useState('');

  const teamMembers = [
    { id: 1, name: 'Sarah Johnson', email: 'sarah.j@company.com', phone: '+1 234-567-8901', role: 'Senior Developer', department: 'Engineering', points: 3240, joinDate: '2023-01-15', status: 'active' },
    { id: 2, name: 'Mike Chen', email: 'mike.c@company.com', phone: '+1 234-567-8902', role: 'Product Manager', department: 'Product', points: 2890, joinDate: '2023-03-20', status: 'active' },
    { id: 3, name: 'Emily Davis', email: 'emily.d@company.com', phone: '+1 234-567-8903', role: 'UX Designer', department: 'Design', points: 3150, joinDate: '2023-02-10', status: 'active' },
    { id: 4, name: 'James Wilson', email: 'james.w@company.com', phone: '+1 234-567-8904', role: 'Marketing Lead', department: 'Marketing', points: 2650, joinDate: '2023-04-05', status: 'active' },
    { id: 5, name: 'Lisa Anderson', email: 'lisa.a@company.com', phone: '+1 234-567-8905', role: 'Data Analyst', department: 'Analytics', points: 2980, joinDate: '2023-05-12', status: 'active' },
  ];

  const filteredMembers = teamMembers.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2">My Team</h1>
          <p className="text-muted-foreground">Manage and monitor your team members</p>
        </div>

        {/* Search & Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, email, or department..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="card-stat bg-gradient-to-br from-primary/10 to-primary/5">
            <p className="text-sm text-muted-foreground">Total Members</p>
            <p className="text-2xl font-bold">{teamMembers.length}</p>
          </div>
          <div className="card-stat bg-gradient-to-br from-secondary/10 to-secondary/5">
            <p className="text-sm text-muted-foreground">Avg Points</p>
            <p className="text-2xl font-bold">{Math.round(teamMembers.reduce((acc, m) => acc + m.points, 0) / teamMembers.length)}</p>
          </div>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredMembers.map((member) => (
            <div key={member.id} className="card-stat hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-semibold">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold">{member.name}</h3>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
                  </div>
                </div>
                <Badge variant="secondary">{member.status}</Badge>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span>{member.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span>{member.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>Joined {new Date(member.joinDate).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <div>
                  <p className="text-sm text-muted-foreground">Department</p>
                  <p className="font-semibold">{member.department}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Points Balance</p>
                  <p className="text-lg font-bold text-primary">{member.points}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}