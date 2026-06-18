"use client";

import { startOfMonth } from "date-fns";
import { HistoryTimelineCalendar } from "@/features/history/components/history-timeline-calendar";
import type { useTemporalNavigation } from "@/features/calendar";

type HistoryCalendarViewProps = {
  navigation: ReturnType<typeof useTemporalNavigation>;
};

export function HistoryCalendarView({ navigation }: HistoryCalendarViewProps) {
  return (
    <HistoryTimelineCalendar
      initialMonth={startOfMonth(new Date())}
      selectedDateKey={navigation.selectedDateKey}
      onSelectDate={navigation.selectDate}
    />
  );
}
