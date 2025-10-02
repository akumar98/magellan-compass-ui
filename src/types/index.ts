export type UserRole = 'admin' | 'employer' | 'employee';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  companyId?: string;
  companyName?: string;
  avatar?: string;
  points?: number;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isRole: (role: UserRole) => boolean;
}

export interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: 'primary' | 'secondary' | 'accent' | 'success' | 'warning';
}

export interface RewardItem {
  id: string;
  name: string;
  description: string;
  pointsCost: number;
  category: string;
  imageUrl?: string;
  stock?: number;
  isAvailable: boolean;
}

export interface EmployeeData {
  id: string;
  name: string;
  email: string;
  role: string;
  points: number;
  contributionScore: number;
  avatar?: string;
  joinedDate: string;
}

export interface RewardRequest {
  id: string;
  employeeId: string;
  employeeName: string;
  rewardId: string;
  rewardName: string;
  pointsCost: number;
  status: 'pending' | 'approved' | 'rejected';
  requestDate: string;
}
