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
import { getQuestionResponseSummary } from "@/features/onboarding/utils/onboarding-response.utils";
import { PROFILE_COPY } from "@/features/profile/constants/profile-copy";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

type OnboardingPreferenceItemProps = {
  question: OnboardingQuestion;
  draft: OnboardingResponseDraft;
  isExpanded: boolean;
  isLast: boolean;
  onToggle: () => void;
  onSelectOption: (optionId: string) => void;
  onCustomValueChange: (value: string) => void;
};

export function OnboardingPreferenceItem({
  question,
  draft,
  isExpanded,
  isLast,
  onToggle,
  onSelectOption,
  onCustomValueChange,
}: OnboardingPreferenceItemProps) {
  const summary = getQuestionResponseSummary(
    question,
    draft,
    PROFILE_COPY.preferences.unanswered,
  );
  const isAnswered = summary !== PROFILE_COPY.preferences.unanswered;
  const showMultiHint = isMultiSelectQuestion(question);

  return (
    <div
      className={cn(
        !isLast && "border-b border-foreground/[0.05]",
        isExpanded && "bg-mint/15",
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isExpanded}
        className={cn(
          "flex w-full cursor-pointer items-start gap-3 px-3.5 text-left transition-colors",
          isExpanded ? "pb-2.5 pt-3" : "py-3 hover:bg-mint/10",
        )}
      >
        <span
          className={cn(
            "flex size-8 shrink-0 items-center justify-center rounded-xl",
            isExpanded
              ? "bg-primary/12 text-primary"
              : "bg-mint/60 text-primary",
          )}
        >
          <DynamicLucideIcon
            name={question.questionIconName}
            className="size-4"
          />
        </span>

        <div className="min-w-0 flex-1 pt-0.5">
          <p className="text-sm font-semibold leading-snug text-foreground">
            {question.text}
          </p>
          {!isExpanded ? (
            <p
              className={cn(
                "mt-0.5 line-clamp-2 text-xs leading-relaxed",
                isAnswered ? "text-foreground/50" : "text-foreground/35",
              )}
            >
              {summary}
            </p>
          ) : null}
        </div>

        <ChevronDown
          className={cn(
            "mt-1 size-3.5 shrink-0 text-foreground/30 transition-transform duration-200",
            isExpanded && "rotate-180 text-primary/50",
          )}
          aria-hidden
        />
      </button>

      {isExpanded ? (
        <div className="flex flex-col gap-2 px-3.5 pb-3 pt-0">
          <div className="rounded-xl bg-card/60 px-2 py-2">
            {showMultiHint ? (
              <p className="px-2 pb-1.5 text-[11px] text-foreground/45">
                {ONBOARDING_COPY.wizard.maxSelections(question.maxSelections)}
              </p>
            ) : null}

            <OnboardingOptions
              options={question.options}
              layout={question.optionsLayout}
              selectedOptionIds={draft.optionIds}
              onSelectOption={onSelectOption}
              density="embedded"
              multiSelect={showMultiHint}
            />

            {question.allowCustomInput ? (
              <div className="mt-1.5 px-1">
                <OnboardingCustomInput
                  value={draft.customValue ?? ""}
                  onChange={onCustomValueChange}
                  density="embedded"
                />
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
