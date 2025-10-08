import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Check, X, Eye, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { useState } from 'react';
import { toast } from 'sonner';

interface EmployeeRequest {
  id: number;
  name: string;
  email: string;
  avatar: string;
  department: string;
  signupDate: string;
  status: 'pending' | 'approved' | 'rejected';
}

export default function EmployerEmployeeApproval() {
  const [activeTab, setActiveTab] = useState('pending');
  const [selectedRequests, setSelectedRequests] = useState<number[]>([]);
  
  const [requests, setRequests] = useState<EmployeeRequest[]>([
    {
      id: 1,
      name: 'Michael Johnson',
      email: 'michael.johnson@example.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Michael',
      department: 'Engineering',
      signupDate: 'Jul 4, 2025',
      status: 'pending'
    },
    {
      id: 2,
      name: 'Sarah Williams',
      email: 'sarah.williams@example.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
      department: 'Marketing',
      signupDate: 'Jul 4, 2025',
      status: 'pending'
    },
    {
      id: 3,
      name: 'David Chen',
      email: 'david.chen@example.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
      department: 'Product',
      signupDate: 'Jul 4, 2025',
      status: 'pending'
    },
    {
      id: 4,
      name: 'Emily Rodriguez',
      email: 'emily.rodriguez@example.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emily',
      department: 'HR',
      signupDate: 'Jul 4, 2025',
      status: 'pending'
    },
    {
      id: 5,
      name: 'James Wilson',
      email: 'james.wilson@example.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
      department: 'Finance',
      signupDate: 'Jul 4, 2025',
      status: 'pending'
    },
  ]);

  const handleApprove = (id: number) => {
    setRequests(prev => prev.map(req => 
      req.id === id ? { ...req, status: 'approved' as const } : req
    ));
    toast.success('Employee approved successfully');
  };

  const handleReject = (id: number) => {
    setRequests(prev => prev.map(req => 
      req.id === id ? { ...req, status: 'rejected' as const } : req
    ));
    toast.error('Employee request rejected');
  };

  const handleBulkApprove = () => {
    setRequests(prev => prev.map(req => 
      selectedRequests.includes(req.id) ? { ...req, status: 'approved' as const } : req
    ));
    toast.success(`Approved ${selectedRequests.length} employee(s)`);
    setSelectedRequests([]);
  };

  const handleBulkReject = () => {
    setRequests(prev => prev.map(req => 
      selectedRequests.includes(req.id) ? { ...req, status: 'rejected' as const } : req
    ));
    toast.error(`Rejected ${selectedRequests.length} employee(s)`);
    setSelectedRequests([]);
  };

  const toggleSelect = (id: number) => {
    setSelectedRequests(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const filteredRequests = requests.filter(req => {
    if (activeTab === 'pending') return req.status === 'pending';
    if (activeTab === 'rejected') return req.status === 'rejected';
    if (activeTab === 'approved') return req.status === 'approved';
    return true;
  });

  const pendingCount = requests.filter(r => r.status === 'pending').length;

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2">Employee Approval Dashboard</h1>
          <p className="text-muted-foreground">Manage and approve pending employee sign-up requests</p>
        </div>

        {/* Alert */}
        <Alert className="bg-primary/10 border-primary/20">
          <AlertDescription className="flex items-center gap-2">
            <span className="text-primary">🔔</span>
            <span>You have <strong>{pendingCount} pending employee access requests</strong>.</span>
          </AlertDescription>
        </Alert>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList>
            <TabsTrigger value="pending">Pending Employee Requests</TabsTrigger>
            <TabsTrigger value="rejected">Rejected Employees</TabsTrigger>
            <TabsTrigger value="approved">Approved Employees</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Filters and Actions */}
        <div className="flex items-center justify-between">
          <div className="flex gap-4">
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="newest">
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Sort by: Newest First" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Sort by: Newest First</SelectItem>
                <SelectItem value="oldest">Sort by: Oldest First</SelectItem>
                <SelectItem value="name">Sort by: Name</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {selectedRequests.length > 0 && (
            <div className="flex gap-2">
              <Button onClick={handleBulkApprove} className="gap-2">
                <Check className="h-4 w-4" />
                Approve Selected
              </Button>
              <Button 
                variant="outline" 
                onClick={handleBulkReject}
                className="gap-2 text-destructive hover:text-destructive"
              >
                <X className="h-4 w-4" />
                Reject Selected
              </Button>
            </div>
          )}
        </div>

        {/* Table */}
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox 
                    checked={selectedRequests.length === filteredRequests.length}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedRequests(filteredRequests.map(r => r.id));
                      } else {
                        setSelectedRequests([]);
                      }
                    }}
                  />
                </TableHead>
                <TableHead>Full Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Signup Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRequests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell>
                    <Checkbox 
                      checked={selectedRequests.includes(request.id)}
                      onCheckedChange={() => toggleSelect(request.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={request.avatar} />
                        <AvatarFallback>{request.name[0]}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{request.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{request.email}</TableCell>
                  <TableCell>{request.department}</TableCell>
                  <TableCell>{request.signupDate}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={request.status === 'pending' ? 'secondary' : 'default'}
                      className={
                        request.status === 'pending' ? 'bg-warning/10 text-warning hover:bg-warning/20' :
                        request.status === 'approved' ? 'bg-success/10 text-success hover:bg-success/20' :
                        'bg-destructive/10 text-destructive hover:bg-destructive/20'
                      }
                    >
                      {request.status === 'pending' ? 'Pending Approval' : request.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      {request.status === 'pending' && (
                        <>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-success hover:text-success"
                            onClick={() => handleApprove(request.id)}
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-destructive hover:text-destructive"
                            onClick={() => handleReject(request.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Eye className="h-4 w-4" />
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
          <p className="text-sm text-muted-foreground">Showing 1 to 5 of 5 results</p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button variant="default" size="sm">1</Button>
            <Button variant="outline" size="sm" disabled>Next</Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
