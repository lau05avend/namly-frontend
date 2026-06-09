import type { MealSlot } from "@/constants/meal-slots";
import type { PlanMealFormValues } from "@/features/planner/schemas/plan-meal.schema";

export type PlanMealDefaultsParams = {
  date?: string;
  mealSlot?: MealSlot;
};

export type PlanMealDefaults = PlanMealFormValues;

export type SavePlanMealResponse = {
  id: string;
  date: string;
};

export type SavePlanMealPayload = PlanMealFormValues;
