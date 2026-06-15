import type { CreateScheduledMealApiPayload } from "@/features/planner/types/plan-meal-api.types";
import type {
  SavePlanMealPayload,
  SavePlanMealResponse,
} from "@/features/planner/types/plan-meal.types";
import { apiClient } from "@/lib/api/api-client";

function toCreateScheduledMealPayload(
  payload: SavePlanMealPayload,
): CreateScheduledMealApiPayload {
  const isExpress = payload.entryMode === "express";

  if (isExpress) {
    return {
      mealTypeId: payload.mealTypeId,
      entryDate: payload.date,
      plannedTime: payload.time,
      isExpress: true,
      expressNote: payload.expressNote.trim(),
      recipeIds: [],
    };
  }

  return {
    mealTypeId: payload.mealTypeId,
    entryDate: payload.date,
    plannedTime: payload.time,
    isExpress: false,
    recipeIds: payload.recipes.map((recipe) => recipe.id),
  };
}

export async function savePlanMeal(
  payload: SavePlanMealPayload,
): Promise<SavePlanMealResponse> {
  return apiClient<SavePlanMealResponse>("/api/v1/scheduled-meals", {
    method: "POST",
    body: toCreateScheduledMealPayload(payload),
  });
}
