import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Campaign } from "@/pages/ExploreCampaigns";
import { Clock, DollarSign, Users } from "lucide-react";

// Mock data for campaigns
const mockCampaigns: Campaign[] = [
  {
    id: "1",
    title: "Gaming Keyboard Review",
    brandName: "TechGear Pro",
    brandLogo: "/placeholder.svg",
    thumbnail: "/placeholder.svg",
    description: "Review our latest mechanical gaming keyboard and showcase its features to your gaming audience. Must include unboxing and gameplay footage.",
    payoutPer1k: 8,
    maxPayout: 500,
    deadline: "2024-01-15",
    budgetProgress: 35,
    niche: "gaming",
    platform: ["youtube", "twitch"],
    minFollowers: 10000,
    requirements: ["Gaming niche", "10k+ subscribers", "YouTube or Twitch"],
    dos: ["Include product link in description", "Show unboxing", "Test in actual gameplay"],
    donts: ["Don't compare to competitors", "Don't modify product"],
    startDate: "2024-01-01",
    slotsRemaining: 8
  },
  {
    id: "2",
    title: "Fitness App Promotion",
    brandName: "FitLife",
    brandLogo: "/placeholder.svg",
    thumbnail: "/placeholder.svg",
    description: "Promote our new fitness tracking app by demonstrating workout routines and tracking features.",
    payoutPer1k: 12,
    maxPayout: 800,
    deadline: "2024-01-20",
    budgetProgress: 65,
    niche: "fitness",
    platform: ["youtube", "instagram", "tiktok"],
    minFollowers: 5000,
    requirements: ["Fitness niche", "5k+ followers", "Any platform"],
    dos: ["Show app interface", "Include workout footage", "Mention discount code"],
    donts: ["Don't promote other fitness apps", "Don't use offensive language"],
    startDate: "2024-01-05",
    slotsRemaining: 3
  },
  {
    id: "3",
    title: "Beauty Product Haul",
    brandName: "GlowUp Cosmetics",
    brandLogo: "/placeholder.svg",
    thumbnail: "/placeholder.svg",
    description: "Create a beauty haul video featuring our new skincare line and demonstrate the application process.",
    payoutPer1k: 15,
    maxPayout: 1200,
    deadline: "2024-01-25",
    budgetProgress: 20,
    niche: "beauty",
    platform: ["youtube", "instagram"],
    minFollowers: 15000,
    requirements: ["Beauty niche", "15k+ followers", "YouTube or Instagram"],
    dos: ["Show before/after", "Explain benefits", "Include swatches"],
    donts: ["Don't use competitor products", "Don't skip skin prep"],
    startDate: "2024-01-10",
    slotsRemaining: 12
  }
];

interface CampaignGridProps {
  filters: any;
  sortBy: string;
  onCampaignClick: (campaign: Campaign) => void;
}

export function CampaignGrid({ filters, sortBy, onCampaignClick }: CampaignGridProps) {
  // In a real app, this would filter and sort the campaigns based on the filters and sortBy
  const filteredCampaigns = mockCampaigns;

  const getDaysLeft = (deadline: string) => {
    const now = new Date();
    const end = new Date(deadline);
    const diffTime = end.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  };

  const getBudgetProgressColor = (progress: number) => {
    if (progress < 25) return "text-emerald-600";
    if (progress < 75) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground">
          {filteredCampaigns.length} campaigns found
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredCampaigns.map((campaign) => (
          <Card key={campaign.id} className="group cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
            <CardContent className="p-6">
              {/* Campaign Header */}
              <div className="flex items-start gap-3 mb-4">
                <img 
                  src={campaign.brandLogo} 
                  alt={campaign.brandName}
                  className="w-12 h-12 rounded-lg object-cover bg-muted"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-lg leading-tight mb-1 group-hover:text-primary transition-colors">
                    {campaign.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{campaign.brandName}</p>
                </div>
              </div>

              {/* Campaign Thumbnail */}
              <div className="relative mb-4 rounded-lg overflow-hidden bg-muted h-40">
                <img 
                  src={campaign.thumbnail} 
                  alt={campaign.title}
                  className="w-full h-full object-cover"
                />
                <Badge className="absolute top-2 right-2 bg-background/90 text-foreground hover:bg-background/90">
                  {campaign.niche}
                </Badge>
              </div>

              {/* Budget Progress */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Budget Progress</span>
                  <span className={`text-sm font-medium ${getBudgetProgressColor(campaign.budgetProgress)}`}>
                    {campaign.budgetProgress}%
                  </span>
                </div>
                <Progress value={campaign.budgetProgress} className="h-2" />
              </div>

              {/* Deadline */}
              <div className="flex items-center gap-2 mb-4 text-sm">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="text-muted-foreground">
                  {getDaysLeft(campaign.deadline)} days left
                </span>
              </div>

              {/* Quick Stats */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <DollarSign className="w-4 h-4 text-emerald-600" />
                  <span className="font-medium">${campaign.payoutPer1k}/1k views</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <DollarSign className="w-4 h-4 text-emerald-600" />
                  <span>Max: ${campaign.maxPayout}</span>
                </div>
                {campaign.slotsRemaining && (
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span>{campaign.slotsRemaining} slots remaining</span>
                  </div>
                )}
              </div>

              {/* Description */}
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {campaign.description}
              </p>

              {/* Platform Badges */}
              <div className="flex gap-2 mb-4">
                {campaign.platform.map((platform) => (
                  <Badge key={platform} variant="secondary" className="text-xs">
                    {platform}
                  </Badge>
                ))}
              </div>

              {/* CTA Button */}
              <Button 
                onClick={() => onCampaignClick(campaign)}
                className="w-full"
              >
                View Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}