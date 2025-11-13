import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Gift, 
  Building2, 
  MessageSquare, 
  Settings,
  ClipboardCheck,
  TrendingUp,
  Award,
  Menu,
  X,
  AlertTriangle,
  User,
  Sliders,
  DollarSign,
  UserPlus,
  HelpCircle,
  CreditCard,
  UserCheck,
  Bell,
  History,
  BarChart3,
  FileText,
  Sparkles
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { PendingRequestsBadge } from '@/components/employer/PendingRequestsBadge';

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
  roles: string[];
}

const navItems: NavItem[] = [
  // Super Admin Items
  {
    label: 'Super Admin Dashboard',
    path: '/super-admin',
    icon: <LayoutDashboard className="h-5 w-5" />,
    roles: ['super_admin'],
  },
  {
    label: 'Manage Companies',
    path: '/super-admin/companies',
    icon: <Building2 className="h-5 w-5" />,
    roles: ['super_admin'],
  },
  {
    label: 'Manage Users',
    path: '/super-admin/users',
    icon: <Users className="h-5 w-5" />,
    roles: ['super_admin'],
  },
  // Admin Items
  {
    label: 'Dashboard',
    path: '/dashboard',
    icon: <LayoutDashboard className="h-5 w-5" />,
    roles: ['admin'],
  },
  {
    label: 'Companies',
    path: '/admin/companies',
    icon: <Building2 className="h-5 w-5" />,
    roles: ['admin'],
  },
  {
    label: 'All Employees',
    path: '/admin/employees',
    icon: <Users className="h-5 w-5" />,
    roles: ['admin'],
  },
  {
    label: 'Manage Rewards',
    path: '/admin/rewards',
    icon: <Gift className="h-5 w-5" />,
    roles: ['admin'],
  },
  {
    label: 'System Settings',
    path: '/admin/settings',
    icon: <Settings className="h-5 w-5" />,
    roles: ['admin'],
  },
  {
    label: 'Audit Logs',
    path: '/admin/logs',
    icon: <FileText className="h-5 w-5" />,
    roles: ['admin'],
  },
  
  // Employer Items
  {
    label: 'Dashboard',
    path: '/dashboard',
    icon: <LayoutDashboard className="h-5 w-5" />,
    roles: ['employer'],
  },
  {
    label: 'Reward Approvals',
    path: '/employer/approvals',
    icon: <ClipboardCheck className="h-5 w-5" />,
    roles: ['employer'],
  },
  {
    label: 'Employee Approvals',
    path: '/employer/employee-approval',
    icon: <UserCheck className="h-5 w-5" />,
    roles: ['employer'],
  },
  {
    label: 'AI Concierge',
    path: '/employer/ai-concierge',
    icon: <Sparkles className="h-5 w-5" />,
    roles: ['employer'],
  },
  {
    label: 'Burnout Analytics',
    path: '/employer/burnout',
    icon: <AlertTriangle className="h-5 w-5" />,
    roles: ['employer'],
  },
  {
    label: 'Analytics',
    path: '/employer/analytics',
    icon: <BarChart3 className="h-5 w-5" />,
    roles: ['employer'],
  },
  {
    label: 'Matching Policy',
    path: '/employer/matching-policy',
    icon: <Sliders className="h-5 w-5" />,
    roles: ['employer'],
  },
  {
    label: 'Billing',
    path: '/employer/billing',
    icon: <CreditCard className="h-5 w-5" />,
    roles: ['employer'],
  },
  {
    label: 'Notifications',
    path: '/employer/notifications',
    icon: <Bell className="h-5 w-5" />,
    roles: ['employer'],
  },
  {
    label: 'Settings',
    path: '/settings',
    icon: <Settings className="h-5 w-5" />,
    roles: ['employer'],
  },
  
  // Employee Items
  // Employee Items
  {
    label: 'Dashboard',
    path: '/dashboard',
    icon: <LayoutDashboard className="h-5 w-5" />,
    roles: ['employee'],
  },
  {
    label: 'Profile',
    path: '/profile',
    icon: <User className="h-5 w-5" />,
    roles: ['employee'],
  },
  {
    label: 'Travel Rewards',
    path: '/rewards',
    icon: <Gift className="h-5 w-5" />,
    roles: ['employee'],
  },
  {
    label: 'Redemption History',
    path: '/employee/redemption-history',
    icon: <History className="h-5 w-5" />,
    roles: ['employee'],
  },
  {
    label: 'Notifications',
    path: '/employee/notifications',
    icon: <Bell className="h-5 w-5" />,
    roles: ['employee'],
  },
  {
    label: 'My Contributions',
    path: '/contributions',
    icon: <DollarSign className="h-5 w-5" />,
    roles: ['employee'],
  },
  {
    label: 'Preferences',
    path: '/preferences',
    icon: <Sliders className="h-5 w-5" />,
    roles: ['employee'],
  },
  {
    label: 'My Activity',
    path: '/employee/activity',
    icon: <Award className="h-5 w-5" />,
    roles: ['employee'],
  },
  {
    label: 'Refer a Friend',
    path: '/refer',
    icon: <UserPlus className="h-5 w-5" />,
    roles: ['employee'],
  },
  {
    label: 'Settings',
    path: '/settings',
    icon: <Settings className="h-5 w-5" />,
    roles: ['employee'],
  },
  
  // Shared Items
  {
    label: 'Community',
    path: '/community',
    icon: <MessageSquare className="h-5 w-5" />,
    roles: ['admin', 'employer', 'employee'],
  },
  {
    label: 'Help & Support',
    path: '/help',
    icon: <HelpCircle className="h-5 w-5" />,
    roles: ['admin', 'employer', 'employee'],
  },
];

export const Sidebar = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const filteredNavItems = navItems.filter(item => 
    user?.role && item.roles.includes(user.role)
  );

  const SidebarContent = () => (
    <>
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <h1 className="text-2xl font-bold gradient-primary bg-clip-text text-transparent">
          Magellan One
        </h1>
        <p className="text-xs text-muted-foreground mt-1">Travel Rewards Platform</p>
      </div>

      {/* User Info */}
      {user && (
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-primary font-semibold text-sm">
                {user.full_name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">{user.full_name}</p>
              <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {filteredNavItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all',
                isActive
                  ? 'bg-primary text-primary-foreground shadow-lg'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
              )
            }
          >
            {item.icon}
            <span className="flex-1">{item.label}</span>
            {item.path === '/employer/employee-approval' && user?.role === 'employer' && (
              <PendingRequestsBadge />
            )}
          </NavLink>
        ))}
      </nav>
    </>
  );

  return (
    <>
      {/* Mobile toggle */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed top-0 left-0 h-screen w-64 bg-sidebar-background border-r border-sidebar-border flex flex-col transition-transform duration-300 z-40',
          'lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <SidebarContent />
      </aside>

      {/* Spacer for desktop */}
      <div className="hidden lg:block w-64 flex-shrink-0" />
    </>
  );
};
