import type { NextMealDetail } from "@/features/home/types/home.types";

export type NextMealRecipeDisplay = {
  totalCount: number;
  visibleRecipes: string[];
  hiddenCount: number;
};

export function getNextMealRecipeDisplay(
  meal: NextMealDetail,
): NextMealRecipeDisplay {
  const recipeLabels =
    meal.items.length > 0
      ? meal.items.map((item) => item.label)
      : meal.title
        ? [meal.title]
        : [];

  const totalCount = recipeLabels.length + (meal.moreCount ?? 0);
  const visibleRecipes = recipeLabels.slice(0, 3);
  const hiddenCount = Math.max(0, totalCount - visibleRecipes.length);

  return {
    totalCount,
    visibleRecipes,
    hiddenCount,
  };
}
