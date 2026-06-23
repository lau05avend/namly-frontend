"use client";

import { useQuery } from "@tanstack/react-query";
import { mapRecipeDetailApiToFormValues } from "@/features/recipes/mappers/edit-recipe.mapper";
import { recipeQueryKeys } from "@/features/recipes/constants/query-keys";
import type { RecipeDetailApiDto } from "@/features/recipes/types/recipe-detail-api.types";
import { apiClient } from "@/lib/api/api-client";
import { useAuth } from "@/hooks/use-auth";

async function fetchRecipeDetailApi(
  recipeId: string,
): Promise<RecipeDetailApiDto> {
  return apiClient<RecipeDetailApiDto>(`/api/v1/recipes/${recipeId}`);
}

export function useRecipeEditForm(recipeId: string) {
  const { isAuthenticated } = useAuth();

  return useQuery({
    queryKey: recipeQueryKeys.editForm(recipeId),
    queryFn: async () => {
      const dto = await fetchRecipeDetailApi(recipeId);
      return mapRecipeDetailApiToFormValues(dto);
    },
    enabled: isAuthenticated && Boolean(recipeId),
  });
}
