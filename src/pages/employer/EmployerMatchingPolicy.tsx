import { useState } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Info, CalendarIcon, TrendingUp } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function EmployerMatchingPolicy() {
  const [matchingPercentage, setMatchingPercentage] = useState([75]);
  const [maxPerEmployee, setMaxPerEmployee] = useState('2,500');
  const [maxPerYear, setMaxPerYear] = useState('750,000');
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  const impactData = [
    { percentage: '25%', cost: 280000, engagement: 4 },
    { percentage: '50%', cost: 380000, engagement: 8 },
    { percentage: '75%', cost: 480000, engagement: 12 },
    { percentage: '100%', cost: 562500, engagement: 16 },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Adjust Matching Policy</h1>
        <p className="text-muted-foreground mt-1">
          Define how contributions are matched to maximize employee engagement and reward alignment.
        </p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-primary">Matching Percentage</CardTitle>
          <Info className="h-5 w-5 text-primary" />
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-4">
            <div className="text-5xl font-bold text-primary">{matchingPercentage[0]}%</div>
            <p className="text-sm text-muted-foreground">Current matching percentage</p>
          </div>

          <div className="space-y-2">
            <Slider
              value={matchingPercentage}
              onValueChange={setMatchingPercentage}
              max={100}
              step={5}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0%</span>
              <span>25%</span>
              <span>50%</span>
              <span>75%</span>
              <span>100%</span>
            </div>
          </div>

          <div className="bg-accent/30 border border-primary/20 rounded-lg p-4 flex gap-3">
            <Info className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <p className="text-sm text-foreground">
              <span className="font-semibold">How matching works:</span> For every dollar contributed by an employee, 
              your company will contribute ${(matchingPercentage[0] / 100).toFixed(2)} ({matchingPercentage[0]}%) to their 
              rewards balance, up to the defined limits.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-primary">Contribution Limits</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="max-employee">Max Matching Per Employee</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                <Input
                  id="max-employee"
                  value={maxPerEmployee}
                  onChange={(e) => setMaxPerEmployee(e.target.value)}
                  className="pl-7"
                />
              </div>
              <p className="text-xs text-muted-foreground">Maximum amount matched per employee per year</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="max-year">Max Matching Per Year</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                <Input
                  id="max-year"
                  value={maxPerYear}
                  onChange={(e) => setMaxPerYear(e.target.value)}
                  className="pl-7"
                />
              </div>
              <p className="text-xs text-muted-foreground">Total budget for matching across all employees</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-primary">Eligibility Rules</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Eligible Employee Groups</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select employee groups" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Employees</SelectItem>
                  <SelectItem value="full-time">Full-Time Only</SelectItem>
                  <SelectItem value="engineering">Engineering</SelectItem>
                  <SelectItem value="sales">Sales</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">Hold Ctrl/Cmd to select multiple groups</p>
            </div>

            <div className="space-y-4">
              <Label>Policy Activation Period</Label>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Start Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !startDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {startDate ? format(startDate, "yyyy-MM-dd") : "2025-08-01"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={startDate}
                        onSelect={setStartDate}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">End Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !endDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {endDate ? format(endDate, "yyyy-MM-dd") : "2026-07-31"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={endDate}
                        onSelect={setEndDate}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">Policy will be active during this period</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-primary">Impact Preview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={impactData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="percentage" 
                stroke="hsl(var(--muted-foreground))"
                label={{ value: 'Matching Percentage', position: 'insideBottom', offset: -5 }}
              />
              <YAxis 
                yAxisId="left"
                stroke="hsl(var(--primary))"
                label={{ value: 'Cost ($)', angle: -90, position: 'insideLeft' }}
                tickFormatter={(value) => `$${value / 1000}k`}
              />
              <YAxis 
                yAxisId="right"
                orientation="right"
                stroke="hsl(var(--chart-2))"
                label={{ value: 'Engagement Lift (%)', angle: 90, position: 'insideRight' }}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip />
              <Legend />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="cost" 
                stroke="hsl(var(--primary))" 
                strokeWidth={3}
                name="Estimated Cost"
                dot={{ fill: 'hsl(var(--primary))', r: 5 }}
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="engagement" 
                stroke="hsl(var(--chart-2))" 
                strokeWidth={3}
                name="Projected Engagement Lift"
                dot={{ fill: 'hsl(var(--chart-2))', r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-primary/10 rounded-lg p-4 border border-primary/20">
              <div className="flex items-center gap-2 text-primary mb-1">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <span className="text-sm font-medium">Estimated Cost</span>
              </div>
              <div className="text-3xl font-bold text-foreground">$562,500</div>
            </div>

            <div className="bg-chart-2/10 rounded-lg p-4 border border-chart-2/20">
              <div className="flex items-center gap-2 text-chart-2 mb-1">
                <div className="w-3 h-3 rounded-full bg-chart-2" />
                <span className="text-sm font-medium">Projected Engagement Lift</span>
              </div>
              <div className="text-3xl font-bold text-foreground">+12%</div>
            </div>
          </div>

          <div className="bg-accent/30 border border-primary/20 rounded-lg p-4 flex gap-3">
            <TrendingUp className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <p className="text-sm text-foreground">
              Adjusting to {matchingPercentage[0]}% match may increase participation by 12% based on historical 
              data and industry benchmarks.
            </p>
          </div>
        </CardContent>
      </Card>

        <div className="flex justify-end gap-3">
          <Button variant="outline">Cancel</Button>
          <Button>Save Policy Changes</Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
