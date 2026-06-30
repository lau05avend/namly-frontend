"use client";

import { MealTypeFormSection } from "@/features/planner/components/meal-types/meal-type-form-section";
import { PLAN_MEAL_COPY } from "@/features/planner/constants/plan-meal-copy";

export function PlanMealTypeSection() {
  return <MealTypeFormSection label={PLAN_MEAL_COPY.sections.mealType} />;
}
