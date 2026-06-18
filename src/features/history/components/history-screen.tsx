"use client";

import { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { BottomNav } from "@/components/navigation/bottom-nav";
import { FloatingActionButton } from "@/components/ui/floating-action-button";
import { parseDateKey, useTemporalNavigation } from "@/features/calendar";
import { HistoryAgendaView } from "@/features/history/components/history-agenda-view";
import { HistoryCalendarView } from "@/features/history/components/history-calendar-view";
import { HistoryHeader } from "@/features/history/components/history-header";
import { HISTORY_COPY } from "@/features/history/constants/history-copy";
import type { HistoryViewMode } from "@/features/history/types/history.types";

type HistoryScreenProps = {
  initialDate?: string;
  initialView?: HistoryViewMode;
};

export function HistoryScreen({
  initialDate,
  initialView = "calendar",
}: HistoryScreenProps) {
  const router = useRouter();
  const navigation = useTemporalNavigation(
    useMemo(() => parseDateKey(initialDate) ?? new Date(), [initialDate]),
  );
  const viewMode = initialView;

  const handleToggleView = useCallback(() => {
    const nextView: HistoryViewMode =
      viewMode === "calendar" ? "agenda" : "calendar";
    const params = new URLSearchParams({
      date: navigation.selectedDateKey,
      view: nextView,
    });
    router.push(`/history?${params.toString()}`);
  }, [navigation.selectedDateKey, router, viewMode]);

  const handleFabClick = useCallback(() => {
    const params = new URLSearchParams({
      date: navigation.selectedDateKey,
    });
    router.push(`/meals/register?${params.toString()}`);
  }, [navigation.selectedDateKey, router]);

  return (
    <div className="relative min-h-dvh bg-background pb-28">
      <div className="fixed inset-x-0 top-0 z-30 border-b border-foreground/8 bg-background/95 backdrop-blur-sm">
        <div className="mx-auto w-full max-w-lg px-4 py-3">
          <HistoryHeader viewMode={viewMode} onToggleView={handleToggleView} />
        </div>
      </div>

      <main className="mx-auto flex w-full max-w-lg flex-col px-4 pt-[calc(env(safe-area-inset-top)+4.25rem)]">
        {viewMode === "calendar" ? (
          <HistoryCalendarView navigation={navigation} />
        ) : (
          <HistoryAgendaView />
        )}
      </main>

      <FloatingActionButton
        label={HISTORY_COPY.fabLabel}
        icon="plus"
        onClick={handleFabClick}
      />
      <BottomNav activeId="history" />
    </div>
  );
}
