import type { RegisterMealFormValues } from "@/features/meal-register/schemas/register-meal.schema";

export type PlanMatchSuggestion = {
  id: string;
  title: string;
  meta: string;
  detail: string;
};

export type RegisterMealDefaults = RegisterMealFormValues & {
  planSuggestion?: PlanMatchSuggestion;
};

export type RegisterMealDefaultsParams = {
  date?: string;
};

export type SaveRegisterMealPayload = RegisterMealFormValues;
export type SaveRegisterMealResponse = { id: string; date: string };
