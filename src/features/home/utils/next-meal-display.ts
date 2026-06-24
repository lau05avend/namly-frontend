import type { NextMealDetail } from "@/features/home/types/home.types";

const RECIPE_OVERFLOW_THRESHOLD = 2;
const MAX_VISIBLE_RECIPES_WHEN_OVERFLOW = 2;

export type NextMealRecipeDisplay = {
  totalCount: number;
  visibleRecipes: string[];
  hiddenCount: number;
};

export function getNextMealRecipeDisplay(
  meal: NextMealDetail,
): NextMealRecipeDisplay {
  const recipeLabels = meal.items.map((item) => item.label);
  const totalCount = recipeLabels.length + (meal.moreCount ?? 0);

  if (totalCount === 0) {
    return {
      totalCount: 0,
      visibleRecipes: [],
      hiddenCount: 0,
    };
  }

  if (totalCount > RECIPE_OVERFLOW_THRESHOLD) {
    const visibleRecipes = recipeLabels.slice(0, MAX_VISIBLE_RECIPES_WHEN_OVERFLOW);

    return {
      totalCount,
      visibleRecipes,
      hiddenCount: totalCount - visibleRecipes.length,
    };
  }

  return {
    totalCount,
    visibleRecipes: recipeLabels,
    hiddenCount: 0,
  };
}
