import type { PlannerRegisteredMeal } from "@/features/planner/types/planner.types";
import { CheckCircle2 } from "lucide-react";

type CompletedMealItemProps = {
  meal: PlannerRegisteredMeal;
  onSelect?: () => void;
};

export function CompletedMealItem({ meal, onSelect }: CompletedMealItemProps) {
  const content = (
    <>
      <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-primary/12 text-primary">
        <CheckCircle2 className="size-3" strokeWidth={2.5} aria-hidden="true" />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-2">
          <p className="text-sm font-medium text-foreground/70">
            {meal.mealTypeName}
          </p>
          <p className="text-xs text-foreground/40">{meal.timeLabel}</p>
        </div>
        {meal.detail ? (
          <p className="mt-0.5 text-xs leading-relaxed text-foreground/50">
            {meal.detail}
          </p>
        ) : null}
      </div>
    </>
  );

  if (!onSelect) {
    return <div className="flex items-start gap-3 py-2.5">{content}</div>;
  }

  return (
    <button
      type="button"
      onClick={onSelect}
      className="flex w-full cursor-pointer items-start gap-3 py-2.5 text-left transition-opacity hover:opacity-80 active:opacity-70"
    >
      {content}
    </button>
  );
}
