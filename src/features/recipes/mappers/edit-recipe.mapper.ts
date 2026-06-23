import type { CreateRecipeFormValues } from "@/features/recipes/schemas/create-recipe.schema";
import type { RecipeDetailApiDto } from "@/features/recipes/types/recipe-detail-api.types";
import { createRecipeItemId } from "@/features/recipes/utils/create-recipe-item-id";

export function mapRecipeDetailApiToFormValues(
  dto: RecipeDetailApiDto,
): CreateRecipeFormValues {
  const description = dto.recipe.description?.trim() ?? "";

  return {
    title: dto.recipe.title.trim(),
    description,
    coverUrl: dto.recipe.coverUrl,
    isPublic: dto.recipe.isPublic,
    ingredients: (dto.ingredients ?? []).map((ingredient) => ({
      fieldKey: createRecipeItemId(),
      name: ingredient.name.trim(),
      quantity: ingredient.quantity ?? 1,
      unitId: ingredient.unitId ?? ingredient.unit?.id ?? "",
    })),
    steps: [...(dto.steps ?? [])]
      .sort((left, right) => left.stepOrder - right.stepOrder)
      .map((step) => ({
        fieldKey: createRecipeItemId(),
        description: step.description.trim(),
        durationMinutes: step.durationMinutes,
      })),
    tags: (dto.tags ?? []).map((tag) => ({
      id: tag.id,
      name: tag.name.trim(),
      iconName: tag.iconName,
    })),
  };
}
