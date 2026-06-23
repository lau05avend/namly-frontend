import type {
  RecipeDetailApiDto,
  RecipeDetailPage,
} from "@/features/recipes/types/recipe-detail-api.types";
import type { RecipeDetail } from "@/features/recipes/types/recipe-detail.types";
import { mapRecipeInteractionsApiToDomain } from "@/features/recipes/mappers/recipe-interactions.mapper";
import { RECIPES_COPY } from "@/features/recipes/constants/recipes-copy";

function resolveSourceLabel(
  recipe: RecipeDetailApiDto["recipe"],
): string | null {
  if (recipe.isSuggested) {
    return RECIPES_COPY.recipeDetail.sourceSuggested;
  }

  return null;
}

function mapIngredient(
  dto: RecipeDetailApiDto["ingredients"][number],
): RecipeDetail["ingredients"][number] {
  return {
    name: dto.name.trim(),
    quantity: dto.quantity ?? 0,
    unitAbbreviation:
      dto.unit?.abbreviation?.trim() ||
      dto.unit?.name?.trim() ||
      RECIPES_COPY.create.ingredients.unitFallback,
  };
}

export function mapRecipeDetailApiToPage(dto: RecipeDetailApiDto): RecipeDetailPage {
  const summary = dto.recipe;
  const description = summary.description?.trim() ?? "";

  const recipe: RecipeDetail = {
    id: summary.id,
    title: summary.title.trim(),
    description: description.length > 0 ? description : null,
    coverUrl: summary.coverUrl,
    isPublic: summary.isPublic,
    isSuggested: summary.isSuggested ?? false,
    authorName: null,
    authorAvatarUrl: null,
    sourceLabel: resolveSourceLabel(summary),
    hasCompatibilityWarning: false,
    canEdit: summary.canEdit ?? dto.canEdit ?? false,
    canDelete: summary.canDelete ?? dto.canDelete ?? false,
    tags: (dto.tags ?? []).map((tag) => ({
      id: tag.id,
      name: tag.name.trim(),
      iconName: tag.iconName,
    })),
    ingredients: (dto.ingredients ?? []).map(mapIngredient),
    steps: [...(dto.steps ?? [])]
      .sort((left, right) => left.stepOrder - right.stepOrder)
      .map((step) => ({
        stepOrder: step.stepOrder,
        description: step.description.trim(),
        durationMinutes: step.durationMinutes,
      })),
  };

  return {
    recipe,
    interactions: mapRecipeInteractionsApiToDomain(dto.interaction),
  };
}
