import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  User, 
  Mail, 
  Phone, 
  Briefcase, 
  Plane, 
  DollarSign, 
  Bell, 
  Shield,
  Edit3,
  Eye,
  FileDown,
  Settings as SettingsIcon,
  Trash2,
  Loader2
} from 'lucide-react';
import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useAvatarUpload } from '@/hooks/useAvatarUpload';

export default function Profile() {
  const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { uploadAvatar, uploading } = useAvatarUpload(user?.id || '');
  
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [travelPreferences, setTravelPreferences] = useState(['Beach', 'Yoga', 'Eco-Tourism', 'Food Tours', 'Adventure', 'Cultural']);
  const [autoContribute, setAutoContribute] = useState(true);
  const [contributionPercentage, setContributionPercentage] = useState(5);
  
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);
  const [appNotifications, setAppNotifications] = useState(false);
  const [travelDeals, setTravelDeals] = useState(true);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = await uploadAvatar(file);
      if (url) {
        setAvatarUrl(url);
      }
    }
  };

  const availablePreferences = [
    'Beach', 'Yoga', 'Eco-Tourism', 'Food Tours', 'Adventure', 'Cultural',
    'Mountains', 'City Break', 'Wellness', 'Spa', 'Hiking', 'Photography'
  ];

  const togglePreference = (pref: string) => {
    if (travelPreferences.includes(pref)) {
      setTravelPreferences(travelPreferences.filter(p => p !== pref));
    } else {
      setTravelPreferences([...travelPreferences, pref]);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in max-w-5xl">
        {/* Header with Avatar */}
        <Card className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <Avatar className="h-24 w-24">
                  <AvatarImage src={avatarUrl || "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael"} />
                  <AvatarFallback>MJ</AvatarFallback>
                </Avatar>
                <Button 
                  size="icon" 
                  className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full"
                  onClick={handleAvatarClick}
                  disabled={uploading}
                >
                  {uploading ? (
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <Edit3 className="h-3.5 w-3.5" />
                  )}
                </Button>
              </div>
              <div>
                <h1 className="text-2xl font-bold mb-1">Michael Johnson</h1>
                <p className="text-muted-foreground mb-2">Senior Travel Consultant</p>
                <Badge variant="secondary" className="bg-primary/10 text-primary">Level 2 Explorer</Badge>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground mb-1">Member since</p>
              <p className="font-semibold">March 15, 2022</p>
              <Button variant="ghost" size="sm" className="mt-2 gap-2">
                <Eye className="h-4 w-4" />
                View Public Profile
              </Button>
            </div>
          </div>
        </Card>

        {/* Personal Information */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <User className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-xl font-bold">Personal Information</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <div className="relative">
                <Input id="fullName" defaultValue="Michael Johnson" />
                <Edit3 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="email" defaultValue="michael.johnson@magellanoneal.com" className="pl-10" />
                <Edit3 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="jobTitle">Job Title</Label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="jobTitle" defaultValue="Senior Travel Consultant" className="pl-10" />
                <Edit3 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="phone" defaultValue="+1 (555) 123-4567" className="pl-10" />
                <Edit3 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          </div>
        </Card>

        {/* Travel Preferences */}
        <Card className="p-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-secondary/10 flex items-center justify-center">
                <Plane className="h-5 w-5 text-secondary" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Travel Preferences</h2>
                <p className="text-sm text-muted-foreground">Select your preferred travel experiences to help us personalize recommendations.</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="gap-2 text-primary">
              <Edit3 className="h-4 w-4" />
              Edit
            </Button>
          </div>

          <div className="space-y-6">
            <div className="flex flex-wrap gap-2">
              {availablePreferences.map((pref) => (
                <Badge
                  key={pref}
                  variant={travelPreferences.includes(pref) ? 'default' : 'outline'}
                  className="cursor-pointer px-4 py-2 text-sm"
                  onClick={() => togglePreference(pref)}
                >
                  {pref}
                </Badge>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-6 pt-4 border-t">
              <div className="space-y-2">
                <Label>Preferred Climate</Label>
                <Input placeholder="Select climate preference" />
              </div>
              <div className="space-y-2">
                <Label>Accommodation Type</Label>
                <Input placeholder="Select accommodation type" />
              </div>
            </div>
          </div>
        </Card>

        {/* Contributions */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-xl bg-success/10 flex items-center justify-center">
              <DollarSign className="h-5 w-5 text-success" />
            </div>
            <h2 className="text-xl font-bold">Contributions</h2>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">Auto-Contribute</p>
                <p className="text-sm text-muted-foreground">Enabled</p>
              </div>
              <Switch checked={autoContribute} onCheckedChange={setAutoContribute} />
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <Label className="font-semibold">Contribution Percentage</Label>
                <span className="text-sm text-muted-foreground">Current contribution: {contributionPercentage}%</span>
              </div>
              <Slider 
                value={[contributionPercentage]} 
                onValueChange={(value) => setContributionPercentage(value[0])}
                max={10} 
                min={1}
                step={1} 
                className="mb-2"
              />
              <Button variant="link" className="px-0 text-primary" size="sm">
                Contribution History
              </Button>
            </div>

            <div className="bg-muted/30 rounded-lg p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total Contributions</span>
                <span className="font-semibold">$1,250</span>
              </div>
              <Button variant="link" className="px-0 text-primary h-auto p-0 text-sm">
                View Impact Report
              </Button>
            </div>
          </div>
        </Card>

        {/* Notification Preferences */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-xl bg-warning/10 flex items-center justify-center">
              <Bell className="h-5 w-5 text-warning" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Notification Preferences</h2>
              <p className="text-sm text-muted-foreground">Choose how you want to receive updates and notifications.</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">Email Notifications</p>
                <p className="text-sm text-muted-foreground">Receive updates to your email inbox</p>
              </div>
              <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">SMS Alerts</p>
                <p className="text-sm text-muted-foreground">Get text messages for important updates</p>
              </div>
              <Switch checked={smsAlerts} onCheckedChange={setSmsAlerts} />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">App Notifications</p>
                <p className="text-sm text-muted-foreground">Receive in-app notifications</p>
              </div>
              <Switch checked={appNotifications} onCheckedChange={setAppNotifications} />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">Travel Deals</p>
                <p className="text-sm text-muted-foreground">Receive updates about special offers</p>
              </div>
              <Switch checked={travelDeals} onCheckedChange={setTravelDeals} />
            </div>
          </div>
        </Card>

        {/* Privacy & Data */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-xl bg-destructive/10 flex items-center justify-center">
              <Shield className="h-5 w-5 text-destructive" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Privacy & Data</h2>
              <p className="text-sm text-muted-foreground">Manage your data and privacy settings.</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <Button variant="outline" className="gap-2 justify-start">
                <FileDown className="h-4 w-4" />
                Export My Data
              </Button>
              <Button variant="outline" className="gap-2 justify-start">
                <SettingsIcon className="h-4 w-4" />
                Privacy Settings
              </Button>
            </div>

            <div className="pt-4 border-t">
              <p className="font-semibold text-destructive mb-2">Danger Zone</p>
              <Button variant="destructive" className="gap-2">
                <Trash2 className="h-4 w-4" />
                Delete My Account
              </Button>
            </div>
          </div>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end gap-3">
          <Button variant="outline">Cancel</Button>
          <Button>Save Changes</Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
