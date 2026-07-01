import { PLAN_MEAL_COPY } from "@/features/planner/constants/plan-meal-copy";

const PRESET_LABELS: Record<number, string> = {
  0: PLAN_MEAL_COPY.reminders.presetAtTime,
  15: PLAN_MEAL_COPY.reminders.presetMinutesBefore(15),
  30: PLAN_MEAL_COPY.reminders.presetMinutesBefore(30),
  60: PLAN_MEAL_COPY.reminders.presetHoursBefore(1),
  120: PLAN_MEAL_COPY.reminders.presetHoursBefore(2),
  180: PLAN_MEAL_COPY.reminders.presetHoursBefore(3),
};

export function formatReminderOffsetLabel(offsetMinutes: number): string {
  return (
    PRESET_LABELS[offsetMinutes] ??
    PLAN_MEAL_COPY.reminders.presetMinutesBefore(offsetMinutes)
  );
}
