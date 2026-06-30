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
  density?: "default" | "compact" | "embedded";
  multiSelect?: boolean;
};

export function OnboardingOptions({
  options,
  layout,
  selectedOptionIds,
  onSelectOption,
  density = "default",
  multiSelect = false,
}: OnboardingOptionsProps) {
  const isCompact = density === "compact";
  const isEmbedded = density === "embedded";

  if (layout === "list") {
    return (
      <div
        className={cn(
          "flex flex-col",
          isEmbedded ? "gap-0.5" : isCompact ? "gap-1.5" : "gap-2",
        )}
      >
        {options.map((option) => (
          <OnboardingOptionListItem
            key={option.id}
            label={option.label}
            iconName={option.iconName}
            selected={selectedOptionIds.includes(option.id)}
            onSelect={() => onSelectOption(option.id)}
            density={density}
            multiSelect={multiSelect}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "grid min-w-0 grid-cols-2",
        isEmbedded ? "gap-1.5" : isCompact ? "gap-1.5" : "gap-2",
      )}
    >
      {options.map((option) => (
        <OnboardingOptionChip
          key={option.id}
          label={option.label}
          iconName={option.iconName}
          selected={selectedOptionIds.includes(option.id)}
          onSelect={() => onSelectOption(option.id)}
          density={density}
        />
      ))}
    </div>
  );
}
