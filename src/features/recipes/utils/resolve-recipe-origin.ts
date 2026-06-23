import type { RecipeOriginBadgeId } from "@/features/recipes/constants/recipe-filters";
import type { RecipeListItemApiDto } from "@/features/recipes/types/recipe-api.types";
import type {
  RecipeListFilter,
  RecipeListItem,
} from "@/features/recipes/types/recipe.types";

function apiProvidesOriginFlags(dto: RecipeListItemApiDto): boolean {
  return "isSuggested" in dto || "isPublic" in dto;
}

export function resolveRecipeListItemOriginFlags(
  dto: RecipeListItemApiDto,
  listFilter: RecipeListFilter = "all",
): Pick<RecipeListItem, "isSuggested" | "isPublic"> {
  if (apiProvidesOriginFlags(dto)) {
    return {
      isSuggested: Boolean(dto.isSuggested),
      isPublic: Boolean(dto.isPublic),
    };
  }

  // Backward compat while the list endpoint omits origin flags.
  return {
    isSuggested: listFilter === "suggested",
    isPublic: listFilter === "public",
  };
}

export function resolveRecipeOriginBadgeId(recipe: {
  isSuggested?: boolean;
  isPublic?: boolean;
}): RecipeOriginBadgeId | null {
  if (recipe.isSuggested) {
    return "suggested";
  }

  if (recipe.isPublic) {
    return "public";
  }

  return null;
}
