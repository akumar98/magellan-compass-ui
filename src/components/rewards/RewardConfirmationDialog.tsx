import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, Calendar, Share2, Home, Settings } from 'lucide-react';

interface RewardConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  rewardName: string;
  location: string;
  selectedDates: string;
  milestonesCompleted: number;
  totalMilestones: number;
  experienceTypes: string[];
}

export const RewardConfirmationDialog: React.FC<RewardConfirmationDialogProps> = ({
  open,
  onOpenChange,
  rewardName,
  location,
  selectedDates,
  milestonesCompleted,
  totalMilestones,
  experienceTypes,
}) => {
  const progressPercent = (milestonesCompleted / totalMilestones) * 100;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <div className="space-y-6">
          {/* Success Icon */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="h-24 w-24 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                <CheckCircle2 className="h-12 w-12 text-primary" />
              </div>
            </div>
          </div>

          {/* Title */}
          <DialogHeader className="text-center space-y-2">
            <DialogTitle className="text-2xl text-primary">
              Your experience is confirmed!
            </DialogTitle>
            <p className="text-muted-foreground">
              We've locked in your reward — here's what to expect.
            </p>
          </DialogHeader>

          {/* Progress Bar */}
          <div className="h-1 bg-gradient-to-r from-primary via-secondary to-accent rounded-full" />

          {/* Reward Details */}
          <div className="bg-muted/50 rounded-lg p-6 space-y-4">
            <div className="flex items-start gap-3">
              <Badge variant="secondary" className="gap-1">
                <span className="h-2 w-2 rounded-full bg-primary" />
                Wellness
              </Badge>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-1">{rewardName}</h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>📍 {location}</span>
              </div>
            </div>

            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-primary/5 text-primary border-primary/20">
                  ✓ Approved
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-accent/5 text-accent border-accent/20">
                  😌 Relaxing
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-success/5 text-success border-success/20">
                  🌿 Nature
                </Badge>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2 border-t">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Selected Dates</span>
            </div>
            <p className="text-sm">{selectedDates}</p>
          </div>

          {/* Milestone Progress */}
          <div className="space-y-3">
            <div>
              <h4 className="text-sm font-semibold mb-2">Milestone Progress</h4>
              <p className="text-xs text-muted-foreground">
                {milestonesCompleted} of {totalMilestones} Milestones Redeemed
              </p>
            </div>
            <Progress value={progressPercent} className="h-2" />
            
            <div>
              <h4 className="text-sm font-semibold mb-2">Experience Type</h4>
              <div className="flex gap-2">
                {experienceTypes.map((type, index) => (
                  <Badge key={index} variant="secondary">
                    {type}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="gap-2">
              <Calendar className="h-4 w-4" />
              Add to Calendar
            </Button>
            <Button className="gap-2">
              <Share2 className="h-4 w-4" />
              View Full Itinerary
            </Button>
          </div>
          
          <Button variant="outline" className="w-full gap-2">
            <Share2 className="h-4 w-4" />
            Share with Manager
          </Button>

          <Button
            variant="ghost"
            className="w-full gap-2"
            onClick={() => onOpenChange(false)}
          >
            <Home className="h-4 w-4" />
            Return to Dashboard
          </Button>

          {/* Preferences Update */}
          <div className="bg-muted/30 rounded-lg p-4 text-center space-y-3">
            <p className="text-sm text-muted-foreground">
              Want to update preferences before your next milestone?
            </p>
            <p className="text-xs text-muted-foreground">
              Customize your experience preferences to ensure your next reward perfectly matches your interests.
            </p>
            <Button variant="outline" size="sm" className="gap-2">
              <Settings className="h-4 w-4" />
              Edit Preferences
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};