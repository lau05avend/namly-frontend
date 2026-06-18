"use client";

import { useMemo } from "react";
import { ExpandableCalendar } from "@/features/calendar";
import { HistoryDayContent } from "@/features/history/components/history-day-content";
import { HistoryLoading } from "@/features/history/components/history-loading";
import { HISTORY_COPY } from "@/features/history/constants/history-copy";
import { useHistoryDay } from "@/features/history/queries/use-history-day";
import { useHistoryMonthActivity } from "@/features/history/queries/use-history-month-activity";
import { toActivityByDate } from "@/features/history/utils/activity-map";
import type { useTemporalNavigation } from "@/features/calendar";

type HistoryCalendarViewProps = {
  navigation: ReturnType<typeof useTemporalNavigation>;
};

export function HistoryCalendarView({ navigation }: HistoryCalendarViewProps) {
  const { data: monthActivity } = useHistoryMonthActivity(
    navigation.visibleMonth,
  );
  const {
    data: day,
    isPending,
    isError,
  } = useHistoryDay(navigation.selectedDateKey);

  const activityByDate = useMemo(
    () => toActivityByDate(monthActivity),
    [monthActivity],
  );

  return (
    <div className="flex flex-col gap-6">
      <ExpandableCalendar
        visibleMonth={navigation.visibleMonth}
        weekDays={navigation.weekDays}
        monthDays={navigation.monthDays}
        selectedDate={navigation.selectedDate}
        isExpanded
        hideExpandToggle
        activityByDate={activityByDate}
        onToggleExpand={() => undefined}
        onGoToToday={navigation.goToToday}
        onPreviousPeriod={navigation.goToPreviousMonth}
        onNextPeriod={navigation.goToNextMonth}
        onSelectDate={navigation.selectDate}
      />

      {isPending ? <HistoryLoading /> : null}

      {isError ? (
        <p className="text-center text-sm text-foreground/60">
          {HISTORY_COPY.loadError}
        </p>
      ) : null}

      {day && !isPending ? <HistoryDayContent day={day} /> : null}
    </div>
  );
}
