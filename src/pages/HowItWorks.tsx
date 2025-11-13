import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, Target, BarChart3, Shield, Users, TrendingUp, ArrowRight } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

const HowItWorks = () => {
  const navigate = useNavigate();

  const scrollToDemo = () => {
    navigate('/#demo');
  };

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
              <Link to="/how-it-works" className="text-foreground text-sm font-medium">How It Works</Link>
              <Link to="/about-us" className="text-muted-foreground text-sm font-medium hover:text-foreground">About Us</Link>
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
              How MagellanOne Predicts the Right Moment
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              AI-powered detection, personalized care, measurable results.
            </p>
          </div>
        </div>
      </section>

      {/* Intelligence Stack Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-4">
              Our Intelligence Stack
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Three powerful engines working together to deliver consent-timed care.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="border-2 hover:border-primary/50 transition-colors">
              <CardContent className="pt-8 pb-8 text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <Brain className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Detection Engine</h3>
                <p className="text-muted-foreground leading-relaxed">
                  AI analyzes behavioral signals, HRIS events, and wellness data to predict burnout, disengagement, and life moments.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-accent/50 transition-colors">
              <CardContent className="pt-8 pb-8 text-center">
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
                  <Target className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Concierge Agent</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Matches individual preferences and company policy to curate personalized wellness experiences in real-time.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-success/50 transition-colors">
              <CardContent className="pt-8 pb-8 text-center">
                <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
                  <BarChart3 className="w-8 h-8 text-success" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Proof Dashboard</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Track retention lift, engagement scores, and ROI with transparent metrics that prove impact to leadership.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* What Makes It Different */}
      <section className="py-20 bg-gradient-to-br from-muted/30 to-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-4">
              What Makes It Different
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Built for modern HR teams who value privacy, empowerment, and measurable outcomes.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Shield className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Privacy-First</h3>
              <p className="text-muted-foreground">
                No invasive monitoring. Consent-based detection with transparent data handling and employee control.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-6">
                <Users className="w-10 h-10 text-accent" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Manager-Ready</h3>
              <p className="text-muted-foreground">
                Actionable insights for managers with suggested interventions that respect autonomy and timing.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-10 h-10 text-success" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Measurable ROI</h3>
              <p className="text-muted-foreground">
                Track retention improvements, engagement lift, and productivity gains with clear financial impact.
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
              See It in Action
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Experience how MagellanOne transforms workforce care with AI-powered precision.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                variant="secondary"
                onClick={scrollToDemo}
                className="gap-2"
              >
                Request Demo
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate("/contact-us")}
                className="bg-transparent border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                Talk to Sales
              </Button>
            </div>
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
                <li><Link to="/" className="text-sm text-muted-foreground hover:text-foreground">Pricing</Link></li>
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

export default HowItWorks;
