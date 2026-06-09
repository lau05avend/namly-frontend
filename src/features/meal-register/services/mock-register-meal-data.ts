import { format } from "date-fns";
import { toDateKey } from "@/features/calendar/utils/date";
import type { RegisterMealDefaults } from "@/features/meal-register/types/register-meal.types";

export function getMockRegisterMealDefaults(params?: {
  date?: string;
}): RegisterMealDefaults {
  const today = toDateKey(new Date());

  return {
    photoUrl: undefined,
    note: "",
    mood: "good",
    date: params?.date ?? today,
    time: format(new Date(), "HH:mm"),
    mealSlot: "lunch",
    planLinkStatus: "suggested",
    linkedPlanId: undefined,
    recipes: [],
    tags: [],
    planSuggestion: {
      id: "plan-lunch-today",
      title: "Coincide con tu plan de hoy",
      meta: "Almuerzo · 12:30 PM",
      detail: "Sudado de pollo",
    },
  };
}
