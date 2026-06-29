import { PLAN_MEAL_COPY } from "@/features/planner/constants/plan-meal-copy";
import { formatRecipeDurationAriaLabel } from "@/features/recipes/utils/format-recipe-duration";

type RecipeWithDuration = {
  durationMinutes?: number | null;
};

export function hasRecipeDuration(
  durationMinutes: number | null | undefined,
): boolean {
  return durationMinutes != null && durationMinutes > 0;
}

export function sumRecipeDurations(recipes: RecipeWithDuration[]): number {
  return recipes.reduce((total, recipe) => {
    if (!hasRecipeDuration(recipe.durationMinutes)) {
      return total;
    }

    return total + recipe.durationMinutes!;
  }, 0);
}

export function countRecipesWithDuration(recipes: RecipeWithDuration[]): number {
  return recipes.filter((recipe) =>
    hasRecipeDuration(recipe.durationMinutes),
  ).length;
}

export function buildMenuSummaryLabel(recipes: RecipeWithDuration[]): string {
  const count = recipes.length;
  const countLabel = PLAN_MEAL_COPY.recipes.menuSummaryCount(count);
  const totalMinutes = sumRecipeDurations(recipes);
  const durationLabel = formatRecipeDurationAriaLabel(totalMinutes);
  const recipesWithDuration = countRecipesWithDuration(recipes);

  if (!durationLabel) {
    return countLabel;
  }

  if (recipesWithDuration === count) {
    return PLAN_MEAL_COPY.recipes.menuSummaryWithDuration(
      countLabel,
      durationLabel,
    );
  }

  return PLAN_MEAL_COPY.recipes.menuSummaryWithPartialDuration(
    countLabel,
    durationLabel,
  );
}
