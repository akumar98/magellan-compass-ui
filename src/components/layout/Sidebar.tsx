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
  X
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
  roles: string[];
}

const navItems: NavItem[] = [
  {
    label: 'Dashboard',
    path: '/dashboard',
    icon: <LayoutDashboard className="h-5 w-5" />,
    roles: ['admin', 'employer', 'employee'],
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
    label: 'My Team',
    path: '/employer/team',
    icon: <Users className="h-5 w-5" />,
    roles: ['employer'],
  },
  {
    label: 'Approvals',
    path: '/employer/approvals',
    icon: <ClipboardCheck className="h-5 w-5" />,
    roles: ['employer'],
  },
  {
    label: 'Reports',
    path: '/employer/reports',
    icon: <TrendingUp className="h-5 w-5" />,
    roles: ['employer'],
  },
  {
    label: 'Rewards Catalog',
    path: '/rewards',
    icon: <Gift className="h-5 w-5" />,
    roles: ['employee'],
  },
  {
    label: 'My Activity',
    path: '/employee/activity',
    icon: <Award className="h-5 w-5" />,
    roles: ['employee'],
  },
  {
    label: 'Community',
    path: '/community',
    icon: <MessageSquare className="h-5 w-5" />,
    roles: ['admin', 'employer', 'employee'],
  },
  {
    label: 'Settings',
    path: '/settings',
    icon: <Settings className="h-5 w-5" />,
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
        <p className="text-xs text-muted-foreground mt-1">Employee Rewards Platform</p>
      </div>

      {/* User Info */}
      {user && (
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-primary font-semibold text-sm">
                {user.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">{user.name}</p>
              <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
            </div>
          </div>
          {user.role === 'employee' && user.points !== undefined && (
            <div className="mt-3 p-2 bg-primary/5 rounded-lg">
              <p className="text-xs text-muted-foreground">Available Points</p>
              <p className="text-lg font-bold text-primary">{user.points.toLocaleString()}</p>
            </div>
          )}
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
            <span>{item.label}</span>
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
