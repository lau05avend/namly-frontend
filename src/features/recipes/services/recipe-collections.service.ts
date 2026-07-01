import type {
  CreateRecipeCollectionApiPayload,
  RecipeCollectionApiDto,
  RecipeCollectionRecipesApiPayload,
  UpdateRecipeCollectionApiPayload,
} from "@/features/recipes/types/recipe-collection-api.types";
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

export async function fetchRecipeCollection(
  collectionId: string,
): Promise<RecipeCollection> {
  const collection = await apiClient<RecipeCollectionApiDto>(
    `/api/v1/recipe-folders/${collectionId}`,
  );

  return mapRecipeCollection(collection);
}

export async function createRecipeCollection(
  payload: CreateRecipeCollectionApiPayload,
): Promise<RecipeCollection> {
  const collection = await apiClient<RecipeCollectionApiDto>(
    "/api/v1/recipe-folders",
    {
      method: "POST",
      body: payload,
    },
  );

  return mapRecipeCollection(collection);
}

export async function updateRecipeCollection(
  collectionId: string,
  payload: UpdateRecipeCollectionApiPayload,
): Promise<RecipeCollection> {
  const collection = await apiClient<RecipeCollectionApiDto>(
    `/api/v1/recipe-folders/${collectionId}`,
    {
      method: "PATCH",
      body: payload,
    },
  );

  return mapRecipeCollection(collection);
}

export async function deleteRecipeCollection(
  collectionId: string,
): Promise<void> {
  await apiClient<void>(`/api/v1/recipe-folders/${collectionId}`, {
    method: "DELETE",
  });
}

export async function addRecipesToCollection(
  collectionId: string,
  payload: RecipeCollectionRecipesApiPayload,
): Promise<void> {
  await apiClient<void>(
    `/api/v1/recipe-folders/${collectionId}/recipes`,
    {
      method: "POST",
      body: payload,
    },
  );
}

export async function removeRecipesFromCollection(
  collectionId: string,
  payload: RecipeCollectionRecipesApiPayload,
): Promise<void> {
  await apiClient<void>(
    `/api/v1/recipe-folders/${collectionId}/recipes/remove`,
    {
      method: "POST",
      body: payload,
    },
  );
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
