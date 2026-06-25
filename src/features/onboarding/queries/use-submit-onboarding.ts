"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { profileQueryKeys } from "@/features/profile/constants/query-keys";
import { onboardingQueryKeys } from "@/features/onboarding/constants/query-keys";
import { submitOnboardingResponses } from "@/features/onboarding/services/onboarding.service";
import type { OnboardingResponsesMap } from "@/features/onboarding/types/onboarding.types";

export function useSubmitOnboarding() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (responses: OnboardingResponsesMap) =>
      submitOnboardingResponses(responses),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: profileQueryKeys.all }),
        queryClient.invalidateQueries({
          queryKey: onboardingQueryKeys.responses(),
        }),
      ]);
    },
  });
}
