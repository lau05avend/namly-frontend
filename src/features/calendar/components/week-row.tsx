"use client";

import { DayCell } from "@/features/calendar/components/day-cell";
import type { ActivityByDate } from "@/features/calendar/types/calendar.types";
import { toDateKey } from "@/features/calendar/utils/date";

type WeekRowProps = {
  weekDays: Date[];
  selectedDate: Date;
  activityByDate?: ActivityByDate;
  onSelectDate: (date: Date) => void;
};

export function WeekRow({
  weekDays,
  selectedDate,
  activityByDate = {},
  onSelectDate,
}: WeekRowProps) {
  const selectedKey = toDateKey(selectedDate);

  return (
    <div className="grid grid-cols-7 gap-1" role="group" aria-label="Semana">
      {weekDays.map((day) => {
        const key = toDateKey(day);
        return (
          <DayCell
            key={key}
            layoutId={`calendar-day-${key}`}
            date={day}
            selected={key === selectedKey}
            activity={activityByDate[key]}
            onSelect={onSelectDate}
          />
        );
      })}
    </div>
  );
}
