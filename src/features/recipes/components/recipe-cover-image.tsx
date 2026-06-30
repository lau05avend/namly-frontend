"use client";

import { useEffect, useRef, useState } from "react";
import { RecipePlaceholderIcon } from "@/features/recipes/constants/recipe-placeholder";
import { useResolvedRecipeCoverUrl } from "@/features/recipes/hooks/use-resolved-recipe-cover-url";
import { cn } from "@/lib/utils";

type RecipeCoverImageProps = {
  coverUrl?: string | null;
  placeholderIconClassName?: string;
  placeholderBackgroundClassName?: string;
  imageClassName?: string;
};

export function RecipeCoverImage({
  coverUrl,
  placeholderIconClassName = "size-11 text-foreground/[0.09]",
  placeholderBackgroundClassName = "bg-card",
  imageClassName = "size-full object-cover",
}: RecipeCoverImageProps) {
  const { displayUrl, isResolving } = useResolvedRecipeCoverUrl(
    coverUrl ?? undefined,
  );
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    setIsLoaded(false);
    setHasError(false);
  }, [displayUrl]);

  const shouldLoadImage =
    Boolean(displayUrl) && !isResolving && !hasError;
  const showImage = shouldLoadImage && isLoaded;

  useEffect(() => {
    const image = imageRef.current;

    if (image?.complete && image.naturalWidth > 0) {
      setIsLoaded(true);
    }
  }, [displayUrl, shouldLoadImage]);

  return (
    <>
      <span
        className={cn(
          "absolute inset-0 flex items-center justify-center",
          placeholderBackgroundClassName,
        )}
        aria-hidden
      >
        <RecipePlaceholderIcon
          className={placeholderIconClassName}
          strokeWidth={1.25}
        />
      </span>
      {shouldLoadImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          ref={imageRef}
          src={displayUrl}
          alt=""
          className={cn(
            "absolute inset-0",
            imageClassName,
            showImage ? "opacity-100" : "opacity-0",
          )}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
        />
      ) : null}
    </>
  );
}
