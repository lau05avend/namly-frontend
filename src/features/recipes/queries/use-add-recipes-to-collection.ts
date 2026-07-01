"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  recipeCollectionQueryKeys,
  recipeQueryKeys,
} from "@/features/recipes/constants/query-keys";
import { addRecipesToCollection } from "@/features/recipes/services/recipe-collections.service";

type AddRecipesToCollectionVariables = {
  collectionId: string;
  recipeIds: string[];
};

export function useAddRecipesToCollection() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ collectionId, recipeIds }: AddRecipesToCollectionVariables) =>
      addRecipesToCollection(collectionId, { recipeIds }),
    onSuccess: (_data, variables) => {
      void queryClient.invalidateQueries({
        queryKey: recipeCollectionQueryKeys.all,
      });
      void queryClient.invalidateQueries({
        queryKey: recipeCollectionQueryKeys.detail(variables.collectionId),
      });
      void queryClient.invalidateQueries({
        queryKey: recipeQueryKeys.all,
      });
    },
  });
}
