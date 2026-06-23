"use client";

import { useQuery } from "@tanstack/react-query";
import { recipeQueryKeys } from "@/features/recipes/constants/query-keys";
import { fetchRecipeInteractions } from "@/features/recipes/services/recipes.service";
import { useAuth } from "@/hooks/use-auth";

export function useRecipeInteractions(recipeId: string) {
  const { isAuthenticated } = useAuth();

  return useQuery({
    queryKey: recipeQueryKeys.interactions(recipeId),
    queryFn: () => fetchRecipeInteractions(recipeId),
    enabled: isAuthenticated && Boolean(recipeId),
  });
}
