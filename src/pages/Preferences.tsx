import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Info, Plane, Building2, BadgeCheck } from 'lucide-react';
import { useState } from 'react';

export default function Preferences() {
  const [travelType, setTravelType] = useState('Solo');
  const [rewardTypes, setRewardTypes] = useState(['Beach', 'Adventure']);
  const [budgetZone, setBudgetZone] = useState('$1,000-3,000');
  const [wellnessInterests, setWellnessInterests] = useState(['Spa', 'Meditation']);
  const [energyLevel, setEnergyLevel] = useState(50);
  const [contributionAmount, setContributionAmount] = useState(50);
  const [autoContribute, setAutoContribute] = useState(false);

  const toggleSelection = (array: string[], setArray: (arr: string[]) => void, item: string) => {
    if (array.includes(item)) {
      setArray(array.filter(i => i !== item));
    } else {
      setArray([...array, item]);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in max-w-5xl">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2">Preferences & Contributions</h1>
          <p className="text-muted-foreground">Personalize your journey and manage your reward contributions</p>
        </div>

        {/* Travel & Wellness Preferences */}
        <Card className="p-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Plane className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Your Travel & Wellness Preferences</h2>
                <p className="text-sm text-muted-foreground">These help us recommend the best rewards for you.</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="gap-2 text-primary">
              <Info className="h-4 w-4" />
              Why this matters
            </Button>
          </div>

          <div className="space-y-6">
            {/* Travel Type Preference */}
            <div>
              <Label className="text-sm font-semibold mb-3 block">Travel Type Preference</Label>
              <div className="flex gap-3">
                {['Solo', 'Couple', 'Family'].map((type) => (
                  <Badge
                    key={type}
                    variant={travelType === type ? 'default' : 'outline'}
                    className="cursor-pointer px-6 py-2 text-sm"
                    onClick={() => setTravelType(type)}
                  >
                    {type}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Preferred Reward Types */}
            <div>
              <Label className="text-sm font-semibold mb-3 block">Preferred Reward Types</Label>
              <div className="flex flex-wrap gap-2">
                {['Beach', 'Adventure', 'Nature', 'Culture', 'Luxury'].map((type) => (
                  <Badge
                    key={type}
                    variant={rewardTypes.includes(type) ? 'default' : 'outline'}
                    className="cursor-pointer px-4 py-2 text-sm"
                    onClick={() => toggleSelection(rewardTypes, setRewardTypes, type)}
                  >
                    {type}
                    {rewardTypes.includes(type) && <span className="ml-2">×</span>}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Budget Comfort Zone */}
            <div>
              <Label className="text-sm font-semibold mb-3 block">Budget Comfort Zone</Label>
              <div className="flex gap-3">
                {['<$1,000', '$1,000-3,000', '$3,000-6,000', '$6,000+'].map((zone) => (
                  <Badge
                    key={zone}
                    variant={budgetZone === zone ? 'default' : 'outline'}
                    className="cursor-pointer px-5 py-2 text-sm"
                    onClick={() => setBudgetZone(zone)}
                  >
                    {zone}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Wellness Interests */}
            <div>
              <Label className="text-sm font-semibold mb-3 block">Wellness Interests</Label>
              <div className="flex flex-wrap gap-2">
                {['Spa', 'Meditation', 'Yoga', 'Fitness', 'Nutrition'].map((interest) => (
                  <Badge
                    key={interest}
                    variant={wellnessInterests.includes(interest) ? 'default' : 'outline'}
                    className="cursor-pointer px-4 py-2 text-sm"
                    onClick={() => toggleSelection(wellnessInterests, setWellnessInterests, interest)}
                  >
                    {interest}
                    {wellnessInterests.includes(interest) && <span className="ml-2">×</span>}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Track Life Events */}
            <div>
              <Label className="text-sm font-semibold mb-3 block">Track Life Events (optional)</Label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs text-muted-foreground mb-2 block">Anniversary</Label>
                  <Input type="date" defaultValue="2018-06-15" />
                </div>
                <div>
                  <Label className="text-xs text-muted-foreground mb-2 block">Birthday</Label>
                  <Input type="date" defaultValue="2018-06-15" />
                </div>
              </div>
              <Button variant="link" className="mt-2 px-0 text-primary">+ Add another date</Button>
            </div>

            {/* Burnout Check-in */}
            <div>
              <Label className="text-sm font-semibold mb-2 block">Burnout Check-in (How energized are you feeling lately?)</Label>
              <div className="flex items-center gap-4 pt-4">
                <span className="text-2xl">😫</span>
                <Slider 
                  value={[energyLevel]} 
                  onValueChange={(value) => setEnergyLevel(value[0])}
                  max={100} 
                  step={1} 
                  className="flex-1"
                />
                <span className="text-2xl">🤩</span>
              </div>
            </div>

            <Button className="w-auto">Save Preferences</Button>
          </div>
        </Card>

        {/* Monthly Contribution */}
        <Card className="p-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-success/10 flex items-center justify-center">
                <BadgeCheck className="h-5 w-5 text-success" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Your Monthly Contribution</h2>
                <p className="text-sm text-muted-foreground">This is how much you set aside toward milestone rewards.</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-primary/10 text-primary">On track</Badge>
          </div>

          <div className="space-y-6">
            {/* Contribution Amount */}
            <div>
              <Label className="text-sm font-semibold mb-3 block">Contribution Amount</Label>
              <div className="mb-4">
                <div className="text-2xl font-bold text-primary mb-1">Currently contributing ${contributionAmount}/month</div>
                <div className="flex gap-2 text-xs text-muted-foreground">
                  <span>$25</span>
                  <span>$50</span>
                  <span>$75</span>
                  <span>$100</span>
                  <span>Custom</span>
                </div>
              </div>
              <Slider 
                value={[contributionAmount]} 
                onValueChange={(value) => setContributionAmount(value[0])}
                max={100} 
                min={25}
                step={25} 
                className="mb-4"
              />
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Annual contribution: ${contributionAmount * 12}</span>
                <span className="text-primary font-semibold">Milestone progress: 42%</span>
              </div>
            </div>

            {/* Employer Match */}
            <Card className="bg-muted/50 border-primary/20 p-5">
              <div className="flex items-start gap-3 mb-4">
                <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Building2 className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Employer Match</h3>
                  <p className="text-sm text-muted-foreground">Your employer matches 100% up to $1,000/year</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Your contribution</span>
                  <span className="font-semibold">${contributionAmount * 12}/year</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Employer match</span>
                  <span className="font-semibold text-primary">${contributionAmount * 12}/year</span>
                </div>
                <div className="flex justify-between pt-2 border-t">
                  <span className="font-semibold">Total annual rewards</span>
                  <span className="font-bold text-primary">${contributionAmount * 12 * 2}</span>
                </div>
              </div>
            </Card>

            {/* Auto-contribute */}
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">Auto-contribute monthly</p>
                <p className="text-sm text-muted-foreground">Automatically deduct from your paycheck</p>
              </div>
              <Switch checked={autoContribute} onCheckedChange={setAutoContribute} />
            </div>

            <Button className="w-auto">Save Contribution Settings</Button>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
