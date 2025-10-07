-- Create enum types
CREATE TYPE public.app_role AS ENUM ('admin', 'employer', 'employee');
CREATE TYPE public.milestone_type AS ENUM ('anniversary', 'burnout_risk', 'life_event', 'achievement');
CREATE TYPE public.milestone_status AS ENUM ('pending', 'active', 'completed', 'expired');
CREATE TYPE public.reward_category AS ENUM ('travel', 'wellness', 'learning', 'equity');
CREATE TYPE public.package_status AS ENUM ('draft', 'pending_approval', 'approved', 'rejected', 'redeemed');
CREATE TYPE public.transaction_type AS ENUM ('employer_contribution', 'employee_contribution', 'reward_redemption', 'milestone_bonus');
CREATE TYPE public.approval_status AS ENUM ('pending', 'approved', 'rejected');
CREATE TYPE public.event_type AS ENUM ('hire', 'promotion', 'team_change', 'pto', 'collaboration', 'performance_review');
CREATE TYPE public.event_source AS ENUM ('workday', 'adp', 'bamboo', 'slack', 'manual');

-- Companies table
CREATE TABLE public.companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  industry TEXT,
  employee_count INTEGER DEFAULT 0,
  wallet_balance DECIMAL(10,2) DEFAULT 0,
  monthly_budget DECIMAL(10,2) DEFAULT 0,
  settings JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Profiles table (linked to auth.users)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  company_id UUID REFERENCES public.companies(id) ON DELETE SET NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  avatar_url TEXT,
  department TEXT,
  hire_date DATE,
  manager_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- User roles table (security-critical, separate from profiles)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role public.app_role NOT NULL,
  company_id UUID REFERENCES public.companies(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, role)
);

-- Security definer function to check roles (prevents RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Function to get user's company_id
CREATE OR REPLACE FUNCTION public.get_user_company_id(_user_id UUID)
RETURNS UUID
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT company_id
  FROM public.user_roles
  WHERE user_id = _user_id
  LIMIT 1
$$;

-- Milestones table (Behavioral Genome Engine output)
CREATE TABLE public.milestones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  milestone_type public.milestone_type NOT NULL,
  trigger_date DATE NOT NULL,
  predicted_date DATE,
  confidence_score DECIMAL(3,2) DEFAULT 0.70,
  status public.milestone_status DEFAULT 'pending',
  behavioral_data JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Reward packages table (AI Agent generated)
CREATE TABLE public.reward_packages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  milestone_id UUID REFERENCES public.milestones(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  category public.reward_category NOT NULL,
  estimated_cost DECIMAL(10,2) NOT NULL,
  ai_reasoning TEXT,
  preference_score DECIMAL(3,2) DEFAULT 0.00,
  options JSONB DEFAULT '{}',
  status public.package_status DEFAULT 'draft',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Wallet transactions ledger (Co-Funding logic)
CREATE TABLE public.wallet_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  transaction_type public.transaction_type NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  balance_after DECIMAL(10,2) NOT NULL,
  milestone_id UUID REFERENCES public.milestones(id) ON DELETE SET NULL,
  package_id UUID REFERENCES public.reward_packages(id) ON DELETE SET NULL,
  approved_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Approvals workflow table
CREATE TABLE public.approvals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  package_id UUID REFERENCES public.reward_packages(id) ON DELETE CASCADE NOT NULL,
  requested_by UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  manager_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL NOT NULL,
  status public.approval_status DEFAULT 'pending',
  employer_contribution DECIMAL(10,2) DEFAULT 0,
  employee_contribution DECIMAL(10,2) DEFAULT 0,
  comments TEXT,
  approved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Package feedback table
CREATE TABLE public.package_feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  package_id UUID REFERENCES public.reward_packages(id) ON DELETE CASCADE NOT NULL,
  employee_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  customization_requests JSONB DEFAULT '{}',
  preference_data JSONB DEFAULT '{}',
  submitted_at TIMESTAMPTZ DEFAULT now()
);

-- HRIS events table (Gateway input)
CREATE TABLE public.hris_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  event_type public.event_type NOT NULL,
  event_data JSONB DEFAULT '{}',
  source public.event_source NOT NULL,
  processed BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Trigger function for updated_at timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Apply updated_at triggers
CREATE TRIGGER update_companies_updated_at BEFORE UPDATE ON public.companies FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_milestones_updated_at BEFORE UPDATE ON public.milestones FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_reward_packages_updated_at BEFORE UPDATE ON public.reward_packages FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_approvals_updated_at BEFORE UPDATE ON public.approvals FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Trigger to auto-create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email)
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Enable Row Level Security on all tables
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reward_packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wallet_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.approvals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.package_feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hris_events ENABLE ROW LEVEL SECURITY;

-- RLS Policies for companies
CREATE POLICY "Admins can manage all companies" ON public.companies FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Employers can view their company" ON public.companies FOR SELECT TO authenticated USING (id = public.get_user_company_id(auth.uid()));

-- RLS Policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles FOR SELECT TO authenticated USING (id = auth.uid());
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE TO authenticated USING (id = auth.uid());
CREATE POLICY "Managers can view their team" ON public.profiles FOR SELECT TO authenticated USING (manager_id = auth.uid());
CREATE POLICY "Employers can view company profiles" ON public.profiles FOR SELECT TO authenticated USING (company_id = public.get_user_company_id(auth.uid()) AND public.has_role(auth.uid(), 'employer'));
CREATE POLICY "Admins can manage all profiles" ON public.profiles FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for user_roles
CREATE POLICY "Users can view their own roles" ON public.user_roles FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Admins can manage all roles" ON public.user_roles FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for milestones
CREATE POLICY "Employees can view their own milestones" ON public.milestones FOR SELECT TO authenticated USING (employee_id = auth.uid());
CREATE POLICY "Managers can view team milestones" ON public.milestones FOR SELECT TO authenticated USING (employee_id IN (SELECT id FROM public.profiles WHERE manager_id = auth.uid()));
CREATE POLICY "Employers can view company milestones" ON public.milestones FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'employer'));
CREATE POLICY "Admins can manage all milestones" ON public.milestones FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for reward_packages
CREATE POLICY "Employees can view their reward packages" ON public.reward_packages FOR SELECT TO authenticated USING (milestone_id IN (SELECT id FROM public.milestones WHERE employee_id = auth.uid()));
CREATE POLICY "Managers can view team reward packages" ON public.reward_packages FOR SELECT TO authenticated USING (milestone_id IN (SELECT id FROM public.milestones WHERE employee_id IN (SELECT id FROM public.profiles WHERE manager_id = auth.uid())));
CREATE POLICY "Employers can view company packages" ON public.reward_packages FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'employer'));
CREATE POLICY "Admins can manage all packages" ON public.reward_packages FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for wallet_transactions
CREATE POLICY "Employees can view their transactions" ON public.wallet_transactions FOR SELECT TO authenticated USING (employee_id = auth.uid());
CREATE POLICY "Employers can view company transactions" ON public.wallet_transactions FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'employer'));
CREATE POLICY "Admins can manage all transactions" ON public.wallet_transactions FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for approvals
CREATE POLICY "Employees can view their approval requests" ON public.approvals FOR SELECT TO authenticated USING (requested_by = auth.uid());
CREATE POLICY "Managers can view and manage team approvals" ON public.approvals FOR ALL TO authenticated USING (manager_id = auth.uid());
CREATE POLICY "Employers can view company approvals" ON public.approvals FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'employer'));
CREATE POLICY "Admins can manage all approvals" ON public.approvals FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for package_feedback
CREATE POLICY "Employees can manage their own feedback" ON public.package_feedback FOR ALL TO authenticated USING (employee_id = auth.uid());
CREATE POLICY "Employers can view company feedback" ON public.package_feedback FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'employer'));
CREATE POLICY "Admins can view all feedback" ON public.package_feedback FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for hris_events
CREATE POLICY "Employees can view their events" ON public.hris_events FOR SELECT TO authenticated USING (employee_id = auth.uid());
CREATE POLICY "Admins can manage all events" ON public.hris_events FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));