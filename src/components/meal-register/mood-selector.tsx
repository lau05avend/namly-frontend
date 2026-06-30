"use client";

import { MOOD_OPTIONS } from "@/features/meal-register/constants/mood-options";
import type { MoodValue } from "@/features/meal-register/schemas/register-meal.schema";
import { cn } from "@/lib/utils";

type MoodSelectorProps = {
  value?: MoodValue;
  onChange: (mood: MoodValue) => void;
};

export function MoodSelector({ value, onChange }: MoodSelectorProps) {
  return (
    <section
      className="flex justify-between gap-1.5 px-0.5"
      role="radiogroup"
      aria-label="Estado de ánimo"
    >
      {MOOD_OPTIONS.map((option) => {
        const selected = value === option.value;

        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={selected}
            aria-label={option.label}
            onClick={() => onChange(option.value)}
            className={cn(
              "flex size-12 cursor-pointer items-center justify-center rounded-full text-2xl transition-all",
              selected
                ? "bg-mint ring-2 ring-inset ring-primary"
                : "bg-card hover:bg-mint/40",
            )}
          >
            {option.emoji}
          </button>
        );
      })}
    </section>
  );
}
