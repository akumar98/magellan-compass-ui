import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Gift, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function Rewards() {
  const mockRewards = [
    { id: 1, name: 'Premium Headphones', points: 500, category: 'Electronics', available: true },
    { id: 2, name: 'Gift Card - $50', points: 300, category: 'Gift Cards', available: true },
    { id: 3, name: 'Coffee Maker', points: 800, category: 'Home & Kitchen', available: true },
    { id: 4, name: 'Fitness Tracker', points: 600, category: 'Health & Fitness', available: true },
    { id: 5, name: 'Office Chair', points: 1200, category: 'Office', available: true },
    { id: 6, name: 'Wireless Mouse', points: 250, category: 'Electronics', available: true },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2">Rewards Catalog</h1>
          <p className="text-muted-foreground">Browse and claim amazing rewards with your points</p>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search rewards..." className="pl-10" />
          </div>
          <div className="flex gap-2 overflow-x-auto">
            <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">All</Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">Electronics</Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">Gift Cards</Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">Home & Kitchen</Badge>
          </div>
        </div>

        {/* Rewards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockRewards.map((reward) => (
            <div key={reward.id} className="card-reward">
              <div className="h-48 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                <Gift className="h-16 w-16 text-primary" />
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold">{reward.name}</h3>
                  <Badge variant="secondary" className="text-xs">{reward.category}</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  High-quality reward perfect for any occasion
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-primary">{reward.points} pts</span>
                  <Button size="sm">Claim Now</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
