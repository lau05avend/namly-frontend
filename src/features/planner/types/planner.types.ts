import type { MealSlot } from "@/constants/meal-slots";

export type PlannerEntryStatus = "next" | "upcoming" | "missed";

export type PlannerEntryKind = "meal" | "note";

export type PlannerEntryItem = {
  id: string;
  label: string;
};

export type PlannerEntry = {
  id: string;
  kind: PlannerEntryKind;
  slot: MealSlot;
  slotLabel: string;
  timeLabel: string;
  title: string;
  items?: PlannerEntryItem[];
  countdownLabel?: string;
  badge?: string;
  status: PlannerEntryStatus;
  variant: "featured" | "default" | "note";
};

export type PlannerSectionId = "next" | "upcoming" | "missed";

export type PlannerSection = {
  id: PlannerSectionId;
  title: string;
  subtitle?: string;
  entries: PlannerEntry[];
};

export type PlannerRegisteredMeal = {
  id: string;
  mealTypeName: string;
  timeLabel: string;
  detail: string;
  isExpress: boolean;
};

export type PlannerRegisteredSummary = {
  count: number;
  subtitle: string;
  meals: PlannerRegisteredMeal[];
};

export type PlannerDayPlan = {
  date: string;
  registeredSummary?: PlannerRegisteredSummary;
  sections: PlannerSection[];
};

export type PlannerMonthActivityDay = {
  date: string;
  hasPlanned: boolean;
  hasCompleted: boolean;
};

export type PlannerMonthActivity = {
  month: string;
  days: PlannerMonthActivityDay[];
};
