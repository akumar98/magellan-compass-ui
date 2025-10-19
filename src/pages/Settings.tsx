import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { User, Bell, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/ui/password-input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { PreferencesSection } from '@/components/settings/PreferencesSection';

export default function Settings() {
  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in max-w-4xl">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2">Settings</h1>
          <p className="text-muted-foreground">Manage your account preferences</p>
        </div>

        {/* Profile Settings */}
        <div className="card-stat">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <User className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Profile Information</h2>
              <p className="text-sm text-muted-foreground">Update your personal details</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" placeholder="John" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" placeholder="Doe" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="john@company.com" />
            </div>
            <Button>Save Changes</Button>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="card-stat">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-xl bg-secondary/10 flex items-center justify-center">
              <Bell className="h-5 w-5 text-secondary" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Notifications</h2>
              <p className="text-sm text-muted-foreground">Choose what you want to be notified about</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Email Notifications</p>
                <p className="text-sm text-muted-foreground">Receive notifications via email</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Travel Reward Updates</p>
                <p className="text-sm text-muted-foreground">Get notified about new destinations</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Point Achievements</p>
                <p className="text-sm text-muted-foreground">Notifications when you earn points</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </div>

        {/* Travel Preferences */}
        <PreferencesSection />

        {/* Security Settings */}
        <div className="card-stat">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-xl bg-accent/10 flex items-center justify-center">
              <Lock className="h-5 w-5 text-accent" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Security</h2>
              <p className="text-sm text-muted-foreground">Manage your password and security settings</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <PasswordInput id="currentPassword" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <PasswordInput id="newPassword" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <PasswordInput id="confirmPassword" />
            </div>
            <Button variant="outline">Update Password</Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
