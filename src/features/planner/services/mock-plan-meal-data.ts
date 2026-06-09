import { format } from "date-fns";
import type { MealSlot } from "@/constants/meal-slots";
import type { PlanMealDefaults } from "@/features/planner/types/plan-meal.types";
import { toDateKey } from "@/features/calendar/utils/date";

export function getMockPlanMealDefaults(params?: {
  date?: string;
  mealSlot?: MealSlot;
}): PlanMealDefaults {
  const today = toDateKey(new Date());

  return {
    date: params?.date ?? today,
    time: format(new Date(), "HH:mm"),
    mealSlot: params?.mealSlot ?? "lunch",
    entryMode: "recipe",
    expressNote: "",
    recipes: [],
    remindersEnabled: true,
    reminders: [],
  };
}
