"use client";

import { useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { BottomNav } from "@/components/navigation/bottom-nav";
import { ScreenTopBar } from "@/components/layout/screen-top-bar";
import { FloatingActionButton } from "@/components/ui/floating-action-button";
import { SCREEN_LAYOUT } from "@/constants/screen-layout";
import { toDateKey } from "@/features/calendar";
import { HistoryAgendaView } from "@/features/history/components/history-agenda-view";
import { HistoryCalendarView } from "@/features/history/components/history-calendar-view";
import { HistoryHeader } from "@/features/history/components/history-header";
import type { HistoryTimelineCalendarHandle } from "@/features/history/components/history-timeline-calendar";
import { HISTORY_COPY } from "@/features/history/constants/history-copy";
import { historyQueryKeys } from "@/features/history/constants/query-keys";
import { fetchHistoryDay } from "@/features/history/services/history.service";
import type { HistoryViewMode } from "@/features/history/types/history.types";
import { useRegisterMealLaunch } from "@/features/meal-register/hooks/use-register-meal-launch";

type HistoryScreenProps = {
  initialView?: HistoryViewMode;
};

export function HistoryScreen({ initialView = "calendar" }: HistoryScreenProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const timelineRef = useRef<HistoryTimelineCalendarHandle>(null);
  const viewMode = initialView;
  const { openRegisterWithCamera, launchUi } = useRegisterMealLaunch();

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
    openRegisterWithCamera({
      date: toDateKey(new Date()),
    });
  }, [openRegisterWithCamera]);

  return (
    <div className="relative bg-background pb-32">
      <ScreenTopBar>
        <HistoryHeader
          viewMode={viewMode}
          onToggleView={handleToggleView}
          onGoToToday={handleGoToToday}
        />
      </ScreenTopBar>

      <main
        className={`${SCREEN_LAYOUT.content} flex flex-col ${SCREEN_LAYOUT.mainOffset}`}
      >
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
      {launchUi}
      <BottomNav activeId="history" />
    </div>
  );
}
