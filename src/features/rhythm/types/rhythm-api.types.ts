export type RhythmWeekSummaryApiDto = {
  level: string;
  tone: string;
  message: string;
};

export type RhythmWeekComparisonApiDto = {
  deltaPercentage: number;
  message: string;
};

export type RhythmWeekDayApiDto = {
  date: string;
  intensity: number;
  isToday: boolean;
};

export type RhythmWeekApiDto = {
  weekStart: string;
  weekEnd: string;
  summary: RhythmWeekSummaryApiDto;
  activeDays: number;
  totalDays: number;
  averageCompletion: number;
  comparison: RhythmWeekComparisonApiDto;
  days: RhythmWeekDayApiDto[];
};

export type RhythmInsightApiDto = {
  id: string;
  type: string;
  icon: string;
  tone: string;
  message: string;
};

export type RhythmTimeSlotDistributionApiDto = {
  morning: number;
  midday: number;
  afternoon: number;
  night: number;
};

export type RhythmHabitsApiDto = {
  insights: RhythmInsightApiDto[];
  timeSlotDistribution: RhythmTimeSlotDistributionApiDto;
};

export type RhythmLifetimeApiDto = {
  longestStreak: number;
  bestWeekCompletion: number;
  totalMealsLogged: number;
};

export type RhythmAnalyticsApiDto = {
  week: RhythmWeekApiDto;
  habits: RhythmHabitsApiDto;
  lifetime: RhythmLifetimeApiDto;
};
