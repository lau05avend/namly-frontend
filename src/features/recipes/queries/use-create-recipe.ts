"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toCreateRecipePayload } from "@/features/recipes/mappers/create-recipe.mapper";
import { recipeQueryKeys } from "@/features/recipes/constants/query-keys";
import { createRecipe } from "@/features/recipes/services/recipes.service";
import { resolveRecipeTagIds } from "@/features/recipes/services/recipe-tags.service";
import { uploadRecipeCover } from "@/features/recipes/services/recipe-cover-storage.service";
import type { CreateRecipeFormValues } from "@/features/recipes/schemas/create-recipe.schema";
import { tagQueryKeys } from "@/features/tags/constants/query-keys";
import { RECIPE_TAG_CATEGORY } from "@/features/tags/services/tags.service";
import { useAuth } from "@/hooks/use-auth";

type CreateRecipeVariables = {
  values: CreateRecipeFormValues;
  coverFile?: File;
};

export function useCreateRecipe() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async ({ values, coverFile }: CreateRecipeVariables) => {
      if (!user) {
        throw new Error("Debes iniciar sesión para guardar.");
      }

      const tagIds = await resolveRecipeTagIds(values.tags);

      let coverUrl: string | null = values.coverUrl ?? null;
      if (coverFile) {
        coverUrl = await uploadRecipeCover(coverFile, user.id);
      }

      const payload = toCreateRecipePayload(values, tagIds, coverUrl);
      return createRecipe(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: recipeQueryKeys.all });
      queryClient.invalidateQueries({
        queryKey: tagQueryKeys.byCategory(RECIPE_TAG_CATEGORY),
      });
    },
  });
}
