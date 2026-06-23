import type { CreateRecipePayload, CreateRecipeResponse } from "@/features/recipes/types/create-recipe-api.types";
import type {
  RecipeDetailApiDto,
  RecipeDetailPage,
} from "@/features/recipes/types/recipe-detail-api.types";
import type {
  CreateRecipeInteractionsPayload,
  PatchRecipeInteractionsPayload,
  RecipeInteractionsApiDto,
} from "@/features/recipes/types/recipe-interactions-api.types";
import { mapRecipeDetailApiToPage } from "@/features/recipes/mappers/recipe-detail.mapper";
import { mapRecipeInteractionsApiToDomain } from "@/features/recipes/mappers/recipe-interactions.mapper";
import type { RecipeInteractions } from "@/features/recipes/types/recipe-interactions.types";
import type { RecipeListItemApiDto } from "@/features/recipes/types/recipe-api.types";
import type {
  RecipeListFilter,
  RecipeListItem,
  RecipeListParams,
} from "@/features/recipes/types/recipe.types";
import { apiClient, ApiError } from "@/lib/api/api-client";
import { resolveRecipeListItemOriginFlags } from "@/features/recipes/utils/resolve-recipe-origin";

function mapRecipeListItem(
  dto: RecipeListItemApiDto,
  listFilter: RecipeListFilter = "all",
): RecipeListItem {
  const origin = resolveRecipeListItemOriginFlags(dto, listFilter);

  return {
    id: dto.id,
    title: dto.title,
    coverUrl: dto.coverUrl,
    rating: dto.rating,
    isFavorite: dto.isFavorite,
    isHidden: dto.isHidden,
    isSuggested: origin.isSuggested,
    isPublic: origin.isPublic,
    updatedAt: dto.updatedAt,
    createdAt: dto.createdAt,
  };
}

function buildRecipesQueryString(params: RecipeListParams): string {
  const searchParams = new URLSearchParams();
  searchParams.set("filter", params.filter ?? "all");

  if (params.tags && params.tags.length > 0) {
    searchParams.set("tags", params.tags.join(","));
  }

  const title = params.title?.trim();
  if (title) {
    searchParams.set("title", title);
  }

  if (params.folderId) {
    searchParams.set("folderId", params.folderId);
  }

  return searchParams.toString();
}

export async function fetchRecipes(
  params: RecipeListParams = {},
): Promise<RecipeListItem[]> {
  const query = buildRecipesQueryString(params);
  const recipes = await apiClient<RecipeListItemApiDto[]>(
    `/api/v1/recipes?${query}`,
  );

  const titleQuery = params.title?.trim().toLowerCase();
  const listFilter = params.filter ?? "all";

  return recipes
    .filter((recipe) => !recipe.isHidden)
    .filter((recipe) =>
      titleQuery
        ? recipe.title.toLowerCase().includes(titleQuery)
        : true,
    )
    .map((recipe) => mapRecipeListItem(recipe, listFilter));
}

export async function fetchRecipeDetailPage(
  recipeId: string,
): Promise<RecipeDetailPage> {
  const dto = await apiClient<RecipeDetailApiDto>(
    `/api/v1/recipes/${recipeId}`,
  );

  return mapRecipeDetailApiToPage(dto);
}

export async function fetchRecipeDetail(
  recipeId: string,
): Promise<RecipeDetailPage["recipe"]> {
  const page = await fetchRecipeDetailPage(recipeId);
  return page.recipe;
}

export async function fetchRecipeInteractions(
  recipeId: string,
): Promise<RecipeInteractions | null> {
  try {
    const dto = await apiClient<RecipeInteractionsApiDto>(
      `/api/v1/recipes/${recipeId}/interactions`,
    );

    return mapRecipeInteractionsApiToDomain(dto);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      return null;
    }

    throw error;
  }
}

export async function createRecipeInteractions(
  recipeId: string,
  payload: CreateRecipeInteractionsPayload,
): Promise<RecipeInteractions> {
  const dto = await apiClient<RecipeInteractionsApiDto>(
    `/api/v1/recipes/${recipeId}/interactions`,
    {
      method: "POST",
      body: payload,
    },
  );

  return mapRecipeInteractionsApiToDomain(dto);
}

export async function patchRecipeInteractions(
  recipeId: string,
  payload: PatchRecipeInteractionsPayload,
): Promise<RecipeInteractions> {
  const dto = await apiClient<RecipeInteractionsApiDto>(
    `/api/v1/recipes/${recipeId}/interactions`,
    {
      method: "PATCH",
      body: payload,
    },
  );

  return mapRecipeInteractionsApiToDomain(dto);
}

export async function saveRecipeInteractions(
  recipeId: string,
  payload: PatchRecipeInteractionsPayload,
  current: RecipeInteractions | null,
): Promise<RecipeInteractions> {
  if (current) {
    return patchRecipeInteractions(recipeId, payload);
  }

  return createRecipeInteractions(recipeId, {
    rating: payload.rating ?? null,
    publicComment: payload.publicComment ?? null,
    isFavorite: payload.isFavorite ?? false,
    isHidden: payload.isHidden ?? false,
  });
}

export async function createRecipe(
  payload: CreateRecipePayload,
): Promise<CreateRecipeResponse> {
  return apiClient<CreateRecipeResponse>("/api/v1/recipes", {
    method: "POST",
    body: payload,
  });
}