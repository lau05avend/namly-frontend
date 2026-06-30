import { PLAN_MEAL_COPY } from "@/features/planner/constants/plan-meal-copy";
import { buildMealPrepDurationLabel } from "@/features/planner/utils/meal-recipe-badge.utils";
import {
  formatRecipeDurationAriaLabel,
} from "@/features/recipes/utils/format-recipe-duration";
import { cn } from "@/lib/utils";
import { Timer } from "lucide-react";

type MealPrepDurationMetaProps = {
  totalDurationMinutes?: number | null;
  className?: string;
};

export function MealPrepDurationMeta({
  totalDurationMinutes,
  className,
}: MealPrepDurationMetaProps) {
  const label = buildMealPrepDurationLabel(totalDurationMinutes);
  const durationAria = formatRecipeDurationAriaLabel(totalDurationMinutes);

  if (!label || !durationAria) {
    return null;
  }

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 text-[11px] font-semibold text-foreground/55",
        className,
      )}
      aria-label={`${durationAria} de preparación`}
    >
      <Timer className="size-3 shrink-0" strokeWidth={2.25} aria-hidden />
      <span className="tabular-nums">{label}</span>
    </span>
  );
}
