import type { PlannerRegisteredMeal } from "@/features/planner/types/planner.types";
import { cn } from "@/lib/utils";
import { CheckCircle2 } from "lucide-react";

type CompletedMealItemVariant = "default" | "home";

type CompletedMealItemProps = {
  meal: PlannerRegisteredMeal;
  onSelect?: () => void;
  variant?: CompletedMealItemVariant;
};

export function CompletedMealItem({
  meal,
  onSelect,
  variant = "default",
}: CompletedMealItemProps) {
  const isHome = variant === "home";

  const content = (
    <>
      <span
        className={cn(
          "flex shrink-0 items-center justify-center rounded-full",
          isHome
            ? "size-5 bg-mint/50 ring-1 ring-primary/10 text-primary/70"
            : "mt-0.5 size-6 bg-primary/12 text-primary",
        )}
      >
        <CheckCircle2
          className={cn(isHome ? "size-2.5" : "size-3")}
          strokeWidth={isHome ? 2 : 2.5}
          aria-hidden="true"
        />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-2">
          <p
            className={cn(
              "font-medium",
              isHome
                ? "text-xs text-foreground/65"
                : "text-sm text-foreground/70",
            )}
          >
            {meal.mealTypeName}
          </p>
          <p className="text-xs text-foreground/40">{meal.timeLabel}</p>
        </div>
        {meal.detail ? (
          <p
            className={cn(
              "text-xs leading-relaxed text-foreground/50",
              isHome ? "mt-0.5 line-clamp-2" : "mt-0.5",
            )}
          >
            {meal.detail}
          </p>
        ) : null}
      </div>
    </>
  );

  const rowClassName = cn(
    "flex w-full items-start text-left",
    isHome ? "gap-2 py-2" : "gap-3 py-2.5",
  );

  if (!onSelect) {
    return <div className={rowClassName}>{content}</div>;
  }

  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        rowClassName,
        "cursor-pointer transition-colors",
        isHome
          ? "active:bg-mint/25"
          : "transition-opacity hover:opacity-80 active:opacity-70",
      )}
    >
      {content}
    </button>
  );
}
