import type { PlanReminderFormValue } from "@/features/planner/schemas/plan-meal.schema";

export function sortRemindersByOffsetDesc(
  reminders: PlanReminderFormValue[],
): PlanReminderFormValue[] {
  return [...reminders].sort((a, b) => b.offsetMinutes - a.offsetMinutes);
}
