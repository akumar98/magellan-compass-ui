import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Hotel, Utensils, Plane, Car, Gift, CheckCircle } from 'lucide-react';
import { RewardHero } from '@/components/rewards/RewardHero';
import { MatchScore } from '@/components/rewards/MatchScore';
import { WhyThisReward } from '@/components/rewards/WhyThisReward';
import { ExperienceHighlights } from '@/components/rewards/ExperienceHighlights';
import { OptionalAddOns } from '@/components/rewards/OptionalAddOns';
import { RewardDetailsSidebar } from '@/components/rewards/RewardDetailsSidebar';
import { RewardConfirmationDialog } from '@/components/rewards/RewardConfirmationDialog';
import { useToast } from '@/hooks/use-toast';
import { Hotel as HotelIcon, MapPin, Plane as PlaneIcon } from 'lucide-react';

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

const mockRewards: Reward[] = [
  { id: 1, name: 'Paris Weekend Getaway', points: 2500, category: 'Hotel Stay', destination: 'Paris, France', icon: HotelIcon, available: true, travelType: 'Cultural', activities: ['Sightseeing', 'Culinary', 'Museums'], duration: 'weekend', imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80', description: 'Experience the magic of Paris with a luxurious 3-night stay in a boutique hotel near the Eiffel Tower.', isWellness: false },
  { id: 2, name: 'Round-trip Flight Voucher', points: 3000, category: 'Flight Voucher', destination: 'Anywhere in Europe', icon: PlaneIcon, available: true, travelType: 'Flexible', activities: [], duration: '', imageUrl: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80', description: 'Flexible round-trip flight voucher to any European destination of your choice.', isWellness: false },
  { id: 3, name: 'Alpine Spa Escape', points: 85000, category: 'Experience Package', destination: 'Swiss Alps', icon: MapPin, available: true, travelType: 'Wellness', activities: ['Spa', 'Relaxation', 'Nature'], duration: 'week', imageUrl: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=1200&q=80', description: 'Reset your energy in the Swiss Alps. Immerse yourself in the tranquil beauty of the Swiss Alps with this exclusive wellness retreat. Nestled between snow-capped mountains and pristine lakes, this carefully curated experience combines luxury accommodations with holistic spa treatments designed to restore your mind, body, and spirit.', isWellness: true },
];

export default function RewardDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [reward, setReward] = useState<Reward | null>(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [availablePoints] = useState(55000);

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

  const handleSaveForLater = () => {
    setIsSaved(!isSaved);
    toast({
      title: isSaved ? 'Removed from Saved' : 'Saved for Later',
      description: isSaved 
        ? 'Reward removed from your saved list' 
        : 'You can find this reward in your saved items',
    });
  };

  const handleRedeemNow = () => {
    if (availablePoints >= reward.points) {
      setConfirmDialogOpen(true);
    } else {
      toast({
        title: 'Insufficient Points',
        description: `You need ${reward.points - availablePoints} more points to redeem this reward.`,
        variant: 'destructive',
      });
    }
  };

  const categories = ['Winter Escape', '7 Days', 'Wellness', 'Luxury'];
  const progressPercent = Math.round((availablePoints / reward.points) * 100);

  const itineraryDays = [
    {
      day: 1,
      title: 'Arrival & Welcome',
      activities: ['Airport transfer', 'Check-in & welcome ceremony', 'Evening spa session'],
    },
    {
      day: 2,
      title: 'Spa & Nature',
      activities: ['Morning yoga', 'Guided meditation', 'Thermal spa experience', 'Healthy cuisine'],
    },
    {
      day: 3,
      title: 'Free Time & Departure',
      activities: ['Leisure morning', 'Final wellness treatment', 'Departure'],
    },
  ];

  const relatedRewards = mockRewards.filter(r => r.id !== reward.id).slice(0, 3);

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in max-w-[1400px] mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Button variant="link" className="p-0 h-auto" onClick={() => navigate('/dashboard')}>
            Home
          </Button>
          <span>›</span>
          <Button variant="link" className="p-0 h-auto" onClick={() => navigate('/rewards')}>
            Suggested For You
          </Button>
          <span>›</span>
          <span>Reward Details</span>
        </div>

        {/* Hero */}
        <RewardHero
          imageUrl={reward.imageUrl}
          title={reward.name}
          location={reward.destination}
          categories={categories}
          onSaveForLater={handleSaveForLater}
          onRedeemNow={handleRedeemNow}
          isSaved={isSaved}
        />

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground leading-relaxed">{reward.description}</p>
                
                {reward.isWellness && (
                  <p className="text-muted-foreground leading-relaxed">
                    Immerse yourself in daily spa sessions, guided meditation walks among the red rocks, and
                    nourishing cuisine that will leave you feeling completely refreshed and reconnected with
                    your inner peace.
                  </p>
                )}

                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="bg-secondary/10 text-secondary">spa</Badge>
                  <Badge variant="secondary" className="bg-accent/10 text-accent">relaxing</Badge>
                  <Badge variant="secondary" className="bg-warning/10 text-warning">low activity</Badge>
                  <Badge variant="secondary" className="bg-primary/10 text-primary">solo-friendly</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Match Score */}
            <MatchScore score={92} />

            {/* Why This Reward */}
            <WhyThisReward
              achievement={{
                title: 'Your Achievement',
                description: 'Successfully led the Q2 product launch with exceptional team feedback and 20% above target metrics.',
              }}
              preferences={{
                title: 'Your Preferences',
                description: 'Mountain landscapes, wellness activities, luxury accommodations, and opportunities for personal growth.',
              }}
            />

            {/* Itinerary */}
            <Card>
              <CardHeader>
                <CardTitle>Itinerary Highlights</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {itineraryDays.map((day, index) => (
                    <AccordionItem key={index} value={`day-${day.day}`}>
                      <AccordionTrigger className="text-left">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-success text-success-foreground flex items-center justify-center text-sm font-semibold">
                            {day.day}
                          </div>
                          <span className="font-semibold">Day {day.day}: {day.title}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pl-11">
                        <ul className="space-y-2">
                          {day.activities.map((activity, idx) => (
                            <li key={idx} className="text-sm text-muted-foreground">
                              • {activity}
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>

            {/* Experience Highlights */}
            <ExperienceHighlights />

            {/* What's Included */}
            <Card>
              <CardHeader>
                <CardTitle>What's Included</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[
                    { icon: Hotel, title: 'Luxury Hotel Stay', description: 'Premium accommodations' },
                    { icon: Utensils, title: 'Full Spa Package', description: 'Daily treatments included' },
                    { icon: Car, title: 'Airport Transportation', description: 'Round-trip transfers' },
                    { icon: Utensils, title: 'All Meals Included', description: 'Gourmet dining' },
                    { icon: Gift, title: 'Wellness Guide', description: '24/7 concierge' },
                    { icon: Gift, title: 'Welcome Package', description: 'Special amenities' },
                  ].map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <div key={index} className="flex gap-3">
                        <div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center flex-shrink-0">
                          <Icon className="h-5 w-5 text-success" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-sm mb-1">{item.title}</h4>
                          <p className="text-xs text-muted-foreground">{item.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Conditions & Notes */}
            <Card>
              <CardHeader>
                <CardTitle>Conditions & Notes</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Redemption Policy</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span>•</span>
                      <span>Blackout dates: Dec 20-Jan 5, July 1-15</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>•</span>
                      <span>Must be booked 30 days in advance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>•</span>
                      <span>Subject to availability</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Value & Points</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Estimated Value:</span>
                      <span className="font-semibold">$7,500 USD</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Points Required:</span>
                      <span className="font-semibold text-primary">15,000 pts</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Your Balance After:</span>
                      <span className="font-semibold">8,500 pts</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Optional Add-Ons */}
            <OptionalAddOns />

            {/* Related Experiences */}
            <Card>
              <CardHeader>
                <CardTitle>Related Experiences You Might Like</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {relatedRewards.map((related) => (
                    <div
                      key={related.id}
                      className="group cursor-pointer"
                      onClick={() => navigate(`/rewards/${related.id}`)}
                    >
                      <div className="relative h-32 rounded-lg overflow-hidden mb-3">
                        <img
                          src={related.imageUrl}
                          alt={related.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                        <Badge className="absolute top-2 left-2 bg-primary">
                          {related.category}
                        </Badge>
                      </div>
                      <h4 className="font-semibold text-sm mb-1">{related.name}</h4>
                      <p className="text-xs text-muted-foreground mb-2">{related.description.slice(0, 80)}...</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-primary">
                          {related.points.toLocaleString()} pts
                        </span>
                        <Button size="sm" variant="ghost" className="h-6 text-xs">
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Sidebar */}
          <div>
            <RewardDetailsSidebar
              pointsRequired={reward.points}
              currentPoints={availablePoints}
              estimatedValue="$7,500 USD"
              redemptionDate="Dec 15 - 22, 2025"
              progressPercent={progressPercent}
              onRedeem={handleRedeemNow}
              onSaveForLater={handleSaveForLater}
            />
          </div>
        </div>

        {/* Confirmation Dialog */}
        <RewardConfirmationDialog
          open={confirmDialogOpen}
          onOpenChange={setConfirmDialogOpen}
          rewardName="3-Day Mountain Spa Retreat"
          location="Lake Tahoe, CA"
          selectedDates="August 15-18, 2023 (3 nights)"
          milestonesCompleted={3}
          totalMilestones={6}
          experienceTypes={['Solo', 'Wellness']}
        />
      </div>
    </DashboardLayout>
  );
}