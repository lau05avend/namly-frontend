"use client";

import { cn } from "@/lib/utils";

export type MealTypeSelectorOption = {
  id: string;
  label: string;
};

type MealTypeSelectorProps = {
  options: MealTypeSelectorOption[];
  value: string;
  onChange: (id: string) => void;
};

export function MealTypeSelector({
  options,
  value,
  onChange,
}: MealTypeSelectorProps) {
  return (
    <div
      className="flex flex-wrap gap-2"
      role="radiogroup"
      aria-label="Tipo de comida"
    >
      {options.map((option) => {
        const selected = value === option.id;

        return (
          <button
            key={option.id}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(option.id)}
            className={cn(
              "cursor-pointer rounded-full px-4 py-2.5 text-sm font-medium transition-colors",
              selected
                ? "bg-primary text-white shadow-sm"
                : "bg-mint/50 text-foreground/70 hover:bg-mint",
            )}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
