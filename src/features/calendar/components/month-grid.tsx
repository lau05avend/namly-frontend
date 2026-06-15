"use client";

import { DayCell } from "@/features/calendar/components/day-cell";
import type { ActivityByDate } from "@/features/calendar/types/calendar.types";
import { isSameMonth, toDateKey } from "@/features/calendar/utils/date";

type MonthGridProps = {
  monthDays: Date[];
  visibleMonth: Date;
  selectedDate: Date;
  activityByDate?: ActivityByDate;
  onSelectDate: (date: Date) => void;
};

export function MonthGrid({
  monthDays,
  visibleMonth,
  selectedDate,
  activityByDate = {},
  onSelectDate,
}: MonthGridProps) {
  const selectedKey = toDateKey(selectedDate);

  return (
    <div className="grid grid-cols-7 gap-1" role="grid" aria-label="Mes">
      {monthDays.map((day) => {
        const key = toDateKey(day);
        return (
          <DayCell
            key={key}
            layoutId={`calendar-day-${key}`}
            date={day}
            selected={key === selectedKey}
            isCurrentMonth={isSameMonth(day, visibleMonth)}
            activity={activityByDate[key]}
            onSelect={onSelectDate}
          />
        );
      })}
    </div>
  );
}
