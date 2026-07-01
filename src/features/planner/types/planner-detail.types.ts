import type { ScheduledMealStatusApi } from "@/features/planner/types/planner-api.types";

export type PlannerScheduledMealRecipe = {
  id: string;
  recipeId: string | null;
  title: string;
  coverUrl: string | null;
  durationMinutes: number | null;
};

export type PlannerCompletionMealLog = {
  id: string;
  mediaUrl: string | null;
  loggedAt: string;
  loggedAtTime: string;
  dateKey: string;
  content: string | null;
  tags: string[];
};

export type PlannerScheduledMealReminder = {
  offsetMinutes: number;
};

export type PlannerScheduledMealDetail = {
  id: string;
  mealTypeId: string;
  entryDate: string;
  plannedTime: string;
  timeLabel: string;
  dateLabel: string;
  mealTypeName: string;
  status: ScheduledMealStatusApi;
  statusLabel: string;
  isExpress: boolean;
  expressNote: string | null;
  recipes: PlannerScheduledMealRecipe[];
  reminders: PlannerScheduledMealReminder[];
  headline: string;
  completionMealLog: PlannerCompletionMealLog | null;
};
