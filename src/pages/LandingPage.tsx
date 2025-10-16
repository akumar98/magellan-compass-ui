import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Brain, Milestone, Wallet, ArrowRight, CheckCircle2, Mail, Building2, User } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const LandingPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
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
          <div className="text-2xl font-bold text-primary">Magellan One AI</div>
          <div className="flex gap-4 items-center">
            <Button variant="ghost" onClick={() => scrollToSection('features')}>Features</Button>
            <Button variant="ghost" onClick={() => scrollToSection('how-it-works')}>How It Works</Button>
            <Button variant="ghost" onClick={() => scrollToSection('contact')}>Contact</Button>
            <Button onClick={handleDashboard}>
              {user ? 'Go to Dashboard' : 'Login'}
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
        <div className="container mx-auto px-4 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                Reward the Journey — Not Just the Job.
              </h1>
              <p className="text-xl text-muted-foreground">
                Magellan One AI transforms employee milestones into personalized travel rewards.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" onClick={() => scrollToSection('contact')} className="text-lg">
                  Request a Demo <ArrowRight className="ml-2" />
                </Button>
                <Button size="lg" variant="outline" onClick={handleDashboard} className="text-lg">
                  Explore Platform
                </Button>
              </div>
            </div>
            <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1469474968028-56623f02e42e"
                alt="AI-personalized travel destination"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-4">Powerful Features</h2>
            <p className="text-xl text-muted-foreground">Everything you need to transform employee recognition</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 hover-lift">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <Brain className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">AI-Powered Personalization</h3>
              <p className="text-muted-foreground">
                Our AI analyzes employee preferences, wellness data, and behavioral patterns to recommend perfectly matched travel experiences.
              </p>
            </Card>
            <Card className="p-8 hover-lift">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <Milestone className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Milestone Recognition</h3>
              <p className="text-muted-foreground">
                Automatically celebrate work anniversaries, project completions, and achievements with meaningful rewards.
              </p>
            </Card>
            <Card className="p-8 hover-lift">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <Wallet className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Co-Funding Wallet</h3>
              <p className="text-muted-foreground">
                Shared employer-employee contributions create a collaborative approach to meaningful travel experiences.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground">Simple, seamless, and automated</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: 1, title: 'Employee Milestone', description: 'System detects work anniversary, achievement, or wellness goal' },
              { step: 2, title: 'AI Curation', description: 'Personalized travel offers matched to preferences and interests' },
              { step: 3, title: 'Manager Approval', description: 'Quick review and approval through dashboard' },
              { step: 4, title: 'Wallet Release', description: 'Funds are released for immediate redemption' }
            ].map((item) => (
              <div key={item.step} className="text-center space-y-4">
                <div className="w-20 h-20 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-3xl font-bold mx-auto">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-4">Seamless Integrations</h2>
            <p className="text-xl text-muted-foreground">Connects with your existing HR tools</p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-12">
            {['Workday', 'ADP', 'BambooHR', 'Slack'].map((integration) => (
              <div key={integration} className="text-2xl font-bold text-muted-foreground/60 hover:text-foreground transition-colors">
                {integration}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-4">What Our Users Say</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "Magellan One AI turned my work anniversary into an unforgettable wellness retreat.",
                author: "Sarah Johnson",
                role: "Senior Analyst, LPL Financial",
                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330"
              },
              {
                quote: "We saw 15% higher engagement in the first 90 days. Our team loves the personalized rewards.",
                author: "Michael Chen",
                role: "HR Director, Honeywell",
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
              },
              {
                quote: "The AI recommendations are spot-on. It truly understands what motivates our employees.",
                author: "Emily Rodriguez",
                role: "People Operations, Tech Startup",
                image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80"
              }
            ].map((testimonial, idx) => (
              <Card key={idx} className="p-8 hover-lift">
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.author}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-bold">{testimonial.author}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
                <p className="text-muted-foreground italic">"{testimonial.quote}"</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-5xl font-bold mb-6">
            Start your pilot with Magellan One AI today
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Transform how you recognize and reward your team
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" onClick={() => scrollToSection('contact')} className="text-lg">
              Request Demo
            </Button>
            <Button size="lg" variant="outline" onClick={() => scrollToSection('contact')} className="text-lg bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              Talk to Sales
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-20">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-5xl font-bold mb-4">Get in Touch</h2>
            <p className="text-xl text-muted-foreground">Let's discuss how Magellan One AI can transform your workplace</p>
          </div>
          <Card className="p-8">
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
                />
              </div>
              <Button type="submit" size="lg" className="w-full">
                Send Request <CheckCircle2 className="ml-2" />
              </Button>
            </form>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="text-2xl font-bold text-primary mb-4">Magellan One AI</div>
              <p className="text-muted-foreground">Transforming employee recognition through personalized travel rewards.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <div className="space-y-2 text-muted-foreground">
                <div className="cursor-pointer hover:text-foreground" onClick={() => scrollToSection('features')}>Features</div>
                <div className="cursor-pointer hover:text-foreground" onClick={() => scrollToSection('how-it-works')}>How It Works</div>
                <div className="cursor-pointer hover:text-foreground" onClick={handleDashboard}>Platform</div>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <div className="space-y-2 text-muted-foreground">
                <div className="cursor-pointer hover:text-foreground">About</div>
                <div className="cursor-pointer hover:text-foreground">Careers</div>
                <div className="cursor-pointer hover:text-foreground" onClick={() => scrollToSection('contact')}>Contact</div>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <div className="space-y-2 text-muted-foreground">
                <div className="cursor-pointer hover:text-foreground">Privacy Policy</div>
                <div className="cursor-pointer hover:text-foreground">Terms of Service</div>
              </div>
            </div>
          </div>
          <div className="border-t pt-8 text-center text-muted-foreground">
            <p>© 2025 Magellan One AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;