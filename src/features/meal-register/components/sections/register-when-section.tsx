"use client";

import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { format, isToday, isValid, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import { PlannerSection } from "@/components/planner/planner-section";
import { SurfaceCard } from "@/components/ui/surface-card";
import { REGISTER_MEAL_COPY } from "@/features/meal-register/constants/register-meal-copy";
import type { RegisterMealFormValues } from "@/features/meal-register/schemas/register-meal.schema";
import { Clock3 } from "lucide-react";

function formatWhenLabel(date: string, time: string): string {
  if (!date || !time) return "—";

  const parsed = parseISO(date);
  if (!isValid(parsed)) return "—";

  const dayLabel = isToday(parsed)
    ? "Hoy"
    : format(parsed, "d MMM", { locale: es });

  const [hours, minutes] = time.split(":");
  const hour = Number(hours);
  if (Number.isNaN(hour) || minutes === undefined) return dayLabel;

  const ampm = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 || 12;
  return `${dayLabel} · ${hour12}:${minutes} ${ampm}`;
}

export type RegisterWhenChangePayload = {
  date: string;
  time: string;
};

type RegisterWhenSectionProps = {
  onWhenChange?: (when: RegisterWhenChangePayload) => void;
};

export function RegisterWhenSection({ onWhenChange }: RegisterWhenSectionProps) {
  const { control, watch } = useFormContext<RegisterMealFormValues>();
  const [editing, setEditing] = useState(false);
  const date = watch("date");
  const time = watch("time");

  return (
    <PlannerSection label={REGISTER_MEAL_COPY.sections.when}>
      <SurfaceCard className="flex flex-col gap-3 p-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Clock3 className="size-4 text-primary" aria-hidden />
            <span className="text-sm font-medium text-foreground">
              {formatWhenLabel(date, time)}
            </span>
          </div>
          <button
            type="button"
            onClick={() => setEditing((value) => !value)}
            className="cursor-pointer text-sm font-semibold text-primary"
          >
            {REGISTER_MEAL_COPY.when.edit}
          </button>
        </div>

        {editing ? (
          <div className="flex gap-2">
            <Controller
              name="date"
              control={control}
              render={({ field }) => (
                <input
                  type="date"
                  {...field}
                  onChange={(event) => {
                    const nextDate = event.target.value;
                    field.onChange(event);
                    onWhenChange?.({ date: nextDate, time });
                  }}
                  className="flex-1 rounded-2xl border border-foreground/10 bg-background px-3 py-2 text-sm"
                />
              )}
            />
            <Controller
              name="time"
              control={control}
              render={({ field }) => (
                <input
                  type="time"
                  {...field}
                  onChange={(event) => {
                    const nextTime = event.target.value;
                    field.onChange(event);
                    onWhenChange?.({ date, time: nextTime });
                  }}
                  className="w-28 rounded-2xl border border-foreground/10 bg-background px-3 py-2 text-sm"
                />
              )}
            />
          </div>
        ) : null}
      </SurfaceCard>
    </PlannerSection>
  );
}
