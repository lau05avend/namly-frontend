"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { profileQueryKeys } from "@/features/profile/constants/query-keys";
import { submitOnboardingResponses } from "@/features/onboarding/services/onboarding.service";
import type { OnboardingResponsesMap } from "@/features/onboarding/types/onboarding.types";

export function useSubmitOnboarding() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (responses: OnboardingResponsesMap) =>
      submitOnboardingResponses(responses),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: profileQueryKeys.all });
    },
  });
}
