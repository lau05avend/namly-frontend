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
import {
  buildPlanMealEditPath,
  buildPlannerEntryPath,
} from "@/lib/navigation/meal-routes";
import { navigateToInternalPath } from "@/lib/navigation/to-app-navigation-href";
import { useReturnToSearchParam } from "@/lib/navigation/use-return-to-search-param";

type PlannerEntryDetailScreenProps = {
  scheduledMealId: string;
  dateKey: string;
  returnTo?: string;
};

export function PlannerEntryDetailScreen({
  scheduledMealId,
  dateKey,
  returnTo,
}: PlannerEntryDetailScreenProps) {
  const router = useRouter();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const deleteMutation = useDeleteScheduledMeal();
  const safeReturnTo = useReturnToSearchParam(returnTo);
  const { data: detail, isPending, isError } = usePlannerScheduledMeal(
    scheduledMealId,
  );

  const plannerDateKey = detail?.entryDate ?? dateKey;

  const handleBack = () => {
    if (safeReturnTo) {
      navigateToInternalPath(router, safeReturnTo);
      return;
    }

    router.replace(`/planner?date=${plannerDateKey}`);
  };

  const handleEdit = useCallback(() => {
    router.push(
      buildPlanMealEditPath(
        scheduledMealId,
        buildPlannerEntryPath(scheduledMealId, plannerDateKey, safeReturnTo),
      ),
    );
  }, [plannerDateKey, router, safeReturnTo, scheduledMealId]);

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
      navigateToInternalPath(
        router,
        safeReturnTo ?? `/planner?date=${detail.entryDate}`,
      );
    } catch (error) {
      toast.error(
        getUserFacingErrorMessage(error, PLANNER_COPY.detail.deletePlanError),
      );
    }
  }, [deleteMutation, detail, router, safeReturnTo]);

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

        {detail ? (
          <PlannerEntryDetailContent
            detail={detail}
            returnTo={safeReturnTo}
          />
        ) : null}
      </main>

      <BottomNav activeId="planner" />
    </div>
  );
}
