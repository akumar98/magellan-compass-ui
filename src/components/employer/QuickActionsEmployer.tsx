import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserPlus, Settings, FileText } from 'lucide-react';

interface QuickActionsEmployerProps {
  onAddEmployees?: () => void;
  onAdjustPolicy?: () => void;
  onExportReport?: () => void;
}

export const QuickActionsEmployer: React.FC<QuickActionsEmployerProps> = ({
  onAddEmployees,
  onAdjustPolicy,
  onExportReport,
}) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <Button className="w-full justify-start gap-3" onClick={onAddEmployees}>
          <UserPlus className="h-4 w-4" />
          Add Employees
        </Button>
        <Button variant="outline" className="w-full justify-start gap-3" onClick={onAdjustPolicy}>
          <Settings className="h-4 w-4" />
          Adjust Matching Policy
        </Button>
        <Button variant="outline" className="w-full justify-start gap-3" onClick={onExportReport}>
          <FileText className="h-4 w-4" />
          Export Report
        </Button>
      </CardContent>
    </Card>
  );
};