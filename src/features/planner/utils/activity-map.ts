import type { ActivityByDate } from "@/features/calendar/types/calendar.types";
import type { PlannerMonthActivity } from "@/features/planner/types/planner.types";

export function toActivityByDate(
  monthActivity?: PlannerMonthActivity,
): ActivityByDate {
  if (!monthActivity) return {};

  return Object.fromEntries(
    monthActivity.days.map((day) => [
      day.date,
      {
        hasPlanned: day.hasPlanned,
        hasCompleted: day.hasCompleted,
      },
    ]),
  );
}
