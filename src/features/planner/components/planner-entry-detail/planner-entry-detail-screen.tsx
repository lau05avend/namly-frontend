"use client";

import { useRouter } from "next/navigation";
import { BottomNav } from "@/components/navigation/bottom-nav";
import {
  PLANNER_ENTRY_DETAIL_CONTENT_OFFSET_CLASS,
  PlannerEntryDetailHeader,
} from "@/features/planner/components/planner-entry-detail/planner-entry-detail-header";
import { PlannerEntryDetailContent } from "@/features/planner/components/planner-entry-detail/planner-entry-detail-content";
import { PlannerLoading } from "@/features/planner/components/planner-loading";
import { PLANNER_COPY } from "@/features/planner/constants/planner-copy";
import { usePlannerScheduledMeal } from "@/features/planner/queries/use-planner-scheduled-meal";

type PlannerEntryDetailScreenProps = {
  scheduledMealId: string;
  dateKey: string;
};

export function PlannerEntryDetailScreen({
  scheduledMealId,
  dateKey,
}: PlannerEntryDetailScreenProps) {
  const router = useRouter();
  const { data: detail, isPending, isError } = usePlannerScheduledMeal(
    scheduledMealId,
  );

  const plannerDateKey = detail?.entryDate ?? dateKey;

  const handleBack = () => {
    router.replace(`/planner?date=${plannerDateKey}`);
  };

  return (
    <div className="relative min-h-dvh bg-background pb-28">
      <PlannerEntryDetailHeader
        title={detail?.mealTypeName ?? "…"}
        subtitle={detail?.timeLabel}
        onBack={handleBack}
      />

      <main
        className={`mx-auto w-full max-w-lg px-4 pb-2 ${PLANNER_ENTRY_DETAIL_CONTENT_OFFSET_CLASS}`}
      >
        {isPending ? (
          <div className="py-2">
            <PlannerLoading variant="compact" />
          </div>
        ) : null}

        {isError || (!isPending && !detail) ? (
          <p className="py-10 text-center text-sm text-foreground/60">
            {PLANNER_COPY.detail.loadError}
          </p>
        ) : null}

        {detail ? <PlannerEntryDetailContent detail={detail} /> : null}
      </main>

      <BottomNav activeId="planner" />
    </div>
  );
}
