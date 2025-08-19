import { BillingSection } from "./BillingSection";

export function BrandBillingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Billing & Payments</h1>
        <p className="text-muted-foreground">Manage your billing, payment methods, and transaction history</p>
      </div>
      <BillingSection />
    </div>
  );
}