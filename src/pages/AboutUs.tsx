import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, Target, Users, TrendingUp, ArrowRight } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

const AboutUs = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="bg-card border-b border-border sticky top-0 z-50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <span className="text-xl font-bold text-foreground">MagellanOneAI</span>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              <Link to="/how-it-works" className="text-muted-foreground text-sm font-medium hover:text-foreground">How It Works</Link>
              <Link to="/about-us" className="text-foreground text-sm font-medium">About Us</Link>
              <Link to="/contact-us" className="text-muted-foreground text-sm font-medium hover:text-foreground">Contact</Link>
            </div>

            <div className="flex items-center gap-3">
              <Button
                onClick={() => navigate("/role-selection?mode=login")}
                variant="outline"
              >
                Login
              </Button>
              <Button onClick={() => navigate("/role-selection?mode=signup")}>
                Register
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-accent/5 to-background py-20 lg:py-32">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
              We're building Workforce Care Intelligence.
            </h1>
            <p className="text-xl text-muted-foreground">
              Helping employers care for teams with data-driven empathy.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 max-w-6xl mx-auto">
            <div>
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-3xl font-bold text-foreground mb-4">Our Mission</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                We believe every employee deserves support at the right moment—not too early, not too late. 
                MagellanOne uses AI to detect when people need care, match them to the right experience, 
                and prove the impact on retention and engagement.
              </p>
            </div>

            <div>
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-6">
                <Heart className="w-8 h-8 text-accent" />
              </div>
              <h2 className="text-3xl font-bold text-foreground mb-4">Our Vision</h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                A future where workforce care is predictive, personalized, and privacy-first. 
                Where employers can provide meaningful support without surveillance, and where 
                every intervention is backed by data and delivered with dignity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-20 bg-gradient-to-br from-muted/30 to-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-4">
              Meet Our Leadership
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A team of HR tech veterans, AI researchers, and workforce wellbeing advocates.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card>
              <CardContent className="pt-8 pb-8 text-center">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" />
                  <AvatarFallback>SC</AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-bold text-foreground mb-1">Sarah Chen</h3>
                <p className="text-sm text-primary mb-3">Co-Founder & CEO</p>
                <p className="text-sm text-muted-foreground">
                  Former VP of People at Fortune 500, passionate about using technology 
                  to create healthier workplaces.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-8 pb-8 text-center">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus" />
                  <AvatarFallback>MJ</AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-bold text-foreground mb-1">Marcus Johnson</h3>
                <p className="text-sm text-accent mb-3">Co-Founder & CTO</p>
                <p className="text-sm text-muted-foreground">
                  AI researcher with 15 years building predictive systems. Previously led 
                  ML teams at leading tech companies.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-8 pb-8 text-center">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Elena" />
                  <AvatarFallback>ER</AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-bold text-foreground mb-1">Elena Rodriguez</h3>
                <p className="text-sm text-success mb-3">Chief Product Officer</p>
                <p className="text-sm text-muted-foreground">
                  Product leader focused on human-centered AI. Expert in building 
                  privacy-first workplace technologies.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-4">
              What Drives Us
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-8">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Privacy & Consent</h3>
              <p className="text-muted-foreground">
                We believe employees should control their data and consent to how it's used.
              </p>
            </div>

            <div className="text-center p-8">
              <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
                <Heart className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Empathetic AI</h3>
              <p className="text-muted-foreground">
                Technology should enhance human connection, not replace it.
              </p>
            </div>

            <div className="text-center p-8">
              <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-8 h-8 text-success" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Measurable Impact</h3>
              <p className="text-muted-foreground">
                Every feature we build must prove its value to employees and employers.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">
              Talk to Our Team
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Learn how MagellanOne can transform workforce care at your organization.
            </p>
            <Button
              size="lg"
              variant="secondary"
              onClick={() => navigate("/contact-us")}
              className="gap-2"
            >
              Get in Touch
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                </div>
                <span className="text-lg font-bold text-foreground">MagellanOneAI</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Workforce Care Intelligence platform
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-3">Product</h4>
              <ul className="space-y-2">
                <li><Link to="/how-it-works" className="text-sm text-muted-foreground hover:text-foreground">How It Works</Link></li>
                <li><Link to="/" className="text-sm text-muted-foreground hover:text-foreground">Features</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-3">Company</h4>
              <ul className="space-y-2">
                <li><Link to="/about-us" className="text-sm text-muted-foreground hover:text-foreground">About Us</Link></li>
                <li><Link to="/contact-us" className="text-sm text-muted-foreground hover:text-foreground">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-3">Legal</h4>
              <ul className="space-y-2">
                <li><Link to="/" className="text-sm text-muted-foreground hover:text-foreground">Privacy</Link></li>
                <li><Link to="/" className="text-sm text-muted-foreground hover:text-foreground">Terms</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border pt-8">
            <p className="text-center text-sm text-muted-foreground">
              © 2024 MagellanOneAI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutUs;
