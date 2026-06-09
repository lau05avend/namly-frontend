import type { MealSlot } from "@/constants/meal-slots";

export type HomeTabId = "today" | "rhythm";

export type NextMealItem = {
  id: string;
  label: string;
};

export type NextMealDetail = {
  id: string;
  slot: MealSlot;
  slotLabel: string;
  timeLabel: string;
  title: string;
  countdownLabel: string;
  items: NextMealItem[];
  moreCount?: number;
};

export type HomeStreak = {
  currentDays: number;
  contextLabel: string;
  personalBest: number;
  mealsLoggedToday: number;
  mealsGoalToday: number;
};

export type UpcomingMealItem = {
  id: string;
  title: string;
  meta: string;
};

export type RegisteredTodaySummary = {
  count: number;
  label: string;
};

export type HomeRecommendation = {
  id: string;
  title: string;
  meta: string;
};

export type HomeSummary = {
  date: string;
  displayDate: string;
  greeting: string;
  nextMeal: NextMealDetail;
  streak: HomeStreak;
  upcomingMeals: UpcomingMealItem[];
  registeredToday: RegisteredTodaySummary;
  recommendation: HomeRecommendation;
};
