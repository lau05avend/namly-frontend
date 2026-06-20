import { HISTORY_COPY } from "@/features/history/constants/history-copy";

export function HistoryAgendaView() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center px-6">
      <p className="text-center text-sm text-foreground/50">
        {HISTORY_COPY.agendaPlaceholder}
      </p>
    </div>
  );
}
