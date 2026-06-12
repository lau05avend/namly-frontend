"use client";

import { useReducer, useEffect, useCallback, useRef } from "react";
import {
  loadOnboardingFlow,
  saveWizardDraft,
} from "@/features/onboarding/constants/onboarding-flow-storage";
import {
  resolveEffectiveMaxSelections,
} from "@/features/onboarding/utils/onboarding-question.utils";
import type {
  OnboardingQuestion,
  OnboardingResponsesMap,
} from "@/features/onboarding/types/onboarding.types";

type WizardState = {
  currentQuestionIndex: number;
  responses: OnboardingResponsesMap;
};

type WizardAction =
  | { type: "HYDRATE"; payload: WizardState }
  | {
      type: "SELECT_OPTION";
      questionId: string;
      optionId: string;
      inputType: OnboardingQuestion["inputType"];
      allowMultiple: boolean;
      maxSelections: number;
    }
  | { type: "SET_CUSTOM_VALUE"; questionId: string; value: string }
  | { type: "NEXT" }
  | { type: "PREV" }
  | { type: "GO_TO"; index: number };

function getDraft(
  responses: OnboardingResponsesMap,
  questionId: string,
): { optionIds: string[]; customValue?: string } {
  return responses[questionId] ?? { optionIds: [] };
}

function wizardReducer(state: WizardState, action: WizardAction): WizardState {
  switch (action.type) {
    case "HYDRATE":
      return action.payload;

    case "SELECT_OPTION": {
      const current = getDraft(state.responses, action.questionId);
      let optionIds: string[];

      const isMulti =
        action.inputType === "multi_select" || action.allowMultiple;

      if (!isMulti) {
        optionIds = [action.optionId];
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

    case "NEXT":
      return {
        ...state,
        currentQuestionIndex: state.currentQuestionIndex + 1,
      };

    case "PREV":
      return {
        ...state,
        currentQuestionIndex: Math.max(0, state.currentQuestionIndex - 1),
      };

    case "GO_TO":
      return {
        ...state,
        currentQuestionIndex: Math.max(0, action.index),
      };

    default:
      return state;
  }
}

const initialState: WizardState = {
  currentQuestionIndex: 0,
  responses: {},
};

export function useOnboardingWizard(questionCount: number) {
  const [state, dispatch] = useReducer(wizardReducer, initialState);
  const hasHydratedRef = useRef(false);

  useEffect(() => {
    if (hasHydratedRef.current || questionCount === 0) {
      return;
    }

    const flow = loadOnboardingFlow();
    dispatch({
      type: "HYDRATE",
      payload: {
        currentQuestionIndex: Math.min(
          flow.currentQuestionIndex,
          Math.max(0, questionCount - 1),
        ),
        responses: flow.responses,
      },
    });

    hasHydratedRef.current = true;
  }, [questionCount]);

  useEffect(() => {
    if (questionCount === 0 || !hasHydratedRef.current) {
      return;
    }

    saveWizardDraft(state.currentQuestionIndex, state.responses);
  }, [state, questionCount]);

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

  const goNext = useCallback(() => dispatch({ type: "NEXT" }), []);
  const goPrev = useCallback(() => dispatch({ type: "PREV" }), []);
  const goTo = useCallback((index: number) => dispatch({ type: "GO_TO", index }), []);

  const isFirst = state.currentQuestionIndex === 0;
  const isLast = state.currentQuestionIndex >= questionCount - 1;

  return {
    currentQuestionIndex: state.currentQuestionIndex,
    responses: state.responses,
    selectOption,
    setCustomValue,
    goNext,
    goPrev,
    goTo,
    isFirst,
    isLast,
  };
}
