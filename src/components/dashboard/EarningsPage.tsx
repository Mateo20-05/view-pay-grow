import { EarningsSection } from "./EarningsSection";

export function EarningsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Earnings & Wallet</h1>
        <p className="text-muted-foreground">Manage your earnings, payouts, and transaction history</p>
      </div>
      <EarningsSection />
    </div>
  );
}