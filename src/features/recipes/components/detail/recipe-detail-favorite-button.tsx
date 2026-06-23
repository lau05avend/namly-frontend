"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { RECIPES_COPY } from "@/features/recipes/constants/recipes-copy";
import { useSaveRecipeInteractions } from "@/features/recipes/queries/use-save-recipe-interactions";
import { getUserFacingErrorMessage } from "@/lib/api/get-user-facing-error-message";
import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";

type RecipeDetailFavoriteButtonProps = {
  recipeId: string;
  isFavorite: boolean;
};

export function RecipeDetailFavoriteButton({
  recipeId,
  isFavorite,
}: RecipeDetailFavoriteButtonProps) {
  const copy = RECIPES_COPY.recipeDetail;
  const [favorite, setFavorite] = useState(isFavorite);
  const saveMutation = useSaveRecipeInteractions();

  useEffect(() => {
    setFavorite(isFavorite);
  }, [isFavorite]);

  const handleToggle = async () => {
    const nextFavorite = !favorite;
    setFavorite(nextFavorite);

    try {
      await saveMutation.mutateAsync({
        recipeId,
        payload: { isFavorite: nextFavorite },
      });
    } catch (error) {
      setFavorite(!nextFavorite);
      toast.error(getUserFacingErrorMessage(error, copy.feedbackError));
    }
  };

  return (
    <button
      type="button"
      onClick={() => void handleToggle()}
      disabled={saveMutation.isPending}
      aria-label={favorite ? copy.favoriteRemove : copy.favoriteAdd}
      className={cn(
        "absolute right-2.5 bottom-2.5 z-10 flex size-7 cursor-pointer items-center justify-center rounded-full border bg-background/90 shadow-sm backdrop-blur-md transition-colors disabled:cursor-not-allowed disabled:opacity-60",
        favorite ? "border-cta/35" : "border-foreground/15",
      )}
    >
      <Heart
        className={cn(
          "size-[18px]",
          favorite ? "fill-cta text-cta" : "text-foreground/40",
        )}
        strokeWidth={2}
        aria-hidden
      />
    </button>
  );
}
