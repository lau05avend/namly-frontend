"use client";

import { useQuery } from "@tanstack/react-query";
import { profileQueryKeys } from "@/features/profile/constants/query-keys";
import { bootstrapAndFetchProfile } from "@/features/profile/services/profile.service";
import { resolveGoogleDisplayName } from "@/features/profile/utils/resolve-google-display-name";
import { useAuth } from "@/hooks/use-auth";

export function useProfile() {
  const { user, isAuthenticated } = useAuth();

  return useQuery({
    queryKey: profileQueryKeys.detail(),
    queryFn: () =>
      bootstrapAndFetchProfile(
        resolveGoogleDisplayName(user?.user_metadata) || undefined,
      ),
    enabled: isAuthenticated,
  });
}
