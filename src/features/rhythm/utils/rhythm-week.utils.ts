import { format, startOfWeek } from "date-fns";

export function getCurrentWeekStart(referenceDate: Date = new Date()): string {
  const monday = startOfWeek(referenceDate, { weekStartsOn: 1 });
  return format(monday, "yyyy-MM-dd");
}
