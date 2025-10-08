import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Hotel, Droplet, UtensilsCrossed, CloudSun, MapPin } from 'lucide-react';

interface Highlight {
  icon: 'lodging' | 'spa' | 'dining' | 'climate' | 'location';
  title: string;
  description: string;
}

export const ExperienceHighlights: React.FC<{ highlights?: Highlight[] }> = ({ highlights }) => {
  const defaultHighlights: Highlight[] = [
    {
      icon: 'lodging',
      title: 'Luxury Lodging',
      description: '7 nights in a premium suite with mountain views and private balcony',
    },
    {
      icon: 'spa',
      title: 'Spa Treatments',
      description: 'Daily personalized wellness treatments, thermal baths, and guided meditation',
    },
    {
      icon: 'dining',
      title: 'Gourmet Dining',
      description: 'Farm-to-table meals prepared by award-winning chefs with dietary customization',
    },
  ];

  const iconMap = {
    lodging: Hotel,
    spa: Droplet,
    dining: UtensilsCrossed,
    climate: CloudSun,
    location: MapPin,
  };

  const items = highlights || defaultHighlights;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Experience Highlights</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((highlight, index) => {
            const Icon = iconMap[highlight.icon];
            return (
              <div key={index} className="flex flex-col gap-3">
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold mb-1">{highlight.title}</h4>
                  <p className="text-sm text-muted-foreground">{highlight.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};