import { simulateLatency } from "@/lib/api/simulate-latency";
import { getMockRegisterMealDefaults } from "@/features/meal-register/services/mock-register-meal-data";
import type {
  RegisterMealDefaults,
  RegisterMealDefaultsParams,
  SaveRegisterMealPayload,
  SaveRegisterMealResponse,
} from "@/features/meal-register/types/register-meal.types";

export async function fetchRegisterMealDefaults(
  params?: RegisterMealDefaultsParams,
): Promise<RegisterMealDefaults> {
  await simulateLatency(200);

  // TODO: Replace mocked response with real API integration
  // return apiClient.get<RegisterMealDefaults>("/meals/register/defaults", { params });

  return getMockRegisterMealDefaults(params);
}

export async function saveRegisterMeal(
  payload: SaveRegisterMealPayload,
): Promise<SaveRegisterMealResponse> {
  await simulateLatency(400);

  // TODO: Replace mocked response with real API integration
  // return apiClient.post<SaveRegisterMealResponse>("/meals/register", payload);

  return {
    id: `meal-${payload.date}-${Date.now()}`,
    date: payload.date,
  };
}
