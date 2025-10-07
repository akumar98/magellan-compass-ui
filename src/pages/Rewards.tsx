import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Plane, Search, Hotel, MapPin, Gift } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function Rewards() {
  const mockRewards = [
    { id: 1, name: 'Paris Weekend Getaway', points: 2500, category: 'Hotel Stay', destination: 'Paris, France', icon: Hotel, available: true },
    { id: 2, name: 'Round-trip Flight Voucher', points: 3000, category: 'Flight Voucher', destination: 'Anywhere in Europe', icon: Plane, available: true },
    { id: 3, name: 'Bali Yoga Retreat', points: 4000, category: 'Experience Package', destination: 'Bali, Indonesia', icon: MapPin, available: true },
    { id: 4, name: 'Airbnb Gift Card - $500', points: 1500, category: 'Travel Gift Card', destination: 'Global', icon: Gift, available: true },
    { id: 5, name: 'Safari Adventure', points: 5000, category: 'Experience Package', destination: 'Tanzania', icon: MapPin, available: true },
    { id: 6, name: 'Tokyo City Pass', points: 1800, category: 'Experience Package', destination: 'Tokyo, Japan', icon: MapPin, available: true },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2">Travel Rewards Catalog</h1>
          <p className="text-muted-foreground">Explore incredible travel experiences and destinations with your points</p>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search destinations and experiences..." className="pl-10" />
          </div>
          <div className="flex gap-2 overflow-x-auto">
            <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">All Destinations</Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">Flight Vouchers</Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">Hotel Stays</Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">Experiences</Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-primary hover:text-primary-foreground">Gift Cards</Badge>
          </div>
        </div>

        {/* Travel Rewards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockRewards.map((reward) => {
            const IconComponent = reward.icon;
            return (
              <div key={reward.id} className="card-reward group hover:shadow-lg transition-shadow">
                <div className="h-48 bg-gradient-to-br from-primary/20 via-accent/10 to-secondary/20 flex flex-col items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                  <IconComponent className="h-16 w-16 text-primary relative z-10 group-hover:scale-110 transition-transform" />
                  <MapPin className="h-4 w-4 text-muted-foreground absolute bottom-2 right-2" />
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-lg">{reward.name}</h3>
                    <Badge variant="secondary" className="text-xs whitespace-nowrap">{reward.category}</Badge>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mb-4">
                    <MapPin className="h-3 w-3" />
                    <span>{reward.destination}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-primary">{reward.points} pts</span>
                    <Button size="sm" className="group-hover:bg-primary group-hover:text-primary-foreground">
                      Book Now
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
