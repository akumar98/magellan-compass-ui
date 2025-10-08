import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { cn } from '@/lib/utils';

interface StatsWithChartProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ReactNode;
  iconColor: string;
  data: number[];
  chartColor: string;
}

export const StatsWithChart: React.FC<StatsWithChartProps> = ({
  title,
  value,
  change,
  isPositive,
  icon,
  iconColor,
  data,
  chartColor,
}) => {
  const chartData = data.map((value, index) => ({ value, index }));

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground flex items-center gap-2">
              <div className={cn('h-8 w-8 rounded-lg flex items-center justify-center', iconColor)}>
                {icon}
              </div>
              {title}
            </span>
          </div>
          
          <div className="space-y-1">
            <div className="text-3xl font-bold">{value}</div>
            <div className="flex items-center gap-1">
              {isPositive ? (
                <TrendingUp className="h-4 w-4 text-success" />
              ) : (
                <TrendingDown className="h-4 w-4 text-destructive" />
              )}
              <span className={cn('text-sm font-medium', isPositive ? 'text-success' : 'text-destructive')}>
                {change}
              </span>
            </div>
          </div>

          <div className="h-12">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={chartColor}
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};