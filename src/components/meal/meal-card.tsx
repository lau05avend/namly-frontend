import type { ReactNode } from "react";
import { MealSlotIcon } from "@/components/meal/meal-slot-icon";
import { SurfaceCard } from "@/components/ui/surface-card";
import type { MealSummary } from "@/types/meal-summary";
import { cn } from "@/lib/utils";

type MealCardProps = {
  meal: MealSummary;
  variant?: "default" | "featured";
  className?: string;
  footer?: ReactNode;
};

export function MealCard({
  meal,
  variant = "default",
  className,
  footer,
}: MealCardProps) {
  const isFeatured = variant === "featured";

  return (
    <SurfaceCard
      className={cn(
        "flex flex-col gap-3",
        isFeatured && "min-h-[180px] justify-between p-5",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <p
            className={cn(
              "font-semibold text-foreground",
              isFeatured ? "text-lg leading-snug" : "text-base",
            )}
          >
            {meal.title}
          </p>
          {meal.subtitle ? (
            <p className="text-sm text-foreground/55">{meal.subtitle}</p>
          ) : null}
        </div>
        {meal.timeLabel ? (
          <span className="shrink-0 text-xs font-medium text-foreground/45">
            {meal.timeLabel}
          </span>
        ) : null}
      </div>

      {footer}

      {!footer && isFeatured ? (
        <div className="flex items-end justify-between">
          <MealSlotIcon slot={meal.slot} />
          <div
            aria-hidden="true"
            className="relative h-16 w-20 overflow-hidden rounded-2xl bg-mint/60"
          >
            <div className="absolute -top-1 right-2 size-5 rounded-full bg-highlight/80" />
            <div className="absolute bottom-2 left-3 h-8 w-10 rounded-t-full bg-primary/25" />
          </div>
        </div>
      ) : null}
    </SurfaceCard>
  );
}
