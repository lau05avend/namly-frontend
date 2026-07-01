"use client";

import { useQuery } from "@tanstack/react-query";
import { recipeCollectionQueryKeys } from "@/features/recipes/constants/query-keys";
import {
  fetchRecipeCollection,
  fetchRecipeCollections,
} from "@/features/recipes/services/recipe-collections.service";
import { useAuth } from "@/hooks/use-auth";

type UseRecipeCollectionsOptions = {
  enabled?: boolean;
};

export function useRecipeCollections({
  enabled = true,
}: UseRecipeCollectionsOptions = {}) {
  const { isAuthenticated } = useAuth();

  return useQuery({
    queryKey: recipeCollectionQueryKeys.list(),
    queryFn: fetchRecipeCollections,
    enabled: isAuthenticated && enabled,
  });
}

type UseRecipeCollectionOptions = {
  collectionId: string;
  enabled?: boolean;
};

export function useRecipeCollection({
  collectionId,
  enabled = true,
}: UseRecipeCollectionOptions) {
  const { isAuthenticated } = useAuth();

  return useQuery({
    queryKey: recipeCollectionQueryKeys.detail(collectionId),
    queryFn: () => fetchRecipeCollection(collectionId),
    enabled: isAuthenticated && enabled && Boolean(collectionId),
  });
}
