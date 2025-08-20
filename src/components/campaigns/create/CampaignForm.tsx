import { useFormContext } from "react-hook-form";
import { CampaignFormData } from "@/lib/schemas/campaign-schema";
import { BasicsStep } from "./steps/BasicsStep";
import { PayoutBudgetStep } from "./steps/PayoutBudgetStep";
import { RequirementsStep } from "./steps/RequirementsStep";
import { DosDontsStep } from "./steps/DosDontsStep";
import { AssetsBrandingStep } from "./steps/AssetsBrandingStep";
import { TargetingStep } from "./steps/TargetingStep";
import { ReviewPublishStep } from "./steps/ReviewPublishStep";

interface CampaignFormProps {
  currentStep: number;
  onAutoSave: () => void;
}

export function CampaignForm({ currentStep, onAutoSave }: CampaignFormProps) {
  const form = useFormContext<CampaignFormData>();

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <BasicsStep onAutoSave={onAutoSave} />;
      case 2:
        return <PayoutBudgetStep onAutoSave={onAutoSave} />;
      case 3:
        return <RequirementsStep onAutoSave={onAutoSave} />;
      case 4:
        return <DosDontsStep onAutoSave={onAutoSave} />;
      case 5:
        return <AssetsBrandingStep onAutoSave={onAutoSave} />;
      case 6:
        return <TargetingStep onAutoSave={onAutoSave} />;
      case 7:
        return <ReviewPublishStep />;
      default:
        return <BasicsStep onAutoSave={onAutoSave} />;
    }
  };

  return (
    <div className="space-y-8">
      {renderStep()}
    </div>
  );
}