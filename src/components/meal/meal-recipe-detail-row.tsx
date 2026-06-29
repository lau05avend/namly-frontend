"use client";

import { RecipeDurationMeta } from "@/components/meal/recipe-duration-meta";
import { RecipeCoverThumb } from "@/features/recipes/components/recipe-cover-thumb";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

type MealRecipeDetailRowProps = {
  title: string;
  coverUrl: string | null;
  durationMinutes?: number | null;
  onPress?: () => void;
  ariaLabel?: string;
  isLast?: boolean;
  className?: string;
};

export function MealRecipeDetailRow({
  title,
  coverUrl,
  durationMinutes,
  onPress,
  ariaLabel,
  isLast = false,
  className,
}: MealRecipeDetailRowProps) {
  const isInteractive = Boolean(onPress);

  const rowClassName = cn(
    "group flex w-full min-w-0 items-center gap-2.5 py-3",
    !isLast && "border-b border-foreground/[0.05]",
    className,
  );

  const content = (
    <>
      <RecipeCoverThumb
        coverUrl={coverUrl}
        className="size-14 rounded-[13px] border-foreground/[0.06]"
      />
      <div className="min-w-0 flex-1 py-0.5">
        <p className="line-clamp-2 text-sm font-semibold leading-snug text-foreground group-hover:text-foreground/90">
          {title}
        </p>
        <RecipeDurationMeta durationMinutes={durationMinutes} className="mt-1" />
      </div>
      {isInteractive ? (
        <ChevronRight
          className="size-3.5 shrink-0 text-foreground/40 transition-colors group-hover:text-foreground/30"
          strokeWidth={1.75}
          aria-hidden
        />
      ) : null}
    </>
  );

  if (!isInteractive) {
    return <div className={rowClassName}>{content}</div>;
  }

  return (
    <button
      type="button"
      onClick={onPress}
      aria-label={ariaLabel ?? title}
      className={cn(
        rowClassName,
        "cursor-pointer text-left transition-opacity hover:opacity-60 active:opacity-70",
      )}
    >
      {content}
    </button>
  );
}
