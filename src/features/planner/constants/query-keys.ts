import { format } from "date-fns";

export const plannerQueryKeys = {
  all: ["planner"] as const,
  day: (dateKey: string) => [...plannerQueryKeys.all, "day", dateKey] as const,
  monthActivity: (monthKey: string) =>
    [...plannerQueryKeys.all, "month-activity", monthKey] as const,
  mealTypes: () => [...plannerQueryKeys.all, "meal-types"] as const,
  mealTypesAll: () => [...plannerQueryKeys.mealTypes(), "all"] as const,
  mealTypesFrequent: (limit: number) =>
    [...plannerQueryKeys.mealTypes(), "frequent", limit] as const,
  planDefaults: (date?: string, mealTypeId?: string, scheduledMealId?: string) =>
    [
      ...plannerQueryKeys.all,
      "plan-defaults",
      date ?? "",
      mealTypeId ?? "",
      scheduledMealId ?? "",
    ] as const,
  planDefaultsEdit: (scheduledMealId: string) =>
    [...plannerQueryKeys.all, "plan-defaults-edit", scheduledMealId] as const,
  scheduledMeal: (scheduledMealId: string) =>
    [...plannerQueryKeys.all, "scheduled-meal", scheduledMealId] as const,
};

export function toMonthKey(date: Date): string {
  return format(date, "yyyy-MM");
}
