import { format } from "date-fns";

export const plannerQueryKeys = {
  all: ["planner"] as const,
  day: (dateKey: string) => [...plannerQueryKeys.all, "day", dateKey] as const,
  monthActivity: (monthKey: string) =>
    [...plannerQueryKeys.all, "month-activity", monthKey] as const,
  planDefaults: (date?: string, slot?: string) =>
    [...plannerQueryKeys.all, "plan-defaults", date ?? "", slot ?? ""] as const,
};

export function toMonthKey(date: Date): string {
  return format(date, "yyyy-MM");
}
