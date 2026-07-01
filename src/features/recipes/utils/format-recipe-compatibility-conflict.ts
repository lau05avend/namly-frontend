import { RECIPES_COPY } from "@/features/recipes/constants/recipes-copy";
import type { RecipeCompatibilityConflict } from "@/features/recipes/types/recipe-detail.types";

export function formatRecipeCompatibilityConflict(
  conflict: RecipeCompatibilityConflict,
): string {
  const copy = RECIPES_COPY.recipeDetail.compatibility;
  const ingredients = conflict.matchedIngredients.filter(Boolean);

  switch (conflict.type) {
    case "allergen":
      return copy.allergen(conflict.label, ingredients);
    case "diet":
      return copy.diet(conflict.label);
    case "custom":
      return copy.custom(conflict.label, ingredients);
    default:
      return conflict.label;
  }
}
