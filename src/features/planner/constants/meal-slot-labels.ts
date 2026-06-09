import type { MealSlot } from "@/constants/meal-slots";

export const MEAL_SLOT_LABELS: Record<MealSlot, string> = {
  breakfast: "Desayuno",
  lunch: "Almuerzo",
  dinner: "Cena",
  snack: "Snack",
};

export const MEAL_SLOT_LABELS_UPPER: Record<MealSlot, string> = {
  breakfast: "DESAYUNO",
  lunch: "ALMUERZO",
  dinner: "CENA",
  snack: "SNACK",
};
