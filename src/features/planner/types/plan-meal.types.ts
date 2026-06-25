import type { MealSlot } from "@/constants/meal-slots";
import type { PlanMealFormValues } from "@/features/planner/schemas/plan-meal.schema";
import type { CreateScheduledMealApiResponse } from "@/features/planner/types/plan-meal-api.types";

export type PlanMealDefaultsParams = {
  date?: string;
  mealTypeId?: string;
  mealSlot?: MealSlot;
  scheduledMealId?: string;
};

export type PlanMealDefaults = PlanMealFormValues;

export type SavePlanMealResponse = CreateScheduledMealApiResponse;

export type SavePlanMealPayload = PlanMealFormValues;
