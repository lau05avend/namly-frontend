"use client";

import { format, isToday } from "date-fns";
import type { HistoryDayPreview } from "@/features/history/types/history.types";
import { cn } from "@/lib/utils";

type HistoryTimelineDayCellProps = {
  date: Date;
  isCurrentMonth: boolean;
  selected: boolean;
  preview?: HistoryDayPreview;
  onSelect: (date: Date) => void;
};

export function HistoryTimelineDayCell({
  date,
  isCurrentMonth,
  selected,
  preview,
  onSelect,
}: HistoryTimelineDayCellProps) {
  const dayNumber = format(date, "d");
  const today = isToday(date);
  const hasMeals = Boolean(preview && preview.mealCount > 0);
  const hasThumbnail = Boolean(preview?.thumbnailUrl);
  const mealCount = preview?.mealCount ?? 0;

  return (
    <button
      type="button"
      onClick={() => onSelect(date)}
      aria-pressed={selected}
      aria-label={format(date, "EEEE d MMMM")}
      className={cn(
        "flex flex-col items-center gap-1 rounded-2xl px-1 py-1.5 transition-colors active:scale-[0.98]",
        !isCurrentMonth && "opacity-35",
      )}
    >
      {hasThumbnail ? (
        <span
          className={cn(
            "relative flex size-9 shrink-0 overflow-hidden rounded-full",
            selected &&
              "ring-2 ring-primary ring-offset-2 ring-offset-background shadow-sm",
            !selected && today && "ring-2 ring-mint",
          )}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={preview?.thumbnailUrl ?? ""}
            alt=""
            className="size-full object-cover"
          />
          <span
            className="absolute inset-0 bg-black/25"
            aria-hidden
          />
          <span className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-white drop-shadow-sm">
            {dayNumber}
          </span>
          {mealCount > 1 ? (
            <span className="absolute -top-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-white shadow-sm">
              {mealCount}
            </span>
          ) : null}
        </span>
      ) : (
        <span
          className={cn(
            "flex size-9 items-center justify-center rounded-full text-sm font-semibold",
            selected && "bg-primary text-white shadow-sm",
            !selected && today && "bg-mint text-primary",
            !selected && !today && "text-foreground/75",
          )}
        >
          {dayNumber}
        </span>
      )}

      {hasMeals ? (
        <span
          className={cn(
            "size-1.5 rounded-full",
            selected ? "bg-highlight" : "bg-primary",
          )}
          aria-hidden
        />
      ) : (
        <span className="size-1.5" aria-hidden />
      )}
    </button>
  );
}
