import { PlanCompactRow } from "@/components/meal/plan-compact-row";
import { HISTORY_COPY } from "@/features/history/constants/history-copy";
import type {
  HistoryMealLogDetail,
  HistoryMealLogScheduledMeal,
} from "@/features/history/types/history.types";
import {
  formatPlannedTimeLabel,
  resolveScheduledMealDetail,
} from "@/features/history/utils/history-meal-log-plan.utils";
import { ChevronRight } from "lucide-react";

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
    <PlanCompactRow
      variant="linked"
      label={HISTORY_COPY.plannedContextLabel}
      secondaryLine={secondaryLine}
      onPress={onOpenPlan}
      ariaLabel={HISTORY_COPY.openPlanAria}
      className={className}
      trailing={
        <ChevronRight
          className="size-3 shrink-0 text-foreground/25"
          strokeWidth={1.75}
          aria-hidden
        />
      }
    />
  );
}
