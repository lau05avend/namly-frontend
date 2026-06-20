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
import { REGISTER_MEAL_COPY } from "@/features/meal-register/constants/register-meal-copy";
import type {
  SaveRegisterMealInput,
  SaveRegisterMealResponse,
  ScheduledMealSuggestion,
} from "@/features/meal-register/types/register-meal.types";
import type { ScheduledMealApiDto } from "@/features/planner/types/planner-api.types";
import { apiClient } from "@/lib/api/api-client";

export async function fetchMealLogSuggestions(
  loggedAt: string,
  scheduledMealId?: string,
): Promise<ScheduledMealSuggestion[]> {
  const params = new URLSearchParams({ loggedAt });
  if (scheduledMealId) {
    params.set("scheduledMealId", scheduledMealId);
  }

  const raw = await apiClient<ScheduledMealSuggestionApiDto[]>(
    `/api/v1/scheduled-meals/suggestions?${params.toString()}`,
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
  const tagIds = await resolveMealLogTagIds(input.values.tags);
  let mediaUrl = input.existingMediaUrl;

  if (input.photoFile) {
    mediaUrl = await uploadMealPhoto(input.photoFile, userId);
  }

  if (!mediaUrl) {
    throw new Error(REGISTER_MEAL_COPY.errors.photoRequired);
  }

  const payload = mapFormToCreateMealLogPayload(
    input.values,
    mediaUrl,
    tagIds,
    { isUpdate: Boolean(input.logId) },
  );

  if (input.logId) {
    await apiClient<void>(`/api/v1/meal-logs/${input.logId}`, {
      method: "PATCH",
      body: payload,
    });

    return { id: input.logId };
  }

  const response = await apiClient<CreateMealLogApiResponse>(
    "/api/v1/meal-logs",
    {
      method: "POST",
      body: payload,
    },
  );

  return { id: response.id };
}
