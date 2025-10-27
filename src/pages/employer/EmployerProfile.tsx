import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  User, 
  Mail, 
  Phone, 
  Briefcase, 
  Building2, 
  DollarSign, 
  Bell,
  Shield,
  Edit3,
  Eye,
  FileDown,
  Settings as SettingsIcon,
  Trash2,
  Users,
  Loader2
} from 'lucide-react';
import { useState, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useAvatarUpload } from '@/hooks/useAvatarUpload';

export default function EmployerProfile() {
  const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { uploadAvatar, uploading } = useAvatarUpload(user?.id || '');
  
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);
  const [appNotifications, setAppNotifications] = useState(true);
  const [teamAlerts, setTeamAlerts] = useState(true);

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
                  <AvatarImage src={avatarUrl || "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"} />
                  <AvatarFallback>SM</AvatarFallback>
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
                <h1 className="text-2xl font-bold mb-1">Sarah Mitchell</h1>
                <p className="text-muted-foreground mb-2">HR Director</p>
                <Badge variant="secondary" className="bg-primary/10 text-primary">Employer Account</Badge>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground mb-1">Member since</p>
              <p className="font-semibold">January 10, 2021</p>
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
                <Input id="fullName" defaultValue="Sarah Mitchell" />
                <Edit3 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="email" defaultValue="sarah.mitchell@magellanoneal.com" className="pl-10" />
                <Edit3 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="jobTitle">Job Title</Label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="jobTitle" defaultValue="HR Director" className="pl-10" />
                <Edit3 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="phone" defaultValue="+1 (555) 987-6543" className="pl-10" />
                <Edit3 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          </div>
        </Card>

        {/* Company Information */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-xl bg-secondary/10 flex items-center justify-center">
              <Building2 className="h-5 w-5 text-secondary" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Company Information</h2>
              <p className="text-sm text-muted-foreground">Details about your organization</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name</Label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="companyName" defaultValue="Magellan O'Neal Travel Corp." className="pl-10" />
                <Edit3 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="department" defaultValue="Human Resources" className="pl-10" />
                <Edit3 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
            </div>

            <div className="col-span-full">
              <div className="bg-muted/30 rounded-lg p-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total Employees</span>
                  <span className="font-semibold">156</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Active Users</span>
                  <span className="font-semibold">142</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Company Contribution Budget</span>
                  <span className="font-semibold">$45,000/year</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Company Contribution Settings */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-xl bg-success/10 flex items-center justify-center">
              <DollarSign className="h-5 w-5 text-success" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Company Matching Program</h2>
              <p className="text-sm text-muted-foreground">Configure your employee contribution matching policy</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="matchRate">Match Rate</Label>
                <div className="relative">
                  <Input id="matchRate" defaultValue="50%" />
                  <Edit3 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
                <p className="text-xs text-muted-foreground">Company matches 50% of employee contributions</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxMatch">Maximum Annual Match</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="maxMatch" defaultValue="$2,000" className="pl-10" />
                  <Edit3 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total Matched This Year</span>
                <span className="font-semibold">$28,450</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Remaining Budget</span>
                <span className="font-semibold text-success">$16,550</span>
              </div>
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
              <p className="text-sm text-muted-foreground">Choose how you want to receive updates and alerts</p>
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
                <p className="text-sm text-muted-foreground">Get text messages for urgent matters</p>
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
                <p className="font-semibold">Team Activity Alerts</p>
                <p className="text-sm text-muted-foreground">Get notified about team milestones and approvals</p>
              </div>
              <Switch checked={teamAlerts} onCheckedChange={setTeamAlerts} />
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
              <p className="text-sm text-muted-foreground">Manage your data and privacy settings</p>
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
