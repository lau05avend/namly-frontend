"use client";

import { useRouter } from "next/navigation";
import { RECIPES_COPY } from "@/features/recipes/constants/recipes-copy";
import { navigateToInternalPath } from "@/lib/navigation/to-app-navigation-href";
import { cn } from "@/lib/utils";
import { ArrowLeft, Pencil, Trash2 } from "lucide-react";

export const RECIPE_DETAIL_CONTENT_OFFSET_CLASS =
  "pt-[calc(env(safe-area-inset-top)+3.5rem)]";

type RecipeDetailHeaderProps = {
  onEdit?: () => void;
  onDelete?: () => void;
  onBack?: () => void;
  returnTo?: string | null;
  className?: string;
};

export function RecipeDetailHeader({
  onEdit,
  onDelete,
  onBack,
  returnTo,
  className,
}: RecipeDetailHeaderProps) {
  const router = useRouter();
  const copy = RECIPES_COPY.recipeDetail;
  const showActions = Boolean(onEdit || onDelete);

  const handleBack = () => {
    if (onBack) {
      onBack();
      return;
    }

    if (returnTo) {
      navigateToInternalPath(router, returnTo);
      return;
    }

    router.back();
  };

  return (
    <div
      className={cn(
        "fixed inset-x-0 top-0 z-30 border-b border-foreground/5 bg-background/20 backdrop-blur-md",
        className,
      )}
    >
      <div className="relative mx-auto flex w-full max-w-lg items-center gap-1 px-4 pb-2 pt-[calc(env(safe-area-inset-top)+0.375rem)]">
        <button
          type="button"
          onClick={handleBack}
          aria-label={copy.back}
          className="relative z-10 flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full bg-mint/75 text-primary shadow-sm"
        >
          <ArrowLeft className="size-4" strokeWidth={2.25} aria-hidden />
        </button>

        {showActions ? (
          <div className="relative z-10 ml-auto flex items-center gap-0.5">
            {onEdit ? (
              <button
                type="button"
                onClick={onEdit}
                aria-label={copy.editRecipe}
                className="flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full text-foreground/45 transition-colors hover:bg-mint/50 hover:text-primary"
              >
                <Pencil className="size-4" strokeWidth={2} aria-hidden />
              </button>
            ) : null}

            {onDelete ? (
              <button
                type="button"
                onClick={onDelete}
                aria-label={copy.deleteRecipe}
                className="flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full text-foreground/45 transition-colors hover:bg-cta/10 hover:text-cta"
              >
                <Trash2 className="size-4" strokeWidth={2} aria-hidden />
              </button>
            ) : null}
          </div>
        ) : (
          <span className="ml-auto size-8 shrink-0" aria-hidden />
        )}
      </div>
    </div>
  );
}
