import { SurfaceCard } from "@/components/ui/surface-card";
import { buildMealRecipeCountBadge } from "@/features/planner/utils/meal-recipe-badge.utils";
import type { UpcomingMealItem } from "@/features/home/types/home.types";
import { cn } from "@/lib/utils";
import { Pencil, Salad } from "lucide-react";

type HomeUpcomingMealRowProps = {
  meal: UpcomingMealItem;
  onPress?: () => void;
  className?: string;
};

function buildUpcomingContentLine(meal: UpcomingMealItem): string {
  const kind = meal.kind ?? "meal";
  const isNote = kind === "note";

  if (isNote) {
    return meal.title.trim();
  }

  const labels = (meal.items ?? []).map((item) => item.label);

  if (labels.length === 0) {
    return meal.title.trim();
  }

  return labels.join(", ");
}

export function HomeUpcomingMealRow({
  meal,
  onPress,
  className,
}: HomeUpcomingMealRowProps) {
  const kind = meal.kind ?? "meal";
  const isNote = kind === "note";
  const recipeCount = meal.items?.length ?? 0;
  const totalRecipeCount = recipeCount + (meal.moreCount ?? 0);
  const mealRecipeBadge =
    !isNote && totalRecipeCount > 0
      ? buildMealRecipeCountBadge(
          totalRecipeCount,
          meal.totalDurationMinutes,
        )
      : null;
  const contentLine = buildUpcomingContentLine(meal);

  return (
    <SurfaceCard
      className={cn(
        "flex items-start gap-3 border-foreground/6 bg-card/10 px-3.5 py-3 shadow-none",
        onPress && "cursor-pointer active:scale-[0.99]",
        className,
      )}
      role={onPress ? "button" : undefined}
      tabIndex={onPress ? 0 : undefined}
      aria-label={`${meal.slotLabel}, ${meal.timeLabel}`}
      onClick={onPress}
      onKeyDown={
        onPress
          ? (event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onPress();
              }
            }
          : undefined
      }
    >
      <span
        className={cn(
          "flex size-7 shrink-0 items-center justify-center rounded-lg",
          isNote
            ? "bg-highlight/40 text-foreground/75"
            : "bg-primary/10 text-primary/80",
        )}
      >
        {isNote ? (
          <Pencil className="size-3.5" aria-hidden="true" />
        ) : (
          <Salad className="size-3.5" aria-hidden="true" />
        )}
      </span>

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2.5">
          <p className="flex min-w-0 flex-1 items-center gap-1.5 truncate text-[10px] font-semibold text-foreground/40">
            <span className="shrink-0 tracking-wider uppercase">
              {meal.slotLabel}
            </span>
            <span className="shrink-0 text-foreground/25">·</span>
            <span className="truncate font-semibold text-foreground/50">
              {meal.timeLabel}
            </span>
          </p>
          {mealRecipeBadge ? (
            <span className="max-w-[48%] shrink-0 truncate rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
              {mealRecipeBadge}
            </span>
          ) : null}
        </div>

        {contentLine ? (
          <p className="mt-1 line-clamp-2 text-xs font-medium leading-relaxed text-foreground/70">
            {contentLine}
          </p>
        ) : null}
      </div>
    </SurfaceCard>
  );
}
