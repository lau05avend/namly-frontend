import { SurfaceCard } from "@/components/ui/surface-card";
import type { UpcomingMealItem } from "@/features/home/types/home.types";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

type UpcomingMealRowProps = {
  meal: UpcomingMealItem;
  onSelect?: () => void;
};

export function UpcomingMealRow({ meal, onSelect }: UpcomingMealRowProps) {
  return (
    <SurfaceCard
      className={cn(
        "flex flex-row items-center gap-3 p-4",
        onSelect && "cursor-pointer active:scale-[0.99]",
      )}
      role={onSelect ? "button" : undefined}
      tabIndex={onSelect ? 0 : undefined}
      onClick={onSelect}
    >
      <span
        className="size-5 shrink-0 rounded-full border-2 border-foreground/15 bg-background"
        aria-hidden="true"
      />
      <div className="min-w-0 flex-1">
        <p className="font-semibold text-foreground">{meal.title}</p>
        <p className="text-sm text-foreground/50">{meal.meta}</p>
      </div>
      <ChevronRight className="size-4 shrink-0 text-foreground/30" aria-hidden />
    </SurfaceCard>
  );
}
