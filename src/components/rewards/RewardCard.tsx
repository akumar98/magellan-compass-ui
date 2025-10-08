import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Heart, Sparkles } from 'lucide-react';
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
}) => {
  return (
    <Link to={`/rewards/${id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group cursor-pointer">
        <div className="relative h-48 overflow-hidden">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
          
          {/* Badges */}
          <div className="absolute top-3 right-3 flex gap-2">
            {isRecommended && (
              <Badge className="bg-primary text-primary-foreground gap-1">
                <Sparkles className="h-3 w-3" />
                For You
              </Badge>
            )}
            {isWellness && (
              <Badge className="bg-success text-success-foreground gap-1">
                <Heart className="h-3 w-3" />
                Wellness
              </Badge>
            )}
          </div>

          {/* Category Badge */}
          <Badge variant="secondary" className="absolute top-3 left-3 bg-background/80 backdrop-blur-sm">
            {category}
          </Badge>

          {/* Location */}
          <div className="absolute bottom-3 left-3 flex items-center gap-1 text-white drop-shadow-lg">
            <MapPin className="h-3 w-3" />
            <span className="text-xs font-medium">{destination}</span>
          </div>
        </div>

        <div className="p-4 space-y-3">
          <div>
            <h3 className="font-semibold text-lg line-clamp-1 mb-1">{name}</h3>
            {matchScore && matchScore > 70 && (
              <div className="flex items-center gap-1 text-xs text-primary">
                <Sparkles className="h-3 w-3" />
                <span>{matchScore}% match</span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-primary">{points.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">points</div>
            </div>
            <Button size="sm" className="group-hover:bg-primary group-hover:text-primary-foreground">
              View Details
            </Button>
          </div>
        </div>
      </Card>
    </Link>
  );
};