import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Bookmark, Gift } from 'lucide-react';

interface RewardHeroProps {
  imageUrl: string;
  title: string;
  location: string;
  categories: string[];
  onSaveForLater?: () => void;
  onRedeemNow?: () => void;
  isSaved?: boolean;
}

export const RewardHero: React.FC<RewardHeroProps> = ({
  imageUrl,
  title,
  location,
  categories,
  onSaveForLater,
  onRedeemNow,
  isSaved = false,
}) => {
  return (
    <div className="relative h-[400px] rounded-lg overflow-hidden">
      <img
        src={imageUrl}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/30 to-transparent" />
      
      <div className="absolute inset-0 p-8 flex flex-col justify-end">
        <div className="flex flex-wrap gap-2 mb-4">
          {categories.map((category, index) => (
            <Badge key={index} variant="secondary" className="bg-background/80 backdrop-blur-sm">
              {category}
            </Badge>
          ))}
        </div>
        
        <h1 className="text-4xl font-bold mb-3">{title}</h1>
        
        <div className="flex items-center gap-2 text-muted-foreground mb-6">
          <MapPin className="h-4 w-4" />
          <span>{location}</span>
        </div>
        
        <div className="flex gap-3">
          <Button onClick={onSaveForLater} variant="outline" size="lg" className="gap-2">
            <Bookmark className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`} />
            Save for Later
          </Button>
          <Button onClick={onRedeemNow} size="lg" className="gap-2">
            <Gift className="h-4 w-4" />
            Redeem Now
          </Button>
        </div>
      </div>
    </div>
  );
};