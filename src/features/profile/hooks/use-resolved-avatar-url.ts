"use client";

import { useQuery } from "@tanstack/react-query";
import { profileQueryKeys } from "@/features/profile/constants/query-keys";
import { resolveAvatarDisplayUrl } from "@/features/profile/services/avatar-storage.service";
import {
  AVATAR_SIGNED_URL_TTL_SECONDS,
  extractAvatarStoragePath,
  isRemoteImageUrl,
} from "@/features/profile/utils/avatar-storage.utils";

export function useResolvedAvatarUrl(avatarRef?: string) {
  const trimmed = avatarRef?.trim() ?? "";
  const storagePath = trimmed ? extractAvatarStoragePath(trimmed) : null;
  const needsSignedUrl = Boolean(trimmed && storagePath !== null);
  const isDirectUrl =
    trimmed.startsWith("blob:") ||
    (isRemoteImageUrl(trimmed) && !needsSignedUrl);

  const signedUrlQuery = useQuery({
    queryKey: profileQueryKeys.avatarDisplayUrl(trimmed),
    queryFn: () => resolveAvatarDisplayUrl(trimmed),
    enabled: needsSignedUrl,
    staleTime: (AVATAR_SIGNED_URL_TTL_SECONDS - 300) * 1000,
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
