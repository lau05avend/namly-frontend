"use client";

import { Controller, useFormContext } from "react-hook-form";
import { MealTypeSelector } from "@/components/planner/meal-type-selector";
import { PlannerSection } from "@/components/planner/planner-section";
import { SurfaceCard } from "@/components/ui/surface-card";
import { PLAN_MEAL_COPY } from "@/features/planner/constants/plan-meal-copy";
import type { PlanMealFormValues } from "@/features/planner/schemas/plan-meal.schema";

export function PlanMealTypeSection() {
  const { control } = useFormContext<PlanMealFormValues>();

  return (
    <PlannerSection label={PLAN_MEAL_COPY.sections.mealType}>
      <SurfaceCard>
        <Controller
          name="mealSlot"
          control={control}
          render={({ field }) => (
            <MealTypeSelector value={field.value} onChange={field.onChange} />
          )}
        />
      </SurfaceCard>
    </PlannerSection>
  );
}
