import { simulateLatency } from "@/lib/api/simulate-latency";
import { getMockPlanMealDefaults } from "@/features/planner/services/mock-plan-meal-data";
import type {
  PlanMealDefaults,
  PlanMealDefaultsParams,
  SavePlanMealPayload,
  SavePlanMealResponse,
} from "@/features/planner/types/plan-meal.types";

export async function fetchPlanMealDefaults(
  params?: PlanMealDefaultsParams,
): Promise<PlanMealDefaults> {
  await simulateLatency(200);

  // TODO: Replace mocked response with real API integration
  // Example:
  // return apiClient.get<PlanMealDefaults>("/planner/plan/defaults", { params });

  return getMockPlanMealDefaults(params);
}

export async function savePlanMeal(
  payload: SavePlanMealPayload,
): Promise<SavePlanMealResponse> {
  await simulateLatency(400);

  // TODO: Replace mocked response with real API integration
  // Example:
  // return apiClient.post<SavePlanMealResponse>("/planner/plan", payload);

  return {
    id: `plan-${payload.date}-${payload.mealSlot}`,
    date: payload.date,
  };
}
