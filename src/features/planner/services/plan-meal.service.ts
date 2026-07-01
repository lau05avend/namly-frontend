import { apiClient } from "@/lib/api/api-client";
import type { SavePlanMealResponse } from "@/features/planner/types/plan-meal.types";
import type { SavePlanMealPayload } from "@/features/planner/types/plan-meal.types";
import type { PlanMealReminderDirtyFields } from "@/features/planner/utils/plan-meal-payload.mapper";
import {
  toCreateScheduledMealPayload,
  toUpdateScheduledMealPayload,
} from "@/features/planner/utils/plan-meal-payload.mapper";

export type UpdatePlanMealOptions = {
  dirtyFields?: PlanMealReminderDirtyFields;
};

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
  options?: UpdatePlanMealOptions,
): Promise<SavePlanMealResponse> {
  return apiClient<SavePlanMealResponse>(
    `/api/v1/scheduled-meals/${scheduledMealId}`,
    {
      method: "PATCH",
      body: toUpdateScheduledMealPayload(payload, options?.dirtyFields),
    },
  );
}
