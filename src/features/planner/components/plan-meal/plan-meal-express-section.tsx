"use client";

import { Controller, useFormContext } from "react-hook-form";
import { ExpressNoteField } from "@/components/planner/express-note-field";
import { PlannerSection } from "@/components/planner/planner-section";
import { PLAN_MEAL_COPY } from "@/features/planner/constants/plan-meal-copy";
import type { PlanMealFormValues } from "@/features/planner/schemas/plan-meal.schema";

export function PlanMealExpressSection() {
  const {
    control,
    formState: { errors },
  } = useFormContext<PlanMealFormValues>();

  return (
    <PlannerSection label={PLAN_MEAL_COPY.sections.express}>
      <Controller
        name="expressNote"
        control={control}
        render={({ field }) => (
          <ExpressNoteField
            value={field.value}
            onChange={field.onChange}
            error={errors.expressNote?.message}
          />
        )}
      />
    </PlannerSection>
  );
}
