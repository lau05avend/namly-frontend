import { format } from "date-fns";

export const historyQueryKeys = {
  all: ["history"] as const,
  day: (dateKey: string) => [...historyQueryKeys.all, "day", dateKey] as const,
  monthActivity: (monthKey: string) =>
    [...historyQueryKeys.all, "month-activity", monthKey] as const,
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
