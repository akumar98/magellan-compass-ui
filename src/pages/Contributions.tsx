import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Info, TrendingUp, MapPin, CheckCircle2, Clock } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Contributions() {
  const [selectedPeriod, setSelectedPeriod] = useState('Last 30 days');
  const [contributionAmount, setContributionAmount] = useState(100);
  const [autoContribute, setAutoContribute] = useState(false);

  const contributions = [
    { date: 'Aug 5, 2023', amount: 100, match: 100, status: 'Confirmed' },
    { date: 'Jul 5, 2023', amount: 100, match: 100, status: 'Confirmed' },
    { date: 'Jun 5, 2023', amount: 100, match: 100, status: 'Confirmed' },
    { date: 'May 5, 2023', amount: 100, match: 100, status: 'Confirmed' },
    { date: 'Apr 5, 2023', amount: 100, match: 100, status: 'Confirmed' },
    { date: 'Mar 5, 2023', amount: 100, match: 100, status: 'Confirmed' },
    { date: 'Feb 5, 2023', amount: 120, match: 120, status: 'Pending' },
    { date: 'Feb 5, 2023', amount: 120, match: 120, status: 'Pending' },
    { date: 'Feb 5, 2023', amount: 120, match: 120, status: 'Pending' },
    { date: 'Feb 5, 2023', amount: 120, match: 120, status: 'Pending' },
    { date: 'Feb 5, 2023', amount: 120, match: 120, status: 'Pending' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2">My Contributions</h1>
          <p className="text-muted-foreground">Track your progress and matching contributions toward your next reward.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - 2/3 width */}
          <div className="lg:col-span-2 space-y-6">
            {/* Progress Tracker */}
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-6">Contribution Progress Tracker</h2>
              <div className="flex items-center gap-8">
                {/* Circular Progress */}
                <div className="relative h-48 w-48 flex-shrink-0">
                  <svg className="transform -rotate-90 h-48 w-48">
                    <circle
                      cx="96"
                      cy="96"
                      r="80"
                      stroke="currentColor"
                      strokeWidth="12"
                      fill="none"
                      className="text-muted"
                    />
                    <circle
                      cx="96"
                      cy="96"
                      r="80"
                      stroke="currentColor"
                      strokeWidth="12"
                      fill="none"
                      strokeDasharray={502}
                      strokeDashoffset={502 - (502 * 72) / 100}
                      className="text-primary"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-5xl font-bold text-primary">72%</div>
                    </div>
                  </div>
                </div>

                {/* Progress Details */}
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">You've contributed $720 toward your next milestone</h3>
                  <div className="space-y-2">
                    <div className="flex items-baseline gap-2">
                      <span className="text-muted-foreground">Your employer matched</span>
                      <span className="font-semibold">$720</span>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-primary font-semibold">$1,000 needed for next reward</span>
                      <Info className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <Progress value={72} className="h-3 mt-3" />
                    <p className="text-xs text-muted-foreground mt-2">Milestone progress updates in real-time</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Contribution History */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Contribution History</h2>
                <div className="flex gap-2">
                  <Badge 
                    variant={selectedPeriod === 'Last 30 days' ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => setSelectedPeriod('Last 30 days')}
                  >
                    Last 30 days
                  </Badge>
                  <Badge 
                    variant={selectedPeriod === '3 months' ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => setSelectedPeriod('3 months')}
                  >
                    3 months
                  </Badge>
                  <Badge 
                    variant={selectedPeriod === 'All Time' ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => setSelectedPeriod('All Time')}
                  >
                    All Time
                  </Badge>
                </div>
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount Added</TableHead>
                    <TableHead>Match Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contributions.map((contribution, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{contribution.date}</TableCell>
                      <TableCell>${contribution.amount.toFixed(2)}</TableCell>
                      <TableCell>${contribution.match.toFixed(2)}</TableCell>
                      <TableCell>
                        {contribution.status === 'Confirmed' ? (
                          <Badge variant="secondary" className="bg-success/10 text-success gap-1.5">
                            <CheckCircle2 className="h-3 w-3" />
                            Confirmed
                          </Badge>
                        ) : (
                          <Badge variant="secondary" className="bg-warning/10 text-warning gap-1.5">
                            <Clock className="h-3 w-3" />
                            Pending
                          </Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>

            {/* Adjust Contribution */}
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-6">Adjust My Contribution</h2>
              <div className="space-y-6">
                <div>
                  <div className="flex gap-2 mb-4">
                    {[50, 100, 150].map((amount) => (
                      <Badge
                        key={amount}
                        variant={contributionAmount === amount ? 'default' : 'outline'}
                        className="cursor-pointer px-6 py-2"
                        onClick={() => setContributionAmount(amount)}
                      >
                        ${amount}
                      </Badge>
                    ))}
                    <Badge variant="outline" className="px-6 py-2">Custom</Badge>
                  </div>

                  <div className="mb-2">
                    <Label className="text-sm font-semibold">Contribution amount: ${contributionAmount}/month</Label>
                  </div>
                  <Slider 
                    value={[contributionAmount]} 
                    onValueChange={(value) => setContributionAmount(value[0])}
                    max={200} 
                    min={25}
                    step={25} 
                    className="mb-4"
                  />

                  <div className="flex items-center justify-between mt-4">
                    <div>
                      <p className="font-medium">Auto-contribute monthly</p>
                      <p className="text-sm text-muted-foreground">Automatically deduct from your paycheck</p>
                    </div>
                    <Switch checked={autoContribute} onCheckedChange={setAutoContribute} />
                  </div>
                </div>

                {/* Projected Rewards Chart Placeholder */}
                <div className="bg-muted/30 rounded-lg p-6 h-64 flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <TrendingUp className="h-12 w-12 mx-auto mb-2" />
                    <p className="font-semibold">Projected Rewards Unlocked</p>
                    <p className="text-sm">Chart showing contribution growth over time</p>
                  </div>
                </div>

                <Button className="w-auto">Save Changes</Button>
              </div>
            </Card>
          </div>

          {/* Right Column - 1/3 width */}
          <div className="space-y-6">
            {/* Next Reward Preview */}
            <Card className="overflow-hidden">
              <div className="relative h-40">
                <img 
                  src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80" 
                  alt="Next reward"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-5 space-y-4">
                <div>
                  <h3 className="font-bold mb-1">Next Reward</h3>
                  <p className="text-lg font-bold">3-Day Spa Retreat</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                    <MapPin className="h-3.5 w-3.5" />
                    Colorado, USA
                  </div>
                </div>

                <div className="flex gap-2">
                  <Badge variant="secondary" className="bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">
                    Wellness
                  </Badge>
                  <Badge variant="outline">Solo</Badge>
                  <Badge variant="outline">~$1000</Badge>
                </div>

                <div>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Progress to unlock</span>
                    <span className="text-primary font-semibold">72%</span>
                  </div>
                  <Progress value={72} className="h-2" />
                </div>

                <Link to="/rewards">
                  <Button className="w-full" variant="outline">View All Rewards</Button>
                </Link>
              </div>
            </Card>

            {/* Contribution Impact */}
            <Card className="p-5 bg-primary/5 border-primary/20">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Info className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Contribution Impact</h3>
                  <p className="text-sm text-muted-foreground">Employees who contribute consistently unlock 2.4x more rewards per year.</p>
                </div>
              </div>
            </Card>

            {/* Quick Help */}
            <Card className="p-5">
              <h3 className="font-semibold mb-4">Quick Help</h3>
              <div className="space-y-3">
                {[
                  'How does contribution matching work?',
                  'When do rewards become available?',
                  'Can I roll over contributions?',
                  'How to maximize your rewards'
                ].map((question, index) => (
                  <Button key={index} variant="ghost" className="w-full justify-start text-left text-primary p-0 h-auto font-normal">
                    <Info className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span className="text-sm">{question}</span>
                  </Button>
                ))}
              </div>
            </Card>

            {/* 2023 Annual Summary */}
            <Card className="p-5">
              <h3 className="font-semibold mb-4">2023 Annual Summary</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Your contributions:</span>
                  <span className="font-semibold">$720.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Employer match:</span>
                  <span className="font-semibold">$720.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Rewards unlocked:</span>
                  <span className="font-semibold">1</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Rewards redeemed:</span>
                  <span className="font-semibold">0</span>
                </div>
                <div className="flex justify-between pt-2 border-t">
                  <span className="text-muted-foreground">Remaining match available:</span>
                  <span className="font-semibold text-primary">$280.00</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return <label className={className}>{children}</label>;
}
