"use client";

import { useQuery } from "@tanstack/react-query";
import { recipeQueryKeys } from "@/features/recipes/constants/query-keys";
import { fetchRecipes } from "@/features/recipes/services/recipes.service";
import type {
  RecipeListFilter,
  RecipeListParams,
} from "@/features/recipes/types/recipe.types";
import { useAuth } from "@/hooks/use-auth";

type UseRecipesOptions = {
  enabled?: boolean;
  filter?: RecipeListFilter;
  tags?: string[];
  title?: string;
  folderId?: string;
};

export function useRecipes({
  enabled = true,
  filter = "all",
  tags = [],
  title = "",
  folderId,
}: UseRecipesOptions = {}) {
  const { isAuthenticated } = useAuth();
  const sortedTags = [...tags].sort().join(",");

  const params: RecipeListParams = {
    filter,
    tags,
    title,
    folderId,
  };

  return useQuery({
    queryKey: recipeQueryKeys.list({
      filter,
      tags: sortedTags,
      title,
      folderId: folderId ?? "",
    }),
    queryFn: () => fetchRecipes(params),
    enabled: isAuthenticated && enabled,
  });
}
