import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Sparkles, MapPin, Calendar, Compass } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function EmployeeOnboarding() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [preferences, setPreferences] = useState({
    travelTypes: [] as string[],
    destinations: [] as string[],
    duration: '',
    activities: [] as string[],
    freeText: ''
  });

  const travelTypes = ['Adventure', 'Relaxation', 'Cultural', 'Beach', 'Mountain', 'Urban', 'Wellness', 'Food & Wine'];
  const destinations = ['Europe', 'Asia', 'Americas', 'Africa', 'Oceania', 'Middle East'];
  const durations = ['Weekend (2-3 days)', 'Short Trip (4-6 days)', 'Week Long (7-10 days)', 'Extended (10+ days)'];
  const activities = ['Hiking', 'Spa & Wellness', 'Fine Dining', 'Museums', 'Beach Activities', 'Shopping', 'Adventure Sports', 'Photography'];

  const handleComplete = () => {
    toast({
      title: "Preferences saved!",
      description: "Your personalized recommendations are ready.",
    });
    navigate('/dashboard');
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
        <div className="text-center">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-accent/10 mb-4">
            <Sparkles className="h-8 w-8 text-accent" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Welcome to Magellan One AI</h1>
          <p className="text-muted-foreground">Let's personalize your travel rewards experience</p>
        </div>

        {/* Progress */}
        <div className="flex gap-2 justify-center">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`h-2 w-16 rounded-full transition-colors ${
                s <= step ? 'bg-primary' : 'bg-muted'
              }`}
            />
          ))}
        </div>

        {step === 1 && (
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Compass className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <CardTitle>What type of travel excites you?</CardTitle>
                  <CardDescription>Select all that apply</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {travelTypes.map((type) => (
                  <div key={type} className="flex items-center space-x-2">
                    <Checkbox
                      id={type}
                      checked={preferences.travelTypes.includes(type)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setPreferences({ ...preferences, travelTypes: [...preferences.travelTypes, type] });
                        } else {
                          setPreferences({ ...preferences, travelTypes: preferences.travelTypes.filter(t => t !== type) });
                        }
                      }}
                    />
                    <Label htmlFor={type} className="cursor-pointer">{type}</Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {step === 2 && (
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <CardTitle>Where would you like to explore?</CardTitle>
                  <CardDescription>Choose your preferred destinations</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {destinations.map((dest) => (
                  <div key={dest} className="flex items-center space-x-2">
                    <Checkbox
                      id={dest}
                      checked={preferences.destinations.includes(dest)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setPreferences({ ...preferences, destinations: [...preferences.destinations, dest] });
                        } else {
                          setPreferences({ ...preferences, destinations: preferences.destinations.filter(d => d !== dest) });
                        }
                      }}
                    />
                    <Label htmlFor={dest} className="cursor-pointer">{dest}</Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {step === 3 && (
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-warning/10 flex items-center justify-center">
                  <Calendar className="h-5 w-5 text-warning" />
                </div>
                <div>
                  <CardTitle>How long do you prefer to travel?</CardTitle>
                  <CardDescription>Select typical trip duration and activities</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label>Trip Duration</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {durations.map((duration) => (
                    <div
                      key={duration}
                      onClick={() => setPreferences({ ...preferences, duration })}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                        preferences.duration === duration
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <p className="font-medium">{duration}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <Label>Preferred Activities</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {activities.map((activity) => (
                    <div key={activity} className="flex items-center space-x-2">
                      <Checkbox
                        id={activity}
                        checked={preferences.activities.includes(activity)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setPreferences({ ...preferences, activities: [...preferences.activities, activity] });
                          } else {
                            setPreferences({ ...preferences, activities: preferences.activities.filter(a => a !== activity) });
                          }
                        }}
                      />
                      <Label htmlFor={activity} className="cursor-pointer text-sm">{activity}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 4 && (
          <Card>
            <CardHeader>
              <CardTitle>Any additional preferences?</CardTitle>
              <CardDescription>Help us personalize your experience even more</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="E.g., I prefer quieter destinations, I'm vegetarian, I love photography spots..."
                value={preferences.freeText}
                onChange={(e) => setPreferences({ ...preferences, freeText: e.target.value })}
                className="min-h-32"
              />
            </CardContent>
          </Card>
        )}

        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setStep(Math.max(1, step - 1))}
            disabled={step === 1}
          >
            Back
          </Button>
          {step < 4 ? (
            <Button onClick={() => setStep(step + 1)}>
              Next
            </Button>
          ) : (
            <Button onClick={handleComplete} className="gap-2">
              <Sparkles className="h-4 w-4" />
              Complete Setup
            </Button>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
