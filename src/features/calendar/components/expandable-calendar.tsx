"use client";

import { AnimatePresence, motion } from "motion/react";
import { CalendarHeader } from "@/features/calendar/components/calendar-header";
import { MonthGrid } from "@/features/calendar/components/month-grid";
import { WeekRow } from "@/features/calendar/components/week-row";
import type { ActivityByDate } from "@/features/calendar/types/calendar.types";
import { cn } from "@/lib/utils";

type ExpandableCalendarProps = {
  visibleMonth: Date;
  weekDays: Date[];
  monthDays: Date[];
  selectedDate: Date;
  isExpanded: boolean;
  activityByDate?: ActivityByDate;
  onToggleExpand: () => void;
  onSelectDate: (date: Date) => void;
  className?: string;
};

export function ExpandableCalendar({
  visibleMonth,
  weekDays,
  monthDays,
  selectedDate,
  isExpanded,
  activityByDate,
  onToggleExpand,
  onSelectDate,
  className,
}: ExpandableCalendarProps) {
  return (
    <section className={cn("flex flex-col gap-4", className)} aria-label="Calendario">
      <CalendarHeader
        visibleMonth={visibleMonth}
        isExpanded={isExpanded}
        onToggleExpand={onToggleExpand}
      />

      <div className="overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          {isExpanded ? (
            <motion.div
              key="month"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <MonthGrid
                monthDays={monthDays}
                visibleMonth={visibleMonth}
                selectedDate={selectedDate}
                activityByDate={activityByDate}
                onSelectDate={onSelectDate}
              />
            </motion.div>
          ) : (
            <motion.div
              key="week"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <WeekRow
                weekDays={weekDays}
                selectedDate={selectedDate}
                activityByDate={activityByDate}
                onSelectDate={onSelectDate}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
