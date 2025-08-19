import { useState } from "react";
import { Navigation } from "@/components/layout/Navigation";
import { CampaignFilters } from "@/components/campaigns/CampaignFilters";
import { CampaignGrid } from "@/components/campaigns/CampaignGrid";
import { CampaignDetailModal } from "@/components/campaigns/CampaignDetailModal";

export interface Campaign {
  id: string;
  title: string;
  brandName: string;
  brandLogo: string;
  thumbnail: string;
  description: string;
  payoutPer1k: number;
  maxPayout: number;
  deadline: string;
  budgetProgress: number;
  niche: string;
  platform: string[];
  minFollowers: number;
  requirements: string[];
  dos: string[];
  donts: string[];
  startDate: string;
  slotsRemaining?: number;
}

const ExploreCampaigns = () => {
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [filters, setFilters] = useState({
    niche: "all",
    payoutRange: [0, 100],
    deadline: "any",
    budgetProgress: "any",
    platform: "all",
    minFollowers: 0,
    verifiedOnly: false,
  });
  const [sortBy, setSortBy] = useState("trending");

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight">Explore Campaigns</h1>
          <p className="text-muted-foreground text-lg mt-2">
            Discover campaigns that match your audience and start earning
          </p>
        </div>
        
        <div className="flex gap-8">
          <div className="w-80 shrink-0">
            <CampaignFilters 
              filters={filters} 
              onFiltersChange={setFilters}
              sortBy={sortBy}
              onSortChange={setSortBy}
            />
          </div>
          
          <div className="flex-1">
            <CampaignGrid 
              filters={filters}
              sortBy={sortBy}
              onCampaignClick={setSelectedCampaign}
            />
          </div>
        </div>
      </div>

      {selectedCampaign && (
        <CampaignDetailModal
          campaign={selectedCampaign}
          onClose={() => setSelectedCampaign(null)}
        />
      )}
    </div>
  );
};

export default ExploreCampaigns;