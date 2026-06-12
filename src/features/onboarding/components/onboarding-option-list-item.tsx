"use client";

import { DynamicLucideIcon } from "@/features/onboarding/components/dynamic-lucide-icon";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

type OnboardingOptionListItemProps = {
  label: string;
  iconName: string;
  selected: boolean;
  onSelect: () => void;
};

export function OnboardingOptionListItem({
  label,
  iconName,
  selected,
  onSelect,
}: OnboardingOptionListItemProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={cn(
        "flex w-full cursor-pointer items-center gap-3 rounded-3xl border px-4 py-3.5 text-left text-sm font-medium transition-colors",
        selected
          ? "border-primary bg-mint text-primary"
          : "border-foreground/10 bg-card text-foreground/80 hover:border-primary/30 hover:bg-mint/30",
      )}
    >
      <span
        className={cn(
          "flex size-9 shrink-0 items-center justify-center rounded-2xl",
          selected ? "bg-primary/15 text-primary" : "bg-mint/60 text-foreground/50",
        )}
      >
        <DynamicLucideIcon name={iconName} className="size-4" />
      </span>
      <span className="min-w-0 flex-1 leading-snug">{label}</span>
      <ChevronRight
        className={cn(
          "size-4 shrink-0",
          selected ? "text-primary" : "text-foreground/25",
        )}
        aria-hidden
      />
    </button>
  );
}
