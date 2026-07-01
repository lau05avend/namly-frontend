"use client";

import { useEffect, useRef, useState } from "react";
import { useResolvedMealPhotoUrl } from "@/features/meal-register/hooks/use-resolved-meal-photo-url";
import { cn } from "@/lib/utils";

type MealPhotoImageProps = {
  mediaRef?: string | null;
  alt?: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  children?: React.ReactNode;
};

export function MealPhotoImage({
  mediaRef,
  alt = "",
  className,
  imageClassName,
  priority = false,
  children,
}: MealPhotoImageProps) {
  const trimmedRef = mediaRef?.trim() ?? "";
  const { displayUrl, isResolving } = useResolvedMealPhotoUrl(
    trimmedRef || undefined,
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

  if (!trimmedRef) {
    return null;
  }

  return (
    <span className={cn("relative block overflow-hidden", className)}>
      <span
        className={cn(
          "absolute inset-0 bg-foreground/5",
          isResolving && "animate-pulse",
          imageClassName,
        )}
        aria-hidden
      />
      {shouldLoadImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          ref={imageRef}
          src={displayUrl}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          className={cn(
            "relative size-full object-cover transition-opacity duration-300",
            imageClassName,
            showImage ? "opacity-100" : "opacity-0",
          )}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
        />
      ) : null}
      {children}
    </span>
  );
}
