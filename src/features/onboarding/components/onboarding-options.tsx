"use client";

import { OnboardingOptionChip } from "@/features/onboarding/components/onboarding-option-chip";
import { OnboardingOptionListItem } from "@/features/onboarding/components/onboarding-option-list-item";
import type {
  OnboardingOption,
  OnboardingOptionsLayout,
} from "@/features/onboarding/types/onboarding.types";
import { cn } from "@/lib/utils";

type OnboardingOptionsProps = {
  options: OnboardingOption[];
  layout: OnboardingOptionsLayout;
  selectedOptionIds: string[];
  onSelectOption: (optionId: string) => void;
};

export function OnboardingOptions({
  options,
  layout,
  selectedOptionIds,
  onSelectOption,
}: OnboardingOptionsProps) {
  if (layout === "list") {
    return (
      <div className="flex flex-col gap-2">
        {options.map((option) => (
          <OnboardingOptionListItem
            key={option.id}
            label={option.label}
            iconName={option.iconName}
            selected={selectedOptionIds.includes(option.id)}
            onSelect={() => onSelectOption(option.id)}
          />
        ))}
      </div>
    );
  }

  return (
    <div className={cn("grid grid-cols-2 gap-2")}>
      {options.map((option) => (
        <OnboardingOptionChip
          key={option.id}
          label={option.label}
          iconName={option.iconName}
          selected={selectedOptionIds.includes(option.id)}
          onSelect={() => onSelectOption(option.id)}
        />
      ))}
    </div>
  );
}
