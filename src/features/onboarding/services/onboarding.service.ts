import {
  mapQuestions,
  mapResponsesFromApi,
  mapResponsesToPatchPayload,
  mapResponsesToSubmitPayload,
  toApiSubmitPayload,
} from "@/features/onboarding/mappers/onboarding.mapper";
import type {
  OnboardingQuestionApiDto,
  OnboardingResponseApiDto,
} from "@/features/onboarding/types/onboarding-api.types";
import type {
  OnboardingQuestion,
  OnboardingResponsesMap,
} from "@/features/onboarding/types/onboarding.types";
import { apiClient } from "@/lib/api/api-client";

export async function fetchOnboardingQuestions(): Promise<OnboardingQuestion[]> {
  const data = await apiClient<OnboardingQuestionApiDto[]>(
    "/api/v1/onboarding/questions",
  );

  return mapQuestions(data);
}

export async function fetchOnboardingResponses(): Promise<OnboardingResponsesMap> {
  const data = await apiClient<OnboardingResponseApiDto[]>(
    "/api/v1/onboarding/responses",
  );

  return mapResponsesFromApi(data);
}

export async function submitOnboardingResponses(
  responses: OnboardingResponsesMap,
): Promise<void> {
  const payload = mapResponsesToSubmitPayload(responses);

  await apiClient<void>("/api/v1/onboarding/responses", {
    method: "POST",
    body: toApiSubmitPayload(payload),
  });
}

export async function patchOnboardingResponses(
  current: OnboardingResponsesMap,
  previous: OnboardingResponsesMap,
): Promise<void> {
  const payload = mapResponsesToPatchPayload(current, previous);

  await apiClient<void>("/api/v1/onboarding/responses", {
    method: "PATCH",
    body: payload,
  });
}
