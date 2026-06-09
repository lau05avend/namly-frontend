import {
  addDays,
  addMonths,
  addWeeks,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  isToday,
  startOfMonth,
  startOfWeek,
  subMonths,
  subWeeks,
} from "date-fns";
import { es } from "date-fns/locale";

export function toDateKey(date: Date): string {
  return format(date, "yyyy-MM-dd");
}

export function getWeekStart(date: Date): Date {
  return startOfWeek(date, { weekStartsOn: 1 });
}

export function getWeekDays(weekStart: Date): Date[] {
  return Array.from({ length: 7 }, (_, index) => addDays(weekStart, index));
}

export function getWeekDaysForDate(date: Date): Date[] {
  return getWeekDays(getWeekStart(date));
}

export function getMonthCalendarDays(month: Date): Date[] {
  const monthStart = startOfMonth(month);
  const monthEnd = endOfMonth(month);
  const gridStart = startOfWeek(monthStart, { weekStartsOn: 1 });
  const gridEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });

  const days: Date[] = [];
  let current = gridStart;

  while (current <= gridEnd) {
    days.push(current);
    current = addDays(current, 1);
  }

  return days;
}

export function formatMonthYear(date: Date): string {
  const raw = format(date, "MMMM yyyy", { locale: es });
  return raw.charAt(0).toUpperCase() + raw.slice(1);
}

export {
  addDays,
  addMonths,
  addWeeks,
  isSameDay,
  isSameMonth,
  isToday,
  startOfMonth,
  subMonths,
  subWeeks,
};
