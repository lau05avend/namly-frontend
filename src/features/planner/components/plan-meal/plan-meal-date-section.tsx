"use client";

import { Controller, useFormContext } from "react-hook-form";
import { PlannerSection } from "@/components/planner/planner-section";
import { SurfaceCard } from "@/components/ui/surface-card";
import { PLAN_MEAL_COPY } from "@/features/planner/constants/plan-meal-copy";
import type { PlanMealFormValues } from "@/features/planner/schemas/plan-meal.schema";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarDays } from "lucide-react";

export function PlanMealDateSection() {
  const { control } = useFormContext<PlanMealFormValues>();

  return (
    <PlannerSection label={PLAN_MEAL_COPY.sections.date}>
      <SurfaceCard className="flex items-center gap-3 p-4">
        <CalendarDays className="size-5 shrink-0 text-primary" aria-hidden />
        <Controller
          name="date"
          control={control}
          render={({ field: dateField }) => (
            <Controller
              name="time"
              control={control}
              render={({ field: timeField }) => (
                <>
                  <input
                    type="date"
                    value={dateField.value}
                    onChange={dateField.onChange}
                    className="min-w-0 flex-1 bg-transparent text-sm font-semibold text-foreground outline-none"
                  />
                  <span className="h-8 w-px bg-foreground/10" aria-hidden />
                  <input
                    type="time"
                    value={timeField.value}
                    onChange={timeField.onChange}
                    className="w-24 bg-transparent text-sm font-medium text-foreground/70 outline-none"
                  />
                  <span className="sr-only">
                    {format(parseISO(dateField.value), "PPPP", { locale: es })}
                  </span>
                </>
              )}
            />
          )}
        />
      </SurfaceCard>
    </PlannerSection>
  );
}
