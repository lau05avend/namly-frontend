import { format } from "date-fns";
import { toDateKey } from "@/features/calendar/utils/date";
import type { MealType } from "@/features/planner/types/meal-type.types";
import type { RegisterMealFormValues } from "@/features/meal-register/schemas/register-meal.schema";

export function buildRegisterMealDefaults(
  mealTypes: MealType[],
  params?: { date?: string },
): RegisterMealFormValues {
  const today = toDateKey(new Date());

  return {
    photoUrl: "",
    note: "",
    mood: undefined,
    date: params?.date ?? today,
    time: format(new Date(), "HH:mm"),
    mealTypeId: mealTypes[0]?.id ?? "",
    planLinkStatus: "none",
    linkedPlanId: undefined,
    recipes: [],
    tags: [],
  };
}

export function buildLoggedAtParam(date: string, time: string): string {
  const normalizedTime = time.length === 5 ? `${time}:00` : time;
  return `${date}T${normalizedTime}`;
}
