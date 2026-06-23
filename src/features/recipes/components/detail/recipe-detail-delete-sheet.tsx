"use client";

import { BottomSheet } from "@/components/ui/bottom-sheet";
import { Button } from "@/components/ui/button";
import { RECIPES_COPY } from "@/features/recipes/constants/recipes-copy";

type RecipeDetailDeleteSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  isDeleting?: boolean;
};

export function RecipeDetailDeleteSheet({
  open,
  onOpenChange,
  onConfirm,
  isDeleting = false,
}: RecipeDetailDeleteSheetProps) {
  const copy = RECIPES_COPY.recipeDetail;

  return (
    <BottomSheet
      open={open}
      onOpenChange={onOpenChange}
      title={copy.deleteRecipeTitle}
      description={copy.deleteRecipeDescription}
      footer={
        <div className="flex flex-col gap-2">
          <Button
            type="button"
            variant="cta"
            className="w-full bg-cta"
            disabled={isDeleting}
            onClick={onConfirm}
          >
            {copy.deleteRecipeConfirm}
          </Button>
          <Button
            type="button"
            variant="ghost"
            className="w-full"
            disabled={isDeleting}
            onClick={() => onOpenChange(false)}
          >
            {copy.deleteRecipeCancel}
          </Button>
        </div>
      }
    >
      <div className="pb-4" />
    </BottomSheet>
  );
}
