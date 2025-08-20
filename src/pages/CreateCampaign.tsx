import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Navigation } from "@/components/layout/Navigation";
import { CampaignStepper } from "@/components/campaigns/create/CampaignStepper";
import { CampaignForm } from "@/components/campaigns/create/CampaignForm";
import { CampaignPreview } from "@/components/campaigns/create/CampaignPreview";
import { CampaignActions } from "@/components/campaigns/create/CampaignActions";
import { campaignFormSchema, type CampaignFormData } from "@/lib/schemas/campaign-schema";
import { toast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const STEPS = [
  { id: 1, title: "Basics", description: "Campaign fundamentals" },
  { id: 2, title: "Payout & Budget", description: "Financial details" },
  { id: 3, title: "Requirements", description: "Creator criteria" },
  { id: 4, title: "Do's & Don'ts", description: "Content guidelines" },
  { id: 5, title: "Assets & Branding", description: "Visual elements" },
  { id: 6, title: "Targeting", description: "Audience & reach" },
  { id: 7, title: "Review & Publish", description: "Final review" }
];

export default function CreateCampaign() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isPreviewCollapsed, setIsPreviewCollapsed] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  const form = useForm<CampaignFormData>({
    resolver: zodResolver(campaignFormSchema),
    defaultValues: {
      title: "",
      brandName: "",
      shortDescription: "",
      categories: [],
      platforms: [],
      startDate: new Date(),
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      isPublic: true,
      payoutPer1k: 5,
      maxPayout: 500,
      totalBudget: 5000,
      dailyCap: 0,
      perCreatorCap: 0,
      payoutCadence: "monthly",
      minFollowers: 1000,
      contentFormat: "",
      mandatoryElements: [],
      hashtags: [],
      requiresApproval: false,
      creatorSlots: 0,
      dos: [],
      donts: [],
      brandLogo: "",
      coverImage: "",
      referenceMaterials: [],
      legalNote: "",
      regions: [],
      languages: [],
      verifiedOnly: false,
      applicationWindow: "unlimited"
    },
    mode: "onChange"
  });

  const { watch } = form;
  const formData = watch();

  // Auto-save functionality
  const handleAutoSave = useCallback(async () => {
    try {
      // In a real app, this would save to backend
      localStorage.setItem("campaign-draft", JSON.stringify(formData));
      setLastSaved(new Date());
      toast({
        title: "Draft saved",
        description: "Your campaign has been automatically saved.",
      });
    } catch (error) {
      console.error("Auto-save failed:", error);
    }
  }, [formData]);

  const handleNext = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1);
      handleAutoSave();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePublish = async () => {
    try {
      const isValid = await form.trigger();
      if (!isValid) {
        toast({
          title: "Validation Error",
          description: "Please fix the errors before publishing.",
          variant: "destructive",
        });
        return;
      }

      // In a real app, this would submit to backend
      console.log("Publishing campaign:", formData);
      
      toast({
        title: "Campaign Published!",
        description: "Your campaign is now live and accepting applications.",
      });
      
      navigate("/brand-dashboard");
    } catch (error) {
      console.error("Publish failed:", error);
      toast({
        title: "Publish Failed",
        description: "There was an error publishing your campaign.",
        variant: "destructive",
      });
    }
  };

  const isLastStep = currentStep === STEPS.length;
  const canProceed = true; // In real app, check step validation

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(-1)}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Create Campaign</h1>
              <p className="text-muted-foreground">
                Build your campaign with live preview
              </p>
            </div>
            {lastSaved && (
              <div className="ml-auto text-sm text-muted-foreground">
                Saved {lastSaved.toLocaleTimeString()}
              </div>
            )}
          </div>
        </div>
      </div>

      <FormProvider {...form}>
        <div className="container mx-auto px-6 py-8">
          <div className="grid grid-cols-12 gap-8 min-h-[80vh]">
            {/* Left Stepper - Desktop */}
            <div className="hidden lg:block lg:col-span-3">
              <div className="sticky top-8">
                <CampaignStepper
                  steps={STEPS}
                  currentStep={currentStep}
                  onStepClick={setCurrentStep}
                />
              </div>
            </div>

            {/* Center Form */}
            <div className={`${isPreviewCollapsed ? 'col-span-12 lg:col-span-9' : 'col-span-12 lg:col-span-5'} transition-all duration-300`}>
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                <CampaignForm
                  currentStep={currentStep}
                  onAutoSave={handleAutoSave}
                />
              </motion.div>
            </div>

            {/* Right Preview - Desktop */}
            {!isPreviewCollapsed && (
              <div className="hidden lg:block lg:col-span-4">
                <div className="sticky top-8">
                  <CampaignPreview
                    formData={formData}
                    onToggleCollapse={() => setIsPreviewCollapsed(!isPreviewCollapsed)}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Mobile Stepper */}
          <div className="lg:hidden mb-8">
            <CampaignStepper
              steps={STEPS}
              currentStep={currentStep}
              onStepClick={setCurrentStep}
              orientation="horizontal"
            />
          </div>

          {/* Actions Footer */}
          <CampaignActions
            currentStep={currentStep}
            totalSteps={STEPS.length}
            canProceed={canProceed}
            onPrevious={handlePrevious}
            onNext={handleNext}
            onPublish={handlePublish}
            onSaveDraft={handleAutoSave}
            isLastStep={isLastStep}
          />
        </div>
      </FormProvider>
    </div>
  );
}