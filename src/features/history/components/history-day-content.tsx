import { HISTORY_COPY } from "@/features/history/constants/history-copy";
import type { HistoryDay } from "@/features/history/types/history.types";
import { formatHistoryDayHeading } from "@/features/history/utils/format-history-date";
import { HistoryDayEmpty } from "@/features/history/components/history-day-empty";
import { HistoryLogCard } from "@/features/history/components/history-log-card";

type HistoryDayContentProps = {
  day: HistoryDay;
};

export function HistoryDayContent({ day }: HistoryDayContentProps) {
  if (day.logs.length === 0) {
    return <HistoryDayEmpty />;
  }

  return (
    <section className="flex flex-col gap-3" aria-label="Registros del día">
      <p className="text-[11px] font-semibold tracking-wider text-foreground/40">
        {formatHistoryDayHeading(day.date)}
      </p>

      <ul className="flex flex-col gap-2.5">
        {day.logs.map((log) => (
          <li key={log.id}>
            <HistoryLogCard log={log} />
          </li>
        ))}
      </ul>
    </section>
  );
}
