"use client";

import { format, isToday } from "date-fns";
import type { DayActivity } from "@/features/calendar/types/calendar.types";
import { cn } from "@/lib/utils";

type DayCellProps = {
  date: Date;
  selected?: boolean;
  isCurrentMonth?: boolean;
  activity?: DayActivity;
  compact?: boolean;
  onSelect: (date: Date) => void;
};

export function DayCell({
  date,
  selected = false,
  isCurrentMonth = true,
  activity,
  compact = false,
  onSelect,
}: DayCellProps) {
  const today = isToday(date);
  const hasPlanned = activity?.hasPlanned;
  const hasCompleted = activity?.hasCompleted;

  return (
    <button
      type="button"
      onClick={() => onSelect(date)}
      aria-pressed={selected}
      aria-label={format(date, "EEEE d MMMM")}
      className={cn(
        "flex flex-col items-center gap-1 rounded-2xl transition-colors",
        compact ? "min-w-0 flex-1 px-0.5 py-1" : "px-1 py-1.5",
        !isCurrentMonth && "opacity-35",
      )}
    >
      {!compact ? (
        <span className="text-[10px] font-medium tracking-wide text-foreground/45 uppercase">
          {format(date, "EEE", { locale: undefined }).slice(0, 3).toUpperCase()}
        </span>
      ) : null}

      <span
        className={cn(
          "flex items-center justify-center rounded-full font-semibold transition-colors",
          compact ? "size-8 text-xs" : "size-9 text-sm",
          selected && "bg-primary text-white shadow-sm",
          !selected && today && "bg-mint text-primary",
          !selected && !today && "text-foreground/75",
        )}
      >
        {format(date, "d")}
      </span>

      <span
        className="flex h-1.5 items-center justify-center gap-0.5"
        aria-hidden
      >
        {hasPlanned ? (
          <span
            className={cn(
              "size-1.5 rounded-full",
              selected ? "bg-highlight" : "bg-primary",
            )}
          />
        ) : (
          <span className="size-1.5 rounded-full bg-foreground/15" />
        )}
        {hasCompleted && !compact ? (
          <span className="size-1 rounded-full bg-cta/80" />
        ) : null}
      </span>
    </button>
  );
}
