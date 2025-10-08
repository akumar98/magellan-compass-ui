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
    <Link to={`/rewards/${id}`}>
      <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer border-border/50 h-full flex flex-col">
        {/* Hero Image */}
        <div className="relative h-56 overflow-hidden">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          
          {/* Unlocked Badge */}
          {unlockProgress === 100 && (
            <Badge className="absolute top-4 right-4 bg-success text-success-foreground gap-1.5 px-4 py-1.5 shadow-lg">
              ✓ Unlocked!
            </Badge>
          )}
        </div>

        {/* Content Section */}
        <div className="p-5 space-y-4 flex-1 flex flex-col">
          {/* AI Personalization Message */}
          {isRecommended && (
            <div className="bg-muted/50 rounded-lg p-3 text-sm text-muted-foreground">
              Based on your wellness preferences and recent stress levels
            </div>
          )}

          {/* AI Pick Badge */}
          {isRecommended && (
            <Badge className="w-full bg-primary text-primary-foreground gap-2 px-4 py-2 justify-center text-sm font-semibold">
              <Bot className="h-4 w-4" />
              AI Pick
            </Badge>
          )}

          {/* Title */}
          <h3 className="font-bold text-xl line-clamp-2">{name}</h3>

          {/* Location */}
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span className="text-sm">{destination}</span>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {isWellness && (
              <Badge variant="secondary" className="bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">
                Wellness
              </Badge>
            )}
            {tags.map((tag, index) => (
              <Badge key={index} variant="outline" className="bg-background">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Value and Rating */}
          <div className="flex items-center justify-between">
            <div className="text-lg font-semibold">
              Value: ${points.toLocaleString()}
            </div>
            <div className="flex items-center gap-1 text-sm">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">{rating}</span>
              <span className="text-muted-foreground">({reviewCount} reviews)</span>
            </div>
          </div>

          {/* Progress */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Unlocked</span>
              <span className="text-primary font-semibold">{unlockProgress}%</span>
            </div>
            <Progress value={unlockProgress} className="h-2" />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-2 mt-auto">
            <Button className="flex-1 gap-2" size="lg">
              Redeem
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="px-4"
              onClick={handleBookmark}
            >
              <Bookmark className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </Link>
  );
};