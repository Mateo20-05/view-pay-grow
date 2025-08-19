import { CampaignsSection } from "./CampaignsSection";

export function CampaignsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Campaigns</h1>
        <p className="text-muted-foreground">Manage all your active and completed campaigns</p>
      </div>
      <CampaignsSection />
    </div>
  );
}