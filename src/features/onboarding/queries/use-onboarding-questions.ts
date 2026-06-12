"use client";

import { useQuery } from "@tanstack/react-query";
import { onboardingQueryKeys } from "@/features/onboarding/constants/query-keys";
import { fetchOnboardingQuestions } from "@/features/onboarding/services/onboarding.service";
import { useAuth } from "@/hooks/use-auth";

export function useOnboardingQuestions() {
  const { isAuthenticated } = useAuth();

  return useQuery({
    queryKey: onboardingQueryKeys.questions(),
    queryFn: fetchOnboardingQuestions,
    enabled: isAuthenticated,
  });
}
