/** MVP preset offsets (minutes before meal). Custom times reserved for a future sheet row. */
export const PLAN_REMINDER_PRESET_OFFSETS = [0, 15, 30, 60, 120, 180] as const;

export type PlanReminderPresetOffset = (typeof PLAN_REMINDER_PRESET_OFFSETS)[number];

export const MAX_PLAN_REMINDERS = 3;

export const MIN_REMINDER_OFFSET_MINUTES = 0;

export const MAX_REMINDER_OFFSET_MINUTES = 1440;
