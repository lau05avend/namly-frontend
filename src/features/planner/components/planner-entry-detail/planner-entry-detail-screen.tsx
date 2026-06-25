"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { BottomNav } from "@/components/navigation/bottom-nav";
import {
  PLANNER_ENTRY_DETAIL_CONTENT_OFFSET_CLASS,
  PlannerEntryDetailHeader,
} from "@/features/planner/components/planner-entry-detail/planner-entry-detail-header";
import { PlannerEntryDetailContent } from "@/features/planner/components/planner-entry-detail/planner-entry-detail-content";
import { PlannerEntryDetailDeleteSheet } from "@/features/planner/components/planner-entry-detail/planner-entry-detail-delete-sheet";
import { PlannerLoading } from "@/features/planner/components/planner-loading";
import { PLANNER_COPY } from "@/features/planner/constants/planner-copy";
import { useDeleteScheduledMeal } from "@/features/planner/queries/use-delete-scheduled-meal";
import { usePlannerScheduledMeal } from "@/features/planner/queries/use-planner-scheduled-meal";
import { getUserFacingErrorMessage } from "@/lib/api/get-user-facing-error-message";

type PlannerEntryDetailScreenProps = {
  scheduledMealId: string;
  dateKey: string;
};

export function PlannerEntryDetailScreen({
  scheduledMealId,
  dateKey,
}: PlannerEntryDetailScreenProps) {
  const router = useRouter();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const deleteMutation = useDeleteScheduledMeal();
  const { data: detail, isPending, isError } = usePlannerScheduledMeal(
    scheduledMealId,
  );

  const plannerDateKey = detail?.entryDate ?? dateKey;

  const handleBack = () => {
    router.replace(`/planner?date=${plannerDateKey}`);
  };

  const handleEdit = useCallback(() => {
    const params = new URLSearchParams({ edit: scheduledMealId });
    router.push(`/planner/plan?${params.toString()}`);
  }, [router, scheduledMealId]);

  const handleDelete = useCallback(async () => {
    if (!detail) {
      return;
    }

    try {
      await deleteMutation.mutateAsync({
        scheduledMealId: detail.id,
        entryDate: detail.entryDate,
      });
      setIsDeleteOpen(false);
      toast.success(PLANNER_COPY.detail.deletePlanSuccess);
      router.replace(`/planner?date=${detail.entryDate}`);
    } catch (error) {
      toast.error(
        getUserFacingErrorMessage(error, PLANNER_COPY.detail.deletePlanError),
      );
    }
  }, [deleteMutation, detail, router]);

  return (
    <div className="relative min-h-dvh bg-background pb-28">
      <PlannerEntryDetailDeleteSheet
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        onConfirm={() => void handleDelete()}
        isDeleting={deleteMutation.isPending}
      />

      <PlannerEntryDetailHeader
        title={detail?.mealTypeName ?? "…"}
        subtitle={detail?.timeLabel}
        onBack={handleBack}
        onEdit={detail ? handleEdit : undefined}
        onDelete={detail ? () => setIsDeleteOpen(true) : undefined}
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
