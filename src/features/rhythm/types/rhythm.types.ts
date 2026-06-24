export type RhythmActivityIntensity = 0 | 1 | 2 | 3;

export type RhythmActivityDay = {
  dayLabel: string;
  intensity: RhythmActivityIntensity;
  isToday: boolean;
};

export type RhythmWeeklySummary = {
  consistencyMessage: string;
  activeDays: number;
  totalDays: number;
  activeDaysLabel: string;
  averageCompletion: number;
  averageCompletionLabel: string;
  weekComparison: number;
  weekComparisonLabel: string;
  activityDays: RhythmActivityDay[];
};

export type RhythmTimeSlotId = "morning" | "midday" | "afternoon" | "evening";

export type RhythmTimeSlotDistribution = {
  slot: RhythmTimeSlotId;
  label: string;
  level: number;
  maxLevel: number;
};

export type RhythmInsightIcon =
  | "meal"
  | "clock"
  | "variety"
  | "recipe"
  | "explore";

export type RhythmInsightTone = "warm" | "calm" | "neutral" | "positive";

export type RhythmHabitInsight = {
  id: string;
  icon: RhythmInsightIcon;
  tone: RhythmInsightTone;
  message: string;
};

export type RhythmHabits = {
  hasEnoughData: boolean;
  insights: RhythmHabitInsight[];
  timeSlotDistribution?: RhythmTimeSlotDistribution[];
};

export type RhythmLifetime = {
  longestStreak: number;
  longestStreakLabel: string;
  bestWeekCompletion: number;
  bestWeekCompletionLabel: string;
  totalMealsLogged: number;
  totalMealsLoggedLabel: string;
};

export type RhythmSummary = {
  weeklySummary: RhythmWeeklySummary | null;
  habits: RhythmHabits | null;
  lifetime: RhythmLifetime | null;
};
