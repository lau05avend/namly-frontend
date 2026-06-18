"use client";

import { HISTORY_COPY } from "@/features/history/constants/history-copy";
import type { HistoryViewMode } from "@/features/history/types/history.types";
import { CalendarDays, List, SlidersHorizontal } from "lucide-react";

type HistoryHeaderProps = {
  viewMode: HistoryViewMode;
  onToggleView: () => void;
};

export function HistoryHeader({ viewMode, onToggleView }: HistoryHeaderProps) {
  const ViewIcon = viewMode === "calendar" ? List : CalendarDays;
  const viewLabel =
    viewMode === "calendar"
      ? HISTORY_COPY.viewToggle.agenda
      : HISTORY_COPY.viewToggle.calendar;

  return (
    <header className="flex items-center justify-between gap-3">
      <h1 className="text-xl font-bold text-foreground">{HISTORY_COPY.title}</h1>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onToggleView}
          aria-label={viewLabel}
          className="flex size-9 items-center justify-center rounded-full bg-card text-foreground/60 transition-colors hover:bg-mint/50 hover:text-primary"
        >
          <ViewIcon className="size-4" strokeWidth={2} aria-hidden="true" />
        </button>

        {/* <button
          type="button"
          disabled
          aria-label={HISTORY_COPY.filter}
          className="flex size-9 items-center justify-center rounded-full bg-card text-foreground/30"
        >
          <SlidersHorizontal className="size-4" strokeWidth={2} aria-hidden="true" />
        </button> */}
      </div>
    </header>
  );
}
