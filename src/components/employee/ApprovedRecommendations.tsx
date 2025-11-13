import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Gift, MapPin, Calendar } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface ApprovedRecommendation {
  id: string;
  recommendation_data: any;
  approved_at: string;
  status: string;
}

export const ApprovedRecommendations = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [recommendations, setRecommendations] = useState<ApprovedRecommendation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) return;

    const fetchRecommendations = async () => {
      const { data, error } = await supabase
        .from('approved_recommendations')
        .select('*')
        .eq('employee_id', user.id)
        .eq('status', 'pending')
        .order('approved_at', { ascending: false });

      if (error) {
        console.error('Error fetching recommendations:', error);
      } else {
        setRecommendations(data || []);
      }
      setLoading(false);
    };

    fetchRecommendations();

    // Set up realtime subscription
    const channel = supabase
      .channel('approved-recommendations-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'approved_recommendations',
          filter: `employee_id=eq.${user.id}`,
        },
        (payload) => {
          console.log('New recommendation received:', payload);
          setRecommendations((prev) => [payload.new as ApprovedRecommendation, ...prev]);
          toast({
            title: '🎉 New Reward Approved!',
            description: 'Your employer has approved a wellness recommendation for you.',
          });
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'approved_recommendations',
          filter: `employee_id=eq.${user.id}`,
        },
        (payload) => {
          setRecommendations((prev) =>
            prev.map((rec) => (rec.id === payload.new.id ? (payload.new as ApprovedRecommendation) : rec))
          );
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user?.id, toast]);

  const handleAccept = async (recommendationId: string) => {
    const { error } = await supabase
      .from('approved_recommendations')
      .update({ status: 'accepted' })
      .eq('id', recommendationId);

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to accept recommendation',
        variant: 'destructive',
      });
    } else {
      setRecommendations((prev) => prev.filter((rec) => rec.id !== recommendationId));
      toast({
        title: 'Success',
        description: 'Recommendation accepted! Processing your reward...',
      });
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="animate-pulse space-y-3">
            <div className="h-4 bg-muted rounded w-3/4"></div>
            <div className="h-4 bg-muted rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (recommendations.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Gift className="w-5 h-5 text-primary" />
        <h2 className="text-xl font-semibold">Your Approved Rewards</h2>
        <Badge variant="default" className="ml-2">
          {recommendations.length} New
        </Badge>
      </div>

      <div className="space-y-4">
        {recommendations.map((rec) => {
          const data = rec.recommendation_data;
          return (
            <Card key={rec.id} className="overflow-hidden border-primary/20 bg-primary/5">
              <div className="relative">
                <img
                  src={data.image_url || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&auto=format&fit=crop'}
                  alt={data.title}
                  className="w-full h-48 object-cover"
                />
                <Badge className="absolute top-4 right-4 bg-success text-success-foreground">
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  Approved
                </Badge>
              </div>
              <CardHeader>
                <CardTitle className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold">{data.title}</h3>
                    <p className="text-sm text-muted-foreground font-normal mt-1">{data.desc}</p>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>Wellness Retreat</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>Book anytime</span>
                  </div>
                </div>

                <div className="bg-background rounded-lg p-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Company Contribution</span>
                    <span className="font-semibold">${data.company}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Your Contribution</span>
                    <span className="font-semibold">${data.employee}</span>
                  </div>
                  <div className="border-t pt-2 mt-2 flex justify-between font-bold">
                    <span>Total Value</span>
                    <span className="text-xl text-primary">${data.cost}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1" onClick={() => handleAccept(rec.id)}>
                    Accept Reward
                  </Button>
                  <Button variant="outline" className="flex-1">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
