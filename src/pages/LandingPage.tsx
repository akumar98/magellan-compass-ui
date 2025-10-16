import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Brain, Milestone, Wallet, ArrowRight, CheckCircle2, Mail, Building2, User, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const LandingPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Request Received",
      description: "Our team will contact you within 24 hours.",
    });
    setFormData({ name: '', email: '', company: '', message: '' });
  };

  const handleDashboard = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-primary cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            Magellan One AI
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-4 items-center">
            <Button variant="ghost" onClick={() => scrollToSection('features')}>Features</Button>
            <Button variant="ghost" onClick={() => scrollToSection('how-it-works')}>How It Works</Button>
            <Button variant="ghost" onClick={() => scrollToSection('contact')}>Contact</Button>
            <Button onClick={handleDashboard}>
              {user ? 'Go to Dashboard' : 'Login'}
            </Button>
          </div>

          {/* Mobile Navigation */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <div className="flex flex-col gap-4 mt-8">
                <Button variant="ghost" onClick={() => scrollToSection('features')} className="justify-start text-lg">
                  Features
                </Button>
                <Button variant="ghost" onClick={() => scrollToSection('how-it-works')} className="justify-start text-lg">
                  How It Works
                </Button>
                <Button variant="ghost" onClick={() => scrollToSection('contact')} className="justify-start text-lg">
                  Contact
                </Button>
                <Button onClick={handleDashboard} className="justify-start text-lg">
                  {user ? 'Go to Dashboard' : 'Login'}
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 lg:py-32 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4"
            alt="Luxury travel destination"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/85 to-background/70" />
        </div>
        
        <div className="container mx-auto px-4 relative">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6 lg:space-y-8">
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-foreground leading-tight">
                Reward the Journey — Not Just the Job.
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground">
                Magellan One AI transforms employee milestones into personalized travel rewards.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" onClick={() => scrollToSection('contact')} className="text-base md:text-lg h-12 md:h-14 px-6 md:px-8">
                  Request a Demo <ArrowRight className="ml-2" />
                </Button>
                <Button size="lg" variant="outline" onClick={handleDashboard} className="text-base md:text-lg h-12 md:h-14 px-6 md:px-8">
                  Explore Platform
                </Button>
              </div>
            </div>
            <div className="relative h-[300px] md:h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl hidden lg:block">
              <img
                src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1"
                alt="AI-personalized travel experiences"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 md:py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Powerful Features</h2>
            <p className="text-lg md:text-xl text-muted-foreground">Everything you need to transform employee recognition</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <Card className="p-6 md:p-8 hover-lift">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 md:mb-6">
                <Brain className="w-7 h-7 md:w-8 md:h-8 text-primary" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">AI-Powered Personalization</h3>
              <p className="text-muted-foreground">
                Rewards matched to each employee's preferences.
              </p>
            </Card>
            <Card className="p-6 md:p-8 hover-lift">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 md:mb-6">
                <Milestone className="w-7 h-7 md:w-8 md:h-8 text-primary" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Milestone Recognition</h3>
              <p className="text-muted-foreground">
                Celebrate key achievements automatically.
              </p>
            </Card>
            <Card className="p-6 md:p-8 hover-lift sm:col-span-2 lg:col-span-1">
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 md:mb-6">
                <Wallet className="w-7 h-7 md:w-8 md:h-8 text-primary" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Co-Funding Wallet</h3>
              <p className="text-muted-foreground">
                Shared contributions between employers and employees for meaningful experiences.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">How It Works</h2>
            <p className="text-lg md:text-xl text-muted-foreground">Simple, seamless, and automated</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            {[
              { step: 1, title: 'Employee hits a milestone', description: 'System detects work anniversary, achievement, or wellness goal' },
              { step: 2, title: 'AI curates personalized travel offers', description: 'Recommendations matched to preferences and interests' },
              { step: 3, title: 'Manager reviews and approves', description: 'Quick approval through dashboard' },
              { step: 4, title: 'Wallet funds unlock and employee redeems', description: 'Funds released for immediate use' }
            ].map((item) => (
              <div key={item.step} className="text-center space-y-4">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl md:text-3xl font-bold mx-auto shadow-lg">
                  {item.step}
                </div>
                <h3 className="text-lg md:text-xl font-bold px-2">{item.title}</h3>
                <p className="text-sm md:text-base text-muted-foreground px-2">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Seamless Integrations</h2>
            <p className="text-lg md:text-xl text-muted-foreground">Seamlessly connects with your existing HR tools</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 items-center">
            {[
              { name: 'Workday', logo: '🔷' },
              { name: 'ADP', logo: '🔶' },
              { name: 'BambooHR', logo: '🎋' },
              { name: 'Slack', logo: '💬' }
            ].map((integration) => (
              <Card key={integration.name} className="p-6 md:p-8 text-center hover-lift">
                <div className="text-4xl md:text-5xl mb-3 md:mb-4">{integration.logo}</div>
                <div className="text-lg md:text-xl font-bold text-foreground">{integration.name}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">What Our Users Say</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                quote: "Magellan One AI turned my work anniversary into an unforgettable wellness retreat.",
                author: "Sarah",
                role: "LPL Financial",
                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
              },
              {
                quote: "We saw 15% higher engagement in the first 90 days.",
                author: "HR Director",
                role: "Honeywell",
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
              },
              {
                quote: "The AI recommendations are spot-on. It truly understands what motivates our employees.",
                author: "Emily Rodriguez",
                role: "People Operations",
                image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80"
              }
            ].map((testimonial, idx) => (
              <Card key={idx} className="p-6 md:p-8 hover-lift">
                <div className="flex items-center gap-3 md:gap-4 mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.author}
                    className="w-12 h-12 md:w-16 md:h-16 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-bold text-sm md:text-base">{testimonial.author}</div>
                    <div className="text-xs md:text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
                <p className="text-sm md:text-base text-muted-foreground italic">"{testimonial.quote}"</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6">
            Start your pilot with Magellan One AI today
          </h2>
          <p className="text-lg md:text-xl mb-6 md:mb-8 opacity-90">
            Transform how you recognize and reward your team
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" onClick={() => scrollToSection('contact')} className="text-base md:text-lg h-12 md:h-14">
              Request Demo
            </Button>
            <Button size="lg" variant="outline" onClick={() => scrollToSection('contact')} className="text-base md:text-lg h-12 md:h-14 bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              Talk to Sales
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-16 md:py-20">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Get in Touch</h2>
            <p className="text-base md:text-xl text-muted-foreground">Let's discuss how Magellan One AI can transform your workplace</p>
          </div>
          <Card className="p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <User className="w-4 h-4" /> Name
                </label>
                <Input
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your name"
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Mail className="w-4 h-4" /> Email
                </label>
                <Input
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your.email@company.com"
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Building2 className="w-4 h-4" /> Company
                </label>
                <Input
                  required
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="Your company name"
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Message</label>
                <Textarea
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about your needs..."
                  rows={5}
                  className="resize-none"
                />
              </div>
              <Button type="submit" size="lg" className="w-full h-12">
                Send Request <CheckCircle2 className="ml-2" />
              </Button>
            </form>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 md:py-12 border-t bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="text-xl md:text-2xl font-bold text-primary mb-4">Magellan One AI</div>
              <p className="text-sm md:text-base text-muted-foreground">Transforming employee recognition through personalized travel rewards.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-sm md:text-base">Product</h4>
              <div className="space-y-2 text-sm md:text-base text-muted-foreground">
                <div className="cursor-pointer hover:text-foreground transition-colors" onClick={() => scrollToSection('features')}>Features</div>
                <div className="cursor-pointer hover:text-foreground transition-colors" onClick={() => scrollToSection('how-it-works')}>How It Works</div>
                <div className="cursor-pointer hover:text-foreground transition-colors" onClick={handleDashboard}>Platform</div>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-sm md:text-base">Company</h4>
              <div className="space-y-2 text-sm md:text-base text-muted-foreground">
                <div className="cursor-pointer hover:text-foreground transition-colors">About</div>
                <div className="cursor-pointer hover:text-foreground transition-colors">Careers</div>
                <div className="cursor-pointer hover:text-foreground transition-colors" onClick={() => scrollToSection('contact')}>Contact</div>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-sm md:text-base">Legal</h4>
              <div className="space-y-2 text-sm md:text-base text-muted-foreground">
                <div className="cursor-pointer hover:text-foreground transition-colors">Privacy Policy</div>
                <div className="cursor-pointer hover:text-foreground transition-colors">Terms of Service</div>
              </div>
            </div>
          </div>
          <div className="border-t pt-6 md:pt-8 text-center text-sm md:text-base text-muted-foreground">
            <p>© 2025 Magellan One AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;