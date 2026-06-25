import type {
  OnboardingQuestion,
  OnboardingResponseDraft,
  OnboardingResponsesMap,
} from "@/features/onboarding/types/onboarding.types";

export type OnboardingCompletionStatus = "empty" | "partial" | "complete";

export function getResponseDraft(
  responses: OnboardingResponsesMap,
  questionId: string,
): OnboardingResponseDraft {
  return responses[questionId] ?? { optionIds: [] };
}

export function isQuestionAnswered(
  questionId: string,
  responses: OnboardingResponsesMap,
): boolean {
  const draft = getResponseDraft(responses, questionId);

  return draft.optionIds.length > 0 || Boolean(draft.customValue?.trim());
}

export function countAnsweredQuestions(
  questions: OnboardingQuestion[],
  responses: OnboardingResponsesMap,
): number {
  return questions.filter((question) =>
    isQuestionAnswered(question.id, responses),
  ).length;
}

export function getOnboardingCompletionStatus(
  questions: OnboardingQuestion[],
  responses: OnboardingResponsesMap,
): OnboardingCompletionStatus {
  if (questions.length === 0) {
    return "empty";
  }

  const answeredCount = countAnsweredQuestions(questions, responses);

  if (answeredCount === 0) {
    return "empty";
  }

  if (answeredCount < questions.length) {
    return "partial";
  }

  return "complete";
}

export function getQuestionResponseSummary(
  question: OnboardingQuestion,
  draft: OnboardingResponseDraft | undefined,
  unansweredLabel: string,
): string {
  if (!draft) {
    return unansweredLabel;
  }

  const labels = draft.optionIds
    .map((optionId) => question.options.find((option) => option.id === optionId)?.label)
    .filter((label): label is string => Boolean(label));

  if (draft.customValue?.trim()) {
    labels.push(draft.customValue.trim());
  }

  return labels.length > 0 ? labels.join(", ") : unansweredLabel;
}

export function findFirstUnansweredQuestionId(
  questions: OnboardingQuestion[],
  responses: OnboardingResponsesMap,
): string | null {
  const unanswered = questions.find(
    (question) => !isQuestionAnswered(question.id, responses),
  );

  return unanswered?.id ?? null;
}

export function serializeResponses(responses: OnboardingResponsesMap): string {
  return JSON.stringify(responses);
}

export function isResponseDraftEmpty(draft: OnboardingResponseDraft): boolean {
  return draft.optionIds.length === 0 && !draft.customValue?.trim();
}

export function isResponseDraftValid(draft: OnboardingResponseDraft): boolean {
  return !isResponseDraftEmpty(draft);
}

export function getChangedQuestionIds(
  current: OnboardingResponsesMap,
  previous: OnboardingResponsesMap,
): string[] {
  const questionIds = new Set([
    ...Object.keys(current),
    ...Object.keys(previous),
  ]);

  return [...questionIds].filter((questionId) => {
    const currentDraft = current[questionId] ?? { optionIds: [] };
    const previousDraft = previous[questionId];

    return !areResponseDraftsEqual(currentDraft, previousDraft);
  });
}

export function getInvalidChangedQuestionIds(
  current: OnboardingResponsesMap,
  previous: OnboardingResponsesMap,
): string[] {
  return getChangedQuestionIds(current, previous).filter((questionId) => {
    const currentDraft = current[questionId] ?? { optionIds: [] };

    return !isResponseDraftValid(currentDraft);
  });
}

export function hadSavedAnswer(
  draft: OnboardingResponseDraft | undefined,
): boolean {
  if (!draft) {
    return false;
  }

  return !isResponseDraftEmpty(draft);
}

export function areResponseDraftsEqual(
  left: OnboardingResponseDraft | undefined,
  right: OnboardingResponseDraft | undefined,
): boolean {
  const a = left ?? { optionIds: [] };
  const b = right ?? { optionIds: [] };

  if (a.optionIds.length !== b.optionIds.length) {
    return false;
  }

  if (!a.optionIds.every((id, index) => id === b.optionIds[index])) {
    return false;
  }

  return (a.customValue?.trim() ?? "") === (b.customValue?.trim() ?? "");
}

export function hasRemovedSavedAnswers(
  current: OnboardingResponsesMap,
  previous: OnboardingResponsesMap,
): boolean {
  const questionIds = new Set([
    ...Object.keys(current),
    ...Object.keys(previous),
  ]);

  return [...questionIds].some((questionId) => {
    const previousDraft = previous[questionId];
    const currentDraft = current[questionId] ?? { optionIds: [] };

    if (!hadSavedAnswer(previousDraft)) {
      return false;
    }

    return !areResponseDraftsEqual(currentDraft, previousDraft);
  });
}
