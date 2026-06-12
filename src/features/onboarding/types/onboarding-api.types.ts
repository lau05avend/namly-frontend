export type OnboardingInputTypeApi = "single_select" | "multi_select";

export type OnboardingOptionsLayoutApi = "chips" | "list";

export type OnboardingOptionApiDto = {
  id: string;
  label: string;
  iconName: string;
  isDefault: boolean;
  sortOrder: number;
};

export type OnboardingQuestionApiDto = {
  id: string;
  questionText: string;
  inputType: OnboardingInputTypeApi;
  allowCustomInput: boolean;
  allowMultiple: boolean;
  maxSelections: number;
  sortOrder: number;
  questionIconName: string;
  optionsLayout: OnboardingOptionsLayoutApi;
  options: OnboardingOptionApiDto[];
};

export type SubmitOnboardingResponsesApiPayload = {
  responses: {
    questionId: string;
    optionIds: string[];
    customValue?: string;
  }[];
};
