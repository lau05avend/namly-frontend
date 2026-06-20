"use client";

import { Controller, useFormContext } from "react-hook-form";
import { PlannerSection } from "@/components/planner/planner-section";
import { SurfaceCard } from "@/components/ui/surface-card";
import { REGISTER_MEAL_COPY } from "@/features/meal-register/constants/register-meal-copy";
import type { RegisterMealFormValues } from "@/features/meal-register/schemas/register-meal.schema";
import { MessageCircle } from "lucide-react";

export function RegisterNoteSection() {
  const {
    control,
    formState: { errors },
  } = useFormContext<RegisterMealFormValues>();

  return (
    <PlannerSection label={REGISTER_MEAL_COPY.sections.note}>
      <SurfaceCard className="flex items-center gap-3 p-4">
        <MessageCircle className="size-4 shrink-0 text-foreground/40" aria-hidden />
        <Controller
          name="note"
          control={control}
          render={({ field }) => (
            <input
              {...field}
              placeholder={REGISTER_MEAL_COPY.note.placeholder}
              className="min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-foreground/40"
            />
          )}
        />
      </SurfaceCard>
      {errors.note?.message ? (
        <p className="text-xs text-cta">{errors.note.message}</p>
      ) : null}
    </PlannerSection>
  );
}
