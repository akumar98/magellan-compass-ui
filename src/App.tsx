import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import Index from "./pages/Index";
import LandingPage from "./pages/LandingPage";
import RoleSelection from "./pages/RoleSelection";
import Login from "./pages/auth/Login";
import AdminLogin from "./pages/admin/AdminLogin";
import SuperAdminLogin from "./pages/admin/SuperAdminLogin";
import SuperAdminDashboard from "./pages/super-admin/SuperAdminDashboard";
import SuperAdminCompanies from "./pages/super-admin/SuperAdminCompanies";
import SuperAdminUsers from "./pages/super-admin/SuperAdminUsers";
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
import EmployerNotifications from "./pages/employer/EmployerNotifications";
import AIConciergeOverview from "./pages/employer/AIConciergeOverview";
import AIConciergeDetection from "./pages/employer/AIConciergeDetection";
import AIConciergeReview from "./pages/employer/AIConciergeReview";
import CompaniesManagement from "./pages/admin/CompaniesManagement";
import EmployeesManagement from "./pages/admin/EmployeesManagement";
import RewardsCatalog from "./pages/admin/RewardsCatalog";
import SystemSettings from "./pages/admin/SystemSettings";
import AuditLogs from "./pages/admin/AuditLogs";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminBudgets from "./pages/admin/AdminBudgets";
import AdminIntegrations from "./pages/admin/AdminIntegrations";
import Help from "./pages/Help";
import CompanyOnboarding from "./pages/CompanyOnboarding";
import NotFound from "./pages/NotFound";
import HowItWorks from "./pages/HowItWorks";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";

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
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/super-admin/login" element={<SuperAdminLogin />} />
          <Route path="/role-selection" element={<RoleSelection />} />
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
            
            {/* Employer routes - Protected */}
            <Route path="/employer" element={<Navigate to="/employer/ai-concierge" replace />} />
          <Route path="/employer/profile" element={<ProtectedRoute requiredRole="employer"><EmployerProfile /></ProtectedRoute>} />
          <Route path="/employer/team" element={<ProtectedRoute requiredRole="employer"><EmployerTeam /></ProtectedRoute>} />
          <Route path="/employer/team/:id" element={<ProtectedRoute requiredRole="employer"><EmployeeDetail /></ProtectedRoute>} />
          <Route path="/employer/approvals" element={<ProtectedRoute requiredRole="employer"><EmployerApprovals /></ProtectedRoute>} />
          <Route path="/employer/employee-approval" element={<ProtectedRoute requiredRole="employer"><EmployerEmployeeApproval /></ProtectedRoute>} />
          <Route path="/employer/billing" element={<ProtectedRoute requiredRole="employer"><EmployerBilling /></ProtectedRoute>} />
          <Route path="/employer/notifications" element={<ProtectedRoute requiredRole="employer"><EmployerNotifications /></ProtectedRoute>} />
          <Route path="/employer/reports" element={<ProtectedRoute requiredRole="employer"><EmployerReports /></ProtectedRoute>} />
          <Route path="/employer/analytics" element={<ProtectedRoute requiredRole="employer"><Analytics /></ProtectedRoute>} />
          <Route path="/employer/burnout" element={<ProtectedRoute requiredRole="employer"><EmployerBurnout /></ProtectedRoute>} />
          <Route path="/employer/matching-policy" element={<ProtectedRoute requiredRole="employer"><EmployerMatchingPolicy /></ProtectedRoute>} />
          <Route path="/employer/ai-concierge" element={<ProtectedRoute requiredRole="employer"><AIConciergeOverview /></ProtectedRoute>} />
          <Route path="/employer/ai-concierge/detection" element={<ProtectedRoute requiredRole="employer"><AIConciergeDetection /></ProtectedRoute>} />
          <Route path="/employer/ai-concierge/review" element={<ProtectedRoute requiredRole="employer"><AIConciergeReview /></ProtectedRoute>} />
            
            {/* Super Admin routes - Protected */}
            <Route path="/super-admin" element={<ProtectedRoute requiredRole="super_admin"><SuperAdminDashboard /></ProtectedRoute>} />
            <Route path="/super-admin/companies" element={<ProtectedRoute requiredRole="super_admin"><SuperAdminCompanies /></ProtectedRoute>} />
            <Route path="/super-admin/users" element={<ProtectedRoute requiredRole="super_admin"><SuperAdminUsers /></ProtectedRoute>} />
            
            {/* Admin routes - Protected */}
            <Route path="/admin" element={<ProtectedRoute requiredRole="admin"><AdminDashboard /></ProtectedRoute>} />
            <Route path="/admin/companies" element={<ProtectedRoute requiredRole="admin"><CompaniesManagement /></ProtectedRoute>} />
            <Route path="/admin/employees" element={<ProtectedRoute requiredRole="admin"><EmployeesManagement /></ProtectedRoute>} />
            <Route path="/admin/rewards" element={<ProtectedRoute requiredRole="admin"><RewardsCatalog /></ProtectedRoute>} />
            <Route path="/admin/budgets" element={<ProtectedRoute requiredRole="admin"><AdminBudgets /></ProtectedRoute>} />
            <Route path="/admin/integrations" element={<ProtectedRoute requiredRole="admin"><AdminIntegrations /></ProtectedRoute>} />
            <Route path="/admin/settings" element={<ProtectedRoute requiredRole="admin"><SystemSettings /></ProtectedRoute>} />
            <Route path="/admin/logs" element={<ProtectedRoute requiredRole="admin"><AuditLogs /></ProtectedRoute>} />

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
