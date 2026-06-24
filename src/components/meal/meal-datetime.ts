import { format } from "date-fns";

export function getCurrentMealTime(): string {
  return format(new Date(), "HH:mm");
}
