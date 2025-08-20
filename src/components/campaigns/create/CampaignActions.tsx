import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Save, Rocket } from "lucide-react";
import { motion } from "framer-motion";

interface CampaignActionsProps {
  currentStep: number;
  totalSteps: number;
  canProceed: boolean;
  onPrevious: () => void;
  onNext: () => void;
  onPublish: () => void;
  onSaveDraft: () => void;
  isLastStep: boolean;
}

export function CampaignActions({
  currentStep,
  totalSteps,
  canProceed,
  onPrevious,
  onNext,
  onPublish,
  onSaveDraft,
  isLastStep
}: CampaignActionsProps) {
  return (
    <motion.div 
      className="sticky bottom-0 bg-background border-t pt-6 mt-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex items-center justify-between gap-4">
        {/* Left side */}
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={onPrevious}
            disabled={currentStep === 1}
            className="gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </Button>
          
          <Button
            variant="ghost"
            onClick={onSaveDraft}
            className="gap-2"
          >
            <Save className="w-4 h-4" />
            Save Draft
          </Button>
        </div>

        {/* Center - Progress */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Step {currentStep} of {totalSteps}</span>
          <div className="flex gap-1">
            {Array.from({ length: totalSteps }).map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index + 1 <= currentStep ? 'bg-primary' : 'bg-muted'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          {isLastStep ? (
            <Button
              onClick={onPublish}
              disabled={!canProceed}
              size="lg"
              className="gap-2"
            >
              <Rocket className="w-4 h-4" />
              Publish Campaign
            </Button>
          ) : (
            <Button
              onClick={onNext}
              disabled={!canProceed}
              className="gap-2"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}