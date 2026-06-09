"use client";

import { DayCell } from "@/features/calendar/components/day-cell";
import { WEEKDAY_LABELS_SHORT } from "@/features/calendar/constants/weekday-labels";
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
    <div className="flex flex-col gap-2" role="grid" aria-label="Mes">
      <div className="grid grid-cols-7 gap-1">
        {WEEKDAY_LABELS_SHORT.map((label) => (
          <span
            key={label}
            className="py-1 text-center text-[10px] font-medium tracking-wide text-foreground/45"
          >
            {label}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {monthDays.map((day) => {
          const key = toDateKey(day);
          return (
            <DayCell
              key={key}
              date={day}
              selected={key === selectedKey}
              isCurrentMonth={isSameMonth(day, visibleMonth)}
              activity={activityByDate[key]}
              onSelect={onSelectDate}
            />
          );
        })}
      </div>
    </div>
  );
}
