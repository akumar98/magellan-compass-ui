import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';

interface UserWithRole {
  id: string;
  email: string;
  full_name: string;
  role?: string;
  approval_status?: string;
  created_at: string;
}

const SuperAdminUsers = () => {
  const [users, setUsers] = useState<UserWithRole[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserWithRole | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    full_name: '',
    role: 'employee' as 'super_admin' | 'admin' | 'employer' | 'employee',
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    const { data: profilesData, error: profilesError } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });

    if (profilesError) {
      toast.error('Failed to fetch users');
      console.error(profilesError);
      setLoading(false);
      return;
    }

    const { data: rolesData } = await supabase
      .from('user_roles')
      .select('user_id, role, approval_status');

    const usersWithRoles = profilesData.map((profile) => {
      const userRole = rolesData?.find((r) => r.user_id === profile.id);
      return {
        ...profile,
        role: userRole?.role,
        approval_status: userRole?.approval_status,
      };
    });

    setUsers(usersWithRoles);
    setLoading(false);
  };

  const handleAdd = async () => {
    try {
      setLoading(true);
      
      // Call edge function to create user with service role
      const { data, error } = await supabase.functions.invoke('create-user', {
        body: {
          email: formData.email,
          password: formData.password,
          fullName: formData.full_name,
          role: formData.role,
        },
      });

      if (error) throw error;

      toast.success('User created successfully');
      setIsAddDialogOpen(false);
      setFormData({ email: '', password: '', full_name: '', role: 'employee' });
      fetchUsers();
    } catch (error: any) {
      console.error('Error creating user:', error);
      toast.error(error.message || 'Failed to create user');
    } finally {
      setLoading(false);
    }
  };

  const handleEditRole = async () => {
    if (!selectedUser) return;

    const { error } = await supabase
      .from('user_roles')
      .upsert({
        user_id: selectedUser.id,
        role: formData.role,
        approval_status: 'approved',
      });

    if (error) {
      toast.error('Failed to update user role');
      console.error(error);
    } else {
      toast.success('User role updated successfully');
      setIsEditDialogOpen(false);
      setSelectedUser(null);
      fetchUsers();
    }
  };

  const handleDelete = async () => {
    if (!selectedUser) return;

    try {
      setLoading(true);

      // Call edge function to delete user with service role
      const { error } = await supabase.functions.invoke('delete-user', {
        body: { userId: selectedUser.id },
      });
      
      if (error) throw error;

      toast.success('User deleted successfully');
      setIsDeleteDialogOpen(false);
      setSelectedUser(null);
      fetchUsers();
    } catch (error: any) {
      console.error('Error deleting user:', error);
      toast.error(error.message || 'Failed to delete user');
    } finally {
      setLoading(false);
    }
  };

  const openEditDialog = (user: UserWithRole) => {
    setSelectedUser(user);
    setFormData({
      email: user.email,
      password: '',
      full_name: user.full_name,
      role: (user.role as any) || 'employee',
    });
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (user: UserWithRole) => {
    setSelectedUser(user);
    setIsDeleteDialogOpen(true);
  };

  const getRoleBadgeVariant = (role?: string) => {
    switch (role) {
      case 'super_admin':
        return 'destructive';
      case 'admin':
        return 'default';
      case 'employer':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Manage Users</h1>
            <p className="text-muted-foreground">Add, edit, or remove users and assign roles</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add User
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New User</DialogTitle>
                <DialogDescription>Create a new user in the platform</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="full_name">Full Name</Label>
                  <Input
                    id="full_name"
                    value={formData.full_name}
                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="role">Role</Label>
                  <Select value={formData.role} onValueChange={(value: any) => setFormData({ ...formData, role: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="employee">Employee</SelectItem>
                      <SelectItem value="employer">Employer</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="super_admin">Super Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAdd}>Add User</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Users List</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">Loading...</div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.full_name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>
                        <Badge variant={getRoleBadgeVariant(user.role)}>
                          {user.role || 'No role'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={user.approval_status === 'approved' ? 'default' : 'secondary'}>
                          {user.approval_status || 'pending'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openEditDialog(user)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => openDeleteDialog(user)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit User Role</DialogTitle>
              <DialogDescription>Update user role and permissions</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-role">Role</Label>
                <Select value={formData.role} onValueChange={(value: any) => setFormData({ ...formData, role: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="employee">Employee</SelectItem>
                    <SelectItem value="employer">Employer</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="super_admin">Super Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleEditRole}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete {selectedUser?.full_name}'s account and all associated data. This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </DashboardLayout>
  );
};

export default SuperAdminUsers;
