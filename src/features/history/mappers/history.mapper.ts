import { HISTORY_COPY } from "@/features/history/constants/history-copy";
import type {
  MealLogApiDto,
  MealLogsCalendarApiResponse,
} from "@/features/history/types/history-api.types";
import type {
  HistoryDay,
  HistoryDayPreview,
  HistoryMealLog,
  HistoryMonthActivity,
} from "@/features/history/types/history.types";

export function mapDayPreview(
  dateKey: string,
  logs: HistoryMealLog[],
): HistoryDayPreview {
  const thumbnailUrl = logs.find((log) => log.mediaUrl)?.mediaUrl ?? null;

  return {
    date: dateKey,
    mealCount: logs.length,
    thumbnailUrl,
  };
}

function mapMealLog(log: MealLogApiDto): HistoryMealLog {
  return {
    id: log.id,
    mediaUrl: log.mediaUrl,
    loggedAt: log.loggedAt,
    loggedAtTime: log.loggedAtTime,
    mealTypeName: log.mealType?.name ?? HISTORY_COPY.logTitleFallback,
    mealTypeId: log.mealType?.id ?? null,
    isLinkedToPlan: log.isLinkedToPlan,
  };
}

export function mapCalendarResponse(
  raw: MealLogsCalendarApiResponse,
  monthKey: string,
): HistoryMonthActivity {
  return {
    month: monthKey,
    days: raw.days.map((date) => ({
      date,
      hasLogged: true,
    })),
  };
}

export function mapDayResponse(
  logs: MealLogApiDto[],
  dateKey: string,
): HistoryDay {
  return {
    date: dateKey,
    logs: logs
      .map(mapMealLog)
      .sort((left, right) => left.loggedAt.localeCompare(right.loggedAt)),
  };
}
