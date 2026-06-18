"use client";

import { motion } from "motion/react";
import { formatMonthYear } from "@/features/calendar/utils/date";
import { CALENDAR_LAYOUT_SPRING } from "@/features/calendar/constants/motion";
import { cn } from "@/lib/utils";
import { ChevronsUpDown } from "lucide-react";

type CalendarHeaderProps = {
  visibleMonth: Date;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onGoToToday: () => void;
  hideExpandToggle?: boolean;
  className?: string;
};

export function CalendarHeader({
  visibleMonth,
  isExpanded,
  onToggleExpand,
  onGoToToday,
  hideExpandToggle = false,
  className,
}: CalendarHeaderProps) {
  const todayDayNumber = new Date().getDate();

  return (
    <div className={cn("flex items-center justify-between gap-3", className)}>
      <motion.h2
        layout
        className="text-xl font-bold text-foreground"
        transition={CALENDAR_LAYOUT_SPRING}
      >
        {formatMonthYear(visibleMonth)}
      </motion.h2>

      <div className="flex items-center gap-2">
        <motion.button
          type="button"
          onClick={onGoToToday}
          aria-label="Ir a hoy"
          whileTap={{ scale: 0.94 }}
          transition={CALENDAR_LAYOUT_SPRING}
          className="flex size-9 items-center justify-center rounded-full bg-mint text-sm font-semibold text-primary transition-colors hover:bg-mint/80"
        >
          {todayDayNumber}
        </motion.button>

        {hideExpandToggle ? null : (
          <motion.button
            type="button"
            onClick={onToggleExpand}
            aria-expanded={isExpanded}
            aria-label={isExpanded ? "Ver semana" : "Ver mes"}
            whileTap={{ scale: 0.94 }}
            transition={CALENDAR_LAYOUT_SPRING}
            className={cn(
              "flex size-9 items-center justify-center rounded-full bg-card text-foreground/60 transition-colors hover:bg-mint/50",
              isExpanded && "bg-mint text-primary",
            )}
          >
            <motion.span
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={CALENDAR_LAYOUT_SPRING}
            >
              <ChevronsUpDown className="size-4" aria-hidden="true" />
            </motion.span>
          </motion.button>
        )}
      </div>
    </div>
  );
}
