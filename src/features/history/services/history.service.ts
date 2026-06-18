import {
  toHistoryMonthQuery,
  toMonthKey,
} from "@/features/history/constants/query-keys";
import {
  mapCalendarResponse,
  mapDayResponse,
} from "@/features/history/mappers/history.mapper";
import type {
  MealLogApiDto,
  MealLogsCalendarApiResponse,
} from "@/features/history/types/history-api.types";
import type {
  HistoryDay,
  HistoryMonthActivity,
} from "@/features/history/types/history.types";
import { apiClient } from "@/lib/api/api-client";

export async function fetchHistoryDay(dateKey: string): Promise<HistoryDay> {
  const logs = await apiClient<MealLogApiDto[]>(
    `/api/v1/meal-logs?entryDate=${dateKey}`,
  );

  return mapDayResponse(logs, dateKey);
}

export async function fetchHistoryMonthActivity(
  month: Date,
): Promise<HistoryMonthActivity> {
  const monthKey = toMonthKey(month);
  const { year, month: monthParam } = toHistoryMonthQuery(month);
  const raw = await apiClient<MealLogsCalendarApiResponse>(
    `/api/v1/meal-logs/calendar?year=${year}&month=${monthParam}`,
  );

  return mapCalendarResponse(raw, monthKey);
}
