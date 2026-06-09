"use client";

import { SurfaceCard } from "@/components/ui/surface-card";
import { REGISTER_MEAL_COPY } from "@/features/meal-register/constants/register-meal-copy";
import { Circle, X } from "lucide-react";

type RegisterRecipeRowProps = {
  title: string;
  onTitleChange: (value: string) => void;
  onRemove: () => void;
};

export function RegisterRecipeRow({
  title,
  onTitleChange,
  onRemove,
}: RegisterRecipeRowProps) {
  return (
    <SurfaceCard className="flex flex-row items-center gap-3 p-3">
      <Circle
        className="size-4 shrink-0 text-primary"
        strokeWidth={2}
        aria-hidden
      />
      <input
        value={title}
        onChange={(event) => onTitleChange(event.target.value)}
        placeholder={REGISTER_MEAL_COPY.recipes.placeholder}
        className="min-w-0 flex-1 bg-transparent text-sm font-medium text-foreground outline-none placeholder:text-foreground/35"
      />
      <button
        type="button"
        onClick={onRemove}
        aria-label={REGISTER_MEAL_COPY.recipes.remove}
        className="text-foreground/35 hover:text-cta"
      >
        <X className="size-4" />
      </button>
    </SurfaceCard>
  );
}
