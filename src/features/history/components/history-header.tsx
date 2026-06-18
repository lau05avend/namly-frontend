"use client";

import { motion } from "motion/react";
import { CALENDAR_LAYOUT_SPRING } from "@/features/calendar/constants/motion";
import { HISTORY_COPY } from "@/features/history/constants/history-copy";
import type { HistoryViewMode } from "@/features/history/types/history.types";
import { CalendarDays, List } from "lucide-react";

type HistoryHeaderProps = {
  viewMode: HistoryViewMode;
  onToggleView: () => void;
  onGoToToday: () => void;
};

export function HistoryHeader({
  viewMode,
  onToggleView,
  onGoToToday,
}: HistoryHeaderProps) {
  const ViewIcon = viewMode === "calendar" ? List : CalendarDays;
  const viewLabel =
    viewMode === "calendar"
      ? HISTORY_COPY.viewToggle.agenda
      : HISTORY_COPY.viewToggle.calendar;
  const todayDayNumber = new Date().getDate();

  return (
    <header className="flex items-center justify-between gap-3">
      <h1 className="text-xl font-bold text-foreground">
        {HISTORY_COPY.title}
      </h1>

      <div className="flex items-center gap-2">
        {viewMode === "calendar" ? (
          <motion.button
            type="button"
            onClick={onGoToToday}
            aria-label={HISTORY_COPY.goToToday}
            whileTap={{ scale: 0.94 }}
            transition={CALENDAR_LAYOUT_SPRING}
            className="flex size-9 cursor-pointer items-center justify-center rounded-full bg-mint text-sm font-semibold text-primary transition-colors hover:bg-mint/80"
          >
            {todayDayNumber}
          </motion.button>
        ) : null}

        <button
          type="button"
          onClick={onToggleView}
          aria-label={viewLabel}
          className="flex size-9 cursor-pointer items-center justify-center rounded-full bg-card text-foreground/60 transition-colors hover:bg-mint/50 hover:text-primary"
        >
          <ViewIcon className="size-4" strokeWidth={2} aria-hidden="true" />
        </button>
      </div>
    </header>
  );
}