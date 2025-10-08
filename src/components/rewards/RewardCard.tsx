import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { MapPin, Star, Bookmark, Bot } from 'lucide-react';
import { Link } from 'react-router-dom';

interface RewardCardProps {
  id: number;
  name: string;
  destination: string;
  points: number;
  imageUrl: string;
  category: string;
  isRecommended?: boolean;
  isWellness?: boolean;
  matchScore?: number;
  rating?: number;
  reviewCount?: number;
  tags?: string[];
  unlockProgress?: number;
}

export const RewardCard: React.FC<RewardCardProps> = ({
  id,
  name,
  destination,
  points,
  imageUrl,
  category,
  isRecommended = false,
  isWellness = false,
  matchScore,
  rating = 4.9,
  reviewCount = 26,
  tags = [],
  unlockProgress = 100,
}) => {
  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Handle bookmark logic
  };

  return (
    <Link to={`/rewards/${id}`} className="block h-full">
      <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer border-border/50 h-full flex flex-col">
        {/* Hero Image */}
        <div className="relative h-[200px] overflow-hidden flex-shrink-0">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          
          {/* Unlocked Badge */}
          {unlockProgress === 100 && (
            <Badge className="absolute top-3 right-3 bg-success text-success-foreground gap-1.5 px-3 py-1 shadow-lg text-xs">
              ✓ Unlocked!
            </Badge>
          )}
        </div>

        {/* Content Section */}
        <div className="p-4 space-y-3 flex-1 flex flex-col">
          {/* AI Personalization Message */}
          {isRecommended && (
            <div className="bg-muted/50 rounded-lg p-2.5 text-xs text-muted-foreground leading-snug">
              Based on your wellness preferences and recent stress levels
            </div>
          )}

          {/* AI Pick Badge */}
          {isRecommended && (
            <Badge className="w-full bg-primary text-primary-foreground gap-1.5 px-3 py-2 justify-center text-xs font-semibold">
              <Bot className="h-3.5 w-3.5" />
              AI Pick
            </Badge>
          )}

          {/* Title */}
          <h3 className="font-bold text-lg leading-tight line-clamp-2 min-h-[3.5rem]">{name}</h3>

          {/* Location */}
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
            <span className="text-xs truncate">{destination}</span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 min-h-[1.75rem]">
            {isWellness && (
              <Badge variant="secondary" className="bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 text-xs px-2 py-0.5">
                Wellness
              </Badge>
            )}
            {tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="outline" className="bg-background text-xs px-2 py-0.5">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Value and Rating */}
          <div className="flex items-center justify-between pt-1">
            <div className="text-base font-semibold">
              Value: ${points.toLocaleString()}
            </div>
            <div className="flex items-center gap-0.5 text-xs">
              <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">{rating}</span>
              <span className="text-muted-foreground">({reviewCount})</span>
            </div>
          </div>

          {/* Progress */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Unlocked</span>
              <span className="text-primary font-semibold">{unlockProgress}%</span>
            </div>
            <Progress value={unlockProgress} className="h-1.5" />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2 mt-auto">
            <Button className="flex-1 gap-1.5 h-9 text-sm" size="sm">
              Redeem
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="px-3 h-9"
              onClick={handleBookmark}
            >
              <Bookmark className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </Card>
    </Link>
  );
};