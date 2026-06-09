export type DayActivity = {
  hasPlanned?: boolean;
  hasCompleted?: boolean;
};

export type ActivityByDate = Record<string, DayActivity>;

export type CalendarViewMode = "week" | "month";
