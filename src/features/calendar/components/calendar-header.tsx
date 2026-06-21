"use client";

import { motion } from "motion/react";
import { formatMonthYear } from "@/features/calendar/utils/date";
import { CALENDAR_LAYOUT_SPRING } from "@/features/calendar/constants/motion";
import { SCREEN_LAYOUT } from "@/constants/screen-layout";
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
    <header className={cn(SCREEN_LAYOUT.headerRow, className)}>
      <motion.h1
        layout
        className={SCREEN_LAYOUT.headerTitle}
        transition={CALENDAR_LAYOUT_SPRING}
      >
        {formatMonthYear(visibleMonth)}
      </motion.h1>

      <div className={SCREEN_LAYOUT.headerActions}>
        <motion.button
          type="button"
          onClick={onGoToToday}
          aria-label="Ir a hoy"
          whileTap={{ scale: 0.94 }}
          transition={CALENDAR_LAYOUT_SPRING}
          className={SCREEN_LAYOUT.todayButton}
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
              SCREEN_LAYOUT.iconButton,
              isExpanded && "bg-mint text-primary hover:text-primary",
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
    </header>
  );
}
