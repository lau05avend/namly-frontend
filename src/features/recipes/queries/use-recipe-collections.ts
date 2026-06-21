"use client";

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { recipeCollectionQueryKeys } from "@/features/recipes/constants/query-keys";
import { fetchRecipeCollections } from "@/features/recipes/services/recipe-collections.service";
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
  const listQuery = useRecipeCollections({ enabled });

  const collection = useMemo(
    () => listQuery.data?.find((item) => item.id === collectionId) ?? null,
    [collectionId, listQuery.data],
  );

  const isNotFound =
    listQuery.isSuccess && listQuery.data != null && collection == null;

  return {
    data: collection,
    isPending: listQuery.isPending,
    isError: listQuery.isError || isNotFound,
  };
}
