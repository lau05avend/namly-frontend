import type {
  CreateScheduledMealApiPayload,
  UpdateScheduledMealApiPayload,
} from "@/features/planner/types/plan-meal-api.types";
import type {
  SavePlanMealPayload,
  SavePlanMealResponse,
} from "@/features/planner/types/plan-meal.types";
import { apiClient } from "@/lib/api/api-client";

function toScheduledMealPayload(
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

function toCreateScheduledMealPayload(
  payload: SavePlanMealPayload,
): CreateScheduledMealApiPayload {
  return toScheduledMealPayload(payload);
}

function toUpdateScheduledMealPayload(
  payload: SavePlanMealPayload,
): UpdateScheduledMealApiPayload {
  return toScheduledMealPayload(payload);
}

export async function savePlanMeal(
  payload: SavePlanMealPayload,
): Promise<SavePlanMealResponse> {
  return apiClient<SavePlanMealResponse>("/api/v1/scheduled-meals", {
    method: "POST",
    body: toCreateScheduledMealPayload(payload),
  });
}

export async function updatePlanMeal(
  scheduledMealId: string,
  payload: SavePlanMealPayload,
): Promise<SavePlanMealResponse> {
  return apiClient<SavePlanMealResponse>(
    `/api/v1/scheduled-meals/${scheduledMealId}`,
    {
      method: "PATCH",
      body: toUpdateScheduledMealPayload(payload),
    },
  );
}
