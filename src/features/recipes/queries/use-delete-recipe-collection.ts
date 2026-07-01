"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  recipeCollectionQueryKeys,
  recipeQueryKeys,
} from "@/features/recipes/constants/query-keys";
import { deleteRecipeCollection } from "@/features/recipes/services/recipe-collections.service";

export function useDeleteRecipeCollection() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (collectionId: string) => deleteRecipeCollection(collectionId),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: recipeCollectionQueryKeys.all,
      });
      void queryClient.invalidateQueries({
        queryKey: recipeQueryKeys.all,
      });
    },
  });
}
