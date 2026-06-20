import { format } from "date-fns";
import { es } from "date-fns/locale";
import { parseDateKey } from "@/features/calendar/utils/date";

export function formatHistoryDayHeading(dateKey: string): string {
  const date = parseDateKey(dateKey);

  if (!date) {
    return dateKey;
  }

  const raw = format(date, "EEEE d 'de' MMMM", { locale: es });
  return raw.toUpperCase();
}
