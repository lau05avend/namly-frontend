"use client";

import { PlannerEntryDetailCompletionLog } from "@/features/planner/components/planner-entry-detail/planner-entry-detail-completion-log";
import { PlannerEntryDetailMeta } from "@/features/planner/components/planner-entry-detail/planner-entry-detail-meta";
import { PlannerEntryDetailNote } from "@/features/planner/components/planner-entry-detail/planner-entry-detail-note";
import { PlannerEntryDetailRecipes } from "@/features/planner/components/planner-entry-detail/planner-entry-detail-recipes";
import type { PlannerScheduledMealDetail } from "@/features/planner/types/planner-detail.types";
import { PLANNER_DETAIL_STACK_CLASS } from "@/features/planner/constants/planner-detail-surfaces";
import { cn } from "@/lib/utils";

type PlannerEntryDetailContentProps = {
  detail: PlannerScheduledMealDetail;
  className?: string;
};

export function PlannerEntryDetailContent({
  detail,
  className,
}: PlannerEntryDetailContentProps) {
  return (
    <div className={cn(PLANNER_DETAIL_STACK_CLASS, "pb-8", className)}>
      <PlannerEntryDetailMeta detail={detail} />

      {detail.isExpress && detail.expressNote ? (
        <PlannerEntryDetailNote content={detail.expressNote} />
      ) : null}

      {!detail.isExpress ? (
        <PlannerEntryDetailRecipes
          recipes={detail.recipes}
          scheduledMealId={detail.id}
          dateKey={detail.entryDate}
        />
      ) : null}

      {detail.completionMealLog ? (
        <PlannerEntryDetailCompletionLog
          mealLog={detail.completionMealLog}
          mealTypeName={detail.mealTypeName}
          scheduledMealId={detail.id}
          entryDate={detail.entryDate}
        />
      ) : null}
    </div>
  );
}
