"use client";

import { OnboardingCustomInput } from "@/features/onboarding/components/onboarding-custom-input";
import { OnboardingOptions } from "@/features/onboarding/components/onboarding-options";
import { DynamicLucideIcon } from "@/features/onboarding/components/dynamic-lucide-icon";
import { ONBOARDING_COPY } from "@/features/onboarding/constants/onboarding-copy";
import type {
  OnboardingQuestion,
  OnboardingResponseDraft,
} from "@/features/onboarding/types/onboarding.types";
import { isMultiSelectQuestion } from "@/features/onboarding/utils/onboarding-question.utils";

type QuestionCardProps = {
  question: OnboardingQuestion;
  draft: OnboardingResponseDraft;
  onSelectOption: (optionId: string) => void;
  onCustomValueChange: (value: string) => void;
};

export function QuestionCard({
  question,
  draft,
  onSelectOption,
  onCustomValueChange,
}: QuestionCardProps) {
  const showMultiHint = isMultiSelectQuestion(question);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-4 text-center">
        <span className="flex size-16 items-center justify-center rounded-3xl bg-mint/70 text-primary">
          <DynamicLucideIcon
            name={question.questionIconName}
            className="size-7"
          />
        </span>

        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-bold leading-snug text-foreground">
            {question.text}
          </h1>
          {showMultiHint ? (
            <p className="text-sm text-foreground/50">
              {ONBOARDING_COPY.wizard.maxSelections(question.maxSelections)}
            </p>
          ) : null}
        </div>
      </div>

      <OnboardingOptions
        options={question.options}
        layout={question.optionsLayout}
        selectedOptionIds={draft.optionIds}
        onSelectOption={onSelectOption}
      />

      {question.allowCustomInput ? (
        <OnboardingCustomInput
          value={draft.customValue ?? ""}
          onChange={onCustomValueChange}
        />
      ) : null}
    </div>
  );
}
