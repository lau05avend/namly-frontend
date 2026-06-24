import { HOME_COPY } from "@/features/home/constants/home-copy";
import { HOME_HERO_SURFACES } from "@/features/home/constants/home-hero-surfaces";
import { cn } from "@/lib/utils";
import { Sprout } from "lucide-react";

type HomeNextMealEmptyCardProps = {
  className?: string;
};

export function HomeNextMealEmptyCard({ className }: HomeNextMealEmptyCardProps) {
  return (
    <article
      className={cn(
        "flex h-full flex-col items-center justify-center gap-2.5 px-4 py-3.5 text-center",
        HOME_HERO_SURFACES.nextMealEmpty,
        className,
      )}
      aria-label={HOME_COPY.nextMeal.emptyDayAriaLabel}
    >
      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 ring-1 ring-primary/15">
        <Sprout
          className="size-5 text-primary"
          strokeWidth={1.75}
          aria-hidden="true"
        />
      </span>
      <div className="flex flex-col gap-1">
        <p className="text-base font-semibold leading-snug text-foreground/85">
          {HOME_COPY.nextMeal.emptyDay}
        </p>
        <p className="text-sm leading-snug text-foreground/52">
          {HOME_COPY.nextMeal.emptyDayHint}
        </p>
      </div>
    </article>
  );
}
