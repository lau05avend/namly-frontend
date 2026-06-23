"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { recipeQueryKeys } from "@/features/recipes/constants/query-keys";
import { deleteRecipe } from "@/features/recipes/services/recipes.service";
import { useAuth } from "@/hooks/use-auth";

export function useDeleteRecipe() {
  const queryClient = useQueryClient();
  const { isAuthenticated } = useAuth();

  return useMutation({
    mutationFn: (recipeId: string) => {
      if (!isAuthenticated) {
        throw new Error("Debes iniciar sesión para eliminar.");
      }

      return deleteRecipe(recipeId);
    },
    onSuccess: (_data, recipeId) => {
      queryClient.invalidateQueries({ queryKey: recipeQueryKeys.all });
      queryClient.removeQueries({
        queryKey: recipeQueryKeys.detail(recipeId),
      });
      queryClient.removeQueries({
        queryKey: recipeQueryKeys.interactions(recipeId),
      });
      queryClient.removeQueries({
        queryKey: recipeQueryKeys.editForm(recipeId),
      });
    },
  });
}
