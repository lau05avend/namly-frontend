"use client";

import { useMemo } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { MealTypeSelector } from "@/components/planner/meal-type-selector";
import { PlannerSection } from "@/components/planner/planner-section";
import { SurfaceCard } from "@/components/ui/surface-card";
import { REGISTER_MEAL_COPY } from "@/features/meal-register/constants/register-meal-copy";
import type { RegisterMealFormValues } from "@/features/meal-register/schemas/register-meal.schema";
import { useMealTypes } from "@/features/planner/queries/use-meal-types";

export function RegisterTypeSection() {
  const { control } = useFormContext<RegisterMealFormValues>();
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
    <PlannerSection label={REGISTER_MEAL_COPY.sections.mealType}>
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
