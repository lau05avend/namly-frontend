"use client";

import { ONBOARDING_COPY } from "@/features/onboarding/constants/onboarding-copy";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";

type OnboardingWizardHeaderProps = {
  onPrevious?: () => void;
  onNext?: () => void;
  canGoPrevious?: boolean;
  canGoNext?: boolean;
};

export function OnboardingWizardHeader({
  onPrevious,
  onNext,
  canGoPrevious = false,
  canGoNext = false,
}: OnboardingWizardHeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-3 bg-background/95 px-1 py-3 backdrop-blur-sm pt-safe">
      <button
        type="button"
        onClick={onPrevious}
        disabled={!canGoPrevious}
        aria-label={ONBOARDING_COPY.wizard.previous}
        className={cn(
          "flex size-10 cursor-pointer items-center justify-center rounded-full text-foreground/70 transition-colors hover:bg-mint/50",
          !canGoPrevious && "pointer-events-none opacity-30",
        )}
      >
        <ArrowLeft className="size-5" />
      </button>

      <button
        type="button"
        onClick={onNext}
        disabled={!canGoNext}
        aria-label={ONBOARDING_COPY.wizard.next}
        className={cn(
          "flex size-10 cursor-pointer items-center justify-center rounded-full text-foreground/70 transition-colors hover:bg-mint/50",
          !canGoNext && "pointer-events-none opacity-30",
        )}
      >
        <ArrowRight className="size-5" />
      </button>
    </header>
  );
}
