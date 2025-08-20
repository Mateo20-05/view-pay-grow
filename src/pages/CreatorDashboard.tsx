import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardOverview } from "@/components/dashboard/DashboardOverview";
import { CampaignsPage } from "@/components/dashboard/CampaignsPage";
import { MyVideosPage } from "@/components/dashboard/MyVideosPage";
import { EarningsPage } from "@/components/dashboard/EarningsPage";
import { AnalyticsPage } from "@/components/dashboard/AnalyticsPage";
import { PortfolioPage } from "@/components/dashboard/PortfolioPage";
import { MessagesPage } from "@/components/dashboard/MessagesPage";

type DashboardView = "overview" | "campaigns" | "videos" | "earnings" | "analytics" | "portfolio" | "messages";

const CreatorDashboard = () => {
  const location = useLocation();
  const [currentView, setCurrentView] = useState<DashboardView>("overview");

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const view = searchParams.get('view') as DashboardView;
    if (view && ["overview", "campaigns", "videos", "earnings", "analytics", "portfolio", "messages"].includes(view)) {
      setCurrentView(view);
    }
  }, [location.search]);

  const renderCurrentView = () => {
    switch (currentView) {
      case "campaigns":
        return <CampaignsPage />;
      case "videos":
        return <MyVideosPage />;
      case "earnings":
        return <EarningsPage />;
      case "analytics":
        return <AnalyticsPage />;
      case "portfolio":
        return <PortfolioPage />;
      case "messages":
        return <MessagesPage />;
      default:
        return <DashboardOverview onNavigate={(view) => setCurrentView(view as DashboardView)} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader currentView={currentView} onViewChange={(view) => setCurrentView(view as DashboardView)} />
      
      <main className="container mx-auto px-4 py-6">
        {renderCurrentView()}
      </main>
    </div>
  );
};

export default CreatorDashboard;