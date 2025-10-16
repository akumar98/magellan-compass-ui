import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { UserCheck, Building2, Info, AlertCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useState, useEffect } from 'react';

const RoleSelection = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  // Check if user already has a role
  useEffect(() => {
    const checkExistingRole = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: userRole } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id)
          .maybeSingle();
        
        if (userRole) {
          // User already has a role, redirect to dashboard
          navigate('/dashboard');
        }
      }
    };
    checkExistingRole();
  }, [navigate]);

  const handleRoleSelection = async (role: 'employee' | 'employer') => {
    setIsLoading(true);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast({
          title: "Authentication Required",
          description: "Please log in to continue.",
          variant: "destructive",
        });
        navigate('/login');
        return;
      }

      // Insert the user's role
      const { error } = await supabase
        .from('user_roles')
        .insert({ 
          user_id: user.id, 
          role: role 
        });

      if (error) {
        console.error('Role assignment error:', error);
        toast({
          title: "Error",
          description: "Failed to set your role. Please try again.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Success",
        description: `You're now registered as ${role === 'employee' ? 'an Employee' : 'an Employer'}`,
      });

      // Redirect to appropriate dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error('Unexpected error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#0369A1] via-[#06B6D4] to-[#F59E0B] relative overflow-hidden">
      {/* Background image overlay */}
      <div className="absolute inset-0 opacity-30">
        <div className="w-full h-full bg-cover bg-center" style={{ 
          backgroundImage: 'url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80)',
          mixBlendMode: 'multiply'
        }} />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 bg-white border-b border-gray-100">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#0EA5E9] rounded-full flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                </svg>
              </div>
              <span className="text-xl font-bold text-gray-900">MagellanOneAI</span>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <button className="text-gray-700 text-sm font-medium hover:text-gray-900">
                How It Works
              </button>
              <button className="text-gray-700 text-sm font-medium hover:text-gray-900">
                About US
              </button>
              <button className="text-gray-700 text-sm font-medium hover:text-gray-900">
                Contact Us
              </button>
            </div>

            <div className="flex items-center gap-3">
              <Button 
                onClick={() => navigate('/login')}
                className="bg-[#0EA5E9] hover:bg-[#0284C7] text-white px-6 h-10 rounded-md text-sm font-medium"
              >
                Login
              </Button>
              <Button 
                onClick={() => navigate('/login')}
                className="bg-[#0EA5E9] hover:bg-[#0284C7] text-white px-6 h-10 rounded-md text-sm font-medium"
              >
                Register
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Welcome to MagellanOneAI
          </h1>
          <p className="text-xl text-white">
            Choose your role to get started.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Employee Card */}
          <Card className="bg-white rounded-2xl p-8 shadow-2xl hover:shadow-3xl transition-all">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-[#0EA5E9] rounded-full flex items-center justify-center mb-6">
                <UserCheck className="w-8 h-8 text-white" />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Employee</h2>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                Access your dashboard, rewards, and wellness milestones.
              </p>

              <div className="flex items-start gap-2 bg-blue-50 rounded-lg p-3 mb-8 w-full">
                <Info className="w-4 h-4 text-[#0EA5E9] mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-700 text-left">
                  Requires company account approval
                </p>
              </div>

              <Button
                onClick={() => handleRoleSelection('employee')}
                disabled={isLoading}
                className="w-full bg-[#0EA5E9] hover:bg-[#0284C7] text-white h-12 text-base font-medium rounded-lg"
              >
                {isLoading ? 'Processing...' : 'Continue as Employee'}
              </Button>
            </div>
          </Card>

          {/* Employer Card */}
          <Card className="bg-white rounded-2xl p-8 shadow-2xl hover:shadow-3xl transition-all">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-[#0EA5E9] rounded-full flex items-center justify-center mb-6">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Employer</h2>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                Manage teams, track engagement, and approve rewards.
              </p>

              <div className="flex items-start gap-2 bg-orange-50 rounded-lg p-3 mb-8 w-full">
                <AlertCircle className="w-4 h-4 text-[#F59E0B] mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-700 text-left">
                  Admin privileges required
                </p>
              </div>

              <Button
                onClick={() => handleRoleSelection('employer')}
                disabled={isLoading}
                className="w-full bg-[#0EA5E9] hover:bg-[#0284C7] text-white h-12 text-base font-medium rounded-lg"
              >
                {isLoading ? 'Processing...' : 'Continue as Employer'}
              </Button>
            </div>
          </Card>
        </div>

        <p className="text-center text-white text-sm mt-8">
          You'll need your account credentials to log in.
        </p>
      </div>

      {/* Footer */}
      <footer className="relative z-10 bg-[#0F172A] text-white py-8 mt-auto">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 mb-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-[#0EA5E9] rounded-full flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                </div>
                <span className="text-lg font-bold">MagellanOneAI</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Transforming employee rewards through AI-powered travel experiences.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-3 text-white">Product</h4>
              <div className="space-y-2">
                <a href="#" className="block text-gray-400 hover:text-white text-sm transition-colors">
                  Features
                </a>
                <a href="#" className="block text-gray-400 hover:text-white text-sm transition-colors">
                  How It Works
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-3 text-white">Company</h4>
              <div className="space-y-2">
                <a href="#" className="block text-gray-400 hover:text-white text-sm transition-colors">
                  About Us
                </a>
                <a href="#" className="block text-gray-400 hover:text-white text-sm transition-colors">
                  Contact
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p className="text-gray-400">
              © 2025 MagellanOneAI. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Data Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Cookie Settings
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RoleSelection;