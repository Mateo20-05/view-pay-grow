import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  UserPlus, 
  Search, 
  Video, 
  TrendingUp, 
  DollarSign,
  CheckCircle,
  ArrowRight
} from "lucide-react";

const creatorSteps = [
  {
    icon: UserPlus,
    title: "Sign Up & Connect",
    description: "Create your profile and link your social media accounts",
    detail: "Connect YouTube, TikTok, Instagram, Twitch, and more"
  },
  {
    icon: Search,
    title: "Browse Campaigns",
    description: "Find campaigns that match your niche and audience",
    detail: "Filter by budget, niche, timeline, and payment rates"
  },
  {
    icon: Video,
    title: "Create Content",
    description: "Produce engaging videos following campaign guidelines",
    detail: "Get approval before publishing and track performance"
  },
  {
    icon: DollarSign,
    title: "Earn Per View",
    description: "Get paid based on actual views and engagement",
    detail: "Real-time analytics and instant payouts"
  }
];

const brandSteps = [
  {
    icon: UserPlus,
    title: "Create A Campaign",
    description: "Set your budget, per-view rate, and campaign goals",
    detail: "Define target audience, niche, and content requirements"
  },
  {
    icon: Search,
    title: "Find Creators",
    description: "Browse creator proposals and portfolios",
    detail: "Review past work, audience demographics, and ratings"
  },
  {
    icon: CheckCircle,
    title: "Approve Content",
    description: "Review and approve creator submissions",
    detail: "Ensure brand alignment and quality standards"
  },
  {
    icon: TrendingUp,
    title: "Track Results",
    description: "Monitor views, engagement, and ROI in real-time",
    detail: "Detailed analytics and performance insights"
  }
];

export function HowItWorks() {
  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            How CrowdVid Works
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Simple Process,
            <span className="text-gradient"> Maximum Results</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Whether you're a creator looking to monetize your content or a brand seeking authentic promotion, 
            our platform makes it easy to connect and succeed.
          </p>
        </div>

        {/* For Creators */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold mb-4">For Creators</h3>
            <p className="text-muted-foreground">Turn your creativity into consistent income</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {creatorSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative">
                  <Card className="group hover-lift bg-card/50 backdrop-blur-sm border-border/50 h-full">
                    <CardContent className="p-6 text-center">
                      <div className="relative mb-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                          <Icon className="h-8 w-8 text-white" />
                        </div>
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </div>
                      </div>
                      <h4 className="text-lg font-bold mb-2">{step.title}</h4>
                      <p className="text-sm text-muted-foreground mb-3">{step.description}</p>
                      <p className="text-xs text-primary font-medium">{step.detail}</p>
                    </CardContent>
                  </Card>
                  
                  {/* Arrow for desktop */}
                  {index < creatorSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                      <ArrowRight className="h-6 w-6 text-primary" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* For Brands */}
        <div>
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold mb-4">For Brands</h3>
            <p className="text-muted-foreground">Pay only for results that matter</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {brandSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative">
                  <Card className="group hover-lift bg-card/50 backdrop-blur-sm border-border/50 h-full">
                    <CardContent className="p-6 text-center">
                      <div className="relative mb-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-accent to-primary rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                          <Icon className="h-8 w-8 text-white" />
                        </div>
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-accent text-white rounded-full flex items-center justify-center text-sm font-bold">
                          {index + 1}
                        </div>
                      </div>
                      <h4 className="text-lg font-bold mb-2">{step.title}</h4>
                      <p className="text-sm text-muted-foreground mb-3">{step.description}</p>
                      <p className="text-xs text-accent font-medium">{step.detail}</p>
                    </CardContent>
                  </Card>
                  
                  {/* Arrow for desktop */}
                  {index < brandSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                      <ArrowRight className="h-6 w-6 text-accent" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}