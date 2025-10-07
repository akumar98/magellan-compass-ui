import { useEffect, useState } from 'react';
import { Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { EmployeePreferences } from '@/hooks/useEmployeePreferences';

const travelTypes = ['Adventure', 'Luxury', 'Cultural', 'Relaxation', 'Wellness'];
const activities = ['Hiking', 'Spa', 'Sightseeing', 'Culinary', 'Shopping', 'Water Sports', 'Photography', 'Museums', 'Skiing', 'Wildlife', 'Yoga'];
const popularDestinations = ['Paris', 'Bali', 'Tokyo', 'Switzerland', 'Maldives', 'Rome', 'Tanzania', 'Caribbean', 'Iceland', 'Thailand'];

interface RewardsFiltersProps {
  preferences: EmployeePreferences | null;
  onPreferencesUpdate: () => void;
  activeFilters: {
    travelTypes: string[];
    activities: string[];
    destinations: string[];
    duration: string;
  };
  onFiltersChange: (filters: {
    travelTypes: string[];
    activities: string[];
    destinations: string[];
    duration: string;
  }) => void;
}

export function RewardsFilters({ preferences, onPreferencesUpdate, activeFilters, onFiltersChange }: RewardsFiltersProps) {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Initialize filters from preferences
  useEffect(() => {
    if (preferences && activeFilters.travelTypes.length === 0) {
      onFiltersChange({
        travelTypes: preferences.preferred_travel_types || [],
        activities: preferences.preferred_activities || [],
        destinations: preferences.favorite_destinations || [],
        duration: preferences.trip_duration_preference || '',
      });
    }
  }, [preferences]);

  const savePreferences = async (updatedFilters: typeof activeFilters) => {
    setIsSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('employee_preferences')
        .upsert({
          employee_id: user.id,
          preferred_travel_types: updatedFilters.travelTypes,
          preferred_activities: updatedFilters.activities,
          favorite_destinations: updatedFilters.destinations,
          trip_duration_preference: updatedFilters.duration,
        }, { onConflict: 'employee_id' });

      if (error) throw error;
      
      onPreferencesUpdate();
      toast({ 
        title: 'Preferences Updated', 
        description: 'Your travel preferences have been saved' 
      });
    } catch (error) {
      console.error('Error saving preferences:', error);
      toast({ 
        title: 'Error', 
        description: 'Failed to save preferences', 
        variant: 'destructive' 
      });
    } finally {
      setIsSaving(false);
    }
  };

  const toggleArrayItem = (array: string[], item: string) => {
    return array.includes(item)
      ? array.filter(i => i !== item)
      : [...array, item];
  };

  const handleTravelTypeToggle = (type: string) => {
    const updated = {
      ...activeFilters,
      travelTypes: toggleArrayItem(activeFilters.travelTypes, type)
    };
    onFiltersChange(updated);
    savePreferences(updated);
  };

  const handleActivityToggle = (activity: string) => {
    const updated = {
      ...activeFilters,
      activities: toggleArrayItem(activeFilters.activities, activity)
    };
    onFiltersChange(updated);
    savePreferences(updated);
  };

  const handleDestinationToggle = (destination: string) => {
    const updated = {
      ...activeFilters,
      destinations: toggleArrayItem(activeFilters.destinations, destination)
    };
    onFiltersChange(updated);
    savePreferences(updated);
  };

  const handleDurationChange = (duration: string) => {
    const updated = {
      ...activeFilters,
      duration
    };
    onFiltersChange(updated);
    savePreferences(updated);
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      travelTypes: [],
      activities: [],
      destinations: [],
      duration: '',
    };
    onFiltersChange(clearedFilters);
    savePreferences(clearedFilters);
  };

  const activeFilterCount = 
    activeFilters.travelTypes.length + 
    activeFilters.activities.length + 
    activeFilters.destinations.length + 
    (activeFilters.duration ? 1 : 0);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="relative">
          <Filter className="h-4 w-4 mr-2" />
          Refine Preferences
          {activeFilterCount > 0 && (
            <Badge className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center" variant="default">
              {activeFilterCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center justify-between">
            <span>Refine Your Preferences</span>
            {activeFilterCount > 0 && (
              <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                <X className="h-4 w-4 mr-1" />
                Clear All
              </Button>
            )}
          </SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Travel Types */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Travel Style</Label>
            <div className="grid grid-cols-2 gap-2">
              {travelTypes.map(type => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox
                    id={`filter-travel-${type}`}
                    checked={activeFilters.travelTypes.includes(type)}
                    onCheckedChange={() => handleTravelTypeToggle(type)}
                    disabled={isSaving}
                  />
                  <label 
                    htmlFor={`filter-travel-${type}`} 
                    className="text-sm cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {type}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Activities */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Activities</Label>
            <div className="grid grid-cols-2 gap-2">
              {activities.map(activity => (
                <div key={activity} className="flex items-center space-x-2">
                  <Checkbox
                    id={`filter-activity-${activity}`}
                    checked={activeFilters.activities.includes(activity)}
                    onCheckedChange={() => handleActivityToggle(activity)}
                    disabled={isSaving}
                  />
                  <label 
                    htmlFor={`filter-activity-${activity}`} 
                    className="text-sm cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {activity}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Destinations */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Favorite Destinations</Label>
            <div className="grid grid-cols-2 gap-2">
              {popularDestinations.map(destination => (
                <div key={destination} className="flex items-center space-x-2">
                  <Checkbox
                    id={`filter-dest-${destination}`}
                    checked={activeFilters.destinations.includes(destination)}
                    onCheckedChange={() => handleDestinationToggle(destination)}
                    disabled={isSaving}
                  />
                  <label 
                    htmlFor={`filter-dest-${destination}`} 
                    className="text-sm cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {destination}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Duration */}
          <div className="space-y-2">
            <Label className="text-base font-semibold">Trip Duration</Label>
            <Select
              value={activeFilters.duration || "any"}
              onValueChange={(value) => handleDurationChange(value === "any" ? "" : value)}
              disabled={isSaving}
            >
              <SelectTrigger>
                <SelectValue placeholder="Any duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any duration</SelectItem>
                <SelectItem value="weekend">Weekend (2-3 days)</SelectItem>
                <SelectItem value="short">Short (4-6 days)</SelectItem>
                <SelectItem value="week">Week (7-10 days)</SelectItem>
                <SelectItem value="extended">Extended (11+ days)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Active Filters Summary */}
          {activeFilterCount > 0 && (
            <>
              <Separator />
              <div className="space-y-2">
                <Label className="text-base font-semibold">Active Filters ({activeFilterCount})</Label>
                <div className="flex flex-wrap gap-2">
                  {activeFilters.travelTypes.map(type => (
                    <Badge key={type} variant="secondary" className="cursor-pointer" onClick={() => handleTravelTypeToggle(type)}>
                      {type}
                      <X className="h-3 w-3 ml-1" />
                    </Badge>
                  ))}
                  {activeFilters.activities.map(activity => (
                    <Badge key={activity} variant="secondary" className="cursor-pointer" onClick={() => handleActivityToggle(activity)}>
                      {activity}
                      <X className="h-3 w-3 ml-1" />
                    </Badge>
                  ))}
                  {activeFilters.destinations.map(dest => (
                    <Badge key={dest} variant="secondary" className="cursor-pointer" onClick={() => handleDestinationToggle(dest)}>
                      {dest}
                      <X className="h-3 w-3 ml-1" />
                    </Badge>
                  ))}
                  {activeFilters.duration && (
                    <Badge variant="secondary" className="cursor-pointer" onClick={() => handleDurationChange('')}>
                      {activeFilters.duration === 'weekend' ? 'Weekend (2-3 days)' :
                       activeFilters.duration === 'short' ? 'Short (4-6 days)' :
                       activeFilters.duration === 'week' ? 'Week (7-10 days)' :
                       activeFilters.duration === 'extended' ? 'Extended (11+ days)' : activeFilters.duration}
                      <X className="h-3 w-3 ml-1" />
                    </Badge>
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        <div className="mt-6 text-xs text-muted-foreground">
          {isSaving ? 'Saving preferences...' : 'Changes are automatically saved to your profile'}
        </div>
      </SheetContent>
    </Sheet>
  );
}
