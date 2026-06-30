import { PLAN_MEAL_COPY } from "@/features/planner/constants/plan-meal-copy";
import { formatRecipeDuration } from "@/features/recipes/utils/format-recipe-duration";

export function buildMealPrepDurationLabel(
  totalDurationMinutes?: number | null,
): string | null {
  const durationLabel = formatRecipeDuration(totalDurationMinutes);

  if (!durationLabel) {
    return null;
  }

  return PLAN_MEAL_COPY.recipes.prepDuration(durationLabel);
}

export function buildMealRecipeCountBadge(
  recipeCount: number,
  totalDurationMinutes?: number | null,
): string | null {
  if (recipeCount <= 0) {
    return null;
  }

  const countLabel = PLAN_MEAL_COPY.recipes.menuSummaryCount(recipeCount);
  const prepLabel = buildMealPrepDurationLabel(totalDurationMinutes);

  if (!prepLabel) {
    return countLabel;
  }

  return `${countLabel} · ${prepLabel}`;
}
