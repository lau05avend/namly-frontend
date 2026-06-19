"use client";

import { useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { BottomNav } from "@/components/navigation/bottom-nav";
import { FloatingActionButton } from "@/components/ui/floating-action-button";
import { toDateKey } from "@/features/calendar";
import { HistoryAgendaView } from "@/features/history/components/history-agenda-view";
import { HistoryCalendarView } from "@/features/history/components/history-calendar-view";
import { HistoryHeader } from "@/features/history/components/history-header";
import type { HistoryTimelineCalendarHandle } from "@/features/history/components/history-timeline-calendar";
import { HISTORY_COPY } from "@/features/history/constants/history-copy";
import { historyQueryKeys } from "@/features/history/constants/query-keys";
import { fetchHistoryDay } from "@/features/history/services/history.service";
import type { HistoryViewMode } from "@/features/history/types/history.types";

type HistoryScreenProps = {
  initialView?: HistoryViewMode;
};

export function HistoryScreen({ initialView = "calendar" }: HistoryScreenProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const timelineRef = useRef<HistoryTimelineCalendarHandle>(null);
  const viewMode = initialView;

  const handleToggleView = useCallback(() => {
    const nextView: HistoryViewMode =
      viewMode === "calendar" ? "agenda" : "calendar";
    const params = new URLSearchParams({ view: nextView });
    router.push(`/history?${params.toString()}`);
  }, [router, viewMode]);

  const handleGoToToday = useCallback(() => {
    timelineRef.current?.scrollToToday();
  }, []);

  const handleDayPress = useCallback(
    async (date: Date) => {
      const dateKey = toDateKey(date);
      const day = await queryClient.fetchQuery({
        queryKey: historyQueryKeys.day(dateKey),
        queryFn: () => fetchHistoryDay(dateKey),
      });
      const firstLog = day.logs[0];

      if (firstLog) {
        router.push(`/history/meals/${firstLog.id}?date=${dateKey}`);
      }
    },
    [queryClient, router],
  );

  const handleFabClick = useCallback(() => {
    const params = new URLSearchParams({
      date: toDateKey(new Date()),
    });
    router.push(`/meals/register?${params.toString()}`);
  }, [router]);

  return (
    <div className="relative min-h-dvh bg-background pb-28">
      <div className="fixed inset-x-0 top-0 z-30 border-b border-foreground/8 bg-background/95 backdrop-blur-sm">
        <div className="mx-auto w-full max-w-lg px-4 py-3">
          <HistoryHeader
            viewMode={viewMode}
            onToggleView={handleToggleView}
            onGoToToday={handleGoToToday}
          />
        </div>
      </div>

      <main className="mx-auto flex w-full max-w-lg flex-col px-4 pt-[calc(env(safe-area-inset-top)+4.25rem)]">
        {viewMode === "calendar" ? (
          <HistoryCalendarView ref={timelineRef} onDayPress={handleDayPress} />
        ) : (
          <HistoryAgendaView />
        )}
      </main>

      <FloatingActionButton
        label={HISTORY_COPY.fabLabel}
        icon="camera"
        onClick={handleFabClick}
      />
      <BottomNav activeId="history" />
    </div>
  );
}
