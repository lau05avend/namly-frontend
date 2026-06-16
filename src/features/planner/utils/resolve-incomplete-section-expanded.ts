import type { PlannerDayPeriod } from "@/features/planner/utils/resolve-planner-day-period";

const BUSY_DAY_RECORD_THRESHOLD = 3;

type IncompleteSectionCounts = {
  next: number;
  upcoming: number;
  missed: number;
  completed: number;
};

export function resolveIncompleteSectionDefaultExpanded(
  dayPeriod: PlannerDayPeriod,
  counts: IncompleteSectionCounts,
): boolean {
  if (dayPeriod === "future") {
    return false;
  }

  if (dayPeriod === "past") {
    return true;
  }

  const totalRecords =
    counts.next + counts.upcoming + counts.missed + counts.completed;
  const hasMissed = counts.missed > 0;
  const hasOtherStatuses =
    counts.next > 0 || counts.upcoming > 0 || counts.completed > 0;

  if (
    hasMissed &&
    hasOtherStatuses &&
    totalRecords > BUSY_DAY_RECORD_THRESHOLD
  ) {
    return false;
  }

  return true;
}
