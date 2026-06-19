import { format } from "date-fns";
import { es } from "date-fns/locale";
import { parseDateKey } from "@/features/calendar/utils/date";

function capitalizeFirst(value: string): string {
  if (!value) {
    return value;
  }

  return value.charAt(0).toUpperCase() + value.slice(1);
}

export function formatHistoryMealLogHeaderDate(dateKey: string): string {
  const date = parseDateKey(dateKey);

  if (!date) {
    return dateKey;
  }

  const isCurrentYear = date.getFullYear() === new Date().getFullYear();
  const pattern = isCurrentYear
    ? "EEEE, d 'de' MMMM"
    : "EEEE, d 'de' MMMM 'de' yyyy";

  return capitalizeFirst(format(date, pattern, { locale: es }));
}
