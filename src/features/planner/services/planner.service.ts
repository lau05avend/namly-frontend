import { toMonthKey } from "@/features/planner/constants/query-keys";
import { mapScheduledMealDetail } from "@/features/planner/mappers/planner-detail.mapper";
import {
  mapCalendarResponse,
  mapDayResponse,
} from "@/features/planner/mappers/planner.mapper";
import type {
  ScheduledMealApiDto,
  ScheduledMealDetailApiDto,
  ScheduledMealsCalendarApiResponse,
} from "@/features/planner/types/planner-api.types";
import type { PlannerScheduledMealDetail } from "@/features/planner/types/planner-detail.types";
import type {
  PlannerDayPlan,
  PlannerMonthActivity,
} from "@/features/planner/types/planner.types";
import { apiClient } from "@/lib/api/api-client";

export async function fetchPlannerDay(
  dateKey: string,
): Promise<PlannerDayPlan> {
  const meals = await apiClient<ScheduledMealApiDto[]>(
    `/api/v1/scheduled-meals?date=${dateKey}`,
  );

  return mapDayResponse(meals, dateKey);
}

export async function fetchPlannerScheduledMeal(
  scheduledMealId: string,
): Promise<PlannerScheduledMealDetail> {
  const meal = await apiClient<ScheduledMealDetailApiDto>(
    `/api/v1/scheduled-meals/${scheduledMealId}`,
  );

  return mapScheduledMealDetail(meal);
}

export async function deleteScheduledMeal(
  scheduledMealId: string,
): Promise<void> {
  await apiClient<void>(`/api/v1/scheduled-meals/${scheduledMealId}`, {
    method: "DELETE",
  });
}

export async function fetchPlannerMonthActivity(
  month: Date,
): Promise<PlannerMonthActivity> {
  const monthKey = toMonthKey(month);
  const raw = await apiClient<ScheduledMealsCalendarApiResponse>(
    `/api/v1/scheduled-meals/calendar?month=${monthKey}`,
  );

  return mapCalendarResponse(raw, monthKey);
}
