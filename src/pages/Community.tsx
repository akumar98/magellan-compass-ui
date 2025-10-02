import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { MessageSquare, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function Community() {
  const faqs = [
    {
      question: 'How do I earn points?',
      answer: 'You earn points through various activities like completing projects, reaching milestones, participating in company events, and receiving recognition from peers and managers.',
    },
    {
      question: 'How long does it take to process reward requests?',
      answer: 'Most reward requests are processed within 24-48 hours. You will receive a notification once your request is approved or if any additional information is needed.',
    },
    {
      question: 'Can I save my points for later?',
      answer: 'Yes! Your points never expire. You can accumulate them and redeem them whenever you want for any available rewards in the catalog.',
    },
    {
      question: 'What happens if a reward is out of stock?',
      answer: 'If a reward is out of stock, you can add it to your wishlist. You will be notified when it becomes available again.',
    },
    {
      question: 'How do I track my point history?',
      answer: 'You can view your complete point history in the "My Activity" section of your dashboard. This includes all points earned and redeemed.',
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2">Community & FAQ</h1>
          <p className="text-muted-foreground">Find answers to common questions or ask us anything</p>
        </div>

        {/* FAQ Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <MessageSquare className="h-6 w-6 text-primary" />
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="card-stat border-none">
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Ask Question Form */}
        <div className="card-stat">
          <h2 className="text-2xl font-bold mb-4">Have a Question?</h2>
          <p className="text-muted-foreground mb-6">
            Can't find what you're looking for? Send us your question and we'll get back to you soon.
          </p>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Your Name</Label>
                <Input id="name" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="john@company.com" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" placeholder="What's your question about?" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea 
                id="message" 
                placeholder="Tell us more about your question..." 
                rows={6}
              />
            </div>
            <Button type="submit">Submit Question</Button>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}
