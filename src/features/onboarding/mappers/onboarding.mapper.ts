import {
  normalizeInputType,
  resolveEffectiveMaxSelections,
} from "@/features/onboarding/utils/onboarding-question.utils";
import type {
  OnboardingOptionApiDto,
  OnboardingQuestionApiDto,
  OnboardingOptionsLayoutApi,
  OnboardingResponseApiDto,
  PatchOnboardingResponsesApiPayload,
  SubmitOnboardingResponsesApiPayload,
} from "@/features/onboarding/types/onboarding-api.types";
import type {
  OnboardingOption,
  OnboardingOptionsLayout,
  OnboardingQuestion,
  OnboardingResponseDraft,
  OnboardingResponsesMap,
  SubmitOnboardingPayload,
} from "@/features/onboarding/types/onboarding.types";
import {
  areResponseDraftsEqual,
} from "@/features/onboarding/utils/onboarding-response.utils";

type RawRecord = Record<string, unknown>;

function readString(raw: RawRecord, ...keys: string[]): string {
  for (const key of keys) {
    const value = raw[key];
    if (typeof value === "string" && value.trim().length > 0) {
      return value.trim();
    }
  }

  return "";
}

function readIconName(raw: RawRecord, ...keys: string[]): string {
  for (const key of keys) {
    const value = raw[key];

    if (typeof value === "string" && value.trim().length > 0) {
      return value.trim();
    }

    if (value && typeof value === "object" && "name" in value) {
      const nested = (value as { name?: unknown }).name;
      if (typeof nested === "string" && nested.trim().length > 0) {
        return nested.trim();
      }
    }
  }

  return "";
}

function readBoolean(raw: RawRecord, ...keys: string[]): boolean {
  for (const key of keys) {
    const value = raw[key];
    if (typeof value === "boolean") {
      return value;
    }
  }

  return false;
}

function readNumber(raw: RawRecord, ...keys: string[]): number | null {
  for (const key of keys) {
    const value = raw[key];
    if (typeof value === "number" && Number.isFinite(value)) {
      return value;
    }
  }

  return null;
}

function mapOptionsLayout(
  layout: OnboardingOptionsLayoutApi | string | undefined,
): OnboardingOptionsLayout {
  return String(layout ?? "").toLowerCase() === "list" ? "list" : "chips";
}

function mapOption(dto: OnboardingOptionApiDto): OnboardingOption {
  const raw = dto as OnboardingOptionApiDto & RawRecord;

  return {
    id: dto.id,
    label: dto.label,
    iconName: readIconName(raw, "iconName", "icon_name", "icon"),
  };
}

export function mapQuestion(dto: OnboardingQuestionApiDto): OnboardingQuestion {
  const raw = dto as OnboardingQuestionApiDto & RawRecord;
  const options = [...dto.options]
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map(mapOption);

  const inputType = normalizeInputType(
    readString(raw, "inputType", "input_type") || dto.inputType,
  );
  const allowMultiple = readBoolean(raw, "allowMultiple", "allow_multiple") || dto.allowMultiple;
  const maxFromApi = readNumber(raw, "maxSelections", "max_selections") ?? dto.maxSelections;

  const question: OnboardingQuestion = {
    id: dto.id,
    text: readString(raw, "questionText", "question_text") || dto.questionText,
    inputType: inputType === "multi_select" || allowMultiple ? "multi_select" : inputType,
    allowCustomInput:
      readBoolean(raw, "allowCustomInput", "allow_custom_input") || dto.allowCustomInput,
    allowMultiple,
    maxSelections: maxFromApi ?? 0,
    questionIconName: readIconName(
      raw,
      "questionIconName",
      "question_icon_name",
      "iconName",
      "icon_name",
    ),
    optionsLayout: mapOptionsLayout(
      (readString(raw, "optionsLayout", "options_layout") ||
        dto.optionsLayout) as OnboardingOptionsLayoutApi,
    ),
    options,
  };

  return {
    ...question,
    maxSelections: resolveEffectiveMaxSelections(question),
  };
}

export function mapQuestions(
  dtos: OnboardingQuestionApiDto[],
): OnboardingQuestion[] {
  return [...dtos]
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map(mapQuestion);
}

export function mapResponsesFromApi(
  dtos: OnboardingResponseApiDto[],
): OnboardingResponsesMap {
  return dtos.reduce<OnboardingResponsesMap>((accumulator, dto) => {
    const customValue = dto.customValue?.trim();

    accumulator[dto.questionId] = {
      optionIds: dto.optionIds ?? [],
      ...(customValue ? { customValue } : {}),
    };

    return accumulator;
  }, {});
}

export function mapResponsesToSubmitPayload(
  responses: OnboardingResponsesMap,
): SubmitOnboardingPayload {
  const entries = Object.entries(responses).filter(([, draft]) => {
    const hasOptions = draft.optionIds.length > 0;
    const hasCustom = Boolean(draft.customValue?.trim());
    return hasOptions || hasCustom;
  });

  return {
    responses: entries.map(([questionId, draft]) => ({
      questionId,
      optionIds: draft.optionIds,
      ...(draft.customValue?.trim()
        ? { customValue: draft.customValue.trim() }
        : {}),
    })),
  };
}

function toPatchResponseEntry(
  questionId: string,
  currentDraft: OnboardingResponseDraft,
  previousDraft: OnboardingResponseDraft | undefined,
): PatchOnboardingResponsesApiPayload["responses"][number] {
  const customTrimmed = currentDraft.customValue?.trim();
  const previousHadCustom = Boolean(previousDraft?.customValue?.trim());

  return {
    questionId,
    optionIds: currentDraft.optionIds,
    ...(customTrimmed
      ? { customValue: customTrimmed }
      : previousHadCustom
        ? { customValue: null }
        : {}),
  };
}

export function mapResponsesToPatchPayload(
  current: OnboardingResponsesMap,
  previous: OnboardingResponsesMap,
): PatchOnboardingResponsesApiPayload {
  const questionIds = new Set([
    ...Object.keys(current),
    ...Object.keys(previous),
  ]);

  const responses = [...questionIds].flatMap((questionId) => {
    const currentDraft = current[questionId] ?? { optionIds: [] };
    const previousDraft = previous[questionId];

    if (areResponseDraftsEqual(currentDraft, previousDraft)) {
      return [];
    }

    const hasOptions = currentDraft.optionIds.length > 0;
    const hasCustom = Boolean(currentDraft.customValue?.trim());

    if (!hasOptions && !hasCustom) {
      return [];
    }

    return [toPatchResponseEntry(questionId, currentDraft, previousDraft)];
  });

  return { responses };
}

export function toApiSubmitPayload(
  payload: SubmitOnboardingPayload,
): SubmitOnboardingResponsesApiPayload {
  return payload;
}
