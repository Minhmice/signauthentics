"use client";

import * as React from "react";
import { useForm, UseFormReturn, FieldValues, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, Save, X } from "lucide-react";
import { FormStepper } from "./FormStepper";
import { FormStep } from "./FormStep";
import { cn } from "@/lib/utils";

export interface FormStepConfig<T extends FieldValues = FieldValues> {
  id: string;
  title: string;
  description?: string;
  icon?: React.ComponentType<{ className?: string }>;
  validation?: z.ZodSchema;
  component: React.ComponentType<{
    form: UseFormReturn<T>;
    onNext?: () => void;
    onPrevious?: () => void;
  }>;
}

interface BaseFormProps<T extends FieldValues> {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  steps: FormStepConfig<T>[];
  schema: z.ZodSchema<T>;
  defaultValues?: Partial<T>;
  onSubmit: (data: T) => void | Promise<void>;
  submitLabel?: string;
  className?: string;
  allowStepNavigation?: boolean;
  headerContent?: React.ReactNode;
}

export function BaseForm<T extends FieldValues>({
  open,
  onOpenChange,
  title,
  description,
  steps,
  schema,
  defaultValues,
  onSubmit,
  submitLabel = "Save",
  className,
  allowStepNavigation = true,
  headerContent,
}: BaseFormProps<T>) {
  const [currentStep, setCurrentStep] = React.useState(0);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<T>({
    // @ts-expect-error - zodResolver type compatibility issue
    resolver: zodResolver(schema),
    // @ts-expect-error - defaultValues type compatibility issue
    defaultValues: defaultValues as T,
    mode: "onChange",
  });

  const { formState: { isValid } } = form;

  // Reset form when dialog opens/closes
  React.useEffect(() => {
    if (open) {
      setCurrentStep(0);
      form.reset(defaultValues as T);
    }
  }, [open, form, defaultValues]);

  const isLastStep = currentStep === steps.length - 1;
  const isFirstStep = currentStep === 0;

  const handleNext = async () => {
    // Validate current step
    const isValidStep = await form.trigger();
    
    if (isValidStep && currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepClick = (stepIndex: number) => {
    if (allowStepNavigation && stepIndex <= currentStep) {
      setCurrentStep(stepIndex);
    }
  };

  const handleSubmit = async (data: T) => {
    setIsSubmitting(true);
    try {
      await onSubmit(data);
      onOpenChange(false);
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className={cn(
          "!max-w-[95vw] !max-h-[95vh] !w-[95vw] !h-[95vh]",
          "md:!max-w-[90vw] md:!w-[90vw]",
          "lg:!max-w-[85vw] lg:!w-[85vw]",
          "xl:!max-w-[80vw] xl:!w-[80vw]",
          "!grid-cols-1 overflow-y-auto bg-zinc-900 border-zinc-800 text-white",
          className
        )}
      >
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white flex items-center gap-2">
            {title}
          </DialogTitle>
          {description && (
            <DialogDescription className="text-zinc-400">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>

        <div className="space-y-6">
          {/* Header Content */}
          {headerContent && (
            <div className="mb-4">
              {headerContent}
            </div>
          )}

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm text-zinc-400">
              <span>Step {currentStep + 1} of {steps.length}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          {/* Stepper */}
          <FormStepper
            steps={steps.map(step => ({
              id: step.id,
              title: step.title,
              description: step.description,
              icon: step.icon,
            }))}
            currentStep={currentStep}
            onStepClick={allowStepNavigation ? handleStepClick : undefined}
          />

          {/* Form Content */}
          <div className="min-h-[400px]">
            <FormProvider {...form}>
              {steps.map((step, index) => {
                const StepComponent = step.component;
                return (
                  <FormStep
                    key={step.id}
                    isActive={index === currentStep}
                  >
                    <StepComponent
                      form={form as unknown as UseFormReturn<T>}
                      onNext={handleNext}
                      onPrevious={handlePrevious}
                    />
                  </FormStep>
                );
              })}
            </FormProvider>
          </div>
        </div>

        <DialogFooter className="flex justify-between">
          <div className="flex gap-2">
            {!isFirstStep && (
              <Button
                type="button"
                variant="outline"
                onClick={handlePrevious}
                className="text-zinc-300 border-zinc-700 hover:bg-zinc-800"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>
            )}
          </div>

          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="text-zinc-300 border-zinc-700 hover:bg-zinc-800"
            >
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>

            {!isLastStep ? (
              <Button
                type="button"
                onClick={handleNext}
                className="bg-blue-600 hover:bg-blue-700"
                disabled={!isValid}
              >
                Next
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                type="button"
                onClick={form.handleSubmit(handleSubmit as (data: FieldValues) => void | Promise<void>)}
                disabled={isSubmitting || !isValid}
                className="bg-green-600 hover:bg-green-700"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    {submitLabel}
                  </>
                )}
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
