import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ArrowLeft, MapPin, Clock, Calendar, Heart, Sparkles, CheckCircle, Plane, Hotel } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useEmployeePreferences } from '@/hooks/useEmployeePreferences';
import { useBurnoutPrediction } from '@/hooks/useBurnoutPrediction';

interface Reward {
  id: number;
  name: string;
  points: number;
  category: string;
  destination: string;
  icon: any;
  available: boolean;
  travelType: string;
  activities: string[];
  duration: string;
  imageUrl: string;
  description: string;
  isWellness: boolean;
}

// Mock rewards data - should match the data from Rewards.tsx
const mockRewards: Reward[] = [
  { id: 1, name: 'Paris Weekend Getaway', points: 2500, category: 'Hotel Stay', destination: 'Paris, France', icon: Hotel, available: true, travelType: 'Cultural', activities: ['Sightseeing', 'Culinary', 'Museums'], duration: 'weekend', imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80', description: 'Experience the magic of Paris with a luxurious 3-night stay in a boutique hotel near the Eiffel Tower.', isWellness: false },
  { id: 2, name: 'Round-trip Flight Voucher', points: 3000, category: 'Flight Voucher', destination: 'Anywhere in Europe', icon: Plane, available: true, travelType: 'Flexible', activities: [], duration: '', imageUrl: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80', description: 'Flexible round-trip flight voucher to any European destination of your choice.', isWellness: false },
  { id: 3, name: 'Bali Yoga Retreat', points: 4000, category: 'Experience Package', destination: 'Bali, Indonesia', icon: MapPin, available: true, travelType: 'Wellness', activities: ['Spa', 'Yoga'], duration: 'week', imageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80', description: '7-day wellness retreat in Ubud with daily yoga, meditation, and spa treatments.', isWellness: true },
  { id: 5, name: 'Safari Adventure', points: 5000, category: 'Experience Package', destination: 'Tanzania', icon: MapPin, available: true, travelType: 'Adventure', activities: ['Wildlife', 'Photography', 'Hiking'], duration: 'extended', imageUrl: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800&q=80', description: '10-day safari adventure in Serengeti with luxury tented camps and expert guides.', isWellness: false },
  { id: 6, name: 'Tokyo City Pass', points: 1800, category: 'Experience Package', destination: 'Tokyo, Japan', icon: MapPin, available: true, travelType: 'Cultural', activities: ['Sightseeing', 'Culinary', 'Shopping'], duration: 'short', imageUrl: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80', description: '5-day Tokyo experience with JR Pass, city tours, and exclusive restaurant reservations.', isWellness: false },
  { id: 7, name: 'Swiss Alps Ski Resort', points: 3500, category: 'Hotel Stay', destination: 'Switzerland', icon: Hotel, available: true, travelType: 'Adventure', activities: ['Skiing'], duration: 'week', imageUrl: 'https://images.unsplash.com/photo-1605540436563-5bca919ae766?w=800&q=80', description: 'Week-long stay at a luxury alpine resort with ski-in/ski-out access.', isWellness: false },
  { id: 8, name: 'Maldives Luxury Resort', points: 6000, category: 'Hotel Stay', destination: 'Maldives', icon: Hotel, available: true, travelType: 'Luxury', activities: ['Spa', 'Water Sports'], duration: 'extended', imageUrl: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80', description: 'Overwater villa with private pool, butler service, and all-inclusive dining.', isWellness: true },
  { id: 9, name: 'Rome Historical Tour', points: 2800, category: 'Experience Package', destination: 'Rome, Italy', icon: MapPin, available: true, travelType: 'Cultural', activities: ['Sightseeing', 'Museums', 'Culinary'], duration: 'short', imageUrl: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&q=80', description: 'Immersive 5-day journey through ancient Rome with skip-the-line access to major sites.', isWellness: false },
  { id: 10, name: 'Caribbean Cruise', points: 4500, category: 'Experience Package', destination: 'Caribbean', icon: Plane, available: true, travelType: 'Luxury', activities: ['Water Sports', 'Relaxation'], duration: 'week', imageUrl: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80', description: '7-night Caribbean cruise visiting 5 tropical islands with all meals included.', isWellness: false },
  { id: 11, name: 'Iceland Northern Lights', points: 3800, category: 'Experience Package', destination: 'Iceland', icon: MapPin, available: true, travelType: 'Adventure', activities: ['Photography', 'Hiking', 'Sightseeing'], duration: 'short', imageUrl: 'https://images.unsplash.com/photo-1483347756197-71ef80e95f73?w=800&q=80', description: '6-day adventure with northern lights tours, glacier hiking, and geothermal spas.', isWellness: false },
  { id: 12, name: 'Thailand Beach Resort', points: 2200, category: 'Hotel Stay', destination: 'Thailand', icon: Hotel, available: true, travelType: 'Relaxation', activities: ['Spa', 'Water Sports'], duration: 'week', imageUrl: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&q=80', description: 'Beachfront paradise in Phuket with daily spa treatments and water activities.', isWellness: true },
];

export default function RewardDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { preferences } = useEmployeePreferences();
  const { prediction } = useBurnoutPrediction();
  
  const [reward, setReward] = useState<Reward | null>(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [isRedeeming, setIsRedeeming] = useState(false);
  const [availablePoints, setAvailablePoints] = useState(10000); // Mock points balance

  useEffect(() => {
    const foundReward = mockRewards.find(r => r.id === Number(id));
    if (foundReward) {
      setReward(foundReward);
    }
  }, [id]);

  if (!reward) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Reward Not Found</h2>
            <p className="text-muted-foreground mb-4">The reward you're looking for doesn't exist.</p>
            <Button onClick={() => navigate('/rewards')}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Rewards
            </Button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const handleRedeemClick = () => {
    if (availablePoints < reward.points) {
      toast({
        title: 'Insufficient Points',
        description: `You need ${reward.points - availablePoints} more points to redeem this reward.`,
        variant: 'destructive'
      });
      return;
    }
    setConfirmDialogOpen(true);
  };

  const handleConfirmRedeem = async () => {
    setIsRedeeming(true);
    try {
      // TODO: Implement actual redemption logic with database
      // This would deduct points, create transaction record, send notifications
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call

      setAvailablePoints(prev => prev - reward.points);
      
      toast({
        title: 'Reward Redeemed Successfully!',
        description: `You've redeemed ${reward.name} for ${reward.points} points. Check your email for confirmation.`,
      });

      setConfirmDialogOpen(false);
      
      // Navigate back after a short delay
      setTimeout(() => navigate('/rewards'), 2000);
    } catch (error) {
      toast({
        title: 'Redemption Failed',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsRedeeming(false);
    }
  };

  const getAIRecommendationReason = () => {
    const reasons = [];
    
    if (prediction && (prediction.risk_level === 'medium' || prediction.risk_level === 'high') && reward.isWellness) {
      return `Based on your current wellness check, we recommend this ${reward.travelType.toLowerCase()} experience to help you recharge and prevent burnout. Taking time for self-care is essential for maintaining your wellbeing.`;
    }

    if (preferences?.preferred_travel_types?.some(type => reward.travelType.toLowerCase().includes(type.toLowerCase()))) {
      reasons.push(`matches your ${reward.travelType.toLowerCase()} travel preferences`);
    }

    if (preferences?.preferred_activities?.some(activity => reward.activities.some(a => a.toLowerCase().includes(activity.toLowerCase())))) {
      const matchingActivities = reward.activities.filter(activity => 
        preferences.preferred_activities?.some(pref => activity.toLowerCase().includes(pref.toLowerCase()))
      );
      reasons.push(`includes your favorite activities: ${matchingActivities.join(', ')}`);
    }

    if (preferences?.favorite_destinations?.some(dest => reward.destination.toLowerCase().includes(dest.toLowerCase()))) {
      reasons.push(`is in one of your preferred destinations`);
    }

    if (reasons.length > 0) {
      return `This ${reward.travelType.toLowerCase()} experience was recommended because it ${reasons.join(' and ')}.`;
    }

    return `This experience aligns with popular employee choices and offers a perfect blend of ${reward.activities.slice(0, 2).join(' and ').toLowerCase() || 'relaxation and adventure'}.`;
  };

  const getDurationText = (duration: string) => {
    const map: { [key: string]: string } = {
      'weekend': '2-3 days',
      'short': '4-6 days',
      'week': '7-10 days',
      'extended': '11+ days'
    };
    return map[duration] || 'Flexible';
  };

  // Get similar rewards based on category and travel type
  const similarRewards = mockRewards
    .filter(r => r.id !== reward.id && (r.category === reward.category || r.travelType === reward.travelType))
    .slice(0, 3);

  const IconComponent = reward.icon;

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header Navigation */}
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={() => navigate('/rewards')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Rewards
          </Button>
          <div className="flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-lg">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="font-semibold">{availablePoints.toLocaleString()} points available</span>
          </div>
        </div>

        {/* Hero Banner */}
        <div className="relative h-96 rounded-xl overflow-hidden">
          <img 
            src={reward.imageUrl} 
            alt={reward.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary">{reward.category}</Badge>
                  {reward.isWellness && (
                    <Badge className="bg-orange-500 text-white">
                      <Heart className="h-3 w-3 mr-1" />
                      Wellness
                    </Badge>
                  )}
                </div>
                <h1 className="text-4xl font-bold mb-2">{reward.name}</h1>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{reward.destination}</span>
                </div>
              </div>
              <div className="bg-background/95 backdrop-blur-sm px-6 py-4 rounded-lg text-center">
                <div className="text-3xl font-bold text-primary">{reward.points}</div>
                <div className="text-sm text-muted-foreground">points</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* AI Recommendation */}
            <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  Why This Was Recommended for You
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{getAIRecommendationReason()}</p>
              </CardContent>
            </Card>

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>About This Experience</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">{reward.description}</p>
              </CardContent>
            </Card>

            {/* Details */}
            <Card>
              <CardHeader>
                <CardTitle>Details & Features</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {reward.duration && (
                    <div className="flex items-start gap-3">
                      <Clock className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <div className="font-medium">Duration</div>
                        <div className="text-sm text-muted-foreground">{getDurationText(reward.duration)}</div>
                      </div>
                    </div>
                  )}
                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <div className="font-medium">Availability</div>
                      <div className="text-sm text-muted-foreground">Year-round</div>
                    </div>
                  </div>
                </div>
                
                {reward.activities.length > 0 && (
                  <div>
                    <div className="font-medium mb-2">Included Activities</div>
                    <div className="flex flex-wrap gap-2">
                      {reward.activities.map((activity, idx) => (
                        <Badge key={idx} variant="outline">{activity}</Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <div className="font-medium mb-2">What's Included</div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      Accommodation at premium locations
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      24/7 concierge support
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      Flexible booking dates
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-primary" />
                      Travel insurance included
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Action Card */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardHeader>
                <CardTitle>Ready to Book?</CardTitle>
                <CardDescription>Redeem this reward with your points</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Reward Cost</span>
                    <span className="font-semibold">{reward.points} pts</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Your Balance</span>
                    <span className="font-semibold">{availablePoints.toLocaleString()} pts</span>
                  </div>
                  <div className="h-px bg-border" />
                  <div className="flex justify-between">
                    <span className="font-medium">After Redemption</span>
                    <span className="font-bold text-primary">{(availablePoints - reward.points).toLocaleString()} pts</span>
                  </div>
                </div>

                <Button 
                  onClick={handleRedeemClick} 
                  className="w-full" 
                  size="lg"
                  disabled={!reward.available || availablePoints < reward.points}
                >
                  {availablePoints < reward.points ? 'Insufficient Points' : 'Redeem Reward'}
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  You'll receive a confirmation email with booking details after redemption.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Similar Rewards */}
        {similarRewards.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Similar Rewards You Might Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {similarRewards.map((similar) => {
                const SimilarIcon = similar.icon;
                return (
                  <Link key={similar.id} to={`/rewards/${similar.id}`}>
                    <Card className="group hover:shadow-lg transition-shadow cursor-pointer h-full">
                      <div className="h-48 bg-gradient-to-br from-primary/20 via-accent/10 to-secondary/20 flex items-center justify-center relative overflow-hidden">
                        <img 
                          src={similar.imageUrl} 
                          alt={similar.name}
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent" />
                        <MapPin className="h-4 w-4 text-white/80 absolute bottom-2 right-2 z-10 drop-shadow-lg" />
                      </div>
                      <CardHeader>
                        <div className="flex items-start justify-between mb-2">
                          <CardTitle className="text-lg">{similar.name}</CardTitle>
                          <Badge variant="secondary" className="text-xs">{similar.category}</Badge>
                        </div>
                        <CardDescription className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {similar.destination}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-bold text-primary">{similar.points} pts</span>
                          <Button size="sm" variant="ghost">View Details</Button>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Confirmation Dialog */}
        <Dialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Reward Redemption</DialogTitle>
              <DialogDescription>
                Are you sure you want to redeem <strong>{reward.name}</strong> for <strong>{reward.points} points</strong>?
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="bg-muted p-4 rounded-lg space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Current Balance:</span>
                  <span className="font-semibold">{availablePoints.toLocaleString()} pts</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Cost:</span>
                  <span className="font-semibold text-destructive">-{reward.points} pts</span>
                </div>
                <div className="h-px bg-border" />
                <div className="flex justify-between">
                  <span className="font-medium">New Balance:</span>
                  <span className="font-bold text-primary">{(availablePoints - reward.points).toLocaleString()} pts</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                You'll receive a confirmation email with booking instructions and your unique redemption code.
              </p>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setConfirmDialogOpen(false)} disabled={isRedeeming}>
                Cancel
              </Button>
              <Button onClick={handleConfirmRedeem} disabled={isRedeeming}>
                {isRedeeming ? 'Processing...' : 'Confirm & Redeem'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
