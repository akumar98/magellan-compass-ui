import { useAuth } from '@/context/AuthContext';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Navigate } from 'react-router-dom';
import EmployeeDashboard from './employee/EmployeeDashboard';
import EmployerDashboard from './employer/EmployerDashboard';
import AdminDashboard from './admin/AdminDashboard';

export default function Dashboard() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse-slow text-lg">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If user doesn't have a role yet, redirect to role selection
  if (!user.role) {
    return <Navigate to="/role-selection" replace />;
  }

  // Redirect super admins to their dashboard
  if (user.role === 'super_admin') {
    return <Navigate to="/super-admin" replace />;
  }

  return (
    <DashboardLayout>
      {user.role === 'employee' && <EmployeeDashboard />}
      {user.role === 'employer' && <EmployerDashboard />}
      {user.role === 'admin' && <AdminDashboard />}
    </DashboardLayout>
  );
}
