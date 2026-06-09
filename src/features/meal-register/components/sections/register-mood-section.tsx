"use client";

import { Controller, useFormContext } from "react-hook-form";
import { MoodSelector } from "@/components/meal-register/mood-selector";
import { PlannerSection } from "@/components/planner/planner-section";
import { REGISTER_MEAL_COPY } from "@/features/meal-register/constants/register-meal-copy";
import type { RegisterMealFormValues } from "@/features/meal-register/schemas/register-meal.schema";

export function RegisterMoodSection() {
  const { control } = useFormContext<RegisterMealFormValues>();

  return (
    <PlannerSection label={REGISTER_MEAL_COPY.sections.mood}>
      <Controller
        name="mood"
        control={control}
        render={({ field }) => (
          <MoodSelector value={field.value} onChange={field.onChange} />
        )}
      />
    </PlannerSection>
  );
}
