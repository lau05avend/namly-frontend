"use client";

import { useMemo } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { MealTypeSelector } from "@/components/planner/meal-type-selector";
import { PlannerSection } from "@/components/planner/planner-section";
import { SurfaceCard } from "@/components/ui/surface-card";
import { PLAN_MEAL_COPY } from "@/features/planner/constants/plan-meal-copy";
import { useMealTypes } from "@/features/planner/queries/use-meal-types";
import type { PlanMealFormValues } from "@/features/planner/schemas/plan-meal.schema";

export function PlanMealTypeSection() {
  const { control } = useFormContext<PlanMealFormValues>();
  const { data: mealTypes, isPending, isError } = useMealTypes();

  const options = useMemo(
    () =>
      (mealTypes ?? []).map((mealType) => ({
        id: mealType.id,
        label: mealType.name,
      })),
    [mealTypes],
  );

  return (
    <PlannerSection label={PLAN_MEAL_COPY.sections.mealType}>
      <SurfaceCard>
        {isPending ? (
          <p className="text-sm text-foreground/50">Cargando tipos de comida…</p>
        ) : null}

        {isError ? (
          <p className="text-sm text-foreground/60">
            No pudimos cargar los tipos de comida.
          </p>
        ) : null}

        {options.length > 0 ? (
          <Controller
            name="mealTypeId"
            control={control}
            render={({ field }) => (
              <MealTypeSelector
                options={options}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
        ) : null}
      </SurfaceCard>
    </PlannerSection>
  );
}
