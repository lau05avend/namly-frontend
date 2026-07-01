"use client";

import { useMemo } from "react";
import { useRecipes } from "@/features/recipes/queries/use-recipes";
import type { RecipeListFilter } from "@/features/recipes/types/recipe.types";

type UseRecipePickerListOptions = {
  enabled?: boolean;
  filter?: RecipeListFilter;
  tags?: string[];
  title?: string;
  folderId?: string;
};

export function useRecipePickerList({
  enabled = true,
  filter = "all",
  tags = [],
  title = "",
  folderId,
}: UseRecipePickerListOptions = {}) {
  const trimmedTitle = title.trim();
  const normalizedTitle = trimmedTitle.toLowerCase();

  const baseQuery = useRecipes({
    enabled,
    filter,
    tags,
    title: "",
    folderId,
  });

  const localMatches = useMemo(() => {
    const recipes = baseQuery.data ?? [];

    if (!normalizedTitle) {
      return recipes;
    }

    return recipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(normalizedTitle),
    );
  }, [baseQuery.data, normalizedTitle]);

  const shouldSearchRemote =
    enabled && normalizedTitle.length > 0 && localMatches.length === 0;

  const remoteQuery = useRecipes({
    enabled: shouldSearchRemote,
    filter,
    tags,
    title: trimmedTitle,
    folderId,
  });

  const recipes = useMemo(() => {
    if (!normalizedTitle) {
      return baseQuery.data ?? [];
    }

    if (localMatches.length > 0) {
      return localMatches;
    }

    return remoteQuery.data ?? [];
  }, [normalizedTitle, baseQuery.data, localMatches, remoteQuery.data]);

  const isPending =
    baseQuery.isPending || (shouldSearchRemote && remoteQuery.isPending);

  const isError = baseQuery.isError || remoteQuery.isError;

  return {
    recipes,
    isPending,
    isError,
  };
}
