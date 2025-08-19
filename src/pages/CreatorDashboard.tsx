import React from "react";
import { Navigation } from "@/components/layout/Navigation";
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
      <Navigation />
      
      <main className="pt-16">
        <div className="container mx-auto px-4 py-8 space-y-8">
          <DashboardHeader />
          
          <StatsOverview />
          
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <CampaignsSection />
              <ProposalsSection />
              <AnalyticsSection />
            </div>
            
            <div className="space-y-8">
              <EarningsSection />
              <PortfolioSection />
            </div>
          </div>
        </div>
      </main>
      
      <MessagesPanel />
    </div>
  );
};

export default CreatorDashboard;