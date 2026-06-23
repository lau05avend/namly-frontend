"use client";

import { useState } from "react";
import { toast } from "sonner";
import { RecipePersonalRating } from "@/features/recipes/components/detail/recipe-personal-rating";
import { RECIPES_COPY } from "@/features/recipes/constants/recipes-copy";
import { useSaveRecipeInteractions } from "@/features/recipes/queries/use-save-recipe-interactions";
import { getUserFacingErrorMessage } from "@/lib/api/get-user-facing-error-message";

type RecipeDetailRatingSectionProps = {
  recipeId: string;
  initialRating: number | null;
};

function RecipeDetailRatingEditor({
  recipeId,
  initialRating,
}: RecipeDetailRatingSectionProps) {
  const copy = RECIPES_COPY.recipeDetail;
  const [rating, setRating] = useState(initialRating);
  const updateMutation = useSaveRecipeInteractions();

  const handleChange = async (nextRating: number | null) => {
    const previousRating = rating;
    setRating(nextRating);

    try {
      await updateMutation.mutateAsync({
        recipeId,
        payload: { rating: nextRating },
      });
    } catch (error) {
      setRating(previousRating);
      toast.error(getUserFacingErrorMessage(error, copy.feedbackError));
    }
  };

  return (
    <section className="flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <h2 className="text-sm font-semibold text-foreground/80">
          {copy.sections.rating}
        </h2>
      </div>
      <RecipePersonalRating
        value={rating}
        disabled={updateMutation.isPending}
        onChange={(nextRating) => {
          void handleChange(nextRating);
        }}
      />
    </section>
  );
}

export function RecipeDetailRatingSection({
  recipeId,
  initialRating,
}: RecipeDetailRatingSectionProps) {
  return (
    <RecipeDetailRatingEditor
      key={recipeId}
      recipeId={recipeId}
      initialRating={initialRating}
    />
  );
}
