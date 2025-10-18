import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: 'super_admin' | 'admin' | 'employer' | 'employee';
}

export const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const { user, loading, isRole } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        // Not authenticated, redirect to login
        navigate('/login');
      } else if (requiredRole && !isRole(requiredRole)) {
        // Authenticated but doesn't have required role, redirect to dashboard
        navigate('/dashboard');
      }
    }
  }, [user, loading, requiredRole, isRole, navigate]);

  // Show nothing while loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Show nothing if not authenticated or doesn't have required role
  if (!user || (requiredRole && !isRole(requiredRole))) {
    return null;
  }

  return <>{children}</>;
};
