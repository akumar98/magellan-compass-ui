import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import Index from "./pages/Index";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/Dashboard";
import Rewards from "./pages/Rewards";
import RewardDetail from "./pages/RewardDetail";
import Community from "./pages/Community";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import Preferences from "./pages/Preferences";
import Contributions from "./pages/Contributions";
import ReferFriend from "./pages/ReferFriend";
import Support from "./pages/Support";
import EmployeeActivity from "./pages/employee/EmployeeActivity";
import EmployeeOnboarding from "./pages/employee/EmployeeOnboarding";
import RedemptionHistory from "./pages/employee/RedemptionHistory";
import Notifications from "./pages/employee/Notifications";
import EmployerTeam from "./pages/employer/EmployerTeam";
import EmployerApprovals from "./pages/employer/EmployerApprovals";
import EmployerReports from "./pages/employer/EmployerReports";
import EmployerBurnout from "./pages/employer/EmployerBurnout";
import EmployerProfile from "./pages/employer/EmployerProfile";
import EmployerEmployeeApproval from "./pages/employer/EmployerEmployeeApproval";
import EmployerBilling from "./pages/employer/EmployerBilling";
import EmployerMatchingPolicy from "./pages/employer/EmployerMatchingPolicy";
import EmployeeDetail from "./pages/employer/EmployeeDetail";
import Analytics from "./pages/employer/Analytics";
import CompaniesManagement from "./pages/admin/CompaniesManagement";
import EmployeesManagement from "./pages/admin/EmployeesManagement";
import RewardsCatalog from "./pages/admin/RewardsCatalog";
import SystemSettings from "./pages/admin/SystemSettings";
import AuditLogs from "./pages/admin/AuditLogs";
import Help from "./pages/Help";
import CompanyOnboarding from "./pages/CompanyOnboarding";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            
            {/* Feature routes */}
            <Route path="/rewards" element={<Rewards />} />
            <Route path="/rewards/:id" element={<RewardDetail />} />
            <Route path="/community" element={<Community />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/preferences" element={<Preferences />} />
            <Route path="/contributions" element={<Contributions />} />
            <Route path="/refer" element={<ReferFriend />} />
            <Route path="/support" element={<Support />} />
            <Route path="/employee/activity" element={<EmployeeActivity />} />
            <Route path="/employee/onboarding" element={<EmployeeOnboarding />} />
            <Route path="/employee/redemption-history" element={<RedemptionHistory />} />
            <Route path="/employee/notifications" element={<Notifications />} />
            
            {/* Employer routes */}
          <Route path="/employer/profile" element={<EmployerProfile />} />
          <Route path="/employer/team" element={<EmployerTeam />} />
          <Route path="/employer/team/:id" element={<EmployeeDetail />} />
          <Route path="/employer/approvals" element={<EmployerApprovals />} />
          <Route path="/employer/employee-approval" element={<EmployerEmployeeApproval />} />
          <Route path="/employer/billing" element={<EmployerBilling />} />
          <Route path="/employer/reports" element={<EmployerReports />} />
          <Route path="/employer/analytics" element={<Analytics />} />
          <Route path="/employer/burnout" element={<EmployerBurnout />} />
          <Route path="/employer/matching-policy" element={<EmployerMatchingPolicy />} />
            
            {/* Admin routes */}
            <Route path="/admin/companies" element={<CompaniesManagement />} />
            <Route path="/admin/employees" element={<EmployeesManagement />} />
            <Route path="/admin/rewards" element={<RewardsCatalog />} />
            <Route path="/admin/settings" element={<SystemSettings />} />
            <Route path="/admin/logs" element={<AuditLogs />} />

            {/* Shared routes */}
            <Route path="/help" element={<Help />} />
            <Route path="/onboarding/company" element={<CompanyOnboarding />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
