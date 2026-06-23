"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { OnboardingEmpty } from "@/features/onboarding/components/onboarding-empty";
import { OnboardingLoading } from "@/features/onboarding/components/onboarding-loading";
import { OnboardingProgress } from "@/features/onboarding/components/onboarding-progress";
import { OnboardingWizardHeader } from "@/features/onboarding/components/onboarding-wizard-header";
import { QuestionCard } from "@/features/onboarding/components/question-card";
import {
  clearOnboardingFlow,
  clearWizardProgress,
  loadOnboardingFlow,
} from "@/features/onboarding/constants/onboarding-flow-storage";
import { ONBOARDING_COPY } from "@/features/onboarding/constants/onboarding-copy";
import { useOnboardingWizard } from "@/features/onboarding/hooks/use-onboarding-wizard";
import { useOnboardingQuestions } from "@/features/onboarding/queries/use-onboarding-questions";
import { useSubmitOnboarding } from "@/features/onboarding/queries/use-submit-onboarding";
import { getUserFacingErrorMessage } from "@/lib/api/get-user-facing-error-message";

export function OnboardingWizardScreen() {
  const router = useRouter();
  const { data: questions, isPending, isError, refetch } = useOnboardingQuestions();
  const submitMutation = useSubmitOnboarding();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const questionCount = questions?.length ?? 0;
  const wizard = useOnboardingWizard(questionCount);

  useEffect(() => {
    if (!loadOnboardingFlow().onboardingStarted) {
      router.replace("/onboarding/welcome");
    }
  }, [router]);

  const currentQuestion = questions?.[wizard.currentQuestionIndex];
  const currentDraft = currentQuestion
    ? (wizard.responses[currentQuestion.id] ?? { optionIds: [] })
    : { optionIds: [] };

  const handleFinish = async () => {
    setSubmitError(null);

    try {
      await submitMutation.mutateAsync(wizard.responses);
      clearOnboardingFlow();
      router.push("/home");
    } catch (error) {
      setSubmitError(
        getUserFacingErrorMessage(error, ONBOARDING_COPY.wizard.submitError),
      );
    }
  };

  const handleContinue = () => {
    if (wizard.isLast) {
      void handleFinish();
      return;
    }

    wizard.goNext();
  };

  const handleCompleteLater = () => {
    clearWizardProgress();
    router.push("/home");
  };

  if (isPending) {
    return (
      <div className="mx-auto min-h-dvh max-w-md bg-background">
        <OnboardingLoading />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mx-auto flex min-h-dvh max-w-md flex-col items-center justify-center gap-3 px-6 bg-background">
        <p className="text-center text-sm text-foreground/60">
          {ONBOARDING_COPY.wizard.loadError}
        </p>
        <button
          type="button"
          onClick={() => void refetch()}
          className="cursor-pointer text-sm font-semibold text-primary underline-offset-2 hover:underline"
        >
          {ONBOARDING_COPY.wizard.retry}
        </button>
      </div>
    );
  }

  if (!questions?.length || !currentQuestion) {
    return (
      <div className="mx-auto min-h-dvh max-w-md bg-background px-6">
        <OnboardingEmpty />
      </div>
    );
  }

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-md flex-col bg-background px-4 pb-safe">
      <OnboardingWizardHeader
        canGoPrevious={!wizard.isFirst}
        canGoNext={!wizard.isLast}
        onPrevious={wizard.goPrev}
        onNext={wizard.goNext}
      />

      <div className="flex flex-1 flex-col gap-6 pb-8">
        <div className="flex flex-col items-center gap-2">
          <p className="text-xs font-medium text-foreground/45">
            {ONBOARDING_COPY.wizard.progress(
              wizard.currentQuestionIndex + 1,
              questionCount,
            )}
          </p>
          <OnboardingProgress
            current={wizard.currentQuestionIndex + 1}
            total={questionCount}
          />
        </div>

        <QuestionCard
          question={currentQuestion}
          draft={currentDraft}
          onSelectOption={(optionId) =>
            wizard.selectOption(currentQuestion, optionId)
          }
          onCustomValueChange={(value) =>
            wizard.setCustomValue(currentQuestion.id, value)
          }
        />

        <div className="mt-auto flex flex-col gap-3 pt-4">
          <Button
            type="button"
            onClick={handleContinue}
            disabled={submitMutation.isPending}
            aria-busy={submitMutation.isPending}
          >
            {submitMutation.isPending
              ? ONBOARDING_COPY.wizard.submitting
              : wizard.isLast
                ? ONBOARDING_COPY.wizard.finish
                : ONBOARDING_COPY.wizard.continue}
          </Button>

          <div className="flex flex-col gap-1.5">
            <button
              type="button"
              onClick={handleCompleteLater}
              disabled={submitMutation.isPending}
              className="cursor-pointer py-2 text-center text-sm font-medium text-foreground/50 transition-colors hover:text-foreground disabled:opacity-50"
            >
              {ONBOARDING_COPY.wizard.respondLater}
            </button>
            <p className="px-1 text-center text-xs leading-relaxed text-foreground/40">
              {ONBOARDING_COPY.wizard.respondLaterHint}
            </p>
          </div>
        </div>

        {submitError ? (
          <p className="text-center text-sm text-cta" role="alert">
            {submitError}
          </p>
        ) : null}
      </div>
    </div>
  );
}
