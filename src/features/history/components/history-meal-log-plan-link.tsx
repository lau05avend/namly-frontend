import { HISTORY_COPY } from "@/features/history/constants/history-copy";
import type {
  HistoryMealLogDetail,
  HistoryMealLogScheduledMeal,
} from "@/features/history/types/history.types";
import {
  formatPlannedTimeLabel,
  resolveScheduledMealDetail,
} from "@/features/history/utils/history-meal-log-plan.utils";
import { cn } from "@/lib/utils";
import { ChevronRight, CircleCheck } from "lucide-react";

type HistoryMealLogPlanLinkProps = {
  log: HistoryMealLogDetail;
  onOpenPlan: () => void;
  className?: string;
};

export function shouldShowPlanLink(log: HistoryMealLogDetail): boolean {
  return log.isLinkedToPlan || log.scheduledMeal !== null;
}

function resolvePlanSecondaryLine(
  scheduledMeal: HistoryMealLogScheduledMeal,
): string {
  const time = formatPlannedTimeLabel(scheduledMeal.plannedTime);
  const detail = resolveScheduledMealDetail(scheduledMeal);

  if (detail) {
    return `${time} · ${detail}`;
  }

  return time;
}

export function HistoryMealLogPlanLink({
  log,
  onOpenPlan,
  className,
}: HistoryMealLogPlanLinkProps) {
  const scheduledMeal = log.scheduledMeal;

  if (!shouldShowPlanLink(log)) {
    return null;
  }

  const secondaryLine = scheduledMeal
    ? resolvePlanSecondaryLine(scheduledMeal)
    : HISTORY_COPY.plannedOpenHint;

  return (
    <button
      type="button"
      onClick={onOpenPlan}
      aria-label={HISTORY_COPY.openPlanAria}
      className={cn(
        "flex w-full min-w-0 cursor-pointer items-center gap-2 rounded-lg border border-foreground/6 px-2.5 py-1.5 text-left transition-[border-color,opacity] hover:border-foreground/10 hover:opacity-90 active:opacity-80",
        className,
      )}
    >
      <span className="flex shrink-0 items-center gap-1">
        <span className="flex size-5 items-center justify-center rounded-md bg-primary/10 text-primary">
          <CircleCheck className="size-2.5" strokeWidth={2.5} aria-hidden />
        </span>
        <span className="text-[11px] font-semibold leading-none text-primary">
          {HISTORY_COPY.plannedContextLabel}
        </span>
        <span className="text-[11px] min-w-3 leading-none text-foreground/40">·</span>
      </span>


      <p className="min-w-0 flex-1 truncate text-[11px] leading-none text-foreground/40">
        {secondaryLine}
      </p>

      <ChevronRight
        className="size-3 shrink-0 text-foreground/25"
        strokeWidth={1.75}
        aria-hidden
      />
    </button>
  );
}
