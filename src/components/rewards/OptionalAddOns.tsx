import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mountain, Plane, Hotel, ChevronDown } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useState } from 'react';

interface AddOn {
  icon: 'mountain' | 'plane' | 'hotel';
  title: string;
  description: string;
  points: number;
}

export const OptionalAddOns: React.FC = () => {
  const [selectedAddOns, setSelectedAddOns] = useState<number[]>([]);

  const addOns: AddOn[] = [
    {
      icon: 'mountain',
      title: 'Private Ski Lessons',
      description: '2-hour private lesson with certified instructor',
      points: 10000,
    },
    {
      icon: 'plane',
      title: 'Scenic Helicopter Tour',
      description: '40-minute aerial tour of the Alps',
      points: 15000,
    },
    {
      icon: 'hotel',
      title: 'Suite Upgrade',
      description: 'Upgrade to premium suite with private hot tub',
      points: 20000,
    },
  ];

  const iconMap = {
    mountain: Mountain,
    plane: Plane,
    hotel: Hotel,
  };

  const toggleAddOn = (index: number) => {
    setSelectedAddOns(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Optional Add-Ons</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {addOns.map((addOn, index) => {
          const Icon = iconMap[addOn.icon];
          const isSelected = selectedAddOns.includes(index);

          return (
            <Collapsible key={index}>
              <div
                className={`flex items-center justify-between p-4 rounded-lg border transition-colors cursor-pointer ${
                  isSelected ? 'border-primary bg-primary/5' : 'hover:bg-muted/50'
                }`}
                onClick={() => toggleAddOn(index)}
              >
                <div className="flex items-center gap-3 flex-1">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm">{addOn.title}</h4>
                    <p className="text-xs text-muted-foreground">{addOn.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold">{addOn.points.toLocaleString()} pts</span>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </CollapsibleTrigger>
                </div>
              </div>
              <CollapsibleContent className="px-4 pb-3">
                <p className="text-sm text-muted-foreground mt-2">
                  Additional details about this add-on would appear here.
                </p>
              </CollapsibleContent>
            </Collapsible>
          );
        })}
      </CardContent>
    </Card>
  );
};