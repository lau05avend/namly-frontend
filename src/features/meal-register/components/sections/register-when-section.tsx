"use client";

import { Controller, useFormContext } from "react-hook-form";
import { format, parseISO } from "date-fns";
import { es } from "date-fns/locale";
import { MealDateTimeInputs } from "@/components/meal/meal-date-time-inputs";
import { SurfaceCard } from "@/components/ui/surface-card";
import { REGISTER_MEAL_COPY } from "@/features/meal-register/constants/register-meal-copy";
import type { RegisterMealFormValues } from "@/features/meal-register/schemas/register-meal.schema";
import { CalendarDays } from "lucide-react";

export type RegisterWhenChangePayload = {
  date: string;
  time: string;
};

type RegisterWhenSectionProps = {
  onWhenChange?: (when: RegisterWhenChangePayload) => void;
  onDateChangeAttempt?: (nextDate: string) => boolean;
};

export function RegisterWhenSection({
  onWhenChange,
  onDateChangeAttempt,
}: RegisterWhenSectionProps) {
  const { control, watch } = useFormContext<RegisterMealFormValues>();
  const date = watch("date");
  const time = watch("time");

  return (
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
                    dateLabel={REGISTER_MEAL_COPY.when.dateLabel}
                    timeLabel={REGISTER_MEAL_COPY.when.timeLabel}
                    onDateChange={(nextDate) => {
                      if (nextDate === dateField.value) {
                        return;
                      }

                      const canChange = onDateChangeAttempt?.(nextDate) ?? true;
                      if (!canChange) {
                        dateField.onChange(dateField.value);
                        return;
                      }

                      dateField.onChange(nextDate);
                      onWhenChange?.({ date: nextDate, time });
                    }}
                    onTimeChange={(nextTime) => {
                      timeField.onChange(nextTime);
                      onWhenChange?.({ date, time: nextTime });
                    }}
                  />
                  {dateField.value ? (
                    <span className="sr-only">
                      {format(parseISO(dateField.value), "PPPP", {
                        locale: es,
                      })}
                    </span>
                  ) : null}
                </>
              )}
            />
          )}
        />
      </SurfaceCard>
  );
}
