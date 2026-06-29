"use client";

import { Controller, useFormContext } from "react-hook-form";
import { RegisterFormSection } from "@/features/meal-register/components/register-form-section";
import { REGISTER_MEAL_COPY } from "@/features/meal-register/constants/register-meal-copy";
import type { RegisterMealFormValues } from "@/features/meal-register/schemas/register-meal.schema";
import { useAutoGrowTextarea } from "@/hooks/use-auto-grow-textarea";

export function RegisterNoteSection() {
  const {
    control,
    watch,
    formState: { errors },
  } = useFormContext<RegisterMealFormValues>();
  const note = watch("note") ?? "";
  const { textareaRef, resize } = useAutoGrowTextarea(note);

  return (
    <RegisterFormSection title={REGISTER_MEAL_COPY.sections.note}>
      <div className="border-l-2 border-primary/12 pl-3 transition-colors focus-within:border-primary/25">
        <Controller
          name="note"
          control={control}
          render={({ field }) => (
            <textarea
              {...field}
              ref={(element) => {
                field.ref(element);
                textareaRef.current = element;
              }}
              placeholder={REGISTER_MEAL_COPY.note.placeholder}
              rows={1}
              onInput={resize}
              className="w-full resize-none overflow-hidden bg-transparent text-[15px] leading-relaxed text-foreground/65 placeholder:text-foreground/30 focus-visible:outline-none"
            />
          )}
        />
      </div>
      {errors.note?.message ? (
        <p className="text-xs text-destructive">{errors.note.message}</p>
      ) : null}
    </RegisterFormSection>
  );
}
