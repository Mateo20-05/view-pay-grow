import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Gamepad2, 
  GraduationCap, 
  Dumbbell, 
  Laptop, 
  Coffee,
  TrendingUp,
  Eye,
  DollarSign,
  Clock
} from "lucide-react";

const campaignNiches = [
  {
    icon: Gamepad2,
    title: "Gaming",
    color: "bg-red-500",
    campaigns: 124,
    avgPayout: "$0.12",
    description: "Game reviews, walkthroughs, esports content"
  },
  {
    icon: GraduationCap,
    title: "Education",
    color: "bg-blue-500",
    campaigns: 89,
    avgPayout: "$0.18",
    description: "Tutorials, courses, educational content"
  },
  {
    icon: Dumbbell,
    title: "Fitness",
    color: "bg-green-500",
    campaigns: 67,
    avgPayout: "$0.15",
    description: "Workouts, nutrition, wellness tips"
  },
  {
    icon: Laptop,
    title: "Tech",
    color: "bg-purple-500",
    campaigns: 156,
    avgPayout: "$0.22",
    description: "Product reviews, tech news, tutorials"
  },
  {
    icon: Coffee,
    title: "Lifestyle",
    color: "bg-orange-500",
    campaigns: 98,
    avgPayout: "$0.14",
    description: "Daily vlogs, lifestyle tips, entertainment"
  }
];

const trendingCampaigns = [
  {
    title: "EcoTech Smart Home Review",
    company: "EcoTech Solutions",
    budget: "$5,000",
    perView: "$0.25",
    views: "12.4K",
    timeLeft: "5 days",
    niche: "Tech",
    featured: true
  },
  {
    title: "Fitness Challenge Series",
    company: "FitLife Pro",
    budget: "$3,200",
    perView: "$0.18",
    views: "8.7K",
    timeLeft: "12 days",
    niche: "Fitness",
    featured: false
  },
  {
    title: "Gaming Setup Tutorial",
    company: "GameZone",
    budget: "$2,800",
    perView: "$0.15",
    views: "15.2K",
    timeLeft: "8 days",
    niche: "Gaming",
    featured: false
  }
];

export function CampaignShowcase() {
  return (
    <section className="py-24 bg-card/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            <TrendingUp className="h-4 w-4 mr-2" />
            Campaign Categories
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Find Your Perfect
            <span className="text-gradient"> Campaign Niche</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Explore diverse campaign categories and start earning from content that matches your passion and expertise.
          </p>
        </div>

        {/* Niche Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-16">
          {campaignNiches.map((niche, index) => {
            const Icon = niche.icon;
            return (
              <Card key={index} className="group hover-lift cursor-pointer bg-card/50 backdrop-blur-sm border-border/50">
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 ${niche.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{niche.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{niche.description}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Campaigns:</span>
                      <span className="font-semibold">{niche.campaigns}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Pay-Per-View:</span>
                      <span className="font-semibold text-primary">{niche.avgPayout}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Trending Campaigns */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold">Trending Campaigns</h3>
            <Button variant="outline" className="hover-lift">
              View All Campaigns
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {trendingCampaigns.map((campaign, index) => (
              <Card key={index} className={`group hover-lift cursor-pointer bg-card/50 backdrop-blur-sm border-border/50 ${campaign.featured ? 'ring-2 ring-primary' : ''}`}>
                <CardContent className="p-6">
                  {campaign.featured && (
                    <Badge className="mb-4 gradient-primary">
                      Featured Campaign
                    </Badge>
                  )}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="text-lg font-bold mb-1">{campaign.title}</h4>
                      <p className="text-sm text-muted-foreground">{campaign.company}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {campaign.niche}
                    </Badge>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <DollarSign className="h-4 w-4 text-primary" />
                        <span className="text-sm text-muted-foreground">Budget</span>
                      </div>
                      <span className="font-semibold">{campaign.budget}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Eye className="h-4 w-4 text-primary" />
                        <span className="text-sm text-muted-foreground">Per view</span>
                      </div>
                      <span className="font-semibold text-primary">{campaign.perView}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <TrendingUp className="h-4 w-4 text-primary" />
                        <span className="text-sm text-muted-foreground">Views</span>
                      </div>
                      <span className="font-semibold">{campaign.views}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-primary" />
                        <span className="text-sm text-muted-foreground">Time left</span>
                      </div>
                      <span className="font-semibold">{campaign.timeLeft}</span>
                    </div>
                  </div>

                  <Button className="w-full gradient-primary group-hover:opacity-90">
                    Apply to Campaign
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Marquee */}
        <div className="overflow-hidden bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 rounded-2xl py-4">
          <div className="flex animate-marquee whitespace-nowrap">
            <span className="text-lg font-semibold mx-8">🎯 Tech Campaign: $0.25/view</span>
            <span className="text-lg font-semibold mx-8">🎮 Gaming Challenge: $0.18/view</span>
            <span className="text-lg font-semibold mx-8">💪 Fitness Series: $0.22/view</span>
            <span className="text-lg font-semibold mx-8">📚 Education Content: $0.20/view</span>
            <span className="text-lg font-semibold mx-8">☕ Lifestyle Vlogs: $0.15/view</span>
            <span className="text-lg font-semibold mx-8">🎯 Tech Campaign: $0.25/view</span>
            <span className="text-lg font-semibold mx-8">🎮 Gaming Challenge: $0.18/view</span>
            <span className="text-lg font-semibold mx-8">💪 Fitness Series: $0.22/view</span>
          </div>
        </div>
      </div>
    </section>
  );
}