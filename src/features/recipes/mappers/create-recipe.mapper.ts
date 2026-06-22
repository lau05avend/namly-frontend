import type { CreateRecipeFormValues } from "@/features/recipes/schemas/create-recipe.schema";
import type { CreateRecipePayload } from "@/features/recipes/types/create-recipe-api.types";

export function toCreateRecipePayload(
  values: CreateRecipeFormValues,
  tagIds: string[],
  coverUrl: string | null,
): CreateRecipePayload {
  const description = values.description.trim();

  return {
    title: values.title.trim(),
    description: description.length > 0 ? description : null,
    coverUrl,
    isPublic: values.isPublic,
    ingredients: values.ingredients.map((ingredient) => ({
      name: ingredient.name.trim(),
      quantity: ingredient.quantity,
      unitId: ingredient.unitId,
    })),
    steps: values.steps.map((step, index) => ({
      stepOrder: index + 1,
      description: step.description.trim(),
      durationMinutes:
        step.durationMinutes != null && step.durationMinutes > 0
          ? step.durationMinutes
          : null,
    })),
    tagIds,
  };
}
