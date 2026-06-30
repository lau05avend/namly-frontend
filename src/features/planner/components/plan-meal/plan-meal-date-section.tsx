"use client";

import { Controller, useFormContext } from "react-hook-form";
import { MealDateTimeInputs } from "@/components/meal/meal-date-time-inputs";
import { PlannerSection } from "@/components/planner/planner-section";
import { SurfaceCard } from "@/components/ui/surface-card";
import type { PlanMealFormValues } from "@/features/planner/schemas/plan-meal.schema";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarDays } from "lucide-react";

export function PlanMealDateSection() {
  const { control } = useFormContext<PlanMealFormValues>();

  return (
    <PlannerSection>
      <SurfaceCard className="flex min-w-0 items-center gap-2.5 px-3.5 py-2.5">
        <CalendarDays className="size-4 shrink-0 text-primary" aria-hidden />
        <Controller
          name="date"
          control={control}
          render={({ field: dateField }) => (
            <Controller
              name="time"
              control={control}
              render={({ field: timeField }) => (
                <>
                  <MealDateTimeInputs
                    date={dateField.value}
                    time={timeField.value}
                    onDateChange={dateField.onChange}
                    onTimeChange={timeField.onChange}
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
