import { ProposalsSection } from "./ProposalsSection";

export function ProposalsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Proposals</h1>
        <p className="text-muted-foreground">Track your submitted proposals and their status</p>
      </div>
      <ProposalsSection />
    </div>
  );
}