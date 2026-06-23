"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { recipeQueryKeys } from "@/features/recipes/constants/query-keys";
import type { PatchRecipeInteractionsPayload } from "@/features/recipes/types/recipe-interactions-api.types";
import type { RecipeDetailPage } from "@/features/recipes/types/recipe-detail-api.types";
import type { RecipeInteractions } from "@/features/recipes/types/recipe-interactions.types";
import { saveRecipeInteractions } from "@/features/recipes/services/recipes.service";

type SaveRecipeInteractionsVariables = {
  recipeId: string;
  payload: PatchRecipeInteractionsPayload;
};

export function useSaveRecipeInteractions() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ recipeId, payload }: SaveRecipeInteractionsVariables) => {
      const current =
        queryClient.getQueryData<RecipeInteractions | null>(
          recipeQueryKeys.interactions(recipeId),
        ) ??
        queryClient.getQueryData<RecipeDetailPage>(
          recipeQueryKeys.detail(recipeId),
        )?.interactions ??
        null;

      return saveRecipeInteractions(recipeId, payload, current);
    },
    onSuccess: (interactions, { recipeId }) => {
      queryClient.setQueryData(
        recipeQueryKeys.interactions(recipeId),
        interactions,
      );
      queryClient.setQueryData<RecipeDetailPage | undefined>(
        recipeQueryKeys.detail(recipeId),
        (current) => (current ? { ...current, interactions } : current),
      );
      queryClient.invalidateQueries({ queryKey: recipeQueryKeys.all });
    },
  });
}
