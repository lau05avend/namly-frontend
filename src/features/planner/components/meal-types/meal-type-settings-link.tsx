"use client";

import { MEAL_TYPES_COPY } from "@/features/planner/constants/meal-types-copy";
import { ChevronRight } from "lucide-react";

type MealTypeSettingsLinkProps = {
  onPress: () => void;
};

export function MealTypeSettingsLink({ onPress }: MealTypeSettingsLinkProps) {
  return (
    <button
      type="button"
      onClick={onPress}
      className="inline-flex cursor-pointer items-center gap-0.5 text-xs font-medium text-primary/70 transition-colors hover:text-primary"
    >
      {MEAL_TYPES_COPY.selectSheet.settingsLink}
      <ChevronRight className="size-3.5" strokeWidth={2.25} aria-hidden />
    </button>
  );
}
