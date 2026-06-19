import {
  toHistoryMonthQuery,
  toMonthKey,
} from "@/features/history/constants/query-keys";
import {
  mapCalendarResponse,
  mapDayPreview,
  mapDayResponse,
} from "@/features/history/mappers/history.mapper";
import { mapMealLogDetail } from "@/features/history/mappers/history-meal-log.mapper";
import type {
  MealLogApiDto,
  MealLogDetailApiDto,
  MealLogsCalendarApiResponse,
} from "@/features/history/types/history-api.types";
import type {
  HistoryDay,
  HistoryMealLogDetail,
  HistoryMonthActivity,
  HistoryMonthTimeline,
} from "@/features/history/types/history.types";
import { apiClient } from "@/lib/api/api-client";

async function fetchDayLogs(dateKey: string): Promise<MealLogApiDto[]> {
  return apiClient<MealLogApiDto[]>(`/api/v1/meal-logs?entryDate=${dateKey}`);
}

export async function fetchHistoryDay(dateKey: string): Promise<HistoryDay> {
  const logs = await fetchDayLogs(dateKey);

  return mapDayResponse(logs, dateKey);
}

export async function fetchHistoryMealLog(
  logId: string,
): Promise<HistoryMealLogDetail> {
  const raw = await apiClient<MealLogDetailApiDto>(
    `/api/v1/meal-logs/${logId}`,
  );

  return mapMealLogDetail(raw);
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

export async function fetchHistoryMonthTimeline(
  month: Date,
): Promise<HistoryMonthTimeline> {
  const monthKey = toMonthKey(month);
  const activity = await fetchHistoryMonthActivity(month);
  const previews = await Promise.all(
    activity.days.map(async ({ date }) => {
      const logs = await fetchDayLogs(date);
      const day = mapDayResponse(logs, date);

      return mapDayPreview(date, day.logs);
    }),
  );

  return {
    monthKey,
    previewByDate: Object.fromEntries(
      previews.map((preview) => [preview.date, preview]),
    ),
  };
}
