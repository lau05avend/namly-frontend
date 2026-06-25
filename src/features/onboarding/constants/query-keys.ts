export const onboardingQueryKeys = {
  all: ["onboarding"] as const,
  questions: () => [...onboardingQueryKeys.all, "questions"] as const,
  responses: () => [...onboardingQueryKeys.all, "responses"] as const,
};
