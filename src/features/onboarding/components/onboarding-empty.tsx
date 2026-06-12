import { ONBOARDING_COPY } from "@/features/onboarding/constants/onboarding-copy";

export function OnboardingEmpty() {
  return (
    <p className="py-12 text-center text-sm text-foreground/60">
      {ONBOARDING_COPY.wizard.empty}
    </p>
  );
}
