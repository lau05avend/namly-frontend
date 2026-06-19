import {
  mapFormToCreateMealLogPayload,
  mapScheduledMealApiToSuggestion,
  mapSuggestionApiToDomain,
} from "@/features/meal-register/mappers/register-meal.mapper";
import { uploadMealPhoto } from "@/features/meal-register/services/meal-photo-storage.service";
import { resolveMealLogTagIds } from "@/features/meal-register/services/meal-log-tags.service";
import type {
  CreateMealLogApiResponse,
  ScheduledMealSuggestionApiDto,
} from "@/features/meal-register/types/register-meal-api.types";
import type {
  SaveRegisterMealInput,
  SaveRegisterMealResponse,
  ScheduledMealSuggestion,
} from "@/features/meal-register/types/register-meal.types";
import type { ScheduledMealApiDto } from "@/features/planner/types/planner-api.types";
import { apiClient } from "@/lib/api/api-client";

export async function fetchMealLogSuggestions(
  loggedAt: string,
): Promise<ScheduledMealSuggestion[]> {
  const raw = await apiClient<ScheduledMealSuggestionApiDto[]>(
    `/api/v1/scheduled-meals/suggestions?loggedAt=${encodeURIComponent(loggedAt)}`,
  );

  return raw.map(mapSuggestionApiToDomain);
}

export async function fetchRegisterPlanPickerMeals(
  dateKey: string,
): Promise<ScheduledMealSuggestion[]> {
  const meals = await apiClient<ScheduledMealApiDto[]>(
    `/api/v1/scheduled-meals?date=${dateKey}`,
  );

  return meals
    .filter((meal) => meal.status !== "completed")
    .sort((left, right) => left.plannedTime.localeCompare(right.plannedTime))
    .map(mapScheduledMealApiToSuggestion);
}

export async function saveRegisterMeal(
  input: SaveRegisterMealInput,
  userId: string,
): Promise<SaveRegisterMealResponse> {
  const mediaUrl = await uploadMealPhoto(input.photoFile, userId);
  const tagIds = await resolveMealLogTagIds(input.values.tags);
  const payload = mapFormToCreateMealLogPayload(
    input.values,
    mediaUrl,
    tagIds,
  );

  const response = await apiClient<CreateMealLogApiResponse>(
    "/api/v1/meal-logs",
    {
      method: "POST",
      body: payload,
    },
  );

  return { id: response.id };
}
