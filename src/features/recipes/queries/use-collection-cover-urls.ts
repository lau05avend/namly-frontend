"use client";

import { useQueries } from "@tanstack/react-query";
import { recipeCollectionQueryKeys } from "@/features/recipes/constants/query-keys";
import {
  resolveFirstRecipeCoverUrl,
} from "@/features/recipes/services/recipe-collections.service";
import { fetchRecipes } from "@/features/recipes/services/recipes.service";
import type { RecipeCollection } from "@/features/recipes/types/recipe-collection.types";
import { useAuth } from "@/hooks/use-auth";
import { useMemo } from "react";

export function useCollectionCoverUrls(collections: RecipeCollection[]) {
  const { isAuthenticated } = useAuth();

  const collectionsWithRecipes = useMemo(
    () => collections.filter((collection) => collection.recipesCount > 0),
    [collections],
  );

  const coverQueries = useQueries({
    queries: collectionsWithRecipes.map((collection) => ({
      queryKey: recipeCollectionQueryKeys.cover(collection.id),
      queryFn: async () => {
        const recipes = await fetchRecipes({ folderId: collection.id });
        return resolveFirstRecipeCoverUrl(recipes);
      },
      enabled: isAuthenticated,
      staleTime: 5 * 60 * 1000,
    })),
  });

  const coverUrlByCollectionId = useMemo(() => {
    const map = new Map<string, string | null>();

    collectionsWithRecipes.forEach((collection, index) => {
      map.set(collection.id, coverQueries[index]?.data ?? null);
    });

    return map;
  }, [collectionsWithRecipes, coverQueries]);

  const isPending = coverQueries.some((query) => query.isPending);

  return {
    coverUrlByCollectionId,
    isPending,
  };
}
