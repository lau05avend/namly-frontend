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

export function parseDateKey(dateKey?: string): Date | undefined {
  if (!dateKey) {
    return undefined;
  }

  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dateKey);

  if (!match) {
    return undefined;
  }

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(year, month - 1, day);

  if (toDateKey(date) !== dateKey) {
    return undefined;
  }

  return date;
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

export function getMonthWeekRows(monthDays: Date[]): Date[][] {
  const rows: Date[][] = [];

  for (let index = 0; index < monthDays.length; index += 7) {
    rows.push(monthDays.slice(index, index + 7));
  }

  return rows;
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
