import type { RecipeListItemApiDto } from "@/features/recipes/types/recipe-api.types";
import type {
  RecipeListFilter,
  RecipeListItem,
  RecipeListParams,
} from "@/features/recipes/types/recipe.types";
import { apiClient } from "@/lib/api/api-client";
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