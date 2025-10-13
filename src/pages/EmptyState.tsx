import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { PackageOpen, ArrowLeft } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionLabel?: string;
  actionPath?: string;
  icon?: React.ReactNode;
}

export default function EmptyState({
  title = "Nothing here yet",
  description = "This section is empty. Check back later for updates.",
  actionLabel = "Go to Dashboard",
  actionPath = "/dashboard",
  icon,
}: EmptyStateProps) {
  const navigate = useNavigate();

  return (
    <DashboardLayout>
      <div className="min-h-[60vh] flex items-center justify-center">
        <Card className="max-w-md w-full">
          <CardContent className="pt-12 pb-12 text-center">
            <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-muted mb-6">
              {icon || <PackageOpen className="h-10 w-10 text-muted-foreground" />}
            </div>
            <h2 className="text-2xl font-bold mb-2">{title}</h2>
            <p className="text-muted-foreground mb-6">{description}</p>
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <Button variant="outline" onClick={() => navigate(-1)} className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Go Back
              </Button>
              <Button onClick={() => navigate(actionPath)}>
                {actionLabel}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
