"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { onboardingQueryKeys } from "@/features/onboarding/constants/query-keys";
import { patchOnboardingResponses } from "@/features/onboarding/services/onboarding.service";
import type { OnboardingResponsesMap } from "@/features/onboarding/types/onboarding.types";
import { profileQueryKeys } from "@/features/profile/constants/query-keys";

type PatchOnboardingVariables = {
  current: OnboardingResponsesMap;
  previous: OnboardingResponsesMap;
};

export function usePatchOnboardingResponses() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ current, previous }: PatchOnboardingVariables) =>
      patchOnboardingResponses(current, previous),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: onboardingQueryKeys.responses(),
        }),
        queryClient.invalidateQueries({ queryKey: profileQueryKeys.all }),
      ]);
    },
  });
}
