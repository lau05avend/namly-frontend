"use client";

import { motion } from "motion/react";
import { format, isToday } from "date-fns";
import type { DayActivity } from "@/features/calendar/types/calendar.types";
import { CALENDAR_LAYOUT_SPRING } from "@/features/calendar/constants/motion";
import { cn } from "@/lib/utils";

type DayCellProps = {
  date: Date;
  selected?: boolean;
  isCurrentMonth?: boolean;
  activity?: DayActivity;
  layoutId?: string;
  onSelect: (date: Date) => void;
};

export function DayCell({
  date,
  selected = false,
  isCurrentMonth = true,
  activity,
  layoutId,
  onSelect,
}: DayCellProps) {
  const today = isToday(date);
  const hasPlanned = activity?.hasPlanned;

  return (
    <motion.button
      type="button"
      layoutId={layoutId}
      layout="position"
      transition={CALENDAR_LAYOUT_SPRING}
      onClick={() => onSelect(date)}
      aria-pressed={selected}
      aria-label={format(date, "EEEE d MMMM")}
      className={cn(
        "flex flex-col items-center gap-1 rounded-2xl px-1 py-1.5 transition-colors",
        !isCurrentMonth && "opacity-35",
      )}
    >
      <motion.span
        layout
        className={cn(
          "flex size-9 items-center justify-center rounded-full text-sm font-semibold",
          selected && "bg-primary text-white shadow-sm",
          !selected && today && "bg-mint text-primary",
          !selected && !today && "text-foreground/75",
        )}
        transition={CALENDAR_LAYOUT_SPRING}
      >
        {format(date, "d")}
      </motion.span>

      {hasPlanned ? (
        <motion.span
          layout
          className={cn(
            "size-1.5 rounded-full",
            selected ? "bg-highlight" : "bg-primary",
          )}
          aria-hidden
          transition={CALENDAR_LAYOUT_SPRING}
        />
      ) : (
        <span className="size-1.5" aria-hidden />
      )}
    </motion.button>
  );
}
