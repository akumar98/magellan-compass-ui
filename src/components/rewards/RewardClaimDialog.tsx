import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { MapPin } from 'lucide-react';
import { toast } from 'sonner';

interface RewardClaimDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reward: {
    id: number;
    name: string;
    destination: string;
    points: number;
    category: string;
    imageUrl?: string;
    description?: string;
    travelType?: string;
    activities?: string[];
  } | null;
}

export function RewardClaimDialog({ open, onOpenChange, reward }: RewardClaimDialogProps) {
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClaim = async () => {
    if (!reward) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success(`Travel reward booking request submitted for ${reward.name}!`, {
      description: 'Your employer will review and approve your request shortly.'
    });
    
    setIsSubmitting(false);
    setNotes('');
    onOpenChange(false);
  };

  if (!reward) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden">
        {/* Hero Image */}
        {reward.imageUrl && (
          <div className="relative h-64 w-full overflow-hidden">
            <img 
              src={reward.imageUrl} 
              alt={reward.name}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
            {reward.travelType && (
              <div className="absolute top-4 right-4">
                <Badge className="bg-primary/90 backdrop-blur-sm">
                  {reward.travelType}
                </Badge>
              </div>
            )}
          </div>
        )}

        <div className="p-6">
          <DialogHeader>
            <DialogTitle className="text-2xl">{reward.name}</DialogTitle>
            <DialogDescription className="flex items-center gap-2 text-base">
              <MapPin className="h-4 w-4" />
              {reward.destination}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Description */}
            {reward.description && (
              <p className="text-sm text-muted-foreground leading-relaxed">
                {reward.description}
              </p>
            )}

            {/* Activities */}
            {reward.activities && reward.activities.length > 0 && (
              <div>
                <p className="text-sm font-semibold mb-2">Included Activities</p>
                <div className="flex flex-wrap gap-2">
                  {reward.activities.map((activity, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {activity}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Points and Category */}
            <div className="flex items-center justify-between p-4 bg-primary/5 rounded-lg border border-primary/10">
              <div>
                <p className="text-sm text-muted-foreground">Points Cost</p>
                <p className="text-2xl font-bold text-primary">{reward.points} pts</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Category</p>
                <p className="font-semibold">{reward.category}</p>
              </div>
            </div>

            {/* Travel Dates */}
            <div className="space-y-2">
              <Label htmlFor="notes">Preferred Travel Dates (Optional)</Label>
              <Textarea
                id="notes"
                placeholder="Enter your preferred travel dates or any special requests..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
              />
            </div>

            {/* Info Box */}
            <div className="bg-muted/50 p-4 rounded-lg space-y-2">
              <p className="text-sm font-semibold">What happens next?</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Your request will be sent to your manager for approval</li>
                <li>• You'll receive a notification once it's reviewed</li>
                <li>• Points will be deducted upon final approval</li>
              </ul>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button onClick={handleClaim} disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit Request'}
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}