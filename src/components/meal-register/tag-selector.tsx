"use client";

import { AVAILABLE_MEAL_TAGS } from "@/features/meal-register/constants/tag-options";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";

type TagSelectorProps = {
  selected: string[];
  onToggle: (tag: string) => void;
};

export function TagSelector({ selected, onToggle }: TagSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {AVAILABLE_MEAL_TAGS.map((tag) => {
        const isSelected = selected.includes(tag);

        return (
          <button
            key={tag}
            type="button"
            onClick={() => onToggle(tag)}
            className={cn(
              "rounded-full border px-3 py-1.5 text-sm font-medium transition-colors",
              isSelected
                ? "border-primary bg-mint text-primary"
                : "border-primary/25 bg-card text-foreground/70",
            )}
          >
            {tag}
          </button>
        );
      })}
      <button
        type="button"
        aria-label="Añadir etiqueta"
        className="flex size-9 items-center justify-center rounded-full border border-dashed border-primary/30 text-primary"
      >
        <Plus className="size-4" aria-hidden />
      </button>
    </div>
  );
}
