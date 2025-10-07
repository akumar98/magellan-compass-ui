import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import Index from "./pages/Index";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/Dashboard";
import Rewards from "./pages/Rewards";
import Community from "./pages/Community";
import Settings from "./pages/Settings";
import EmployeeActivity from "./pages/employee/EmployeeActivity";
import EmployerTeam from "./pages/employer/EmployerTeam";
import EmployerApprovals from "./pages/employer/EmployerApprovals";
import EmployerReports from "./pages/employer/EmployerReports";
import EmployerBurnout from "./pages/employer/EmployerBurnout";
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
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            
            {/* Feature routes */}
            <Route path="/rewards" element={<Rewards />} />
            <Route path="/community" element={<Community />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/employee/activity" element={<EmployeeActivity />} />
            
            {/* Employer routes */}
          <Route path="/employer/team" element={<EmployerTeam />} />
          <Route path="/employer/approvals" element={<EmployerApprovals />} />
          <Route path="/employer/reports" element={<EmployerReports />} />
          <Route path="/employer/burnout" element={<EmployerBurnout />} />
            
            {/* Admin placeholder routes */}
            <Route path="/admin/companies" element={<Navigate to="/dashboard" replace />} />
            <Route path="/admin/employees" element={<Navigate to="/dashboard" replace />} />
            <Route path="/admin/rewards" element={<Navigate to="/dashboard" replace />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
