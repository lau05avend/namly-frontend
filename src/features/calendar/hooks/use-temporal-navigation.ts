"use client";

import { useCallback, useMemo, useState } from "react";
import {
  addMonths,
  getMonthCalendarDays,
  getWeekDaysForDate,
  getWeekStart,
  isSameDay,
  startOfMonth,
  subMonths,
  toDateKey,
} from "@/features/calendar/utils/date";

export function useTemporalNavigation(initialDate = new Date()) {
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [visibleMonth, setVisibleMonth] = useState(() =>
    startOfMonth(initialDate),
  );

  const weekDays = useMemo(
    () => getWeekDaysForDate(selectedDate),
    [selectedDate],
  );

  const monthDays = useMemo(
    () => getMonthCalendarDays(visibleMonth),
    [visibleMonth],
  );

  const selectDate = useCallback((date: Date) => {
    setSelectedDate(date);
    setVisibleMonth(startOfMonth(date));
  }, []);

  const goToToday = useCallback(() => {
    const today = new Date();
    setSelectedDate(today);
    setVisibleMonth(startOfMonth(today));
  }, []);

  const goToPreviousMonth = useCallback(() => {
    setVisibleMonth((current) => subMonths(current, 1));
  }, []);

  const goToNextMonth = useCallback(() => {
    setVisibleMonth((current) => addMonths(current, 1));
  }, []);

  const isSelected = useCallback(
    (date: Date) => isSameDay(date, selectedDate),
    [selectedDate],
  );

  const selectedDateKey = toDateKey(selectedDate);

  return {
    selectedDate,
    selectedDateKey,
    visibleMonth,
    weekDays,
    monthDays,
    selectDate,
    goToToday,
    goToPreviousMonth,
    goToNextMonth,
    isSelected,
    setVisibleMonth,
  };
}
