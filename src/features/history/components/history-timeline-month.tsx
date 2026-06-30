"use client";

import { useMemo } from "react";
import { isSameMonth } from "date-fns";
import {
  formatMonthYear,
  getMonthCalendarDays,
  getMonthWeekRows,
  parseDateKey,
  toDateKey,
} from "@/features/calendar";
import { WeekdayHeader } from "@/features/calendar/components/weekday-header";
import { HistoryTimelineDayCell } from "@/features/history/components/history-timeline-day-cell";
import type { HistoryMonthTimeline } from "@/features/history/types/history.types";

type HistoryTimelineMonthProps = {
  monthKey: string;
  timeline: HistoryMonthTimeline;
  onDayPress: (date: Date) => void;
};

export function HistoryTimelineMonth({
  monthKey,
  timeline,
  onDayPress,
}: HistoryTimelineMonthProps) {
  const monthDate = useMemo(() => {
    const parsed = parseDateKey(`${monthKey}-01`);

    return parsed ?? new Date();
  }, [monthKey]);

  const monthDays = useMemo(() => getMonthCalendarDays(monthDate), [monthDate]);
  const weekRows = useMemo(() => getMonthWeekRows(monthDays), [monthDays]);

  return (
    <section
      className="flex flex-col gap-3"
      aria-label={formatMonthYear(monthDate)}
    >
      <h2 className="text-base font-semibold tracking-tight text-foreground/85">
        {formatMonthYear(monthDate)}
      </h2>

      <WeekdayHeader />

      <div className="flex flex-col gap-1">
        {weekRows.map((week) => {
          const weekKey = toDateKey(week[0]);

          return (
            <div key={weekKey} className="grid grid-cols-7 gap-1">
              {week.map((day) => {
                const dayKey = toDateKey(day);
                const isCurrentMonth = isSameMonth(day, monthDate);

                if (!isCurrentMonth) {
                  return <div key={dayKey} aria-hidden />;
                }

                return (
                  <HistoryTimelineDayCell
                    key={dayKey}
                    date={day}
                    isCurrentMonth
                    preview={timeline.previewByDate[dayKey]}
                    onPress={onDayPress}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </section>
  );
}
