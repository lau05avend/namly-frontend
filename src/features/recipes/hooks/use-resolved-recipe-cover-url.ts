"use client";

import { useQuery } from "@tanstack/react-query";
import { createMealPhotoSignedUrl } from "@/features/meal-register/services/meal-photo-storage.service";
import { extractMealPhotoStoragePath } from "@/features/meal-register/utils/meal-photo-storage.utils";
import { recipeQueryKeys } from "@/features/recipes/constants/query-keys";
import {
  isLegacyRecipeCoverInMealPhotoBucket,
  resolveRecipeCoverDisplayUrlSync,
} from "@/features/recipes/utils/recipe-cover-storage.utils";

export function useResolvedRecipeCoverUrl(coverUrl?: string) {
  const trimmed = coverUrl?.trim() ?? "";
  const syncUrl = trimmed ? resolveRecipeCoverDisplayUrlSync(trimmed) : undefined;
  const legacyStoragePath = trimmed
    ? extractMealPhotoStoragePath(trimmed)
    : null;
  const needsLegacySignedUrl =
    Boolean(trimmed) &&
    !syncUrl &&
    isLegacyRecipeCoverInMealPhotoBucket(trimmed) &&
    legacyStoragePath !== null;

  const legacySignedUrlQuery = useQuery({
    queryKey: recipeQueryKeys.coverDisplayUrl(trimmed),
    queryFn: () => createMealPhotoSignedUrl(legacyStoragePath!),
    enabled: needsLegacySignedUrl,
    staleTime: 55 * 60 * 1000,
  });

  if (!trimmed) {
    return { displayUrl: undefined, isResolving: false };
  }

  if (syncUrl) {
    return { displayUrl: syncUrl, isResolving: false };
  }

  if (needsLegacySignedUrl) {
    return {
      displayUrl: legacySignedUrlQuery.data,
      isResolving: legacySignedUrlQuery.isPending,
    };
  }

  return { displayUrl: undefined, isResolving: false };
}
