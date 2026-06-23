"use client";

import { RECIPES_COPY } from "@/features/recipes/constants/recipes-copy";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

const STAR_COUNT = 5;

type RecipePersonalRatingProps = {
  value: number | null;
  disabled?: boolean;
  onChange: (rating: number | null) => void;
};

export function RecipePersonalRating({
  value,
  disabled = false,
  onChange,
}: RecipePersonalRatingProps) {
  const copy = RECIPES_COPY.recipeDetail;
  const activeRating = value ?? 0;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-1">
        {Array.from({ length: STAR_COUNT }, (_, index) => {
          const starValue = index + 1;
          const isFilled = starValue <= activeRating;

          return (
            <button
              key={starValue}
              type="button"
              disabled={disabled}
              onClick={() => {
                onChange(activeRating === starValue ? null : starValue);
              }}
              aria-label={`${starValue} de ${STAR_COUNT}`}
              className={cn(
                "cursor-pointer rounded-md p-0.5 transition-transform active:scale-95 disabled:cursor-not-allowed disabled:opacity-60",
              )}
            >
              <Star
                className={cn(
                  "size-7",
                  isFilled
                    ? "fill-highlight text-highlight"
                    : "fill-foreground/8 text-foreground/20",
                )}
                strokeWidth={1.75}
                aria-hidden
              />
            </button>
          );
        })}
      </div>

      {activeRating > 0 ? (
        <p className="text-sm font-medium text-foreground/65">
          {copy.ratingOf(activeRating)}
        </p>
      ) : null}
    </div>
  );
}
