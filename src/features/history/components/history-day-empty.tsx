import { ModuleEmptyState } from "@/components/ui/module-empty-state";
import { HISTORY_COPY } from "@/features/history/constants/history-copy";

export function HistoryDayEmpty() {
  return (
    <ModuleEmptyState module="history" title={HISTORY_COPY.dayEmpty} />
  );
}
