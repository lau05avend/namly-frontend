"use client";

import { cn } from "@/lib/utils";
import { RECIPE_COLLECTION_COLOR_PRESETS } from "@/features/recipes/constants/recipe-collection-colors";

type RecipeCollectionColorPickerProps = {
  value: string;
  onChange: (colorHex: string) => void;
  disabled?: boolean;
};

export function RecipeCollectionColorPicker({
  value,
  onChange,
  disabled = false,
}: RecipeCollectionColorPickerProps) {
  return (
    <div className="flex flex-wrap gap-2.5">
      {RECIPE_COLLECTION_COLOR_PRESETS.map((preset) => {
        const isSelected =
          value.toLowerCase() === preset.value.toLowerCase();

        return (
          <button
            key={preset.value}
            type="button"
            disabled={disabled}
            aria-label={preset.label}
            aria-pressed={isSelected}
            onClick={() => onChange(preset.value)}
            className={cn(
              "size-9 cursor-pointer rounded-full border-2 transition-transform",
              isSelected
                ? "scale-110 border-foreground"
                : "border-transparent hover:scale-105",
              disabled && "cursor-not-allowed opacity-50",
            )}
            style={{ backgroundColor: preset.value }}
          />
        );
      })}
    </div>
  );
}
