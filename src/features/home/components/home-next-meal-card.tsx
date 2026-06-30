import { MealPrepDurationMeta } from "@/components/meal/meal-prep-duration-meta";
import { HOME_COPY } from "@/features/home/constants/home-copy";
import { HOME_HERO_SURFACES } from "@/features/home/constants/home-hero-surfaces";
import type { NextMealDetail } from "@/features/home/types/home.types";
import { buildMealPrepDurationLabel } from "@/features/planner/utils/meal-recipe-badge.utils";
import { cn } from "@/lib/utils";
import { Pencil, Salad } from "lucide-react";

function getNextMealRecipeDisplay(meal: NextMealDetail) {
  const totalCount = meal.items.length + (meal.moreCount ?? 0);
  const primaryRecipe = meal.items[0] ?? null;
  const hiddenCount = Math.max(0, totalCount - (primaryRecipe ? 1 : 0));

  return { primaryRecipe, hiddenCount };
}

type HomeNextMealCardProps = {
  meal: NextMealDetail;
  onPress?: () => void;
  className?: string;
};

export function HomeNextMealCard({
  meal,
  onPress,
  className,
}: HomeNextMealCardProps) {
  const kind = meal.kind ?? "meal";
  const isNote = kind === "note";
  const { primaryRecipe, hiddenCount } = getNextMealRecipeDisplay(meal);
  const prepLabel = !isNote
    ? buildMealPrepDurationLabel(meal.totalDurationMinutes)
    : null;

  return (
    <article
      className={cn(
        "flex h-full flex-col px-4 py-3.5",
        HOME_HERO_SURFACES.nextMeal,
        onPress && "cursor-pointer transition-transform active:scale-[0.99]",
        className,
      )}
      aria-label={HOME_COPY.nextMeal.ariaLabel(meal.slotLabel)}
      role={onPress ? "button" : undefined}
      tabIndex={onPress ? 0 : undefined}
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
      <p className="shrink-0 text-[11px] font-bold tracking-wide text-primary/80 uppercase">
        {HOME_COPY.nextMeal.label}
      </p>

      <div className="mt-3 flex shrink-0 flex-col gap-1.5">
        <div className="flex items-center justify-between gap-2">
          <p className="min-w-0 truncate text-[11px] font-bold tracking-wider text-foreground/60 uppercase">
            {meal.slotLabel}
          </p>
          {meal.countdownLabel ? (
            <span className="shrink-0 rounded-full bg-primary px-2.5 py-0.5 text-[11px] font-semibold text-white">
              {meal.countdownLabel}
            </span>
          ) : null}
        </div>

        <div className="flex min-w-0 items-center justify-between gap-2">
          <span className="shrink-0 text-xs font-medium text-foreground/50">
            {meal.timeLabel}
          </span>
          {prepLabel ? (
            <MealPrepDurationMeta
              totalDurationMinutes={meal.totalDurationMinutes}
              className="shrink-0"
            />
          ) : null}
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-1">
        {isNote ? (
          <p className="flex min-w-0 items-start gap-2 leading-snug">
            <Pencil
              className="mt-1 size-3.5 shrink-0 text-primary/75"
              strokeWidth={2}
              aria-hidden="true"
            />
            <span className="line-clamp-3 min-w-0 text-[14px] font-medium leading-snug text-foreground/90">
              {meal.title}
            </span>
          </p>
        ) : primaryRecipe ? (
          <>
            <p className="flex min-w-0 items-start gap-2 leading-snug">
              <Salad
                className="mt-1 size-3.5 shrink-0 text-primary"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <span className="line-clamp-2 min-w-0 text-[14px] font-medium leading-snug text-foreground/90">
                {primaryRecipe.label}
              </span>
            </p>
            {hiddenCount > 0 ? (
              <p className="pl-[22px] text-xs font-medium text-foreground/45">
                {HOME_COPY.nextMeal.moreRecipes(hiddenCount)}
              </p>
            ) : null}
          </>
        ) : (
          <p className="text-[14px] leading-snug text-foreground/55">
            {HOME_COPY.nextMeal.emptyRecipes}
          </p>
        )}
      </div>
    </article>
  );
}
