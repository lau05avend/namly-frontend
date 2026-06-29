import type { RecipeListItem } from "@/features/recipes/types/recipe.types";

type RecipeWithId = {
  id: string;
  durationMinutes?: number | null;
};

export function enrichRecipesWithDurations<T extends RecipeWithId>(
  recipes: T[],
  catalog: RecipeListItem[],
): T[] {
  if (recipes.length === 0) {
    return recipes;
  }

  const durationById = new Map(
    catalog.map((recipe) => [recipe.id, recipe.durationMinutes]),
  );

  return recipes.map((recipe) => ({
    ...recipe,
    durationMinutes: durationById.get(recipe.id) ?? null,
  }));
}
