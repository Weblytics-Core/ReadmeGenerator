import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  id: number;
  title: string;
  description: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = currentStep > step.id;
          const isCurrent = currentStep === step.id;
          const isUpcoming = currentStep < step.id;

          return (
            <div key={step.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div className="flex items-center w-full">
                  <div className="relative flex flex-col items-center">
                    <div
                      className={cn(
                        "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300",
                        isCompleted && "bg-primary text-primary-foreground",
                        isCurrent && "bg-primary text-primary-foreground ring-4 ring-primary/20",
                        isUpcoming && "bg-muted text-muted-foreground"
                      )}
                      data-testid={`step-indicator-${step.id}`}
                    >
                      {isCompleted ? (
                        <Check className="h-6 w-6" />
                      ) : (
                        <span className="text-lg font-semibold">{step.id}</span>
                      )}
                    </div>
                    <div className="mt-3 text-center">
                      <p
                        className={cn(
                          "text-sm font-medium transition-colors",
                          isCurrent && "text-foreground",
                          !isCurrent && "text-muted-foreground"
                        )}
                      >
                        {step.title}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1 hidden sm:block">
                        {step.description}
                      </p>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="flex-1 h-0.5 mx-4">
                      <div
                        className={cn(
                          "h-full transition-all duration-500",
                          isCompleted ? "bg-primary" : "bg-border"
                        )}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
