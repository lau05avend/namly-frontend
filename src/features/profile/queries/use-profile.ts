"use client";

import { useQuery } from "@tanstack/react-query";
import { profileQueryKeys } from "@/features/profile/constants/query-keys";
import { bootstrapAndFetchProfile } from "@/features/profile/services/profile.service";
import { useAuth } from "@/hooks/use-auth";

function resolveBootstrapDisplayName(
  metadata: Record<string, unknown> | undefined,
): string | undefined {
  if (!metadata) {
    return undefined;
  }

  const fullName = metadata.full_name;
  if (typeof fullName === "string" && fullName.trim().length > 0) {
    return fullName.trim();
  }

  const name = metadata.name;
  if (typeof name === "string" && name.trim().length > 0) {
    return name.trim();
  }

  return undefined;
}

export function useProfile() {
  const { user, isAuthenticated } = useAuth();

  return useQuery({
    queryKey: profileQueryKeys.detail(),
    queryFn: () =>
      bootstrapAndFetchProfile(
        resolveBootstrapDisplayName(user?.user_metadata),
      ),
    enabled: isAuthenticated,
  });
}
