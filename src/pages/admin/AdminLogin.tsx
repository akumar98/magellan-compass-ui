import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Loader2, Shield } from 'lucide-react';
import { z } from 'zod';

const adminLoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

const AdminLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsLoading(true);
      
      // Validate input
      adminLoginSchema.parse(credentials);

      // Authenticate with Supabase
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
      });

      if (authError) throw authError;

      // Verify admin role
      const { data: roleData, error: roleError } = await supabase
        .from('user_roles')
        .select('role, approval_status')
        .eq('user_id', authData.user.id)
        .maybeSingle();

      if (roleError) throw roleError;

      if (!roleData) {
        await supabase.auth.signOut();
        toast.error('Access denied. No role assigned.');
        return;
      }

      if (roleData.role !== 'admin') {
        await supabase.auth.signOut();
        toast.error('Access denied. This portal is for administrators only.');
        return;
      }

      if (roleData.approval_status !== 'approved') {
        await supabase.auth.signOut();
        toast.error('Access denied. Admin account pending approval.');
        return;
      }

      // Login successful
      await login(credentials.email, credentials.password);
      toast.success('Admin authentication successful');
      navigate('/admin');
      
    } catch (error: any) {
      console.error('Admin login error:', error);
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
      } else {
        toast.error(error.message || 'Authentication failed');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 p-4">
      <Card className="w-full max-w-md border-border/50 shadow-lg">
        <CardHeader className="space-y-2 text-center">
          <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
            <Shield className="w-6 h-6 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold">Administrator Portal</CardTitle>
          <CardDescription>
            Secure access for platform administrators only
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@example.com"
                value={credentials.email}
                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                required
                disabled={isLoading}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                required
                disabled={isLoading}
              />
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Authenticating...
                </>
              ) : (
                'Sign In as Administrator'
              )}
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-border/50">
            <p className="text-xs text-muted-foreground text-center">
              This is a restricted area. All access attempts are logged and monitored.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
