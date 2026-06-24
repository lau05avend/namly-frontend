import { RhythmActivityDot } from "@/features/rhythm/components/rhythm-activity-dot";
import type { RhythmActivityDay } from "@/features/rhythm/types/rhythm.types";

type RhythmWeeklyActivityRowProps = {
  days: RhythmActivityDay[];
};

export function RhythmWeeklyActivityRow({ days }: RhythmWeeklyActivityRowProps) {
  return (
    <div
      className="flex justify-between gap-1"
      role="list"
      aria-label="Actividad de la semana"
    >
      {days.map((day, index) => (
        <div
          key={`${day.dayLabel}-${index}`}
          role="listitem"
          className="flex flex-1 flex-col items-center gap-2"
        >
          <span className="text-[11px] font-medium text-foreground/40">
            {day.dayLabel}
          </span>
          <RhythmActivityDot
            intensity={day.intensity}
            isToday={day.isToday}
          />
        </div>
      ))}
    </div>
  );
}
