import { Check, Circle } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface Step {
  id: number;
  title: string;
  description: string;
}

interface CampaignStepperProps {
  steps: Step[];
  currentStep: number;
  onStepClick: (step: number) => void;
  orientation?: "vertical" | "horizontal";
}

export function CampaignStepper({ 
  steps, 
  currentStep, 
  onStepClick, 
  orientation = "vertical" 
}: CampaignStepperProps) {
  if (orientation === "horizontal") {
    return (
      <div className="w-full overflow-x-auto pb-4">
        <div className="flex gap-4 min-w-max">
          {steps.map((step, index) => {
            const isCompleted = step.id < currentStep;
            const isCurrent = step.id === currentStep;
            
            return (
              <motion.button
                key={step.id}
                onClick={() => onStepClick(step.id)}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-lg border transition-all duration-200 min-w-[200px]",
                  isCurrent && "border-primary bg-primary/5",
                  isCompleted && "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20",
                  !isCurrent && !isCompleted && "border-border hover:border-primary/50"
                )}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className={cn(
                  "flex items-center justify-center w-8 h-8 rounded-full border-2 transition-colors",
                  isCurrent && "border-primary bg-primary text-primary-foreground",
                  isCompleted && "border-emerald-500 bg-emerald-500 text-white",
                  !isCurrent && !isCompleted && "border-muted-foreground"
                )}>
                  {isCompleted ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <span className="text-sm font-medium">{step.id}</span>
                  )}
                </div>
                <div className="text-left">
                  <div className={cn(
                    "font-medium",
                    isCurrent && "text-primary",
                    isCompleted && "text-emerald-600"
                  )}>
                    {step.title}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {step.description}
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <nav className="space-y-2">
      {steps.map((step, index) => {
        const isCompleted = step.id < currentStep;
        const isCurrent = step.id === currentStep;
        
        return (
          <motion.button
            key={step.id}
            onClick={() => onStepClick(step.id)}
            className={cn(
              "w-full flex items-start gap-3 p-4 text-left rounded-lg border transition-all duration-200 group",
              isCurrent && "border-primary bg-primary/5 shadow-sm",
              isCompleted && "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20",
              !isCurrent && !isCompleted && "border-border hover:border-primary/50 hover:bg-muted/50"
            )}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className={cn(
              "flex items-center justify-center w-8 h-8 rounded-full border-2 transition-colors mt-0.5",
              isCurrent && "border-primary bg-primary text-primary-foreground",
              isCompleted && "border-emerald-500 bg-emerald-500 text-white",
              !isCurrent && !isCompleted && "border-muted-foreground group-hover:border-primary"
            )}>
              {isCompleted ? (
                <Check className="w-4 h-4" />
              ) : (
                <span className="text-sm font-medium">{step.id}</span>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className={cn(
                "font-medium transition-colors",
                isCurrent && "text-primary",
                isCompleted && "text-emerald-600",
                !isCurrent && !isCompleted && "group-hover:text-primary"
              )}>
                {step.title}
              </div>
              <div className="text-sm text-muted-foreground mt-0.5">
                {step.description}
              </div>
            </div>
            
            {/* Connection line */}
            {index < steps.length - 1 && (
              <div className={cn(
                "absolute left-8 top-16 w-0.5 h-4 transition-colors",
                step.id < currentStep ? "bg-emerald-500" : "bg-border"
              )} />
            )}
          </motion.button>
        );
      })}
    </nav>
  );
}