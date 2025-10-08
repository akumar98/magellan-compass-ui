import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Copy, Facebook, Twitter, Linkedin, Gift, CheckCircle2, Users, Plane } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function ReferFriend() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const referralLink = 'https://magellanone.ai/join/alex4938';

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    toast.success('Referral link copied to clipboard!');
  };

  const milestones = [
    { count: 1, reward: '200 Wellness Points', reached: true },
    { count: 3, reward: '500 Wellness Points', reached: false },
    { count: 5, reward: '$50 Travel Credit', reached: false },
    { count: 10, reward: 'Exclusive Retreat Access', reached: false },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Hero Section */}
        <Card className="p-8 bg-gradient-to-br from-primary/10 via-background to-background border-primary/20">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold mb-3">Share the Journey. Get Rewarded.</h1>
            <p className="text-lg text-muted-foreground">
              Invite your friends or colleagues to join MagellanOneAI and unlock exclusive wellness rewards for each successful referral.
            </p>
          </div>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - 2/3 width */}
          <div className="lg:col-span-2 space-y-6">
            {/* Your Referral Link */}
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Your Referral Link</h2>
              <div className="flex gap-3 mb-4">
                <Input value={referralLink} readOnly className="font-mono text-sm" />
                <Button onClick={copyToClipboard} className="gap-2 whitespace-nowrap">
                  <Copy className="h-4 w-4" />
                  Copy Link
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Each person who signs up using your link helps you unlock milestone rewards.
              </p>

              {/* Social Share Buttons */}
              <div className="flex gap-3">
                <Button variant="outline" className="gap-2 flex-1">
                  <Facebook className="h-4 w-4" />
                  Share on Facebook
                </Button>
                <Button variant="outline" className="gap-2 flex-1">
                  <Twitter className="h-4 w-4" />
                  Share on Twitter
                </Button>
                <Button variant="outline" className="gap-2 flex-1">
                  <Linkedin className="h-4 w-4" />
                  Share on LinkedIn
                </Button>
              </div>
            </Card>

            {/* Invite by Email */}
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Invite by Email</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="emails" className="mb-2 block">Friend's Email</Label>
                  <Input
                    id="emails"
                    type="email"
                    placeholder="Enter email addresses separated by commas"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground mt-1">You can add multiple emails separated by commas</p>
                </div>

                <div>
                  <Label htmlFor="message" className="mb-2 block">Add a personal note (optional)</Label>
                  <Textarea
                    id="message"
                    placeholder="Hey! I've been using MagellanOneAI for my wellness and travel needs, and I thought you might like it too."
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>

                <div className="bg-success/10 border border-success/20 rounded-lg p-3 flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-success-foreground">
                    We'll include your referral link and information about MagellanOneAI in the email.
                  </p>
                </div>

                <Button className="w-auto">Send Invitation</Button>
              </div>
            </Card>
          </div>

          {/* Right Column - 1/3 width */}
          <div className="space-y-6">
            {/* Referral Progress */}
            <Card className="p-5">
              <h3 className="font-bold mb-4">Your Referral Progress</h3>
              <div className="mb-6">
                <p className="text-sm text-muted-foreground mb-2">
                  1 friend joined — 2 more until your bonus wellness box unlocks!
                </p>
                <Progress value={33} className="h-2" />
              </div>

              <div className="space-y-4">
                {milestones.map((milestone, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className={`h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      milestone.reached 
                        ? 'bg-success text-success-foreground' 
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {milestone.reached ? (
                        <CheckCircle2 className="h-5 w-5" />
                      ) : (
                        <span className="text-sm font-semibold">{milestone.count}</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-sm">{milestone.count} Friend{milestone.count > 1 ? 's' : ''}</p>
                      <p className="text-xs text-muted-foreground">{milestone.reward}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Rewards Earned */}
            <Card className="p-5 bg-success/5 border-success/20">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center">
                  <Gift className="h-5 w-5 text-success" />
                </div>
                <div>
                  <h3 className="font-semibold">Rewards Earned</h3>
                  <p className="text-2xl font-bold text-success">200 Wellness Points</p>
                </div>
              </div>
            </Card>

            {/* FAQ */}
            <Card className="p-5">
              <h3 className="font-semibold mb-4">Frequently Asked Questions</h3>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1" className="border-b-0">
                  <AccordionTrigger className="text-sm py-3">What rewards can I earn?</AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    Earn wellness points, travel credits, exclusive wellness boxes, and even access to exclusive retreats as you refer more friends.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2" className="border-b-0">
                  <AccordionTrigger className="text-sm py-3">When do referrals count?</AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    Referrals count when your friend creates an account and completes their profile setup. You'll receive notification when this happens.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3" className="border-b-0">
                  <AccordionTrigger className="text-sm py-3">Where do I see my earned rewards?</AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    All earned rewards appear in your Rewards Dashboard accessible from the main menu. Points are automatically added to your account.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
