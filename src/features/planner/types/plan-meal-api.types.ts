import type { ScheduledMealApiDto } from "@/features/planner/types/planner-api.types";

export type CreateScheduledMealApiPayload = {
  mealTypeId: string;
  entryDate: string;
  plannedTime: string;
  isExpress: boolean;
  expressNote?: string;
  recipeIds?: string[];
};

export type CreateScheduledMealApiResponse = ScheduledMealApiDto;
