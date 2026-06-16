import { toDateKey } from "@/features/calendar/utils/date";

export type PlannerDayPeriod = "today" | "future" | "past";

export function resolvePlannerDayPeriod(dateKey: string): PlannerDayPeriod {
  const todayKey = toDateKey(new Date());

  if (dateKey === todayKey) {
    return "today";
  }

  if (dateKey > todayKey) {
    return "future";
  }

  return "past";
}
