import type { RecipeListItem } from "@/features/recipes/types/recipe.types";

export type RecipeListItemApiDto = RecipeListItem & {
  isSuggested?: boolean;
  isPublic?: boolean;
};
