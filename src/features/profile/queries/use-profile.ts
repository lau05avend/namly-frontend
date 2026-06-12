"use client";

import { useQuery } from "@tanstack/react-query";
import { profileQueryKeys } from "@/features/profile/constants/query-keys";
import { fetchProfile } from "@/features/profile/services/profile.service";
import { useAuth } from "@/hooks/use-auth";

export function useProfile() {
  const { isAuthenticated } = useAuth();

  return useQuery({
    queryKey: profileQueryKeys.detail(),
    queryFn: fetchProfile,
    enabled: isAuthenticated,
  });
}
