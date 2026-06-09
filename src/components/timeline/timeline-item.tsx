import { MealSlotIcon } from "@/components/meal/meal-slot-icon";
import { SurfaceCard } from "@/components/ui/surface-card";
import type { MealSummary } from "@/types/meal-summary";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

type TimelineItemProps = {
  meal: MealSummary;
  tone?: "default" | "muted";
  showAction?: boolean;
  onSelect?: () => void;
};

export function TimelineItem({
  meal,
  tone = "default",
  showAction = false,
  onSelect,
}: TimelineItemProps) {
  const isMuted = tone === "muted";

  return (
    <SurfaceCard
      muted={isMuted}
      className={cn(
        "flex flex-row items-center gap-3 p-3",
        onSelect && "cursor-pointer active:scale-[0.99]",
      )}
      role={onSelect ? "button" : undefined}
      tabIndex={onSelect ? 0 : undefined}
      onClick={onSelect}
      onKeyDown={
        onSelect
          ? (event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onSelect();
              }
            }
          : undefined
      }
    >
      <MealSlotIcon slot={meal.slot} />
      <div className="min-w-0 flex-1">
        <p className="truncate font-medium text-foreground">{meal.title}</p>
        {meal.subtitle ? (
          <p className="truncate text-sm text-foreground/50">{meal.subtitle}</p>
        ) : null}
      </div>
      {showAction ? (
        <ChevronRight
          className="size-4 shrink-0 text-foreground/30"
          aria-hidden
        />
      ) : null}
    </SurfaceCard>
  );
}
