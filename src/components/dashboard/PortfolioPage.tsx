import { PortfolioSection } from "./PortfolioSection";

export function PortfolioPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Portfolio & Profile</h1>
        <p className="text-muted-foreground">Showcase your work and manage your creator profile</p>
      </div>
      <PortfolioSection />
    </div>
  );
}