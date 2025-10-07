export type UserRole = 'admin' | 'employer' | 'employee';

export type MilestoneType = 'anniversary' | 'burnout_risk' | 'life_event' | 'achievement';
export type MilestoneStatus = 'pending' | 'active' | 'completed' | 'expired';
export type RewardCategory = 'flight_voucher' | 'hotel_stay' | 'experience_package' | 'travel_gift_card';
export type PackageStatus = 'draft' | 'pending_approval' | 'approved' | 'rejected' | 'redeemed';
export type TransactionType = 'employer_contribution' | 'employee_contribution' | 'reward_redemption' | 'milestone_bonus';
export type ApprovalStatus = 'pending' | 'approved' | 'rejected';

export interface User {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  company_id?: string;
  avatar_url?: string;
  department?: string;
  hire_date?: string;
  manager_id?: string;
}

export interface Company {
  id: string;
  name: string;
  industry?: string;
  employee_count: number;
  wallet_balance: number;
  monthly_budget: number;
  settings: Record<string, any>;
}

export interface Milestone {
  id: string;
  employee_id: string;
  milestone_type: MilestoneType;
  trigger_date: string;
  predicted_date?: string;
  confidence_score: number;
  status: MilestoneStatus;
  behavioral_data: Record<string, any>;
}

export interface RewardPackage {
  id: string;
  milestone_id: string;
  title: string;
  description?: string;
  category: RewardCategory;
  estimated_cost: number;
  ai_reasoning?: string;
  preference_score: number;
  options: Record<string, any>;
  status: PackageStatus;
  destination?: string;
  image_url?: string;
  vendor_id?: string;
  availability_status?: string;
  travel_type?: string;
  activities?: string[];
  duration?: string;
}

export interface WalletTransaction {
  id: string;
  employee_id: string;
  transaction_type: TransactionType;
  amount: number;
  balance_after: number;
  milestone_id?: string;
  package_id?: string;
  approved_by?: string;
  notes?: string;
  created_at: string;
}

export interface Approval {
  id: string;
  package_id: string;
  requested_by: string;
  manager_id: string;
  status: ApprovalStatus;
  employer_contribution: number;
  employee_contribution: number;
  comments?: string;
  approved_at?: string;
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
