import { format } from "date-fns";

export const plannerQueryKeys = {
  all: ["planner"] as const,
  day: (dateKey: string) => [...plannerQueryKeys.all, "day", dateKey] as const,
  monthActivity: (monthKey: string) =>
    [...plannerQueryKeys.all, "month-activity", monthKey] as const,
  mealTypes: () => [...plannerQueryKeys.all, "meal-types"] as const,
  planDefaults: (date?: string, mealTypeId?: string) =>
    [...plannerQueryKeys.all, "plan-defaults", date ?? "", mealTypeId ?? ""] as const,
  scheduledMeal: (scheduledMealId: string) =>
    [...plannerQueryKeys.all, "scheduled-meal", scheduledMealId] as const,
};

export function toMonthKey(date: Date): string {
  return format(date, "yyyy-MM");
}
