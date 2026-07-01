import { format, isToday, isYesterday } from "date-fns";
import { es } from "date-fns/locale";

export function formatNotificationTime(isoDate: string): string {
  const date = new Date(isoDate);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  if (isToday(date)) {
    return format(date, "h:mm a", { locale: es });
  }

  if (isYesterday(date)) {
    return "Ayer";
  }

  const isCurrentYear = date.getFullYear() === new Date().getFullYear();

  return format(
    date,
    isCurrentYear ? "d MMM" : "d MMM yyyy",
    { locale: es },
  );
}
