"use client";

import { HISTORY_COPY } from "@/features/history/constants/history-copy";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

type HistoryScrollToTodayButtonProps = {
  visible: boolean;
  onClick: () => void;
};

/** Compact circle centered above the bottom nav — secondary to the camera FAB on the right. */
export function HistoryScrollToTodayButton({
  visible,
  onClick,
}: HistoryScrollToTodayButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={HISTORY_COPY.goToToday}
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={cn(
        "fixed left-1/2 z-40 flex size-9 cursor-pointer items-center justify-center rounded-full border border-foreground/10 bg-card/95 text-foreground/55 shadow-sm backdrop-blur-sm transition-[opacity,transform] duration-200 active:scale-95",
        "bottom-[6.375rem]",
        visible
          ? "pointer-events-auto -translate-x-1/2 translate-y-0 opacity-100"
          : "pointer-events-none -translate-x-1/2 translate-y-2 opacity-0",
      )}
    >
      <ChevronDown
        className="size-5 translate-y-px"
        strokeWidth={2.5}
        aria-hidden
      />
    </button>
  );
}
