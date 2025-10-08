import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { 
  Search, 
  HelpCircle, 
  Mail, 
  MessageCircle, 
  FileText, 
  Shield, 
  BookOpen, 
  Video, 
  ExternalLink 
} from 'lucide-react';
import { useState } from 'react';

export default function Support() {
  const [searchQuery, setSearchQuery] = useState('');

  const faqs = [
    {
      question: 'How do I invite new employees?',
      answer: 'You can invite new employees by going to the Team section and clicking on "Invite Members". Enter their email addresses and they will receive an invitation link to join your organization.'
    },
    {
      question: 'Where can I view billing history?',
      answer: 'Your billing history can be accessed in Settings > Billing. Here you can view all past invoices, payment methods, and update your subscription plan.'
    },
    {
      question: 'How is ROI calculated?',
      answer: 'ROI is calculated based on employee engagement metrics, retention improvements, and wellness outcomes compared to your investment in the platform. Detailed analytics are available in the Reports section.'
    },
  ];

  const quickLinks = [
    { title: 'How MagellanOneAI Works', icon: BookOpen, color: 'text-purple-600' },
    { title: 'Privacy Policy', icon: Shield, color: 'text-blue-600' },
    { title: 'Terms & Conditions', icon: FileText, color: 'text-red-600' },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-3">Help & Support</h1>
          <p className="text-muted-foreground text-lg">Need assistance? We're here to help.</p>
        </div>

        {/* Search Bar */}
        <Card className="p-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search for answers..."
              className="pl-12 h-12 text-base"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </Card>

        {/* FAQ Section */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <HelpCircle className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left hover:no-underline">
                  <span className="font-semibold">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Card>

        {/* Still Need Help */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-xl bg-secondary/10 flex items-center justify-center">
              <MessageCircle className="h-5 w-5 text-secondary" />
            </div>
            <h2 className="text-2xl font-bold">Still need help?</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Email Support */}
            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">Email Support</h3>
                  <p className="text-muted-foreground mb-4">
                    Send us a message and we'll respond within 24 hours on business days.
                  </p>
                  <Button className="w-full">Contact Support</Button>
                </div>
              </div>
            </Card>

            {/* Live Chat */}
            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-xl bg-secondary/10 flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="h-6 w-6 text-secondary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">Live Chat</h3>
                  <p className="text-muted-foreground mb-2">
                    Chat with our support team in real-time for immediate assistance.
                  </p>
                  <div className="flex items-center gap-1.5 text-sm text-success mb-4">
                    <div className="h-2 w-2 rounded-full bg-success"></div>
                    <span>Live support: Mon-Fri, 9am–6pm</span>
                  </div>
                  <Button variant="outline" className="w-full">Start Chat</Button>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Quick Links */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-xl bg-accent/10 flex items-center justify-center">
              <ExternalLink className="h-5 w-5 text-accent" />
            </div>
            <h2 className="text-2xl font-bold">Quick Links</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {quickLinks.map((link, index) => (
              <Button
                key={index}
                variant="outline"
                className="h-auto py-4 justify-start"
              >
                <link.icon className={`h-5 w-5 mr-3 ${link.color}`} />
                <span className="font-semibold">{link.title}</span>
              </Button>
            ))}
          </div>
        </Card>

        {/* Additional Resources */}
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-xl bg-warning/10 flex items-center justify-center">
              <BookOpen className="h-5 w-5 text-warning" />
            </div>
            <h2 className="text-2xl font-bold">Additional Resources</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Video Tutorials */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Video className="h-5 w-5 text-primary" />
                <h3 className="font-bold">Video Tutorials</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Watch step-by-step guides on how to get the most out of MagellanOneAI.
              </p>
              <Button variant="link" className="px-0 text-primary">
                Watch now <ExternalLink className="h-3.5 w-3.5 ml-1" />
              </Button>
            </div>

            {/* Product Updates */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-secondary" />
                <h3 className="font-bold">Product Updates</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Stay up-to-date with the latest features and improvements.
              </p>
              <Button variant="link" className="px-0 text-primary">
                View changelog <ExternalLink className="h-3.5 w-3.5 ml-1" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
