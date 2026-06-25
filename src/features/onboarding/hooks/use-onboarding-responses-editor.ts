"use client";

import { useCallback, useEffect, useMemo, useReducer, useRef } from "react";
import {
  getOnboardingCompletionStatus,
  serializeResponses,
} from "@/features/onboarding/utils/onboarding-response.utils";
import {
  resolveEffectiveMaxSelections,
} from "@/features/onboarding/utils/onboarding-question.utils";
import type {
  OnboardingQuestion,
  OnboardingResponsesMap,
} from "@/features/onboarding/types/onboarding.types";

type EditorState = {
  responses: OnboardingResponsesMap;
  initialResponses: OnboardingResponsesMap;
  initialSnapshot: string;
};

type EditorAction =
  | {
      type: "HYDRATE";
      responses: OnboardingResponsesMap;
    }
  | {
      type: "SELECT_OPTION";
      questionId: string;
      optionId: string;
      inputType: OnboardingQuestion["inputType"];
      allowMultiple: boolean;
      maxSelections: number;
    }
  | { type: "SET_CUSTOM_VALUE"; questionId: string; value: string };

function getDraft(
  responses: OnboardingResponsesMap,
  questionId: string,
): { optionIds: string[]; customValue?: string } {
  return responses[questionId] ?? { optionIds: [] };
}

function editorReducer(state: EditorState, action: EditorAction): EditorState {
  switch (action.type) {
    case "HYDRATE":
      return {
        responses: action.responses,
        initialResponses: action.responses,
        initialSnapshot: serializeResponses(action.responses),
      };

    case "SELECT_OPTION": {
      const current = getDraft(state.responses, action.questionId);
      let optionIds: string[];

      const isMulti =
        action.inputType === "multi_select" || action.allowMultiple;

      if (!isMulti) {
        optionIds = current.optionIds.includes(action.optionId)
          ? []
          : [action.optionId];
      } else {
        const isSelected = current.optionIds.includes(action.optionId);

        if (isSelected) {
          optionIds = current.optionIds.filter((id) => id !== action.optionId);
        } else if (
          action.maxSelections > 0 &&
          current.optionIds.length >= action.maxSelections
        ) {
          return state;
        } else {
          optionIds = [...current.optionIds, action.optionId];
        }
      }

      return {
        ...state,
        responses: {
          ...state.responses,
          [action.questionId]: {
            ...current,
            optionIds,
          },
        },
      };
    }

    case "SET_CUSTOM_VALUE": {
      const current = getDraft(state.responses, action.questionId);

      return {
        ...state,
        responses: {
          ...state.responses,
          [action.questionId]: {
            ...current,
            customValue: action.value,
          },
        },
      };
    }

    default:
      return state;
  }
}

const initialState: EditorState = {
  responses: {},
  initialResponses: {},
  initialSnapshot: serializeResponses({}),
};

type UseOnboardingResponsesEditorOptions = {
  questions: OnboardingQuestion[] | undefined;
  savedResponses: OnboardingResponsesMap | undefined;
  isReady: boolean;
};

export function useOnboardingResponsesEditor({
  questions,
  savedResponses,
  isReady,
}: UseOnboardingResponsesEditorOptions) {
  const [state, dispatch] = useReducer(editorReducer, initialState);
  const hasHydratedRef = useRef(false);

  useEffect(() => {
    if (!isReady || hasHydratedRef.current) {
      return;
    }

    dispatch({
      type: "HYDRATE",
      responses: savedResponses ?? {},
    });

    hasHydratedRef.current = true;
  }, [isReady, savedResponses]);

  const selectOption = useCallback(
    (question: OnboardingQuestion, optionId: string) => {
      dispatch({
        type: "SELECT_OPTION",
        questionId: question.id,
        optionId,
        inputType: question.inputType,
        allowMultiple: question.allowMultiple,
        maxSelections: resolveEffectiveMaxSelections(question),
      });
    },
    [],
  );

  const setCustomValue = useCallback((questionId: string, value: string) => {
    dispatch({ type: "SET_CUSTOM_VALUE", questionId, value });
  }, []);

  const status = useMemo(
    () =>
      questions
        ? getOnboardingCompletionStatus(questions, state.responses)
        : "empty",
    [questions, state.responses],
  );

  const isDirty =
    serializeResponses(state.responses) !== state.initialSnapshot;

  return {
    responses: state.responses,
    initialResponses: state.initialResponses,
    status,
    isDirty,
    selectOption,
    setCustomValue,
  };
}
