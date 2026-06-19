import { format } from "date-fns";

export const historyQueryKeys = {
  all: ["history"] as const,
  day: (dateKey: string) => [...historyQueryKeys.all, "day", dateKey] as const,
  mealLog: (logId: string) =>
    [...historyQueryKeys.all, "meal-log", logId] as const,
  monthActivity: (monthKey: string) =>
    [...historyQueryKeys.all, "month-activity", monthKey] as const,
  timeline: () => [...historyQueryKeys.all, "timeline"] as const,
};

export function toMonthKey(date: Date): string {
  return format(date, "yyyy-MM");
}

export function toHistoryMonthQuery(date: Date): { year: string; month: string } {
  return {
    year: format(date, "yyyy"),
    month: format(date, "MM"),
  };
}
