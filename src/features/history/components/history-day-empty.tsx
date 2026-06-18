import { HISTORY_COPY } from "@/features/history/constants/history-copy";

export function HistoryDayEmpty() {
  return (
    <p className="py-6 text-center text-sm text-foreground/50">
      {HISTORY_COPY.dayEmpty}
    </p>
  );
}
