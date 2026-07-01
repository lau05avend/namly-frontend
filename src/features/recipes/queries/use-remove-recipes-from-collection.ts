"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  recipeCollectionQueryKeys,
  recipeQueryKeys,
} from "@/features/recipes/constants/query-keys";
import { removeRecipesFromCollection } from "@/features/recipes/services/recipe-collections.service";

type RemoveRecipesFromCollectionVariables = {
  collectionId: string;
  recipeIds: string[];
};

export function useRemoveRecipesFromCollection() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      collectionId,
      recipeIds,
    }: RemoveRecipesFromCollectionVariables) =>
      removeRecipesFromCollection(collectionId, { recipeIds }),
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
