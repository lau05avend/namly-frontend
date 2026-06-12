"use client";

import { DynamicLucideIcon } from "@/features/onboarding/components/dynamic-lucide-icon";
import { cn } from "@/lib/utils";

type OnboardingOptionChipProps = {
  label: string;
  iconName: string;
  selected: boolean;
  onSelect: () => void;
};

export function OnboardingOptionChip({
  label,
  iconName,
  selected,
  onSelect,
}: OnboardingOptionChipProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={cn(
        "flex cursor-pointer items-center gap-2.5 rounded-full border px-4 py-3 text-left text-sm font-medium transition-colors",
        selected
          ? "border-primary bg-mint text-primary"
          : "border-foreground/10 bg-card text-foreground/80 hover:border-primary/30 hover:bg-mint/30",
      )}
    >
      <span
        className={cn(
          "flex size-8 shrink-0 items-center justify-center rounded-full",
          selected ? "bg-primary/15 text-primary" : "bg-mint/60 text-foreground/50",
        )}
      >
        <DynamicLucideIcon name={iconName} className="size-4" />
      </span>
      <span className="min-w-0 flex-1 leading-snug">{label}</span>
    </button>
  );
}
