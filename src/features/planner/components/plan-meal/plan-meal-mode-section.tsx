"use client";

import { Controller, useFormContext } from "react-hook-form";
import { EntryModeSelector } from "@/components/planner/entry-mode-selector";
import { PlannerSection } from "@/components/planner/planner-section";
import { SurfaceCard } from "@/components/ui/surface-card";
import { PLAN_MEAL_COPY } from "@/features/planner/constants/plan-meal-copy";
import type { PlanMealFormValues } from "@/features/planner/schemas/plan-meal.schema";

export function PlanMealModeSection() {
  const { control } = useFormContext<PlanMealFormValues>();

  return (
    <PlannerSection label={PLAN_MEAL_COPY.sections.entryMode}>
      <SurfaceCard>
        <Controller
          name="entryMode"
          control={control}
          render={({ field }) => (
            <EntryModeSelector value={field.value} onChange={field.onChange} />
          )}
        />
      </SurfaceCard>
    </PlannerSection>
  );
}
