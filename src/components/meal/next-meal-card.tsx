import { SurfaceCard } from "@/components/ui/surface-card";
import type { NextMealDetail } from "@/features/home/types/home.types";
import { cn } from "@/lib/utils";
import { Clock3 } from "lucide-react";

type NextMealCardProps = {
  meal: NextMealDetail;
  sectionLabel: string;
  className?: string;
};

export function NextMealCard({
  meal,
  sectionLabel,
  className,
}: NextMealCardProps) {
  return (
    <SurfaceCard className={cn("flex flex-col gap-3 p-4", className)}>
      <p className="text-[11px] font-semibold tracking-wider text-primary uppercase">
        {sectionLabel}
      </p>

      <div className="flex items-center justify-between gap-2">
        <span className="text-sm font-medium text-foreground/70">
          {meal.slotLabel}
        </span>
        <span className="rounded-full bg-mint px-2.5 py-1 text-xs font-semibold text-primary">
          {meal.timeLabel}
        </span>
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-bold leading-snug text-foreground">
          {meal.title}
        </h3>
        <p className="text-sm font-semibold text-cta">{meal.countdownLabel}</p>
      </div>

      <hr className="border-foreground/8" />

      <ul className="flex flex-col gap-2.5">
        {meal.items.map((item) => (
          <li key={item.id} className="flex items-center gap-2.5">
            <Clock3 className="size-4 shrink-0 text-primary" aria-hidden="true" />
            <span className="text-sm text-foreground/80">{item.label}</span>
          </li>
        ))}
      </ul>

      {meal.moreCount && meal.moreCount > 0 ? (
        <span className="w-fit rounded-full bg-mint/80 px-3 py-1 text-xs font-medium text-primary">
          +{meal.moreCount} más
        </span>
      ) : null}
    </SurfaceCard>
  );
}
