import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Download, UserPlus, Search, Eye, Edit, Trash2, Send, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useState } from 'react';

interface TeamMember {
  id: number;
  name: string;
  email: string;
  avatar: string;
  role: string;
  department: string;
  status: 'active' | 'invited' | 'pending' | 'inactive';
  lastLogin: string;
}

export default function EmployerTeam() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [showAlert, setShowAlert] = useState(true);

  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.johnson@example.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      role: 'Admin',
      department: 'Marketing',
      status: 'active',
      lastLogin: 'Today, 9:41 AM'
    },
    {
      id: 2,
      name: 'Michael Brown',
      email: 'michael.brown@example.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
      role: 'Manager',
      department: 'Engineering',
      status: 'active',
      lastLogin: 'Yesterday, 2:30 PM'
    },
    {
      id: 3,
      name: 'David Wilson',
      email: 'david.wilson@example.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
      role: 'Member',
      department: 'Sales',
      status: 'pending',
      lastLogin: 'Never'
    },
    {
      id: 4,
      name: 'Emily Davis',
      email: 'emily.davis@example.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
      role: 'Member',
      department: 'HR',
      status: 'invited',
      lastLogin: 'Never'
    },
    {
      id: 5,
      name: 'Robert Taylor',
      email: 'robert.taylor@example.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Robert',
      role: 'Viewer',
      department: 'Finance',
      status: 'inactive',
      lastLogin: '2 months ago'
    },
    {
      id: 6,
      name: 'Jennifer Martinez',
      email: 'jennifer.martinez@example.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Jennifer',
      role: 'Manager',
      department: 'Product',
      status: 'invited',
      lastLogin: 'Never'
    },
    {
      id: 7,
      name: 'Lisa Anderson',
      email: 'lisa.anderson@example.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa',
      role: 'Member',
      department: 'Customer Support',
      status: 'active',
      lastLogin: '2 days ago'
    },
  ];

  const filteredMembers = teamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'active') return matchesSearch && member.status === 'active';
    if (activeTab === 'invited') return matchesSearch && member.status === 'invited';
    if (activeTab === 'pending') return matchesSearch && member.status === 'pending';
    if (activeTab === 'inactive') return matchesSearch && member.status === 'inactive';
    return matchesSearch;
  });

  const invitedCount = teamMembers.filter(m => m.status === 'invited').length;

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Manage Team</h1>
            <p className="text-muted-foreground">View and manage all employees in your organization</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Download Team List (CSV)
            </Button>
            <Button variant="outline">Bulk Employee Invites</Button>
            <Button className="gap-2">
              <UserPlus className="h-4 w-4" />
              Invite Employee
            </Button>
          </div>
        </div>

        {/* Alert Banner */}
        {showAlert && (
          <Alert className="bg-warning/10 border-warning/20">
            <div className="flex items-center justify-between">
              <AlertDescription className="flex items-center gap-2">
                <span className="text-warning">⚠</span>
                <span className="text-sm">
                  3 employees haven't logged in yet. <a href="#" className="underline">Resend invites?</a>
                </span>
              </AlertDescription>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="h-8">Resend All</Button>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="h-8 w-8 p-0"
                  onClick={() => setShowAlert(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Alert>
        )}

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="invited">
              Invited <Badge variant="secondary" className="ml-1 bg-primary/10">●</Badge>
            </TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="inactive">Inactive</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Filters */}
        <div className="flex gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search employees..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select defaultValue="all-departments">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Departments" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-departments">All Departments</SelectItem>
              <SelectItem value="engineering">Engineering</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
              <SelectItem value="sales">Sales</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all-roles">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Roles" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-roles">All Roles</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="manager">Manager</SelectItem>
              <SelectItem value="member">Member</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all-status">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-status">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="invited">Invited</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">More Filters</Button>
        </div>

        {/* Table */}
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMembers.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback>{member.name[0]}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{member.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{member.email}</TableCell>
                  <TableCell>{member.role}</TableCell>
                  <TableCell>{member.department}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={member.status === 'active' ? 'default' : 'secondary'}
                      className={
                        member.status === 'active' ? 'bg-success/10 text-success hover:bg-success/20' :
                        member.status === 'invited' ? 'bg-primary/10 text-primary hover:bg-primary/20' :
                        member.status === 'pending' ? 'bg-warning/10 text-warning hover:bg-warning/20' :
                        'bg-muted text-muted-foreground'
                      }
                    >
                      {member.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{member.lastLogin}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      {member.status === 'invited' && (
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Send className="h-4 w-4" />
                        </Button>
                      )}
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">Showing 1 to 7 of 53 results</p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">Previous</Button>
            <Button variant="outline" size="sm">1</Button>
            <Button variant="outline" size="sm">2</Button>
            <Button variant="outline" size="sm">3</Button>
            <Button variant="outline" size="sm">...</Button>
            <Button variant="outline" size="sm">8</Button>
            <Button variant="outline" size="sm">Next</Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
