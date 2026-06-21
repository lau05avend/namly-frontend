"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { BottomNav } from "@/components/navigation/bottom-nav";
import { parseDateKey } from "@/features/calendar";
import { HistoryMealLogCarousel } from "@/features/history/components/history-meal-log-carousel";
import { HistoryMealLogContextBar } from "@/features/history/components/history-meal-log-pager";
import { HistoryMealLogDeleteSheet } from "@/features/history/components/history-meal-log-delete-sheet";
import { HistoryMealLogHeader } from "@/features/history/components/history-meal-log-header";
import { HistoryDayEmpty } from "@/features/history/components/history-day-empty";
import { HistoryLoading } from "@/features/history/components/history-loading";
import { HISTORY_COPY } from "@/features/history/constants/history-copy";
import { historyQueryKeys } from "@/features/history/constants/query-keys";
import { useDeleteMealLog } from "@/features/history/queries/use-delete-meal-log";
import { useHistoryDay } from "@/features/history/queries/use-history-day";
import {
  fetchHistoryMealLog,
} from "@/features/history/services/history.service";

type HistoryMealLogScreenProps = {
  logId: string;
  dateKey: string;
};

export function HistoryMealLogScreen({
  logId,
  dateKey,
}: HistoryMealLogScreenProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const deleteMutation = useDeleteMealLog();
  const parsedDate = parseDateKey(dateKey);
  const { data: day, isPending, isError } = useHistoryDay(dateKey);

  const logIds = useMemo(() => day?.logs.map((log) => log.id) ?? [], [day?.logs]);

  const activeIndex = useMemo(
    () => logIds.indexOf(logId),
    [logIds, logId],
  );

  const activeSummary = useMemo(
    () => day?.logs.find((log) => log.id === logId),
    [day?.logs, logId],
  );

  useEffect(() => {
    if (!logIds.length) {
      return;
    }

    logIds.forEach((id) => {
      void queryClient.prefetchQuery({
        queryKey: historyQueryKeys.mealLog(id),
        queryFn: () => fetchHistoryMealLog(id),
      });
    });
  }, [logIds, queryClient]);

  useEffect(() => {
    if (!day || logIds.includes(logId)) {
      return;
    }

    const firstLog = day.logs[0];
    if (firstLog) {
      router.replace(`/history/meals/${firstLog.id}?date=${dateKey}`);
    }
  }, [dateKey, day, logId, logIds, router]);

  const handleActiveLogChange = useCallback(
    (nextLogId: string) => {
      router.replace(`/history/meals/${nextLogId}?date=${dateKey}`, {
        scroll: false,
      });
    },
    [dateKey, router],
  );

  const handlePrevious = useCallback(() => {
    if (activeIndex <= 0) {
      return;
    }

    const previousId = logIds[activeIndex - 1];
    if (previousId) {
      handleActiveLogChange(previousId);
    }
  }, [activeIndex, handleActiveLogChange, logIds]);

  const handleNext = useCallback(() => {
    if (activeIndex < 0 || activeIndex >= logIds.length - 1) {
      return;
    }

    const nextId = logIds[activeIndex + 1];
    if (nextId) {
      handleActiveLogChange(nextId);
    }
  }, [activeIndex, handleActiveLogChange, logIds]);

  const handleEdit = useCallback(() => {
    router.push(`/meals/register?edit=${logId}`);
  }, [logId, router]);

  const handleDelete = useCallback(async () => {
    try {
      await deleteMutation.mutateAsync({ logId, dateKey });
      setIsDeleteOpen(false);
      toast.success(HISTORY_COPY.deleteMealSuccess);

      const remainingIds = logIds.filter((id) => id !== logId);
      if (remainingIds.length > 0) {
        router.replace(`/history/meals/${remainingIds[0]}?date=${dateKey}`);
        return;
      }

      router.replace("/history");
    } catch {
      toast.error(HISTORY_COPY.deleteMealError);
    }
  }, [dateKey, deleteMutation, logId, logIds, router]);

  if (!parsedDate) {
    return null;
  }

  return (
    <div className="relative min-h-dvh bg-background pb-28">
      <HistoryMealLogHeader
        dateKey={dateKey}
        loggedAtTime={activeSummary?.loggedAtTime}
        onEdit={handleEdit}
        onDelete={() => setIsDeleteOpen(true)}
      />

      <HistoryMealLogDeleteSheet
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        onConfirm={handleDelete}
        isDeleting={deleteMutation.isPending}
      />

      <main className="mx-auto w-full max-w-lg pt-[calc(env(safe-area-inset-top)+4.5rem)]">
        {isPending ? (
          <div className="px-4 py-2">
            <HistoryLoading />
          </div>
        ) : null}

        {isError ? (
          <p className="px-4 py-10 text-center text-sm text-foreground/60">
            {HISTORY_COPY.loadError}
          </p>
        ) : null}

        {day && logIds.length > 0 && activeIndex >= 0 ? (
          <>
            <HistoryMealLogContextBar
              current={activeIndex + 1}
              total={logIds.length}
              mealTypeName={activeSummary?.mealTypeName}
              mealTypeId={activeSummary?.mealTypeId}
              onPrevious={handlePrevious}
              onNext={handleNext}
            />
            <HistoryMealLogCarousel
              logIds={logIds}
              activeLogId={logId}
              onActiveLogChange={handleActiveLogChange}
            />
          </>
        ) : null}

        {day && day.logs.length === 0 ? <HistoryDayEmpty /> : null}
      </main>

      <BottomNav activeId="history" />
    </div>
  );
}
