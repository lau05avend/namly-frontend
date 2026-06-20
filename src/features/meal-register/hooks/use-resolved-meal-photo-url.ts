"use client";

import { useQuery } from "@tanstack/react-query";
import { registerMealQueryKeys } from "@/features/meal-register/constants/query-keys";
import { resolveMealPhotoDisplayUrl } from "@/features/meal-register/services/meal-photo-storage.service";
import {
  extractMealPhotoStoragePath,
  MEAL_PHOTO_SIGNED_URL_TTL_SECONDS,
} from "@/features/meal-register/utils/meal-photo-storage.utils";
import { isRemoteImageUrl } from "@/features/profile/utils/avatar-storage.utils";

export function useResolvedMealPhotoUrl(mediaRef?: string) {
  const trimmed = mediaRef?.trim() ?? "";
  const storagePath = trimmed ? extractMealPhotoStoragePath(trimmed) : null;
  const needsSignedUrl = storagePath !== null;
  const isDirectUrl =
    trimmed.startsWith("blob:") ||
    (isRemoteImageUrl(trimmed) && !needsSignedUrl);

  const signedUrlQuery = useQuery({
    queryKey: registerMealQueryKeys.mealPhotoDisplayUrl(trimmed),
    queryFn: () => resolveMealPhotoDisplayUrl(trimmed),
    enabled: needsSignedUrl,
    staleTime: (MEAL_PHOTO_SIGNED_URL_TTL_SECONDS - 300) * 1000,
  });

  if (!trimmed) {
    return { displayUrl: undefined, isResolving: false };
  }

  if (isDirectUrl) {
    return { displayUrl: trimmed, isResolving: false };
  }

  return {
    displayUrl: signedUrlQuery.data,
    isResolving: signedUrlQuery.isPending,
  };
}
