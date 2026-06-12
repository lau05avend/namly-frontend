import type {
  OnboardingInputType,
  OnboardingQuestion,
} from "@/features/onboarding/types/onboarding.types";

export function isMultiSelectQuestion(question: OnboardingQuestion): boolean {
  return question.inputType === "multi_select" || question.allowMultiple;
}

export function resolveEffectiveMaxSelections(
  question: OnboardingQuestion,
): number {
  if (question.maxSelections > 0) {
    return question.maxSelections;
  }

  if (isMultiSelectQuestion(question)) {
    return Math.max(question.options.length, 1);
  }

  return 1;
}

export function normalizeInputType(value: unknown): OnboardingInputType {
  const normalized = String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/-/g, "_");

  if (normalized === "multi_select" || normalized === "multiselect") {
    return "multi_select";
  }

  return "single_select";
}
