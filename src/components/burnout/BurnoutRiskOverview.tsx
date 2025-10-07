import { useEffect, useState } from 'react';
import { AlertTriangle, Users, TrendingUp, Activity } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { Progress } from '@/components/ui/progress';

interface RiskDistribution {
  low: number;
  medium: number;
  high: number;
  critical: number;
}

interface EmployeeRisk {
  id: string;
  employee_name: string;
  department: string;
  risk_level: string;
  risk_score: number;
  predicted_burnout_date: string;
  contributing_factors: string[];
}

export function BurnoutRiskOverview() {
  const [distribution, setDistribution] = useState<RiskDistribution>({
    low: 0,
    medium: 0,
    high: 0,
    critical: 0,
  });
  const [atRiskEmployees, setAtRiskEmployees] = useState<EmployeeRisk[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBurnoutData();
  }, []);

  const loadBurnoutData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Get company employees
      const { data: company } = await supabase
        .from('user_roles')
        .select('company_id')
        .eq('user_id', user.id)
        .single();

      if (!company?.company_id) return;

      // Get all employee predictions for the company
      const { data: profiles } = await supabase
        .from('profiles')
        .select('id, full_name, department')
        .eq('company_id', company.company_id);

      if (!profiles) return;

      const employeeIds = profiles.map(p => p.id);

      const { data: predictions } = await supabase
        .from('burnout_predictions')
        .select('*')
        .in('employee_id', employeeIds)
        .order('created_at', { ascending: false });

      if (!predictions) return;

      // Get latest prediction for each employee
      const latestPredictions = new Map();
      predictions.forEach(pred => {
        if (!latestPredictions.has(pred.employee_id)) {
          latestPredictions.set(pred.employee_id, pred);
        }
      });

      // Calculate distribution
      const dist: RiskDistribution = { low: 0, medium: 0, high: 0, critical: 0 };
      const risks: EmployeeRisk[] = [];

      latestPredictions.forEach((pred, employeeId) => {
        dist[pred.risk_level as keyof RiskDistribution]++;

        const profile = profiles.find(p => p.id === employeeId);
        if (pred.risk_level !== 'low' && profile) {
          risks.push({
            id: pred.id,
            employee_name: profile.full_name,
            department: profile.department || 'N/A',
            risk_level: pred.risk_level,
            risk_score: pred.risk_score,
            predicted_burnout_date: pred.predicted_burnout_date,
            contributing_factors: pred.contributing_factors || [],
          });
        }
      });

      setDistribution(dist);
      setAtRiskEmployees(risks.sort((a, b) => b.risk_score - a.risk_score));

    } catch (error) {
      console.error('Error loading burnout data:', error);
    } finally {
      setLoading(false);
    }
  };

  const totalEmployees = Object.values(distribution).reduce((a, b) => a + b, 0);

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low': return 'bg-success';
      case 'medium': return 'bg-warning';
      case 'high': return 'bg-destructive';
      case 'critical': return 'bg-destructive';
      default: return 'bg-muted';
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <Card className="p-6 animate-pulse">
          <div className="h-6 bg-muted rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-muted rounded w-2/3"></div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <Users className="h-5 w-5 text-muted-foreground" />
            <Badge variant="outline">Total</Badge>
          </div>
          <div className="text-2xl font-bold">{totalEmployees}</div>
          <div className="text-xs text-muted-foreground">Employees Monitored</div>
        </Card>

        <Card className="p-4 border-success/20 bg-success/5">
          <div className="flex items-center justify-between mb-2">
            <Activity className="h-5 w-5 text-success" />
            <Badge variant="secondary" className="bg-success/10 text-success">Low</Badge>
          </div>
          <div className="text-2xl font-bold text-success">{distribution.low}</div>
          <div className="text-xs text-muted-foreground">Low Risk</div>
        </Card>

        <Card className="p-4 border-warning/20 bg-warning/5">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="h-5 w-5 text-warning" />
            <Badge variant="secondary" className="bg-warning/10 text-warning">Medium</Badge>
          </div>
          <div className="text-2xl font-bold text-warning">{distribution.medium}</div>
          <div className="text-xs text-muted-foreground">Medium Risk</div>
        </Card>

        <Card className="p-4 border-destructive/20 bg-destructive/5">
          <div className="flex items-center justify-between mb-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            <Badge variant="destructive">High/Critical</Badge>
          </div>
          <div className="text-2xl font-bold text-destructive">{distribution.high + distribution.critical}</div>
          <div className="text-xs text-muted-foreground">Needs Attention</div>
        </Card>
      </div>

      {/* Risk Distribution */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Risk Distribution</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-24 text-sm font-medium">Low</div>
            <div className="flex-1">
              <Progress value={(distribution.low / totalEmployees) * 100} className="h-2 bg-success/20" />
            </div>
            <div className="w-12 text-sm text-right">{distribution.low}</div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-24 text-sm font-medium">Medium</div>
            <div className="flex-1">
              <Progress value={(distribution.medium / totalEmployees) * 100} className="h-2 bg-warning/20" />
            </div>
            <div className="w-12 text-sm text-right">{distribution.medium}</div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-24 text-sm font-medium">High</div>
            <div className="flex-1">
              <Progress value={(distribution.high / totalEmployees) * 100} className="h-2 bg-destructive/20" />
            </div>
            <div className="w-12 text-sm text-right">{distribution.high}</div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-24 text-sm font-medium">Critical</div>
            <div className="flex-1">
              <Progress value={(distribution.critical / totalEmployees) * 100} className="h-2 bg-destructive/20" />
            </div>
            <div className="w-12 text-sm text-right">{distribution.critical}</div>
          </div>
        </div>
      </Card>

      {/* At-Risk Employees */}
      {atRiskEmployees.length > 0 && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Employees Requiring Attention</h3>
          <div className="space-y-3">
            {atRiskEmployees.map((employee) => (
              <div key={employee.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <div className="font-medium">{employee.employee_name}</div>
                    <Badge variant="outline" className="text-xs">{employee.department}</Badge>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    {employee.contributing_factors.slice(0, 2).map((factor, idx) => (
                      <span key={idx} className="text-xs text-muted-foreground">
                        • {factor}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-sm font-bold">{employee.risk_score}%</div>
                    <div className="text-xs text-muted-foreground">Risk Score</div>
                  </div>
                  <Badge 
                    variant={employee.risk_level === 'critical' ? 'destructive' : 'default'}
                    className="capitalize"
                  >
                    {employee.risk_level}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
