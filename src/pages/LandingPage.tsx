import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Brain, TrendingUp, Heart, Twitter, Linkedin, Instagram } from "lucide-react";
import heroBackground from "@/assets/hero-background.png";

const LandingPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

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
    // Placeholder - would scroll to how it works section if it existed
    console.log("Scroll to How It Works");
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
      <section className="relative bg-gradient-to-r from-[#0369A1] via-[#06B6D4] to-[#F59E0B] py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: "url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80)",
              mixBlendMode: "multiply",
            }}
          />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Transform Work Milestones
              <br />
              into Life-Changing Journeys
            </h1>
            <p className="text-xl text-white mb-8">Turn employee well-being into unforgettable journeys</p>
            <div className="flex justify-center gap-4">
              <Button
                onClick={handleTryDemo}
                className="bg-white text-[#0EA5E9] hover:bg-gray-100 px-8 h-12 text-base font-medium rounded-md"
              >
                Try Demo
              </Button>
              <Button
                onClick={scrollToHowItWorks}
                variant="outline"
                className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 h-12 text-base font-medium rounded-md"
              >
                How It Works
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Personalized Rewards That Actually Matter</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our AI-powered platform creates personalized travel experiences that boost engagement and retention
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* AI Personalization */}
            <Card className="bg-white p-8 rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <Brain className="w-7 h-7 text-[#0EA5E9]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">AI Personalization</h3>
              <p className="text-gray-600 leading-relaxed">
                Tailored travel recommendations based on employee preferences and milestones.
              </p>
            </Card>

            {/* Wellness Goals */}
            <Card className="bg-white p-8 rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center mb-6">
                <Heart className="w-7 h-7 text-[#F59E0B]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Wellness Goals</h3>
              <p className="text-gray-600 leading-relaxed">
                Link performance with wellness-focused travel that energizes and inspires.
              </p>
            </Card>

            {/* Real ROI */}
            <Card className="bg-white p-8 rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                <TrendingUp className="w-7 h-7 text-[#10B981]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Real ROI</h3>
              <p className="text-gray-600 leading-relaxed">
                See measurable impact through improved engagement, retention, and well-being.
              </p>
            </Card>
          </div>
        </div>
      </section>

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
