import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Loader2, ArrowLeft } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().trim().email('Invalid email address').max(255, 'Email too long'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const signupSchema = loginSchema.extend({
  full_name: z.string().trim().min(2, 'Name must be at least 2 characters').max(100, 'Name too long'),
  confirm_password: z.string(),
}).refine((data) => data.password === data.confirm_password, {
  message: "Passwords don't match",
  path: ['confirm_password'],
});

export default function Login() {
  const [searchParams] = useSearchParams();
  const role = searchParams.get('role') as 'employee' | 'employer' | null;
  const mode = searchParams.get('mode') || 'login';
  const [isLoading, setIsLoading] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({ email: '', password: '', confirm_password: '', full_name: '' });
  const { login } = useAuth();
  const navigate = useNavigate();
  
  // Redirect if no role is specified
  useEffect(() => {
    if (!role) {
      navigate('/role-selection');
    }
  }, [role, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const validated = loginSchema.parse(loginData);
      await login(validated.email, validated.password);
      
      // Verify the user has the correct role
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: userRole } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id)
          .maybeSingle();
        
        if (!userRole) {
          toast.error('No role assigned. Please contact support.');
          await supabase.auth.signOut();
          return;
        }
        
        // Verify role matches what they selected
        if (userRole.role !== role) {
          toast.error(`This account is registered as ${userRole.role}. Please select the correct role.`);
          await supabase.auth.signOut();
          return;
        }
        
        navigate('/dashboard');
      }
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => toast.error(err.message));
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const validated = signupSchema.parse(signupData);
      
      const redirectUrl = `${window.location.origin}/`;
      
      const { data, error } = await supabase.auth.signUp({
        email: validated.email,
        password: validated.password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            full_name: validated.full_name,
          },
        },
      });

      if (error) throw error;

      if (data.user) {
        // Assign the selected role to the new user
        const { error: roleError } = await supabase
          .from('user_roles')
          .insert({ 
            user_id: data.user.id, 
            role: role 
          });

        if (roleError) {
          console.error('Role assignment error:', roleError);
          toast.error('Failed to assign role. Please contact support.');
          return;
        }

        toast.success(`Account created successfully as ${role}!`);
        await login(validated.email, validated.password);
        
        // Redirect to appropriate onboarding based on role
        if (role === 'employee') {
          navigate('/employee/onboarding');
        } else if (role === 'employer') {
          navigate('/onboarding/company');
        }
      }
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        error.errors.forEach((err) => toast.error(err.message));
      } else {
        toast.error(error.message || 'Failed to create account');
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (!role) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 p-4">
      <Card className="w-full max-w-md p-8 space-y-6">
        <Button
          variant="ghost"
          onClick={() => navigate('/role-selection')}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Role Selection
        </Button>
        
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold gradient-primary bg-clip-text text-transparent">
            Magellan One AI
          </h1>
          <p className="text-muted-foreground">
            {role === 'employee' ? 'Employee' : 'Employer'} {mode === 'login' ? 'Login' : 'Sign Up'}
          </p>
        </div>

        <Tabs defaultValue={mode} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="space-y-4">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login-email">Email</Label>
                <Input
                  id="login-email"
                  type="email"
                  placeholder="your@email.com"
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="login-password">Password</Label>
                <Input
                  id="login-password"
                  type="password"
                  placeholder="••••••••"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  required
                  disabled={isLoading}
                />
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Login
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="signup" className="space-y-4">
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signup-name">Full Name</Label>
                <Input
                  id="signup-name"
                  type="text"
                  placeholder="John Doe"
                  value={signupData.full_name}
                  onChange={(e) => setSignupData({ ...signupData, full_name: e.target.value })}
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-email">Email</Label>
                <Input
                  id="signup-email"
                  type="email"
                  placeholder="your@email.com"
                  value={signupData.email}
                  onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-password">Password</Label>
                <Input
                  id="signup-password"
                  type="password"
                  placeholder="••••••••"
                  value={signupData.password}
                  onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-confirm">Confirm Password</Label>
                <Input
                  id="signup-confirm"
                  type="password"
                  placeholder="••••••••"
                  value={signupData.confirm_password}
                  onChange={(e) => setSignupData({ ...signupData, confirm_password: e.target.value })}
                  required
                  disabled={isLoading}
                />
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create Account
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
