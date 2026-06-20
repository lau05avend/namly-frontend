"use client";

import { StepProgress } from "@/components/ui/step-progress";
import { HISTORY_COPY } from "@/features/history/constants/history-copy";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

type HistoryMealLogContextBarProps = {
  current: number;
  total: number;
  mealTypeName?: string | null;
  mealTypeId?: string | null;
  onPrevious: () => void;
  onNext: () => void;
};

function shouldShowMealType(
  mealTypeId: string | null | undefined,
  mealTypeName: string | null | undefined,
): mealTypeName is string {
  return Boolean(
    mealTypeId &&
      mealTypeName &&
      mealTypeName !== HISTORY_COPY.mealTitleFallback,
  );
}

export function HistoryMealLogContextBar({
  current,
  total,
  mealTypeName,
  mealTypeId,
  onPrevious,
  onNext,
}: HistoryMealLogContextBarProps) {
  const showMealType = shouldShowMealType(mealTypeId, mealTypeName);
  const showPager = total > 1;

  if (!showMealType && !showPager) {
    return null;
  }

  const canGoPrevious = current > 1;
  const canGoNext = current < total;

  return (
    <>
      <div
        className="flex flex-col items-center gap-2 px-4 py-3"
        aria-live="polite"
        aria-atomic="true"
      >
        {showMealType ? (
          <p className="text-base font-semibold text-foreground">
            {mealTypeName}
          </p>
        ) : null}

        {showPager ? (
          <>
            <p className="sr-only">
              {HISTORY_COPY.mealLogProgress(current, total)}
            </p>
            <StepProgress current={current} total={total} />
          </>
        ) : null}
      </div>

      {showPager ? (
        <>
          <button
            type="button"
            onClick={onPrevious}
            disabled={!canGoPrevious}
            aria-label={HISTORY_COPY.previousMeal}
            className={cn(
              "fixed left-2 z-20 flex size-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full text-foreground/70 transition-colors hover:bg-mint/50",
              !canGoPrevious && "pointer-events-none opacity-30",
            )}
            style={{
              top: "calc(50% - 3.5rem)",
            }}
          >
            <ChevronLeft className="size-6" strokeWidth={1.75} aria-hidden />
          </button>

          <button
            type="button"
            onClick={onNext}
            disabled={!canGoNext}
            aria-label={HISTORY_COPY.nextMeal}
            className={cn(
              "fixed right-2 z-20 flex size-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full text-foreground/70 transition-colors hover:bg-mint/50",
              !canGoNext && "pointer-events-none opacity-30",
            )}
            style={{
              top: "calc(50% - 3.5rem)",
            }}
          >
            <ChevronRight className="size-6" strokeWidth={1.75} aria-hidden />
          </button>
        </>
      ) : null}
    </>
  );
}

/** @deprecated Use HistoryMealLogContextBar */
export const HistoryMealLogPager = HistoryMealLogContextBar;
