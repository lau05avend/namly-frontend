"use client";

import { format } from "date-fns";
import { es } from "date-fns/locale";
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
    <div className="flex flex-col gap-2" role="group" aria-label="Semana">
      <div className="grid grid-cols-7 gap-1">
        {weekDays.map((day) => (
          <span
            key={`label-${toDateKey(day)}`}
            className="text-center text-[10px] font-medium tracking-wide text-foreground/45 uppercase"
          >
            {format(day, "EEE", { locale: es }).slice(0, 3)}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {weekDays.map((day) => {
          const key = toDateKey(day);
          return (
            <DayCell
              key={key}
              date={day}
              compact
              selected={key === selectedKey}
              activity={activityByDate[key]}
              onSelect={onSelectDate}
            />
          );
        })}
      </div>
    </div>
  );
}
