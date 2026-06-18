"use client";

import { useResolvedMealPhotoUrl } from "@/features/meal-register/hooks/use-resolved-meal-photo-url";
import { cn } from "@/lib/utils";

type MealPhotoImageProps = {
  mediaRef?: string | null;
  alt?: string;
  className?: string;
  imageClassName?: string;
  children?: React.ReactNode;
};

export function MealPhotoImage({
  mediaRef,
  alt = "",
  className,
  imageClassName,
  children,
}: MealPhotoImageProps) {
  const { displayUrl, isResolving } = useResolvedMealPhotoUrl(
    mediaRef ?? undefined,
  );

  if (!mediaRef?.trim()) {
    return null;
  }

  return (
    <span className={cn("relative block overflow-hidden", className)}>
      {displayUrl && !isResolving ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={displayUrl}
          alt={alt}
          className={cn("size-full object-cover", imageClassName)}
        />
      ) : (
        <span
          className={cn("block size-full bg-foreground/5", imageClassName)}
          aria-hidden
        />
      )}
      {children}
    </span>
  );
}
