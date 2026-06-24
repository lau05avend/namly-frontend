import type { MealSlot } from "@/constants/meal-slots";
import type { StreakGrowthStageId } from "@/features/home/constants/streak-growth-stages";

export type HomeTabId = "today" | "rhythm";

export type NextMealItem = {
  id: string;
  label: string;
};

export type NextMealKind = "meal" | "note";

export type NextMealDetail = {
  id: string;
  kind?: NextMealKind;
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
  mealsLoggedToday: number;
  mealsGoalToday: number;
  growthStageId: StreakGrowthStageId;
};

export type UpcomingMealItem = {
  id: string;
  kind?: NextMealKind;
  slot: MealSlot;
  slotLabel: string;
  timeLabel: string;
  title: string;
  items?: NextMealItem[];
  moreCount?: number;
};

export type RegisteredTodaySummary = {
  count: number;
  meals?: {
    id: string;
    mealTypeName: string;
    timeLabel: string;
    detail: string;
    mediaUrl?: string | null;
  }[];
};

export type HomeRecommendation = {
  id: string;
  title: string;
  meta: string;
  imageUrl?: string | null;
};

export type HomeSummary = {
  date: string;
  displayDate: string;
  nextMeal: NextMealDetail | null;
  streak: HomeStreak;
  upcomingMeals: UpcomingMealItem[];
  registeredToday: RegisteredTodaySummary;
  recommendation: HomeRecommendation | null;
};
