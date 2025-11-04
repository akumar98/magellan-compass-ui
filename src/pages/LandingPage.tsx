import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Shield, TrendingUp, Heart, Twitter, Linkedin, Instagram, ArrowRight } from "lucide-react";
import { ProofStrip } from "@/components/landing/ProofStrip";
import heroBackground from "@/assets/hero-background.png";

const LandingPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  
  // Hero variant logic - supports ?variant=A or ?variant=B
  const variant = searchParams.get('variant')?.toUpperCase();
  
  const heroVariants = {
    DEFAULT: {
      headline: "Predict the moment. Personalize the lift. Prove the impact.",
      subheadline: "Consent-timed care that raises retention, engagement, and productivity."
    },
    A: {
      headline: "Care that arrives on time.",
      subheadline: "Predict who needs support, when, and how — with consent and precision."
    },
    B: {
      headline: "The Workforce Care Intelligence platform.",
      subheadline: "Turn well-timed support into measurable retention, engagement, and productivity."
    }
  };
  
  const currentHero = variant === 'A' ? heroVariants.A : 
                      variant === 'B' ? heroVariants.B : 
                      heroVariants.DEFAULT;

  const handleLogin = () => {
    navigate("/role-selection?mode=login");
  };

  const handleRegister = () => {
    navigate("/role-selection?mode=signup");
  };

  const handleTryDemo = () => {
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };

  const scrollToHowItWorks = () => {
    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToProof = () => {
    document.getElementById('proof-strip')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleBookCall = () => {
    // Placeholder for booking a discovery call
    console.log("Book a Discovery Call");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#0EA5E9] rounded-full flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <span className="text-xl font-bold text-gray-900">MagellanOneAI</span>
            </div>

            <div className="hidden md:flex items-center gap-8">
              <button className="text-gray-700 text-sm font-medium hover:text-gray-900">How It Works</button>
              <button className="text-gray-700 text-sm font-medium hover:text-gray-900">About US</button>
              <button className="text-gray-700 text-sm font-medium hover:text-gray-900">Contact Us</button>
            </div>

            <div className="flex items-center gap-3">
              <Button
                onClick={handleLogin}
                className="bg-[#0EA5E9] hover:bg-[#0284C7] text-white px-6 h-10 rounded-md text-sm font-medium"
              >
                Login
              </Button>
              <Button
                onClick={handleRegister}
                className="bg-[#0EA5E9] hover:bg-[#0284C7] text-white px-6 h-10 rounded-md text-sm font-medium"
              >
                Register
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative gradient-primary py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
            {/* Left: Text Content */}
            <div className="text-center lg:text-left">
              <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight animate-fade-in">
                {currentHero.headline}
              </h1>
              <p className="text-xl lg:text-2xl text-white/90 mb-8 leading-relaxed">
                {currentHero.subheadline}
              </p>
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                <Button
                  onClick={scrollToHowItWorks}
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90 px-8 h-12 text-base font-semibold rounded-lg shadow-lg"
                >
                  See how it works
                </Button>
                <Button
                  onClick={scrollToProof}
                  variant="outline"
                  size="lg"
                  className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 h-12 text-base font-semibold rounded-lg"
                >
                  Why employees trust it
                </Button>
              </div>
              
              {/* Trust Microcopy */}
              <p className="text-white/80 text-sm mt-6 max-w-md mx-auto lg:mx-0">
                We read patterns, not messages. You control your signals at any time.
              </p>
            </div>

            {/* Right: Abstract Illustration */}
            <div className="hidden lg:flex justify-center items-center">
              <div className="relative w-full max-w-md">
                <div className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-3xl" />
                <div className="relative p-8 space-y-6">
                  {/* Signal */}
                  <div className="flex items-center gap-4 animate-fade-in">
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                      <div className="w-6 h-6 rounded-full bg-white" />
                    </div>
                    <div className="flex-1">
                      <div className="h-3 bg-white/30 rounded-full w-3/4" />
                      <div className="h-2 bg-white/20 rounded-full w-1/2 mt-2" />
                    </div>
                  </div>
                  
                  {/* Arrow */}
                  <div className="flex justify-center">
                    <ArrowRight className="w-8 h-8 text-white/60" />
                  </div>
                  
                  {/* Support */}
                  <div className="flex items-center gap-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                      <Heart className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="h-3 bg-white/30 rounded-full w-2/3" />
                      <div className="h-2 bg-white/20 rounded-full w-1/2 mt-2" />
                    </div>
                  </div>
                  
                  {/* Arrow */}
                  <div className="flex justify-center">
                    <ArrowRight className="w-8 h-8 text-white/60" />
                  </div>
                  
                  {/* Smile */}
                  <div className="flex items-center gap-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                      <span className="text-2xl">😊</span>
                    </div>
                    <div className="flex-1">
                      <div className="h-3 bg-white/30 rounded-full w-4/5" />
                      <div className="h-2 bg-white/20 rounded-full w-3/5 mt-2" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* REP Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Retention */}
            <Card className="card-stat group cursor-pointer">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">Retention</h3>
              <p className="text-muted-foreground leading-relaxed">
                Fewer regretted exits. Catch risk early.
              </p>
            </Card>

            {/* Engagement */}
            <Card className="card-stat group cursor-pointer">
              <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                <Heart className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">Engagement</h3>
              <p className="text-muted-foreground leading-relaxed">
                eNPS lifts when care arrives on time.
              </p>
            </Card>

            {/* Productivity */}
            <Card className="card-stat group cursor-pointer">
              <div className="w-16 h-16 rounded-2xl bg-success/10 flex items-center justify-center mb-6 group-hover:bg-success/20 transition-colors">
                <TrendingUp className="w-8 h-8 text-success" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">Productivity</h3>
              <p className="text-muted-foreground leading-relaxed">
                Momentum returns when teams get support.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Three simple steps to transform workforce care
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {/* Step 1: Sense */}
            <div className="relative">
              <Card className="card-stat text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary text-primary-foreground text-2xl font-bold mb-6">
                  1
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Sense</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Read permissioned signals like milestones and PTO patterns.
                </p>
              </Card>
              {/* Arrow */}
              <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                <ArrowRight className="w-8 h-8 text-primary" />
              </div>
            </div>

            {/* Step 2: Support */}
            <div className="relative">
              <Card className="card-stat text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-accent text-accent-foreground text-2xl font-bold mb-6">
                  2
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Support</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Curate a wellness or travel reset, co-funded and manager-approved.
                </p>
              </Card>
              {/* Arrow */}
              <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                <ArrowRight className="w-8 h-8 text-accent" />
              </div>
            </div>

            {/* Step 3: Prove */}
            <div className="relative">
              <Card className="card-stat text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-success text-success-foreground text-2xl font-bold mb-6">
                  3
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">Prove</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Show impact with decision logs and ROI snapshots.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Proof Strip Section */}
      <ProofStrip />

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Real Teams. Real Results.</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              See how MagellanOneAI is transforming employee engagement and creating unforgettable experiences
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* John Smith Testimonial */}
            <Card className="bg-white p-8 rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4 mb-6">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop"
                  alt="John Smith"
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-bold text-gray-900">John Smith</h4>
                  <p className="text-sm text-gray-600">Senior Developer at TechCorp</p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed mb-6 italic">
                "After hitting my quarterly goals, MagellanOneAI suggested a hiking retreat in Colorado that matched my
                exact interests. It was the first time I felt truly seen and valued by my company."
              </p>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-[#0EA5E9] flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  Colorado Hiking Retreat
                </span>
                <span className="text-yellow-500 flex">★★★★★</span>
              </div>
            </Card>

            {/* Sarah Johnson Testimonial */}
            <Card className="bg-white p-8 rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4 mb-6">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop"
                  alt="Sarah Johnson"
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-bold text-gray-900">Sarah Johnson</h4>
                  <p className="text-sm text-gray-600">Marketing Manager at GrowthLabs</p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed mb-6 italic">
                "The coastal wellness retreat in Portugal that MagellanOneAI recommended was exactly what I needed after
                a successful product launch. It's amazing how well the AI understood my preferences and needs."
              </p>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-[#F59E0B] flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  Portugal Coastal Retreat
                </span>
                <span className="text-yellow-500 flex">★★★★★</span>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-[#0EA5E9]">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Loyalty Starts With Listening</h2>
          <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
            Give your team more than just perks — give them time, space, and energy to thrive.
          </p>
          <Button
            onClick={handleBookCall}
            className="bg-white text-[#0EA5E9] hover:bg-gray-100 px-8 h-12 text-base font-medium rounded-md"
          >
            Book a Discovery Call
          </Button>
          <p className="text-white/90 text-sm mt-4">No commitment required. See how it works for your team.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0F172A] text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-12 mb-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-[#0EA5E9] rounded-full flex items-center justify-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                  </svg>
                </div>
                <span className="text-xl font-bold">MagellanOneAI</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                Transforming employee rewards through AI-powered travel experiences.
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Product */}
            <div>
              <h4 className="font-bold mb-4 text-white">Product</h4>
              <div className="space-y-3">
                <a href="#" className="block text-gray-400 hover:text-white text-sm transition-colors">
                  Features
                </a>
                <a href="#" className="block text-gray-400 hover:text-white text-sm transition-colors">
                  How It Works
                </a>
              </div>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-bold mb-4 text-white">Company</h4>
              <div className="space-y-3">
                <a href="#" className="block text-gray-400 hover:text-white text-sm transition-colors">
                  About Us
                </a>
                <a href="#" className="block text-gray-400 hover:text-white text-sm transition-colors">
                  Contact
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">© 2025 MagellanOneAI. All rights reserved.</p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Data Policy
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Cookie Settings
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
