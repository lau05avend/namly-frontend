export type RhythmActivityIntensity = 0 | 0.5 | 1;

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

export type RhythmHabitInsight = {
  id: string;
  icon: RhythmInsightIcon;
  message: string;
};

export type RhythmHabits = {
  hasEnoughData: boolean;
  insights: RhythmHabitInsight[];
  timeSlotDistribution?: RhythmTimeSlotDistribution[];
  mostConsistentMealType?: string;
  preferredTimeSlot?: string;
  diversityInsight?: string;
  tagInsight?: string;
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
  weeklySummary: RhythmWeeklySummary;
  habits: RhythmHabits;
  lifetime: RhythmLifetime;
};
