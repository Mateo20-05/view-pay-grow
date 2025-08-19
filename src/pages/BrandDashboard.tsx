import { useState } from "react";
import { BrandDashboardHeader } from "@/components/dashboard/BrandDashboardHeader";
import { BrandDashboardOverview } from "@/components/dashboard/BrandDashboardOverview";
import { BrandCampaignsPage } from "@/components/dashboard/BrandCampaignsPage";
import { ProposalsInboxPage } from "@/components/dashboard/ProposalsInboxPage";
import { FindCreatorsPage } from "@/components/dashboard/FindCreatorsPage";
import { BrandAnalyticsPage } from "@/components/dashboard/BrandAnalyticsPage";
import { BrandBillingPage } from "@/components/dashboard/BrandBillingPage";
import { BrandMessagesPage } from "@/components/dashboard/BrandMessagesPage";
import { BrandSettingsPage } from "@/components/dashboard/BrandSettingsPage";

export default function BrandDashboard() {
  const [currentView, setCurrentView] = useState("overview");

  const renderCurrentView = () => {
    switch (currentView) {
      case "overview":
        return <BrandDashboardOverview />;
      case "campaigns":
        return <BrandCampaignsPage />;
      case "proposals":
        return <ProposalsInboxPage />;
      case "find-creators":
        return <FindCreatorsPage />;
      case "analytics":
        return <BrandAnalyticsPage />;
      case "billing":
        return <BrandBillingPage />;
      case "messages":
        return <BrandMessagesPage />;
      case "settings":
        return <BrandSettingsPage />;
      default:
        return <BrandDashboardOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <BrandDashboardHeader currentView={currentView} onViewChange={setCurrentView} />
      <main className="container mx-auto p-6 pt-24">
        {renderCurrentView()}
      </main>
    </div>
  );
}