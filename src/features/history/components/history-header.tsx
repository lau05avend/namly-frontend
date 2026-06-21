"use client";

import { motion } from "motion/react";
import { CALENDAR_LAYOUT_SPRING } from "@/features/calendar/constants/motion";
import { HISTORY_COPY } from "@/features/history/constants/history-copy";
import type { HistoryViewMode } from "@/features/history/types/history.types";
import { SCREEN_LAYOUT } from "@/constants/screen-layout";
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
    <header className={SCREEN_LAYOUT.headerRow}>
      <h1 className={SCREEN_LAYOUT.headerTitle}>{HISTORY_COPY.title}</h1>

      <div className={SCREEN_LAYOUT.headerActions}>
        {viewMode === "calendar" ? (
          <motion.button
            type="button"
            onClick={onGoToToday}
            aria-label={HISTORY_COPY.goToToday}
            whileTap={{ scale: 0.94 }}
            transition={CALENDAR_LAYOUT_SPRING}
            className={SCREEN_LAYOUT.todayButton}
          >
            {todayDayNumber}
          </motion.button>
        ) : null}

        <button
          type="button"
          onClick={onToggleView}
          aria-label={viewLabel}
          className={SCREEN_LAYOUT.iconButton}
        >
          <ViewIcon className="size-4" strokeWidth={2} aria-hidden="true" />
        </button>
      </div>
    </header>
  );
}