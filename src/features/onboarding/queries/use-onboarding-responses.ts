"use client";

import { useQuery } from "@tanstack/react-query";
import { onboardingQueryKeys } from "@/features/onboarding/constants/query-keys";
import { fetchOnboardingResponses } from "@/features/onboarding/services/onboarding.service";
import { useAuth } from "@/hooks/use-auth";

export function useOnboardingResponses() {
  const { isAuthenticated } = useAuth();

  return useQuery({
    queryKey: onboardingQueryKeys.responses(),
    queryFn: fetchOnboardingResponses,
    enabled: isAuthenticated,
  });
}
