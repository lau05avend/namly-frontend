"use client";

import { forwardRef } from "react";
import { startOfMonth } from "date-fns";
import {
  HistoryTimelineCalendar,
  type HistoryTimelineCalendarHandle,
} from "@/features/history/components/history-timeline-calendar";

type HistoryCalendarViewProps = {
  onDayPress: (date: Date) => void;
};

export const HistoryCalendarView = forwardRef<
  HistoryTimelineCalendarHandle,
  HistoryCalendarViewProps
>(function HistoryCalendarView({ onDayPress }, ref) {
  return (
    <HistoryTimelineCalendar
      ref={ref}
      initialMonth={startOfMonth(new Date())}
      onDayPress={onDayPress}
    />
  );
});
