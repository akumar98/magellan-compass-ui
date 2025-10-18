import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'sonner';
import { Shield, Loader2 } from 'lucide-react';

const superAdminLoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

const SuperAdminLogin = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSuperAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate input
      const result = superAdminLoginSchema.safeParse({ email, password });
      if (!result.success) {
        toast.error(result.error.errors[0].message);
        return;
      }

      // Authenticate with Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Check if user has super_admin role
      const { data: userRole, error: roleError } = await supabase
        .from('user_roles')
        .select('role, approval_status')
        .eq('user_id', data.user.id)
        .eq('role', 'super_admin')
        .maybeSingle();

      if (roleError) {
        console.error('Error checking super admin role:', roleError);
        throw new Error('Failed to verify super admin access');
      }

      if (!userRole) {
        await supabase.auth.signOut();
        toast.error('Access denied. This login is for super administrators only.');
        return;
      }

      if (userRole.approval_status !== 'approved') {
        await supabase.auth.signOut();
        toast.error('Your super admin account is pending approval.');
        return;
      }

      // Call the login function from AuthContext
      await login(email, password);
      
      toast.success('Super admin login successful!');
      navigate('/admin');
    } catch (error: any) {
      console.error('Super admin login error:', error);
      toast.error(error.message || 'Super admin login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-accent/10 p-4">
      <Card className="w-full max-w-md border-primary/20 shadow-lg">
        <CardHeader className="space-y-3 text-center">
          <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
            <Shield className="w-8 h-8 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">Super Admin Portal</CardTitle>
          <CardDescription>
            Restricted access for platform super administrators
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSuperAdminLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="superadmin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                required
              />
            </div>
            <Button 
              type="submit" 
              className="w-full" 
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Authenticating...
                </>
              ) : (
                'Sign In as Super Admin'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SuperAdminLogin;
