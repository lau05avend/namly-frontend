"use client";

import { useCallback, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { BottomNav } from "@/components/navigation/bottom-nav";
import { parseDateKey } from "@/features/calendar";
import { HistoryMealLogCarousel } from "@/features/history/components/history-meal-log-carousel";
import { HistoryMealLogContextBar } from "@/features/history/components/history-meal-log-pager";
import { HistoryMealLogHeader } from "@/features/history/components/history-meal-log-header";
import { HistoryLoading } from "@/features/history/components/history-loading";
import { HISTORY_COPY } from "@/features/history/constants/history-copy";
import { historyQueryKeys } from "@/features/history/constants/query-keys";
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

  if (!parsedDate) {
    return null;
  }

  return (
    <div className="relative min-h-dvh bg-background pb-28">
      <HistoryMealLogHeader
        dateKey={dateKey}
        loggedAtTime={activeSummary?.loggedAtTime}
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

        {day && day.logs.length === 0 ? (
          <p className="px-4 py-10 text-center text-sm text-foreground/60">
            {HISTORY_COPY.dayEmpty}
          </p>
        ) : null}
      </main>

      <BottomNav activeId="history" />
    </div>
  );
}
