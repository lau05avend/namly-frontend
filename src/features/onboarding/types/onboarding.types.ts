export type OnboardingInputType = "single_select" | "multi_select";

export type OnboardingOptionsLayout = "chips" | "list";

export type OnboardingOption = {
  id: string;
  label: string;
  iconName: string;
};

export type OnboardingQuestion = {
  id: string;
  text: string;
  inputType: OnboardingInputType;
  allowCustomInput: boolean;
  allowMultiple: boolean;
  maxSelections: number;
  questionIconName: string;
  optionsLayout: OnboardingOptionsLayout;
  options: OnboardingOption[];
};

export type OnboardingResponseDraft = {
  optionIds: string[];
  customValue?: string;
};

export type OnboardingResponsesMap = Record<string, OnboardingResponseDraft>;

export type SubmitOnboardingPayload = {
  responses: {
    questionId: string;
    optionIds: string[];
    customValue?: string;
  }[];
};
