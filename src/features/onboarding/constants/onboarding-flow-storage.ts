import type { OnboardingResponsesMap } from "@/features/onboarding/types/onboarding.types";

const FLOW_KEY = "namly-onboarding-flow";

export type OnboardingFlowState = {
  onboardingStarted: boolean;
  currentQuestionIndex: number;
  responses: OnboardingResponsesMap;
};

const emptyFlowState = (): OnboardingFlowState => ({
  onboardingStarted: false,
  currentQuestionIndex: 0,
  responses: {},
});

export function loadOnboardingFlow(): OnboardingFlowState {
  if (typeof window === "undefined") {
    return emptyFlowState();
  }

  try {
    const raw = sessionStorage.getItem(FLOW_KEY);
    if (!raw) {
      return emptyFlowState();
    }

    const parsed = JSON.parse(raw) as Partial<
      OnboardingFlowState & { displayNameStepCompleted?: boolean }
    >;

    return {
      onboardingStarted:
        parsed.onboardingStarted ?? parsed.displayNameStepCompleted ?? false,
      currentQuestionIndex: parsed.currentQuestionIndex ?? 0,
      responses: parsed.responses ?? {},
    };
  } catch {
    return emptyFlowState();
  }
}

export function saveOnboardingFlow(state: OnboardingFlowState): void {
  if (typeof window === "undefined") {
    return;
  }

  sessionStorage.setItem(FLOW_KEY, JSON.stringify(state));
}

export function markOnboardingStarted(): void {
  const current = loadOnboardingFlow();
  saveOnboardingFlow({ ...current, onboardingStarted: true });
}

export function saveWizardDraft(
  currentQuestionIndex: number,
  responses: OnboardingResponsesMap,
): void {
  const current = loadOnboardingFlow();
  saveOnboardingFlow({
    ...current,
    currentQuestionIndex,
    responses,
  });
}

export function clearWizardProgress(): void {
  const current = loadOnboardingFlow();
  saveOnboardingFlow({
    ...current,
    currentQuestionIndex: 0,
    responses: {},
  });
}

export function clearOnboardingFlow(): void {
  if (typeof window === "undefined") {
    return;
  }

  sessionStorage.removeItem(FLOW_KEY);
}
