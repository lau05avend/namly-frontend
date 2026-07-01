"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { recipeCollectionQueryKeys } from "@/features/recipes/constants/query-keys";
import { createRecipeCollection } from "@/features/recipes/services/recipe-collections.service";
import type { CreateRecipeCollectionApiPayload } from "@/features/recipes/types/recipe-collection-api.types";

export function useCreateRecipeCollection() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateRecipeCollectionApiPayload) =>
      createRecipeCollection(payload),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: recipeCollectionQueryKeys.all,
      });
    },
  });
}
