import type { MealSlot } from "@/constants/meal-slots";

/** Shared meal shape for home, planner, and history surfaces. */
export type MealSummary = {
  id: string;
  slot: MealSlot;
  title: string;
  subtitle?: string;
  timeLabel?: string;
};
