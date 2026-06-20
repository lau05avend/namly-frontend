"use client";

import { format, isToday } from "date-fns";
import { MealPhotoImage } from "@/features/meal-register/components/meal-photo-image";
import type { HistoryDayPreview } from "@/features/history/types/history.types";
import { cn } from "@/lib/utils";

const MEAL_COUNT_BADGE_MIN = 2;

type HistoryDayMealCountBadgeProps = {
  count: number;
  className?: string;
};

function HistoryDayMealCountBadge({
  count,
  className,
}: HistoryDayMealCountBadgeProps) {
  if (count < MEAL_COUNT_BADGE_MIN) {
    return null;
  }

  return (
    <span
      className={cn(
        "absolute -top-0.5 -right-0.5 z-10 flex min-w-4 items-center justify-center rounded-full",
        "bg-card px-1 py-0.5 text-[10px] font-semibold leading-none text-foreground",
        "shadow-sm ring-1 ring-foreground/10",
        className,
      )}
      aria-hidden
    >
      {count}
    </span>
  );
}

type HistoryTimelineDayCellProps = {
  date: Date;
  isCurrentMonth: boolean;
  preview?: HistoryDayPreview;
  onPress: (date: Date) => void;
};

export function HistoryTimelineDayCell({
  date,
  isCurrentMonth,
  preview,
  onPress,
}: HistoryTimelineDayCellProps) {
  const dayNumber = format(date, "d");
  const today = isToday(date);
  const hasMeals = Boolean(preview && preview.mealCount > 0);
  const hasThumbnail = Boolean(preview?.thumbnailUrl);
  const mealCount = preview?.mealCount ?? 0;
  const showActivityDot = hasMeals;
  const ariaLabel =
    mealCount >= MEAL_COUNT_BADGE_MIN
      ? `${format(date, "EEEE d MMMM")}, ${mealCount} comidas registradas`
      : format(date, "EEEE d MMMM");

  return (
    <button
      type="button"
      onClick={() => {
        if (hasMeals) {
          onPress(date);
        }
      }}
      disabled={!hasMeals}
      aria-label={ariaLabel}
      aria-disabled={!hasMeals}
      className={cn(
        "flex flex-col items-center gap-1 rounded-2xl px-1 py-1.5 transition-colors",
        hasMeals && "cursor-pointer active:scale-[0.98]",
        !hasMeals && "cursor-default disabled:opacity-100",
        !isCurrentMonth && "opacity-35",
      )}
    >
      {hasThumbnail ? (
        <span className="relative flex size-9 shrink-0">
          <MealPhotoImage
            mediaRef={preview?.thumbnailUrl}
            className={cn(
              "size-9 rounded-full",
              today &&
                "ring-1 ring-primary/70 ring-offset-2 ring-offset-background",
            )}
            imageClassName="size-full"
          >
            <span className="absolute inset-0 bg-black/25" aria-hidden />
            <span className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-white drop-shadow-sm">
              {dayNumber}
            </span>
          </MealPhotoImage>
          <HistoryDayMealCountBadge count={mealCount} />
        </span>
      ) : (
        <span
          className={cn(
            "relative flex size-9 items-center justify-center rounded-full text-sm font-semibold",
            today && "bg-mint/60 text-primary",
            !today && "text-foreground/75",
          )}
        >
          {dayNumber}
          <HistoryDayMealCountBadge count={mealCount} />
        </span>
      )}

      {showActivityDot ? (
        <span
          className={cn("size-1.5 rounded-full", "bg-primary")}
          aria-hidden
        />
      ) : (
        <span className="size-1.5" aria-hidden />
      )}
    </button>
  );
}
