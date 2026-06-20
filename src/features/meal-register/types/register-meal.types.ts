import type { RegisterMealFormValues } from "@/features/meal-register/schemas/register-meal.schema";

export type PlanMatchSuggestion = {
  id: string;
  title: string;
  meta: string;
  detail: string;
};

export type ScheduledMealSuggestion = {
  id: string;
  plannedTime: string;
  mealType: {
    id: string;
    name: string;
    sortOrder: number;
  };
  recipes: Array<{
    id: string;
    recipeId: string | null;
    title: string;
    coverUrl: string | null;
    sortOrder: number;
  }>;
  isExpress: boolean;
  expressNote?: string | null;
};

export type SaveRegisterMealInput = {
  values: RegisterMealFormValues;
  photoFile?: File;
  existingMediaUrl?: string;
  logId?: string;
};

export type SaveRegisterMealResponse = { id: string };
