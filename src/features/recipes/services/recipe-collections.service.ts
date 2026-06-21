import type { RecipeCollectionApiDto } from "@/features/recipes/types/recipe-collection-api.types";
import type { RecipeCollection } from "@/features/recipes/types/recipe-collection.types";
import { apiClient } from "@/lib/api/api-client";

function mapRecipeCollection(dto: RecipeCollectionApiDto): RecipeCollection {
  return {
    id: dto.id,
    name: dto.name,
    colorHex: dto.colorHex,
    recipesCount: dto.recipesCount,
  };
}

export async function fetchRecipeCollections(): Promise<RecipeCollection[]> {
  const collections = await apiClient<RecipeCollectionApiDto[]>(
    "/api/v1/recipe-folders",
  );

  return collections.map(mapRecipeCollection);
}

export function resolveFirstRecipeCoverUrl(
  recipes: { coverUrl: string | null }[],
): string | null {
  for (const recipe of recipes) {
    if (recipe.coverUrl) {
      return recipe.coverUrl;
    }
  }

  return null;
}
