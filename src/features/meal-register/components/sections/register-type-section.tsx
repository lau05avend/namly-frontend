"use client";

import { useMemo } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { MealTypeSelector } from "@/components/planner/meal-type-selector";
import { PlannerSection } from "@/components/planner/planner-section";
import { SurfaceCard } from "@/components/ui/surface-card";
import { MEAL_SLOTS } from "@/constants/meal-slots";
import { MEAL_SLOT_LABELS } from "@/features/planner/constants/meal-slot-labels";
import { REGISTER_MEAL_COPY } from "@/features/meal-register/constants/register-meal-copy";
import type { RegisterMealFormValues } from "@/features/meal-register/schemas/register-meal.schema";

export function RegisterTypeSection() {
  const { control } = useFormContext<RegisterMealFormValues>();
  const options = useMemo(
    () =>
      MEAL_SLOTS.map((slot) => ({
        id: slot,
        label: MEAL_SLOT_LABELS[slot],
      })),
    [],
  );

  return (
    <PlannerSection label={REGISTER_MEAL_COPY.sections.mealType}>
      <SurfaceCard>
        <Controller
          name="mealSlot"
          control={control}
          render={({ field }) => (
            <MealTypeSelector
              options={options}
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
      </SurfaceCard>
    </PlannerSection>
  );
}
