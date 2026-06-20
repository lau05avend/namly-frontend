"use client";

import { useMemo } from "react";
import { motion, useMotionValue, useTransform, type PanInfo } from "motion/react";
import { DayCell } from "@/features/calendar/components/day-cell";
import { CalendarHeader } from "@/features/calendar/components/calendar-header";
import { WeekdayHeader } from "@/features/calendar/components/weekday-header";
import {
  CALENDAR_LAYOUT_SPRING,
  CALENDAR_ROW_FADE,
  CALENDAR_ROW_STAGGER,
} from "@/features/calendar/constants/motion";
import type { ActivityByDate } from "@/features/calendar/types/calendar.types";
import {
  getMonthWeekRows,
  getWeekStart,
  isSameMonth,
  toDateKey,
} from "@/features/calendar/utils/date";
import { cn } from "@/lib/utils";

const SWIPE_THRESHOLD = 48;
const SWIPE_VELOCITY_THRESHOLD = 300;

type ExpandableCalendarProps = {
  visibleMonth: Date;
  weekDays: Date[];
  monthDays: Date[];
  selectedDate: Date;
  isExpanded: boolean;
  activityByDate?: ActivityByDate;
  onToggleExpand: () => void;
  onGoToToday: () => void;
  onPreviousPeriod: () => void;
  onNextPeriod: () => void;
  onSelectDate: (date: Date) => void;
  hideExpandToggle?: boolean;
  className?: string;
};

export function ExpandableCalendar({
  visibleMonth,
  monthDays,
  selectedDate,
  isExpanded,
  activityByDate,
  onToggleExpand,
  onGoToToday,
  onPreviousPeriod,
  onNextPeriod,
  onSelectDate,
  hideExpandToggle = false,
  className,
}: ExpandableCalendarProps) {
  const dragX = useMotionValue(0);
  const dragOpacity = useTransform(dragX, [-80, 0, 80], [0.92, 1, 0.92]);

  const weekRows = useMemo(() => getMonthWeekRows(monthDays), [monthDays]);
  const selectedWeekKey = toDateKey(getWeekStart(selectedDate));
  const selectedRowIndex = Math.max(
    0,
    weekRows.findIndex((week) => toDateKey(week[0]) === selectedWeekKey),
  );
  const selectedDateKey = toDateKey(selectedDate);

  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    const swipedLeft =
      info.offset.x < -SWIPE_THRESHOLD ||
      info.velocity.x < -SWIPE_VELOCITY_THRESHOLD;
    const swipedRight =
      info.offset.x > SWIPE_THRESHOLD ||
      info.velocity.x > SWIPE_VELOCITY_THRESHOLD;

    if (swipedLeft) {
      onNextPeriod();
    } else if (swipedRight) {
      onPreviousPeriod();
    }
  };

  return (
    <section className={cn("flex flex-col gap-3", className)} aria-label="Calendario">
      <CalendarHeader
        visibleMonth={visibleMonth}
        isExpanded={isExpanded}
        onToggleExpand={onToggleExpand}
        onGoToToday={onGoToToday}
        hideExpandToggle={hideExpandToggle}
      />

      <WeekdayHeader />

      <motion.div
        className="touch-pan-y overflow-hidden"
        layout
        style={{ opacity: dragOpacity }}
        transition={CALENDAR_LAYOUT_SPRING}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.12}
        onDrag={(_, info) => dragX.set(info.offset.x)}
        onDragEnd={(_, info) => {
          dragX.set(0);
          handleDragEnd(_, info);
        }}
      >
        <motion.div
          layout
          className="flex flex-col gap-1"
          transition={CALENDAR_LAYOUT_SPRING}
        >
          {weekRows.map((week, rowIndex) => {
            const weekKey = toDateKey(week[0]);
            const isSelectedWeek = weekKey === selectedWeekKey;
            const isRowVisible = isExpanded || isSelectedWeek;
            const staggerDistance = Math.abs(rowIndex - selectedRowIndex);
            const rowStagger =
              isSelectedWeek || !isExpanded ? 0 : staggerDistance * CALENDAR_ROW_STAGGER;

            return (
              <motion.div
                key={weekKey}
                layout
                initial={false}
                animate={{
                  opacity: isRowVisible ? 1 : 0,
                  height: isRowVisible ? "auto" : 0,
                }}
                transition={{
                  layout: CALENDAR_LAYOUT_SPRING,
                  height: CALENDAR_LAYOUT_SPRING,
                  opacity: isSelectedWeek
                    ? { duration: 0 }
                    : {
                        ...CALENDAR_ROW_FADE,
                        delay: isExpanded ? rowStagger : 0,
                      },
                }}
                style={{ overflow: "hidden" }}
                aria-hidden={!isRowVisible}
              >
                <motion.div
                  layout
                  className="grid grid-cols-7 gap-1"
                  initial={false}
                  animate={{
                    opacity: isRowVisible ? 1 : 0,
                    y: isRowVisible ? 0 : -6,
                  }}
                  transition={{
                    layout: CALENDAR_LAYOUT_SPRING,
                    opacity: isSelectedWeek
                      ? { duration: 0 }
                      : {
                          ...CALENDAR_ROW_FADE,
                          delay: isExpanded ? rowStagger : 0,
                        },
                    y: isSelectedWeek
                      ? { duration: 0 }
                      : {
                          ...CALENDAR_ROW_FADE,
                          delay: isExpanded ? rowStagger : 0,
                        },
                  }}
                  role={isSelectedWeek && !isExpanded ? "group" : undefined}
                  aria-label={
                    isSelectedWeek && !isExpanded ? "Semana" : undefined
                  }
                >
                  {week.map((day) => {
                    const dayKey = toDateKey(day);

                    return (
                      <DayCell
                        key={dayKey}
                        layoutId={`calendar-day-${dayKey}`}
                        date={day}
                        selected={dayKey === selectedDateKey}
                        isCurrentMonth={isSameMonth(day, visibleMonth)}
                        activity={activityByDate?.[dayKey]}
                        onSelect={onSelectDate}
                      />
                    );
                  })}
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
}
