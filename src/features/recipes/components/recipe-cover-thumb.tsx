"use client";

import { useResolvedRecipeCoverUrl } from "@/features/recipes/hooks/use-resolved-recipe-cover-url";
import { RecipePlaceholderIcon } from "@/features/recipes/constants/recipe-placeholder";
import { cn } from "@/lib/utils";

type RecipeCoverThumbProps = {
  coverUrl?: string | null;
  className?: string;
};

export function RecipeCoverThumb({
  coverUrl,
  className,
}: RecipeCoverThumbProps) {
  const hasCover = Boolean(coverUrl?.trim());
  const { displayUrl, isResolving } = useResolvedRecipeCoverUrl(
    coverUrl ?? undefined,
  );
  const showImage = Boolean(displayUrl) && !isResolving;

  return (
    <div
      className={cn(
        "relative size-11 shrink-0 overflow-hidden rounded-lg border border-foreground/8 bg-foreground/[0.04]",
        className,
      )}
    >
      {showImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={displayUrl} alt="" className="size-full object-cover" />
      ) : hasCover && isResolving ? (
        <span className="block size-full bg-foreground/5" aria-hidden />
      ) : (
        <span
          className="flex size-full items-center justify-center bg-card"
          aria-hidden
        >
          <RecipePlaceholderIcon
            className="size-6 text-foreground/[0.09]"
            strokeWidth={1.25}
          />
        </span>
      )}
    </div>
  );
}
