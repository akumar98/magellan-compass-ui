import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';
import { useState } from 'react';

export const ContributionsVsMatch: React.FC = () => {
  const [period, setPeriod] = useState('Monthly');

  const data = [
    { quarter: 'Q1 2024', employee: 40000, company: 32000 },
    { quarter: 'Q2 2024', employee: 50000, company: 38000 },
    { quarter: 'Q3 2024', employee: 55000, company: 42000 },
    { quarter: 'Q4 2024', employee: 60000, company: 48000 },
    { quarter: 'Q1 2025', employee: 65000, company: 52000 },
    { quarter: 'Q2 2025', employee: 68000, company: 58000 },
  ];

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle>Contributions vs. Company Match</CardTitle>
          <Tabs value={period} onValueChange={setPeriod}>
            <TabsList className="h-8">
              <TabsTrigger value="Monthly" className="text-xs">Monthly</TabsTrigger>
              <TabsTrigger value="Quarterly" className="text-xs">Quarterly</TabsTrigger>
              <TabsTrigger value="Yearly" className="text-xs">Yearly</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} barGap={8}>
              <XAxis
                dataKey="quarter"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value / 1000}k`}
              />
              <Bar dataKey="employee" radius={[4, 4, 0, 0]}>
                {data.map((_, index) => (
                  <Cell key={`cell-employee-${index}`} fill="hsl(var(--chart-2))" />
                ))}
              </Bar>
              <Bar dataKey="company" radius={[4, 4, 0, 0]}>
                {data.map((_, index) => (
                  <Cell key={`cell-company-${index}`} fill="hsl(var(--chart-3))" />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="flex items-center justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-[hsl(var(--chart-2))]" />
            <span className="text-sm">Employee Contributions</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-[hsl(var(--chart-3))]" />
            <span className="text-sm">Company Match</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};