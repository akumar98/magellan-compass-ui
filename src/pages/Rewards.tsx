import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Search, Sparkles, Heart, SlidersHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { RewardCard } from '@/components/rewards/RewardCard';
import { RewardsFilters } from '@/components/rewards/RewardsFilters';
import { useState } from 'react';
import { useEmployeePreferences } from '@/hooks/useEmployeePreferences';
import { useBurnoutPrediction } from '@/hooks/useBurnoutPrediction';
import { Card, CardContent } from '@/components/ui/card';

export default function Rewards() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const { preferences } = useEmployeePreferences();
  const { prediction } = useBurnoutPrediction();
  
  const [activeFilters, setActiveFilters] = useState({
    travelTypes: [] as string[],
    activities: [] as string[],
    destinations: [] as string[],
    duration: '',
  });

  const mockRewards = [
    { id: 3, name: '5-Day Yoga & Nature Retreat', points: 3200, category: 'Wellness', destination: 'Bali, Indonesia', imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200&q=80', description: 'Reset your energy in Bali', isWellness: true, travelType: 'Wellness', activities: ['Spa', 'Relaxation'], duration: 'week', tags: ['Solo', 'Summer', '5 Days'], rating: 4.9, reviewCount: 26 },
    { id: 1, name: 'Paris Weekend Getaway', points: 2500, category: 'City Break', destination: 'Paris, France', imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80', description: 'Experience the magic of Paris', isWellness: false, travelType: 'Cultural', activities: ['Sightseeing', 'Culinary'], duration: 'weekend', tags: ['Couple', 'Weekend', '3 Days'], rating: 4.7, reviewCount: 45 },
    { id: 7, name: 'Swiss Alps Ski Resort', points: 3500, category: 'Adventure', destination: 'Switzerland', imageUrl: 'https://images.unsplash.com/photo-1605540436563-5bca919ae766?w=800&q=80', description: 'Week-long stay at luxury alpine resort', isWellness: false, travelType: 'Adventure', activities: ['Skiing'], duration: 'week', tags: ['Family', 'Winter', '7 Days'], rating: 4.8, reviewCount: 32 },
    { id: 8, name: 'Maldives Luxury Resort', points: 6000, category: 'Beach', destination: 'Maldives', imageUrl: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80', description: 'Overwater villa with private pool', isWellness: true, travelType: 'Luxury', activities: ['Spa', 'Water Sports'], duration: 'extended', tags: ['Couple', 'Summer', '10 Days'], rating: 4.9, reviewCount: 58 },
    { id: 9, name: 'Rome Historical Tour', points: 2800, category: 'Cultural', destination: 'Rome, Italy', imageUrl: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&q=80', description: 'Immersive 5-day journey through ancient Rome', isWellness: false, travelType: 'Cultural', activities: ['Sightseeing', 'Museums'], duration: 'short', tags: ['Solo', 'Spring', '5 Days'], rating: 4.6, reviewCount: 41 },
    { id: 12, name: 'Thailand Beach Resort', points: 2200, category: 'Beach', destination: 'Phuket, Thailand', imageUrl: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&q=80', description: 'Beachfront paradise with daily spa', isWellness: true, travelType: 'Relaxation', activities: ['Spa', 'Water Sports'], duration: 'week', tags: ['Family', 'Summer', '7 Days'], rating: 4.7, reviewCount: 37 },
    { id: 6, name: 'Tokyo City Experience', points: 1800, category: 'Cultural', destination: 'Tokyo, Japan', imageUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80', description: '5-day Tokyo experience with JR Pass', isWellness: false, travelType: 'Cultural', activities: ['Sightseeing', 'Culinary'], duration: 'short', tags: ['Solo', 'Spring', '5 Days'], rating: 4.8, reviewCount: 52 },
    { id: 10, name: 'Caribbean Cruise', points: 4500, category: 'Cruise', destination: 'Caribbean Islands', imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80', description: '7-night Caribbean cruise visiting 5 islands', isWellness: false, travelType: 'Luxury', activities: ['Water Sports', 'Relaxation'], duration: 'week', tags: ['Family', 'Summer', '7 Days'], rating: 4.5, reviewCount: 63 },
    { id: 11, name: 'Iceland Northern Lights', points: 3800, category: 'Adventure', destination: 'Reykjavik, Iceland', imageUrl: 'https://images.unsplash.com/photo-1483347756197-71ef80e95f73?w=800&q=80', description: '6-day adventure with northern lights tours', isWellness: false, travelType: 'Adventure', activities: ['Photography', 'Hiking'], duration: 'short', tags: ['Couple', 'Winter', '6 Days'], rating: 4.9, reviewCount: 28 },
  ];

  // Calculate personalization scores
  const getPersonalizationScore = (reward: typeof mockRewards[0]) => {
    let score = 0;
    
    // Boost wellness if at risk
    const isAtBurnoutRisk = prediction && (prediction.risk_level === 'medium' || prediction.risk_level === 'high');
    if (isAtBurnoutRisk && reward.isWellness) {
      score += 30;
    }

    // Match preferences
    if (preferences?.preferred_travel_types?.some(type => 
      reward.travelType.toLowerCase().includes(type.toLowerCase())
    )) {
      score += 25;
    }

    if (preferences?.preferred_activities?.some(activity =>
      reward.activities.some(a => a.toLowerCase().includes(activity.toLowerCase()))
    )) {
      score += 20;
    }

    if (preferences?.trip_duration_preference === reward.duration) {
      score += 15;
    }

    return Math.min(score, 100);
  };

  const rewardsWithScores = mockRewards.map(reward => ({
    ...reward,
    matchScore: getPersonalizationScore(reward),
    isRecommended: getPersonalizationScore(reward) >= 50,
  }));

  // Filter rewards
  const filteredRewards = rewardsWithScores.filter(reward => {
    const matchesSearch = reward.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         reward.destination.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || reward.category === selectedCategory;
    return matchesSearch && matchesCategory;
  }).sort((a, b) => b.matchScore - a.matchScore);

  const categories = ['All', 'Wellness', 'Beach', 'Cultural', 'Adventure', 'Cruise', 'City Break'];
  const recommendedCount = filteredRewards.filter(r => r.isRecommended).length;
  const wellnessCount = filteredRewards.filter(r => r.isWellness).length;

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2">Travel Rewards Catalog</h1>
          <p className="text-muted-foreground">
            Discover incredible travel experiences curated just for you
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search destinations, experiences..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button
            variant="outline"
            className="gap-2"
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
          </Button>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <Card>
            <CardContent className="pt-6">
              <RewardsFilters
                preferences={preferences}
                onPreferencesUpdate={() => {}}
                activeFilters={activeFilters}
                onFiltersChange={setActiveFilters}
              />
            </CardContent>
          </Card>
        )}

        {/* Category Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Badge
              key={category}
              variant={selectedCategory === (category === 'All' ? null : category) ? 'default' : 'outline'}
              className="cursor-pointer hover:bg-primary hover:text-primary-foreground whitespace-nowrap"
              onClick={() => setSelectedCategory(category === 'All' ? null : category)}
            >
              {category}
            </Badge>
          ))}
        </div>

        {/* Stats */}
        <div className="flex gap-4 flex-wrap">
          {recommendedCount > 0 && (
            <div className="flex items-center gap-2 text-sm">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-muted-foreground">
                <strong className="text-foreground">{recommendedCount}</strong> recommended for you
              </span>
            </div>
          )}
          {wellnessCount > 0 && (
            <div className="flex items-center gap-2 text-sm">
              <Heart className="h-4 w-4 text-success" />
              <span className="text-muted-foreground">
                <strong className="text-foreground">{wellnessCount}</strong> wellness experiences
              </span>
            </div>
          )}
        </div>

        {/* Recommended Section */}
        {filteredRewards.filter(r => r.isRecommended).length > 0 && (
          <div className="space-y-5">
            <div className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">Suggested For You</h2>
            </div>
            <div className="grid grid-cols-3 gap-6">
              {filteredRewards
                .filter(r => r.isRecommended)
                .map((reward) => (
                  <RewardCard
                    key={reward.id}
                    id={reward.id}
                    name={reward.name}
                    destination={reward.destination}
                    points={reward.points}
                    imageUrl={reward.imageUrl}
                    category={reward.category}
                    isRecommended={reward.isRecommended}
                    isWellness={reward.isWellness}
                    matchScore={reward.matchScore}
                    rating={reward.rating}
                    reviewCount={reward.reviewCount}
                    tags={reward.tags}
                  />
                ))}
            </div>
          </div>
        )}

        {/* All Rewards */}
        <div className="space-y-5">
          <h2 className="text-2xl font-bold">
            {filteredRewards.filter(r => r.isRecommended).length > 0 ? 'More Experiences' : 'All Experiences'}
          </h2>
          <div className="grid grid-cols-3 gap-6">
            {filteredRewards
              .filter(r => !r.isRecommended)
              .map((reward) => (
                <RewardCard
                  key={reward.id}
                  id={reward.id}
                  name={reward.name}
                  destination={reward.destination}
                  points={reward.points}
                  imageUrl={reward.imageUrl}
                  category={reward.category}
                  isRecommended={false}
                  isWellness={reward.isWellness}
                  matchScore={reward.matchScore}
                  rating={reward.rating}
                  reviewCount={reward.reviewCount}
                  tags={reward.tags}
                />
              ))}
          </div>
        </div>

        {/* Empty State */}
        {filteredRewards.length === 0 && (
          <div className="text-center py-12">
            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No rewards found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filters to find more rewards
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}