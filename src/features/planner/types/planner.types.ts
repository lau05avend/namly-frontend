import type { MealSlot } from "@/constants/meal-slots";

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
  variant: "featured" | "default" | "note";
};

export type PlannerSection = {
  id: string;
  title: string;
  entries: PlannerEntry[];
};

export type PlannerRegisteredSummary = {
  count: number;
  label: string;
  hint: string;
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
