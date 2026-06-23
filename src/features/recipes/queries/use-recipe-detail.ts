"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { recipeQueryKeys } from "@/features/recipes/constants/query-keys";
import { fetchRecipeDetailPage } from "@/features/recipes/services/recipes.service";
import { useAuth } from "@/hooks/use-auth";

export function useRecipeDetail(recipeId: string) {
  const queryClient = useQueryClient();
  const { isAuthenticated } = useAuth();

  return useQuery({
    queryKey: recipeQueryKeys.detail(recipeId),
    queryFn: async () => {
      const page = await fetchRecipeDetailPage(recipeId);
      queryClient.setQueryData(
        recipeQueryKeys.interactions(recipeId),
        page.interactions,
      );
      return page;
    },
    enabled: isAuthenticated && Boolean(recipeId),
  });
}
