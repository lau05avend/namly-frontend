"use client";

import { MealTypeFormSection } from "@/features/planner/components/meal-types/meal-type-form-section";
import { REGISTER_MEAL_COPY } from "@/features/meal-register/constants/register-meal-copy";

export function RegisterTypeSection() {
  return (
    <MealTypeFormSection label={REGISTER_MEAL_COPY.sections.mealType} />
  );
}
