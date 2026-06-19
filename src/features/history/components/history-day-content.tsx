import type { HistoryDay } from "@/features/history/types/history.types";
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
    <section className="flex flex-col gap-3 pt-2" aria-label="Registros del día">
      <ul className="flex flex-col gap-2.5">
        {day.logs.map((log) => (
          <li key={log.id}>
            <HistoryLogCard log={log} dateKey={day.date} />
          </li>
        ))}
      </ul>
    </section>
  );
}
