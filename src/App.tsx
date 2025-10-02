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
            
            {/* Placeholder routes - will be built in next phases */}
            <Route path="/employer/team" element={<Navigate to="/dashboard" replace />} />
            <Route path="/employer/approvals" element={<Navigate to="/dashboard" replace />} />
            <Route path="/employer/reports" element={<Navigate to="/dashboard" replace />} />
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
