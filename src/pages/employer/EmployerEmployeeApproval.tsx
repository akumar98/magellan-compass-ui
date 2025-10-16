import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Check, X, Eye, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';

interface EmployeeRequest {
  id: string;
  user_id: string;
  name: string;
  email: string;
  department: string | null;
  signup_date: string;
  approval_status: 'pending' | 'approved' | 'rejected';
  company_id: string | null;
}

export default function EmployerEmployeeApproval() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('pending');
  const [selectedRequests, setSelectedRequests] = useState<string[]>([]);
  const [requests, setRequests] = useState<EmployeeRequest[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchRequests();
  }, [user]);

  const fetchRequests = async () => {
    if (!user?.company_id) {
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select(`
          id,
          user_id,
          approval_status,
          company_id,
          created_at,
          profiles (
            full_name,
            email,
            department
          )
        `)
        .eq('role', 'employee')
        .eq('company_id', user.company_id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching requests:', error);
        toast.error('Failed to load employee requests');
        return;
      }

      const mappedRequests: EmployeeRequest[] = (data || []).map(item => ({
        id: item.id,
        user_id: item.user_id,
        name: (item.profiles as any)?.full_name || 'Unknown',
        email: (item.profiles as any)?.email || 'N/A',
        department: (item.profiles as any)?.department || null,
        signup_date: new Date(item.created_at).toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric', 
          year: 'numeric' 
        }),
        approval_status: item.approval_status as 'pending' | 'approved' | 'rejected',
        company_id: item.company_id,
      }));

      setRequests(mappedRequests);
    } catch (error) {
      console.error('Unexpected error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: string) => {
    try {
      const { error } = await supabase
        .from('user_roles')
        .update({ 
          approval_status: 'approved',
          approved_by: user?.id,
          approved_at: new Date().toISOString()
        })
        .eq('id', id);

      if (error) {
        console.error('Error approving:', error);
        toast.error('Failed to approve employee');
        return;
      }

      setRequests(prev => prev.map(req => 
        req.id === id ? { ...req, approval_status: 'approved' as const } : req
      ));
      toast.success('Employee approved successfully');
    } catch (error) {
      console.error('Unexpected error:', error);
      toast.error('An error occurred');
    }
  };

  const handleReject = async (id: string) => {
    try {
      const { error } = await supabase
        .from('user_roles')
        .update({ 
          approval_status: 'rejected',
          approved_by: user?.id,
          approved_at: new Date().toISOString()
        })
        .eq('id', id);

      if (error) {
        console.error('Error rejecting:', error);
        toast.error('Failed to reject employee');
        return;
      }

      setRequests(prev => prev.map(req => 
        req.id === id ? { ...req, approval_status: 'rejected' as const } : req
      ));
      toast.error('Employee request rejected');
    } catch (error) {
      console.error('Unexpected error:', error);
      toast.error('An error occurred');
    }
  };

  const handleBulkApprove = async () => {
    try {
      const { error } = await supabase
        .from('user_roles')
        .update({ 
          approval_status: 'approved',
          approved_by: user?.id,
          approved_at: new Date().toISOString()
        })
        .in('id', selectedRequests);

      if (error) {
        console.error('Error bulk approving:', error);
        toast.error('Failed to approve employees');
        return;
      }

      setRequests(prev => prev.map(req => 
        selectedRequests.includes(req.id) ? { ...req, approval_status: 'approved' as const } : req
      ));
      toast.success(`Approved ${selectedRequests.length} employee(s)`);
      setSelectedRequests([]);
    } catch (error) {
      console.error('Unexpected error:', error);
      toast.error('An error occurred');
    }
  };

  const handleBulkReject = async () => {
    try {
      const { error } = await supabase
        .from('user_roles')
        .update({ 
          approval_status: 'rejected',
          approved_by: user?.id,
          approved_at: new Date().toISOString()
        })
        .in('id', selectedRequests);

      if (error) {
        console.error('Error bulk rejecting:', error);
        toast.error('Failed to reject employees');
        return;
      }

      setRequests(prev => prev.map(req => 
        selectedRequests.includes(req.id) ? { ...req, approval_status: 'rejected' as const } : req
      ));
      toast.error(`Rejected ${selectedRequests.length} employee(s)`);
      setSelectedRequests([]);
    } catch (error) {
      console.error('Unexpected error:', error);
      toast.error('An error occurred');
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedRequests(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const filteredRequests = requests.filter(req => {
    if (activeTab === 'pending') return req.approval_status === 'pending';
    if (activeTab === 'rejected') return req.approval_status === 'rejected';
    if (activeTab === 'approved') return req.approval_status === 'approved';
    return true;
  });

  const pendingCount = requests.filter(r => r.approval_status === 'pending').length;

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2">Employee Approval Dashboard</h1>
          <p className="text-muted-foreground">Manage and approve pending employee sign-up requests</p>
        </div>

        {/* Alert */}
        {pendingCount > 0 && (
          <Alert className="bg-primary/10 border-primary/20">
            <AlertDescription className="flex items-center gap-2">
              <span className="text-primary">🔔</span>
              <span>You have <strong>{pendingCount} pending employee access requests</strong>.</span>
            </AlertDescription>
          </Alert>
        )}

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList>
            <TabsTrigger value="pending">
              Pending Requests ({requests.filter(r => r.approval_status === 'pending').length})
            </TabsTrigger>
            <TabsTrigger value="approved">
              Approved ({requests.filter(r => r.approval_status === 'approved').length})
            </TabsTrigger>
            <TabsTrigger value="rejected">
              Rejected ({requests.filter(r => r.approval_status === 'rejected').length})
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Actions */}
        {selectedRequests.length > 0 && (
          <div className="flex gap-2">
            <Button onClick={handleBulkApprove} className="gap-2">
              <Check className="h-4 w-4" />
              Approve Selected ({selectedRequests.length})
            </Button>
            <Button 
              variant="outline" 
              onClick={handleBulkReject}
              className="gap-2 text-destructive hover:text-destructive"
            >
              <X className="h-4 w-4" />
              Reject Selected ({selectedRequests.length})
            </Button>
          </div>
        )}

        {/* Table */}
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox 
                    checked={filteredRequests.length > 0 && selectedRequests.length === filteredRequests.length}
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
              {filteredRequests.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-12 text-muted-foreground">
                    No {activeTab} employee requests
                  </TableCell>
                </TableRow>
              ) : (
                filteredRequests.map((request) => (
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
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {request.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{request.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{request.email}</TableCell>
                    <TableCell>{request.department || 'Not specified'}</TableCell>
                    <TableCell>{request.signup_date}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={request.approval_status === 'pending' ? 'secondary' : 'default'}
                        className={
                          request.approval_status === 'pending' ? 'bg-warning/10 text-warning hover:bg-warning/20' :
                          request.approval_status === 'approved' ? 'bg-success/10 text-success hover:bg-success/20' :
                          'bg-destructive/10 text-destructive hover:bg-destructive/20'
                        }
                      >
                        {request.approval_status === 'pending' ? 'Pending' : 
                         request.approval_status === 'approved' ? 'Approved' : 'Rejected'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        {request.approval_status === 'pending' && (
                          <>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 text-success hover:text-success hover:bg-success/10"
                              onClick={() => handleApprove(request.id)}
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                              onClick={() => handleReject(request.id)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Info */}
        <div className="text-sm text-muted-foreground">
          Showing {filteredRequests.length} of {requests.length} employee requests
        </div>
      </div>
    </DashboardLayout>
  );
}