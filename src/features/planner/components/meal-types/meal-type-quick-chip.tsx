"use client";

import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { MEAL_TYPES_COPY } from "@/features/planner/constants/meal-types-copy";

type MealTypeQuickChipProps = {
  label: string;
  selected: boolean;
  onSelect: () => void;
};

export function MealTypeQuickChip({
  label,
  selected,
  onSelect,
}: MealTypeQuickChipProps) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      className={cn(
        "inline-flex shrink-0 cursor-pointer rounded-full border px-3.5 py-2 text-sm font-medium transition-colors",
        selected
          ? "border-primary/25 bg-mint/35 text-primary"
          : "border-foreground/10 bg-mint/15 text-foreground/70 hover:border-foreground/15 hover:bg-mint/25",
      )}
    >
      {label}
    </button>
  );
}

type MealTypeViewAllLinkProps = {
  onPress: () => void;
};

export function MealTypeViewAllLink({ onPress }: MealTypeViewAllLinkProps) {
  return (
    <button
      type="button"
      onClick={onPress}
      className={cn(
        "inline-flex shrink-0 cursor-pointer items-center gap-0.5 text-xs font-semibold text-primary transition-colors",
        "underline-offset-2 hover:text-primary/85 hover:underline",
      )}
    >
      {MEAL_TYPES_COPY.form.viewAll}
      <ChevronRight className="size-4" strokeWidth={2.25} aria-hidden />
    </button>
  );
}
