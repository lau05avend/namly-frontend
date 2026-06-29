"use client";

import { RecipeCoverImage } from "@/features/recipes/components/recipe-cover-image";
import { cn } from "@/lib/utils";

type RecipeCoverThumbProps = {
  coverUrl?: string | null;
  className?: string;
};

export function RecipeCoverThumb({
  coverUrl,
  className,
}: RecipeCoverThumbProps) {
  return (
    <div
      className={cn(
        "relative size-11 shrink-0 overflow-hidden rounded-lg border border-foreground/8",
        className,
      )}
    >
      <RecipeCoverImage
        coverUrl={coverUrl}
        placeholderIconClassName="size-6 text-foreground/[0.09]"
      />
    </div>
  );
}
