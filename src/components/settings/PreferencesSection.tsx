import { useState, useEffect } from 'react';
import { Compass, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const travelTypes = ['Adventure', 'Luxury', 'Cultural', 'Relaxation', 'Business', 'Wellness'];
const activities = ['Hiking', 'Spa', 'Sightseeing', 'Culinary', 'Shopping', 'Water Sports', 'Photography', 'Museums'];
const vacationTimings = ['Summer', 'Winter', 'Spring', 'Fall', 'Holidays', 'Long Weekends', 'Flexible'];
const notificationChannels = ['Email', 'SMS', 'In-App'];

export function PreferencesSection() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [preferences, setPreferences] = useState({
    preferred_travel_types: [] as string[],
    favorite_destinations: '',
    trip_duration_preference: '',
    preferred_activities: [] as string[],
    work_schedule: '',
    travel_restrictions: '',
    vacation_timing_preferences: [] as string[],
    notification_channels: ['Email', 'In-App'] as string[],
    opt_in_personalized_recommendations: true,
    free_text_preferences: '',
  });

  useEffect(() => {
    loadPreferences();
  }, []);

  const loadPreferences = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('employee_preferences')
        .select('*')
        .eq('employee_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error loading preferences:', error);
        return;
      }

      if (data) {
        setPreferences({
          preferred_travel_types: data.preferred_travel_types || [],
          favorite_destinations: (data.favorite_destinations || []).join(', '),
          trip_duration_preference: data.trip_duration_preference || '',
          preferred_activities: data.preferred_activities || [],
          work_schedule: data.work_schedule || '',
          travel_restrictions: data.travel_restrictions || '',
          vacation_timing_preferences: data.vacation_timing_preferences || [],
          notification_channels: (data.notification_channels || ['email', 'in_app']).map((c: string) => 
            c === 'email' ? 'Email' : c === 'sms' ? 'SMS' : 'In-App'
          ),
          opt_in_personalized_recommendations: data.opt_in_personalized_recommendations ?? true,
          free_text_preferences: data.free_text_preferences || '',
        });
      }
    } catch (error) {
      console.error('Error loading preferences:', error);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({ title: 'Error', description: 'User not authenticated', variant: 'destructive' });
        return;
      }

      const preferencesData = {
        employee_id: user.id,
        preferred_travel_types: preferences.preferred_travel_types,
        favorite_destinations: preferences.favorite_destinations
          .split(',')
          .map(d => d.trim())
          .filter(d => d),
        trip_duration_preference: preferences.trip_duration_preference,
        preferred_activities: preferences.preferred_activities,
        work_schedule: preferences.work_schedule,
        travel_restrictions: preferences.travel_restrictions,
        vacation_timing_preferences: preferences.vacation_timing_preferences,
        notification_channels: preferences.notification_channels.map(c => c.toLowerCase().replace('-', '_')),
        opt_in_personalized_recommendations: preferences.opt_in_personalized_recommendations,
        free_text_preferences: preferences.free_text_preferences,
      };

      const { error } = await supabase
        .from('employee_preferences')
        .upsert(preferencesData, { onConflict: 'employee_id' });

      if (error) throw error;

      toast({ title: 'Success', description: 'Preferences saved successfully' });
    } catch (error) {
      console.error('Error saving preferences:', error);
      toast({ title: 'Error', description: 'Failed to save preferences', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const toggleArrayItem = (array: string[], item: string) => {
    return array.includes(item)
      ? array.filter(i => i !== item)
      : [...array, item];
  };

  return (
    <div className="card-stat">
      <div className="flex items-center gap-3 mb-6">
        <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <Compass className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-bold">Travel Preferences</h2>
          <p className="text-sm text-muted-foreground">Help us personalize your travel rewards</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Travel Type Preferences */}
        <div className="space-y-3">
          <Label className="text-base font-semibold">Preferred Travel Types</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {travelTypes.map(type => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox
                  id={`travel-${type}`}
                  checked={preferences.preferred_travel_types.includes(type)}
                  onCheckedChange={() => 
                    setPreferences(prev => ({
                      ...prev,
                      preferred_travel_types: toggleArrayItem(prev.preferred_travel_types, type)
                    }))
                  }
                />
                <label htmlFor={`travel-${type}`} className="text-sm cursor-pointer">{type}</label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Favorite Destinations */}
        <div className="space-y-2">
          <Label htmlFor="destinations">Favorite Destinations or Regions</Label>
          <Input
            id="destinations"
            placeholder="e.g., Paris, Bali, Japan, Caribbean"
            value={preferences.favorite_destinations}
            onChange={(e) => setPreferences(prev => ({ ...prev, favorite_destinations: e.target.value }))}
          />
          <p className="text-xs text-muted-foreground">Separate multiple destinations with commas</p>
        </div>

        {/* Trip Duration */}
        <div className="space-y-2">
          <Label htmlFor="duration">Preferred Trip Duration</Label>
          <Select
            value={preferences.trip_duration_preference}
            onValueChange={(value) => setPreferences(prev => ({ ...prev, trip_duration_preference: value }))}
          >
            <SelectTrigger id="duration">
              <SelectValue placeholder="Select duration" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="weekend">Weekend (2-3 days)</SelectItem>
              <SelectItem value="short">Short (4-6 days)</SelectItem>
              <SelectItem value="week">Week (7-10 days)</SelectItem>
              <SelectItem value="extended">Extended (11+ days)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Separator />

        {/* Preferred Activities */}
        <div className="space-y-3">
          <Label className="text-base font-semibold">Preferred Activities</Label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {activities.map(activity => (
              <div key={activity} className="flex items-center space-x-2">
                <Checkbox
                  id={`activity-${activity}`}
                  checked={preferences.preferred_activities.includes(activity)}
                  onCheckedChange={() =>
                    setPreferences(prev => ({
                      ...prev,
                      preferred_activities: toggleArrayItem(prev.preferred_activities, activity)
                    }))
                  }
                />
                <label htmlFor={`activity-${activity}`} className="text-sm cursor-pointer">{activity}</label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Work Schedule */}
        <div className="space-y-2">
          <Label htmlFor="schedule">Work Schedule</Label>
          <Input
            id="schedule"
            placeholder="e.g., Monday-Friday, 9-5"
            value={preferences.work_schedule}
            onChange={(e) => setPreferences(prev => ({ ...prev, work_schedule: e.target.value }))}
          />
        </div>

        {/* Travel Restrictions */}
        <div className="space-y-2">
          <Label htmlFor="restrictions">Travel Restrictions</Label>
          <Textarea
            id="restrictions"
            placeholder="Any travel restrictions or considerations (e.g., dietary requirements, mobility needs)"
            value={preferences.travel_restrictions}
            onChange={(e) => setPreferences(prev => ({ ...prev, travel_restrictions: e.target.value }))}
            rows={3}
          />
        </div>

        {/* Vacation Timing */}
        <div className="space-y-3">
          <Label className="text-base font-semibold">Preferred Vacation Timing</Label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {vacationTimings.map(timing => (
              <div key={timing} className="flex items-center space-x-2">
                <Checkbox
                  id={`timing-${timing}`}
                  checked={preferences.vacation_timing_preferences.includes(timing)}
                  onCheckedChange={() =>
                    setPreferences(prev => ({
                      ...prev,
                      vacation_timing_preferences: toggleArrayItem(prev.vacation_timing_preferences, timing)
                    }))
                  }
                />
                <label htmlFor={`timing-${timing}`} className="text-sm cursor-pointer">{timing}</label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Notification Preferences */}
        <div className="space-y-3">
          <Label className="text-base font-semibold">Notification Channels</Label>
          <div className="grid grid-cols-3 gap-3">
            {notificationChannels.map(channel => (
              <div key={channel} className="flex items-center space-x-2">
                <Checkbox
                  id={`channel-${channel}`}
                  checked={preferences.notification_channels.includes(channel)}
                  onCheckedChange={() =>
                    setPreferences(prev => ({
                      ...prev,
                      notification_channels: toggleArrayItem(prev.notification_channels, channel)
                    }))
                  }
                />
                <label htmlFor={`channel-${channel}`} className="text-sm cursor-pointer">{channel}</label>
              </div>
            ))}
          </div>
        </div>

        {/* Personalized Recommendations Opt-in */}
        <div className="flex items-center space-x-2">
          <Checkbox
            id="opt-in"
            checked={preferences.opt_in_personalized_recommendations}
            onCheckedChange={(checked) =>
              setPreferences(prev => ({ ...prev, opt_in_personalized_recommendations: checked as boolean }))
            }
          />
          <label htmlFor="opt-in" className="text-sm cursor-pointer">
            Receive AI-powered personalized travel recommendations
          </label>
        </div>

        <Separator />

        {/* Free Text Preferences */}
        <div className="space-y-2">
          <Label htmlFor="additional">Additional Preferences</Label>
          <Textarea
            id="additional"
            placeholder="Tell us anything else that would help us recommend the perfect travel rewards for you..."
            value={preferences.free_text_preferences}
            onChange={(e) => setPreferences(prev => ({ ...prev, free_text_preferences: e.target.value }))}
            rows={4}
          />
        </div>

        {/* Save Button */}
        <Button onClick={handleSave} disabled={loading} className="w-full md:w-auto">
          <Save className="h-4 w-4 mr-2" />
          {loading ? 'Saving...' : 'Save Preferences'}
        </Button>
      </div>
    </div>
  );
}
