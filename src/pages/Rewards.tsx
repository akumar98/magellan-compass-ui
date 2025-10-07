import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Plane, Search, Hotel, MapPin, Gift, Sparkles } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { RewardClaimDialog } from '@/components/rewards/RewardClaimDialog';
import { RewardsFilters } from '@/components/rewards/RewardsFilters';
import { useState } from 'react';
import { useEmployeePreferences } from '@/hooks/useEmployeePreferences';

export default function Rewards() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedReward, setSelectedReward] = useState<typeof mockRewards[0] | null>(null);
  const { preferences, loading: prefsLoading, refreshPreferences } = useEmployeePreferences();
  
  const [activeFilters, setActiveFilters] = useState({
    travelTypes: [] as string[],
    activities: [] as string[],
    destinations: [] as string[],
    duration: '',
  });

  const mockRewards = [
    { id: 1, name: 'Paris Weekend Getaway', points: 2500, category: 'Hotel Stay', destination: 'Paris, France', icon: Hotel, available: true, travelType: 'Cultural', activities: ['Sightseeing', 'Culinary', 'Museums'], duration: 'weekend', imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80', description: 'Experience the magic of Paris with a luxurious 3-night stay in a boutique hotel near the Eiffel Tower.' },
    { id: 2, name: 'Round-trip Flight Voucher', points: 3000, category: 'Flight Voucher', destination: 'Anywhere in Europe', icon: Plane, available: true, travelType: 'Flexible', activities: [], duration: '', imageUrl: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80', description: 'Flexible round-trip flight voucher to any European destination of your choice.' },
    { id: 3, name: 'Bali Yoga Retreat', points: 4000, category: 'Experience Package', destination: 'Bali, Indonesia', icon: MapPin, available: true, travelType: 'Wellness', activities: ['Spa', 'Yoga'], duration: 'week', imageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80', description: '7-day wellness retreat in Ubud with daily yoga, meditation, and spa treatments.' },
    { id: 4, name: 'Airbnb Gift Card - $500', points: 1500, category: 'Travel Gift Card', destination: 'Global', icon: Gift, available: true, travelType: 'Flexible', activities: [], duration: '', imageUrl: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80', description: '$500 Airbnb gift card valid for any booking worldwide.' },
    { id: 5, name: 'Safari Adventure', points: 5000, category: 'Experience Package', destination: 'Tanzania', icon: MapPin, available: true, travelType: 'Adventure', activities: ['Wildlife', 'Photography', 'Hiking'], duration: 'extended', imageUrl: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80', description: '10-day safari adventure in Serengeti with luxury tented camps and expert guides.' },
    { id: 6, name: 'Tokyo City Pass', points: 1800, category: 'Experience Package', destination: 'Tokyo, Japan', icon: MapPin, available: true, travelType: 'Cultural', activities: ['Sightseeing', 'Culinary', 'Shopping'], duration: 'short', imageUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80', description: '5-day Tokyo experience with JR Pass, city tours, and exclusive restaurant reservations.' },
    { id: 7, name: 'Swiss Alps Ski Resort', points: 3500, category: 'Hotel Stay', destination: 'Switzerland', icon: Hotel, available: true, travelType: 'Adventure', activities: ['Skiing'], duration: 'week', imageUrl: 'https://images.unsplash.com/photo-1605540436563-5bca919ae766?w=800&q=80', description: 'Week-long stay at a luxury alpine resort with ski-in/ski-out access.' },
    { id: 8, name: 'Maldives Luxury Resort', points: 6000, category: 'Hotel Stay', destination: 'Maldives', icon: Hotel, available: true, travelType: 'Luxury', activities: ['Spa', 'Water Sports'], duration: 'extended', imageUrl: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80', description: 'Overwater villa with private pool, butler service, and all-inclusive dining.' },
    { id: 9, name: 'Rome Historical Tour', points: 2800, category: 'Experience Package', destination: 'Rome, Italy', icon: MapPin, available: true, travelType: 'Cultural', activities: ['Sightseeing', 'Museums', 'Culinary'], duration: 'short', imageUrl: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&q=80', description: 'Immersive 5-day journey through ancient Rome with skip-the-line access to major sites.' },
    { id: 10, name: 'Caribbean Cruise', points: 4500, category: 'Experience Package', destination: 'Caribbean', icon: Plane, available: true, travelType: 'Luxury', activities: ['Water Sports', 'Relaxation'], duration: 'week', imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80', description: '7-night Caribbean cruise visiting 5 tropical islands with all meals included.' },
    { id: 11, name: 'Iceland Northern Lights', points: 3800, category: 'Experience Package', destination: 'Iceland', icon: MapPin, available: true, travelType: 'Adventure', activities: ['Photography', 'Hiking', 'Sightseeing'], duration: 'short', imageUrl: 'https://images.unsplash.com/photo-1483347756197-71ef80e95f73?w=800&q=80', description: '6-day adventure with northern lights tours, glacier hiking, and geothermal spas.' },
    { id: 12, name: 'Thailand Beach Resort', points: 2200, category: 'Hotel Stay', destination: 'Thailand', icon: Hotel, available: true, travelType: 'Relaxation', activities: ['Spa', 'Water Sports'], duration: 'week', imageUrl: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&q=80', description: 'Beachfront paradise in Phuket with daily spa treatments and water activities.' },
  ];

  // Calculate personalization score based on both saved preferences and active filters
  const getPersonalizationScore = (reward: typeof mockRewards[0]) => {
    let score = 0;

    // Use active filters if set, otherwise fall back to preferences
    const travelTypesToCheck = activeFilters.travelTypes.length > 0 
      ? activeFilters.travelTypes 
      : preferences?.preferred_travel_types || [];
    
    const activitiesToCheck = activeFilters.activities.length > 0
      ? activeFilters.activities
      : preferences?.preferred_activities || [];
    
    const destinationsToCheck = activeFilters.destinations.length > 0
      ? activeFilters.destinations
      : preferences?.favorite_destinations || [];

    // Match travel type
    if (travelTypesToCheck.some(type => 
      reward.travelType.toLowerCase().includes(type.toLowerCase())
    )) {
      score += 3;
    }

    // Match destination
    if (destinationsToCheck.some(dest =>
      reward.destination.toLowerCase().includes(dest.toLowerCase())
    )) {
      score += 3;
    }

    // Match activities
    const matchingActivities = reward.activities.filter(activity =>
      activitiesToCheck.some(pref =>
        activity.toLowerCase().includes(pref.toLowerCase())
      )
    );
    score += matchingActivities.length;

    // Match duration
    const durationToCheck = activeFilters.duration || preferences?.trip_duration_preference || '';
    if (durationToCheck && reward.duration === durationToCheck) {
      score += 2;
    }

    return score;
  };

  // Sort rewards by personalization score
  const rewardsWithScores = mockRewards.map(reward => ({
    ...reward,
    personalizedScore: getPersonalizationScore(reward)
  })).sort((a, b) => b.personalizedScore - a.personalizedScore);

  const filteredRewards = rewardsWithScores.filter(reward => {
    const matchesSearch = reward.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reward.destination.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || reward.category === selectedCategory;
    
    // Apply active filters
    const matchesTravelType = activeFilters.travelTypes.length === 0 || 
      activeFilters.travelTypes.some(type => reward.travelType.toLowerCase().includes(type.toLowerCase()));
    
    const matchesActivities = activeFilters.activities.length === 0 ||
      activeFilters.activities.some(activity => 
        reward.activities.some(a => a.toLowerCase().includes(activity.toLowerCase()))
      );
    
    const matchesDestination = activeFilters.destinations.length === 0 ||
      activeFilters.destinations.some(dest => 
        reward.destination.toLowerCase().includes(dest.toLowerCase())
      );
    
    const matchesDuration = !activeFilters.duration || reward.duration === activeFilters.duration;
    
    return matchesSearch && matchesCategory && matchesTravelType && matchesActivities && matchesDestination && matchesDuration;
  });

  const recommendedRewards = filteredRewards.filter(r => r.personalizedScore >= 3);
  const otherRewards = filteredRewards.filter(r => r.personalizedScore < 3);

  const handleClaimClick = (reward: typeof mockRewards[0]) => {
    setSelectedReward(reward);
    setDialogOpen(true);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2">Travel Rewards Catalog</h1>
          <p className="text-muted-foreground">Explore incredible travel experiences and destinations with your points</p>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search destinations and experiences..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <RewardsFilters
              preferences={preferences}
              onPreferencesUpdate={refreshPreferences}
              activeFilters={activeFilters}
              onFiltersChange={setActiveFilters}
            />
          </div>
          
          <div className="flex gap-2 overflow-x-auto">
            <Badge 
              variant={selectedCategory === null ? "default" : "outline"}
              className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
              onClick={() => setSelectedCategory(null)}
            >
              All Destinations
            </Badge>
            <Badge 
              variant={selectedCategory === 'Flight Voucher' ? "default" : "outline"}
              className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
              onClick={() => setSelectedCategory('Flight Voucher')}
            >
              Flight Vouchers
            </Badge>
            <Badge 
              variant={selectedCategory === 'Hotel Stay' ? "default" : "outline"}
              className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
              onClick={() => setSelectedCategory('Hotel Stay')}
            >
              Hotel Stays
            </Badge>
            <Badge 
              variant={selectedCategory === 'Experience Package' ? "default" : "outline"}
              className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
              onClick={() => setSelectedCategory('Experience Package')}
            >
              Experiences
            </Badge>
            <Badge 
              variant={selectedCategory === 'Travel Gift Card' ? "default" : "outline"}
              className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
              onClick={() => setSelectedCategory('Travel Gift Card')}
            >
              Gift Cards
            </Badge>
          </div>
        </div>

        {/* Recommended Section */}
        {preferences && recommendedRewards.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-bold">Recommended for You</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedRewards.map((reward) => {
                const IconComponent = reward.icon;
                return (
              <div key={reward.id} className="card-reward group hover:shadow-lg transition-shadow">
                <div className="h-48 bg-gradient-to-br from-primary/20 via-accent/10 to-secondary/20 flex flex-col items-center justify-center relative overflow-hidden">
                  <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground z-10">
                    <Sparkles className="h-3 w-3 mr-1" />
                    For You
                  </Badge>
                  {reward.imageUrl ? (
                    <>
                      <img 
                        src={reward.imageUrl} 
                        alt={reward.name}
                        className="absolute inset-0 w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent" />
                    </>
                  ) : (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                      <IconComponent className="h-16 w-16 text-primary relative z-10 group-hover:scale-110 transition-transform" />
                    </>
                  )}
                  <MapPin className="h-4 w-4 text-white/80 absolute bottom-2 right-2 z-10 drop-shadow-lg" />
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
                        <Button 
                          size="sm" 
                          className="group-hover:bg-primary group-hover:text-primary-foreground"
                          onClick={() => handleClaimClick(reward)}
                        >
                          Book Now
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* All Rewards Section */}
        <div className="space-y-4">
          {preferences && recommendedRewards.length > 0 && (
            <h2 className="text-2xl font-bold">All Travel Rewards</h2>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherRewards.map((reward) => {
            const IconComponent = reward.icon;
            return (
              <div key={reward.id} className="card-reward group hover:shadow-lg transition-shadow">
                <div className="h-48 bg-gradient-to-br from-primary/20 via-accent/10 to-secondary/20 flex flex-col items-center justify-center relative overflow-hidden">
                  {reward.imageUrl ? (
                    <>
                      <img 
                        src={reward.imageUrl} 
                        alt={reward.name}
                        className="absolute inset-0 w-full h-full object-cover"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent" />
                    </>
                  ) : (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                      <IconComponent className="h-16 w-16 text-primary relative z-10 group-hover:scale-110 transition-transform" />
                    </>
                  )}
                  <MapPin className="h-4 w-4 text-white/80 absolute bottom-2 right-2 z-10 drop-shadow-lg" />
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
                    <Button 
                      size="sm" 
                      className="group-hover:bg-primary group-hover:text-primary-foreground"
                      onClick={() => handleClaimClick(reward)}
                    >
                      Book Now
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
          </div>
        </div>

        {/* Claim Dialog */}
        <RewardClaimDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          reward={selectedReward}
        />
      </div>
    </DashboardLayout>
  );
}
