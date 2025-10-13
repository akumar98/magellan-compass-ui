import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Search, HelpCircle, Mail, MessageSquare, FileText, Video } from 'lucide-react';
import { useState } from 'react';

export default function Help() {
  const [searchTerm, setSearchTerm] = useState('');

  const faqs = [
    {
      category: 'Getting Started',
      questions: [
        {
          q: 'How do I earn points?',
          a: 'Points are automatically earned through various milestones such as work anniversaries, project completions, and exceptional performance. Your employer may also award points for specific achievements.'
        },
        {
          q: 'How do I redeem my points?',
          a: 'Navigate to the Rewards page to browse available travel experiences. When you find one you like, click "Redeem Now" and follow the approval process. Your employer will review and approve the redemption.'
        },
        {
          q: 'What happens if my redemption is denied?',
          a: 'If a redemption is denied, your points will be returned to your account. You can view the reason in your notifications and choose a different reward or save points for a larger experience.'
        }
      ]
    },
    {
      category: 'Rewards & Travel',
      questions: [
        {
          q: 'Can I customize my travel package?',
          a: 'Yes! Many rewards offer customization options. During the redemption process, you can add optional upgrades, adjust dates, and personalize your experience.'
        },
        {
          q: 'How long do I have to use my reward?',
          a: 'Once approved, most rewards are valid for 12 months. Specific expiration dates will be shown on your reward details and confirmation email.'
        },
        {
          q: 'Can I combine points with a colleague?',
          a: 'Currently, points are individual and cannot be combined. However, you can both redeem rewards for the same destination and travel together.'
        }
      ]
    },
    {
      category: 'Account & Settings',
      questions: [
        {
          q: 'How do I update my travel preferences?',
          a: 'Go to Settings > Preferences to update your travel interests, preferred destinations, and notification settings. This helps our AI provide better personalized recommendations.'
        },
        {
          q: 'Can I see my points history?',
          a: 'Yes, navigate to Contributions page to view your complete points earning and spending history, including all transactions and milestone achievements.'
        },
        {
          q: 'What is the Burnout Predictor?',
          a: 'The Burnout Predictor uses AI to analyze your work patterns and suggest preventive rewards when you might need a break. It\'s designed to help maintain your wellbeing.'
        }
      ]
    },
    {
      category: 'Employer Features',
      questions: [
        {
          q: 'How do I approve employee redemptions?',
          a: 'As an employer, go to the Approvals page to review pending redemption requests. You can approve, deny, or request modifications with comments.'
        },
        {
          q: 'How does the matching policy work?',
          a: 'Configure your matching percentage in Settings > Matching Policy. Your company contributes a percentage of the reward cost, and the employee covers the rest with their points.'
        },
        {
          q: 'Can I see burnout analytics for my team?',
          a: 'Yes, the Burnout Analytics page shows risk distribution across your team, helping you identify employees who might need support or preventive interventions.'
        }
      ]
    }
  ];

  const filteredFaqs = faqs.map(category => ({
    ...category,
    questions: category.questions.filter(q =>
      q.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.a.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-4">
            <HelpCircle className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Help Center</h1>
          <p className="text-muted-foreground">Find answers to common questions and get support</p>
        </div>

        {/* Search */}
        <Card className="max-w-2xl mx-auto">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search for help..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 text-lg"
              />
            </div>
          </CardContent>
        </Card>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
          <Card className="hover-lift cursor-pointer">
            <CardContent className="pt-6 text-center">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-1">Documentation</h3>
              <p className="text-sm text-muted-foreground">Read guides</p>
            </CardContent>
          </Card>

          <Card className="hover-lift cursor-pointer">
            <CardContent className="pt-6 text-center">
              <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center mx-auto mb-3">
                <Video className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="font-semibold mb-1">Video Tutorials</h3>
              <p className="text-sm text-muted-foreground">Watch & learn</p>
            </CardContent>
          </Card>

          <Card className="hover-lift cursor-pointer">
            <CardContent className="pt-6 text-center">
              <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center mx-auto mb-3">
                <MessageSquare className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-semibold mb-1">Live Chat</h3>
              <p className="text-sm text-muted-foreground">Chat with us</p>
            </CardContent>
          </Card>

          <Card className="hover-lift cursor-pointer">
            <CardContent className="pt-6 text-center">
              <div className="h-12 w-12 rounded-lg bg-warning/10 flex items-center justify-center mx-auto mb-3">
                <Mail className="h-6 w-6 text-warning" />
              </div>
              <h3 className="font-semibold mb-1">Email Support</h3>
              <p className="text-sm text-muted-foreground">Get help via email</p>
            </CardContent>
          </Card>
        </div>

        {/* FAQs */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          
          {filteredFaqs.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">No results found. Try a different search term.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {filteredFaqs.map((category, idx) => (
                <Card key={idx}>
                  <CardHeader>
                    <CardTitle>{category.category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      {category.questions.map((faq, qIdx) => (
                        <AccordionItem key={qIdx} value={`item-${idx}-${qIdx}`}>
                          <AccordionTrigger className="text-left">
                            {faq.q}
                          </AccordionTrigger>
                          <AccordionContent className="text-muted-foreground">
                            {faq.a}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Contact Support */}
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Still need help?</CardTitle>
            <CardDescription>Our support team is here to assist you</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button className="flex-1 gap-2">
                <MessageSquare className="h-4 w-4" />
                Start Live Chat
              </Button>
              <Button variant="outline" className="flex-1 gap-2">
                <Mail className="h-4 w-4" />
                Email Support
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
