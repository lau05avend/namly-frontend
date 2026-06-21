import { ModuleEmptyState } from "@/components/ui/module-empty-state";
import { ONBOARDING_COPY } from "@/features/onboarding/constants/onboarding-copy";
import { Sparkles } from "lucide-react";

export function OnboardingEmpty() {
  return (
    <ModuleEmptyState
      module="home"
      icon={Sparkles}
      title={ONBOARDING_COPY.wizard.empty}
    />
  );
}
