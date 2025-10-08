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
      <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer border-border/50">
        <div className="relative h-64 overflow-hidden">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          
          {/* Badges */}
          <div className="absolute top-4 right-4 flex flex-col gap-2 items-end">
            {isRecommended && (
              <Badge className="bg-primary text-primary-foreground gap-1.5 px-3 py-1 shadow-lg">
                <Sparkles className="h-3.5 w-3.5" />
                Suggested by AI
              </Badge>
            )}
            {isWellness && (
              <Badge className="bg-success text-success-foreground gap-1.5 px-3 py-1 shadow-lg">
                <Heart className="h-3.5 w-3.5" />
                Wellness
              </Badge>
            )}
          </div>

          {/* Category Badge */}
          <Badge variant="secondary" className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm px-3 py-1 shadow-md">
            {category}
          </Badge>

          {/* Bottom Content */}
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <div className="flex items-center gap-2 text-white/90 mb-2">
              <MapPin className="h-4 w-4" />
              <span className="text-sm font-medium">{destination}</span>
            </div>
            <h3 className="text-white font-bold text-xl mb-3 line-clamp-2">{name}</h3>
            
            <div className="flex items-center justify-between">
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-white">{points.toLocaleString()}</span>
                <span className="text-sm text-white/80">pts</span>
              </div>
              {matchScore && matchScore > 70 && (
                <div className="flex items-center gap-1.5 bg-primary/90 backdrop-blur-sm text-primary-foreground px-3 py-1.5 rounded-full">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span className="text-xs font-semibold">{matchScore}% match</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};