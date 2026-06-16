"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { BottomNav } from "@/components/navigation/bottom-nav";
import { FloatingActionButton } from "@/components/ui/floating-action-button";
import {
  ExpandableCalendar,
  parseDateKey,
  useCalendarExpansion,
  useTemporalNavigation,
} from "@/features/calendar";
import { PlannerDayContent } from "@/features/planner/components/planner-day-content";
import { PlannerLoading } from "@/features/planner/components/planner-loading";
import { PLANNER_COPY } from "@/features/planner/constants/planner-copy";
import { usePlannerDay } from "@/features/planner/queries/use-planner-day";
import { usePlannerMonthActivity } from "@/features/planner/queries/use-planner-month-activity";
import { toActivityByDate } from "@/features/planner/utils/activity-map";

export function PlannerScreen({ initialDate }: { initialDate?: string } = {}) {
  const router = useRouter();
  const navigation = useTemporalNavigation(
    useMemo(() => parseDateKey(initialDate) ?? new Date(), [initialDate]),
  );
  const { isExpanded, toggle: toggleCalendar } = useCalendarExpansion();

  const { data: monthActivity } = usePlannerMonthActivity(
    navigation.visibleMonth,
  );
  const {
    data: dayPlan,
    isPending,
    isError,
  } = usePlannerDay(navigation.selectedDateKey);

  const activityByDate = useMemo(
    () => toActivityByDate(monthActivity),
    [monthActivity],
  );

  const handleFabClick = () => {
    const params = new URLSearchParams({
      date: navigation.selectedDateKey,
    });
    router.push(`/planner/plan?${params.toString()}`);
  };

  return (
    <div className="relative min-h-dvh bg-background pb-28">
      <main className="mx-auto flex w-full max-w-lg flex-col gap-6 px-4 pt-safe">
        <ExpandableCalendar
          visibleMonth={navigation.visibleMonth}
          weekDays={navigation.weekDays}
          monthDays={navigation.monthDays}
          selectedDate={navigation.selectedDate}
          isExpanded={isExpanded}
          activityByDate={activityByDate}
          onToggleExpand={toggleCalendar}
          onGoToToday={navigation.goToToday}
          onPreviousPeriod={
            isExpanded
              ? navigation.goToPreviousMonth
              : navigation.goToPreviousWeek
          }
          onNextPeriod={
            isExpanded ? navigation.goToNextMonth : navigation.goToNextWeek
          }
          onSelectDate={navigation.selectDate}
        />

        {isPending ? <PlannerLoading /> : null}

        {isError ? (
          <p className="text-center text-sm text-foreground/60">
            No pudimos cargar tu plan. Intenta de nuevo.
          </p>
        ) : null}

        {dayPlan && !isPending ? <PlannerDayContent dayPlan={dayPlan} /> : null}
      </main>

      <FloatingActionButton
        label={PLANNER_COPY.fabLabel}
        icon="plus"
        onClick={handleFabClick}
      />
      <BottomNav activeId="calendar" />
    </div>
  );
}
