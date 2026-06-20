import type { ActivityByDate } from "@/features/calendar/types/calendar.types";
import type { HistoryMonthActivity } from "@/features/history/types/history.types";

export function toActivityByDate(
  monthActivity?: HistoryMonthActivity,
): ActivityByDate {
  if (!monthActivity) return {};

  return Object.fromEntries(
    monthActivity.days.map((day) => [
      day.date,
      {
        hasCompleted: day.hasLogged,
      },
    ]),
  );
}
