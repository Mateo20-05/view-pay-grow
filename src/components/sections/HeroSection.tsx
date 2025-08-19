import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, TrendingUp, DollarSign, Users, ArrowRight, Sparkles } from "lucide-react";
export function HeroSection() {
  return <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 gradient-hero opacity-90"></div>
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/30 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/25 rounded-full blur-3xl animate-float" style={{
        animationDelay: "2s"
      }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-200/40 rounded-full blur-3xl animate-float" style={{
        animationDelay: "4s"
      }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <Badge variant="secondary" className="mb-6 glass text-white border-white/20">
          <Sparkles className="h-4 w-4 mr-2" />
          Revolutionary Pay-Per-View Platform
        </Badge>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-8xl font-bold text-white mb-6 leading-tight">
          Launch campaigns.
          <br />
          <span className="bg-gradient-to-r from-yellow-200 via-pink-200 to-purple-300 bg-clip-text text-transparent font-extrabold" style={{
          textShadow: '0 0 30px rgba(255,255,255,0.5)'
        }}>
            Earn per view.
          </span>
          <br />
          Grow together.
        </h1>

        {/* Subheadline */}
        <p className="text-lg sm:text-xl lg:text-2xl text-blue-100 mb-8 max-w-4xl mx-auto leading-relaxed">
          The first marketplace where businesses pay for results, not promises. 
          Creators earn based on performance. Everyone wins.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <Button size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6 rounded-xl hover-lift font-semibold">
            <TrendingUp className="h-5 w-5 mr-2" />
            Start a Campaign
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
          <Button size="lg" variant="outline" className="glass border-white/30 text-white hover:bg-white/10 text-lg px-8 py-6 rounded-xl hover-lift font-semibold">
            <Play className="h-5 w-5 mr-2" />
            Explore Campaigns
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="glass rounded-2xl p-6 hover-lift">
            <div className="flex items-center justify-center mb-3">
              <div className="p-3 rounded-full bg-white/20">
                <DollarSign className="h-8 w-8 text-white" />
              </div>
            </div>
            <div className="text-3xl font-bold text-white mb-2">$2.4M+</div>
            <div className="text-blue-200">Total Payouts</div>
          </div>
          
          <div className="glass rounded-2xl p-6 hover-lift">
            <div className="flex items-center justify-center mb-3">
              <div className="p-3 rounded-full bg-white/20">
                <Users className="h-8 w-8 text-white" />
              </div>
            </div>
            <div className="text-3xl font-bold text-white mb-2">15K+</div>
            <div className="text-blue-200">Active Creators</div>
          </div>
          
          <div className="glass rounded-2xl p-6 hover-lift">
            <div className="flex items-center justify-center mb-3">
              <div className="p-3 rounded-full bg-white/20">
                <Play className="h-8 w-8 text-white" />
              </div>
            </div>
            <div className="text-3xl font-bold text-white mb-2">50M+</div>
            <div className="text-blue-200">Views Generated</div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        
      </div>
    </section>;
}