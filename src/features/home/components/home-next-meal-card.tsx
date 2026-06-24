import { HOME_COPY } from "@/features/home/constants/home-copy";
import { HOME_HERO_SURFACES } from "@/features/home/constants/home-hero-surfaces";
import type { NextMealDetail } from "@/features/home/types/home.types";
import { getNextMealRecipeDisplay } from "@/features/home/utils/next-meal-display";
import { cn } from "@/lib/utils";
import { Pencil, Salad, type LucideIcon } from "lucide-react";

type HomeNextMealCardProps = {
  meal: NextMealDetail;
  className?: string;
};

function NextMealConcept({
  kind,
}: {
  kind: NonNullable<NextMealDetail["kind"]>;
}) {
  const isNote = kind === "note";
  const Icon: LucideIcon = isNote ? Pencil : Salad;
  const label = isNote
    ? HOME_COPY.nextMeal.expressNote
    : HOME_COPY.nextMeal.plannedMeal;

  return (
    <p className="flex items-center gap-1.5 text-xs font-medium text-foreground/55">
      <Icon className="size-3.5 shrink-0 text-primary/80" strokeWidth={2} aria-hidden="true" />
      {label}
    </p>
  );
}

export function HomeNextMealCard({ meal, className }: HomeNextMealCardProps) {
  const kind = meal.kind ?? "meal";
  const isNote = kind === "note";
  const { visibleRecipes, hiddenCount } = getNextMealRecipeDisplay(meal);

  return (
    <article
      className={cn(
        "flex h-full flex-col px-4 py-3.5",
        HOME_HERO_SURFACES.nextMeal,
        className,
      )}
      aria-label={HOME_COPY.nextMeal.ariaLabel(meal.slotLabel)}
    >
      <div className="flex shrink-0 flex-col gap-1.5">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[11px] font-bold tracking-wider text-foreground/50 uppercase">
            {meal.slotLabel.toUpperCase()}
          </p>
          {meal.countdownLabel ? (
            <span className="shrink-0 rounded-full bg-primary px-2.5 py-0.5 text-[12px] font-semibold text-white">
              {meal.countdownLabel}
            </span>
          ) : null}
        </div>

        <div className="flex items-center justify-between gap-3">
          <NextMealConcept kind={kind} />
          <p className="shrink-0 text-right text-xs font-medium leading-none text-foreground/50">
            {meal.timeLabel}
          </p>
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col justify-start gap-1 pt-3">
        {isNote ? (
          <p className="line-clamp-3 min-w-0 text-base font-medium leading-snug text-foreground">
            {meal.title}
          </p>
        ) : visibleRecipes.length > 0 ? (
          <ul className="flex flex-col gap-0.5">
            {visibleRecipes.map((recipe, index) => (
              <li
                key={`${meal.id}-${recipe}-${index}`}
                className={cn(
                  "truncate leading-snug",
                  index === 0
                    ? "text-base font-semibold leading-tight text-foreground"
                    : "text-sm text-foreground/78",
                )}
              >
                {recipe}
              </li>
            ))}
            {hiddenCount > 0 ? (
              <li className="text-xs font-medium text-foreground/45">
                {HOME_COPY.nextMeal.moreRecipes(hiddenCount)}
              </li>
            ) : null}
          </ul>
        ) : (
          <p className="text-sm leading-snug text-foreground/55">
            {HOME_COPY.nextMeal.emptyRecipes}
          </p>
        )}
      </div>
    </article>
  );
}
