"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { recipeCollectionQueryKeys } from "@/features/recipes/constants/query-keys";
import { updateRecipeCollection } from "@/features/recipes/services/recipe-collections.service";
import type { UpdateRecipeCollectionApiPayload } from "@/features/recipes/types/recipe-collection-api.types";

type UpdateRecipeCollectionVariables = {
  collectionId: string;
  payload: UpdateRecipeCollectionApiPayload;
};

export function useUpdateRecipeCollection() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ collectionId, payload }: UpdateRecipeCollectionVariables) =>
      updateRecipeCollection(collectionId, payload),
    onSuccess: (_data, variables) => {
      void queryClient.invalidateQueries({
        queryKey: recipeCollectionQueryKeys.all,
      });
      void queryClient.invalidateQueries({
        queryKey: recipeCollectionQueryKeys.detail(variables.collectionId),
      });
    },
  });
}
