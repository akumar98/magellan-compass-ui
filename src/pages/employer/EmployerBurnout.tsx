import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { BurnoutRiskOverview } from '@/components/burnout/BurnoutRiskOverview';
import { AlertTriangle } from 'lucide-react';

export default function EmployerBurnout() {
  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div>
          <div className="flex items-center gap-3 mb-2">
            <AlertTriangle className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold">Burnout Risk Analytics</h1>
          </div>
          <p className="text-muted-foreground">
            AI-powered early detection and intervention recommendations for your team
          </p>
        </div>

        {/* Burnout Risk Overview */}
        <BurnoutRiskOverview />
      </div>
    </DashboardLayout>
  );
}
