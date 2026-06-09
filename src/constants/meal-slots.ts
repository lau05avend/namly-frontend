export const MEAL_SLOTS = [
  "breakfast",
  "lunch",
  "dinner",
  "snack",
] as const;

export type MealSlot = (typeof MEAL_SLOTS)[number];
