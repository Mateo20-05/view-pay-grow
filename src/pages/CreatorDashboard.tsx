import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { StatsOverview } from "@/components/dashboard/StatsOverview";
import { CampaignsSection } from "@/components/dashboard/CampaignsSection";
import { ProposalsSection } from "@/components/dashboard/ProposalsSection";
import { EarningsSection } from "@/components/dashboard/EarningsSection";
import { AnalyticsSection } from "@/components/dashboard/AnalyticsSection";
import { PortfolioSection } from "@/components/dashboard/PortfolioSection";
import { MessagesPanel } from "@/components/dashboard/MessagesPanel";

const CreatorDashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        <StatsOverview />
        <CampaignsSection />
        <ProposalsSection />
        <EarningsSection />
        <AnalyticsSection />
        <PortfolioSection />
      </main>
      
      <MessagesPanel />
    </div>
  );
};

export default CreatorDashboard;