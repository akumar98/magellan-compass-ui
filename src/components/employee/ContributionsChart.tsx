import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, ResponsiveContainer, Cell } from 'recharts';

interface ContributionsChartProps {
  onAdjust?: () => void;
}

export const ContributionsChart: React.FC<ContributionsChartProps> = ({ onAdjust }) => {
  const data = [
    { month: 'Jan', yours: 800, match: 500 },
    { month: 'Feb', yours: 900, match: 550 },
    { month: 'Mar', yours: 950, match: 600 },
    { month: 'Apr', yours: 1000, match: 650 },
    { month: 'May', yours: 1100, match: 700 },
    { month: 'Jun', yours: 1150, match: 750 },
  ];

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Contributions Overview</CardTitle>
          {onAdjust && (
            <Button variant="link" size="sm" onClick={onAdjust} className="text-primary h-auto p-0">
              Adjust my contributions
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis
                dataKey="month"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <Bar dataKey="yours" stackId="a" radius={[0, 0, 0, 0]}>
                {data.map((_, index) => (
                  <Cell key={`cell-yours-${index}`} fill="hsl(var(--chart-1))" />
                ))}
              </Bar>
              <Bar dataKey="match" stackId="a" radius={[4, 4, 0, 0]}>
                {data.map((_, index) => (
                  <Cell key={`cell-match-${index}`} fill="hsl(var(--chart-2))" />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-3 pt-2 border-t">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-[hsl(var(--chart-1))]" />
              <span className="text-sm">Your contributions</span>
            </div>
            <span className="text-sm font-semibold">$4,800 / year</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-[hsl(var(--chart-2))]" />
              <span className="text-sm">Employer match</span>
            </div>
            <span className="text-sm font-semibold">$3,200 / year</span>
          </div>
          <div className="pt-3 border-t space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Total balance</span>
              <span className="text-lg font-bold">$18,650</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Annual growth</span>
              <span className="text-sm font-medium text-success">+12.4%</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};