import { getCurrentMealTime } from "@/components/meal/meal-datetime";
import { parseDateKey, toDateKey } from "@/features/calendar/utils/date";
import type { MealSlot } from "@/constants/meal-slots";
import type { MealType } from "@/features/planner/types/meal-type.types";
import type {
  PlanMealDefaults,
  PlanMealDefaultsParams,
} from "@/features/planner/types/plan-meal.types";

const SLOT_TO_MEAL_TYPE_NAME: Record<MealSlot, string> = {
  breakfast: "Desayuno",
  lunch: "Almuerzo",
  dinner: "Cena",
  snack: "Snack",
};

function resolveMealTypeId(
  mealTypes: MealType[],
  params?: PlanMealDefaultsParams,
): string {
  if (params?.mealTypeId) {
    const selected = mealTypes.find((type) => type.id === params.mealTypeId);
    if (selected) {
      return selected.id;
    }
  }

  if (params?.mealSlot) {
    const targetName = SLOT_TO_MEAL_TYPE_NAME[params.mealSlot];
    const matched = mealTypes.find((type) => type.name === targetName);
    if (matched) {
      return matched.id;
    }
  }

  return mealTypes[0]?.id ?? "";
}

export function buildPlanMealDefaults(
  mealTypes: MealType[],
  params?: PlanMealDefaultsParams,
): PlanMealDefaults {
  const today = toDateKey(new Date());
  const resolvedDate =
    params?.date && parseDateKey(params.date) ? params.date : today;

  return {
    date: resolvedDate,
    time: getCurrentMealTime(),
    mealTypeId: resolveMealTypeId(mealTypes, params),
    entryMode: "recipe",
    expressNote: "",
    recipes: [],
    remindersEnabled: true,
    reminders: [],
  };
}
