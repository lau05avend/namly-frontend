import { SurfaceCard } from "@/components/ui/surface-card";
import type { PlannerEntry } from "@/features/planner/types/planner.types";
import { cn } from "@/lib/utils";
import { Circle, Pencil } from "lucide-react";

type PlannedEntryCardProps = {
  entry: PlannerEntry;
  onSelect?: () => void;
};

export function PlannedEntryCard({ entry, onSelect }: PlannedEntryCardProps) {
  const isFeatured = entry.variant === "featured";
  const isNote = entry.variant === "note";

  return (
    <article className="flex flex-col gap-2">
      <p className="text-[11px] font-semibold tracking-wider text-foreground/45 uppercase">
        {entry.slotLabel}
      </p>

      <SurfaceCard
        className={cn(
          "flex flex-col gap-3 p-4",
          isFeatured && "border-2 border-primary/20 bg-card",
          isNote && "border-dashed border-foreground/15 bg-card/60",
          onSelect && "cursor-pointer active:scale-[0.99]",
        )}
        role={onSelect ? "button" : undefined}
        tabIndex={onSelect ? 0 : undefined}
        onClick={onSelect}
      >
        <div className="flex items-start justify-between gap-2">
          <span
            className={cn(
              "text-sm font-semibold",
              isFeatured ? "text-cta" : "text-foreground/50",
            )}
          >
            {entry.timeLabel}
          </span>
          {entry.countdownLabel ? (
            <span className="rounded-full bg-mint px-2.5 py-1 text-xs font-semibold text-primary">
              {entry.countdownLabel}
            </span>
          ) : null}
          {entry.badge ? (
            <span className="rounded-full bg-cta/15 px-2.5 py-1 text-xs font-semibold text-cta">
              {entry.badge}
            </span>
          ) : null}
        </div>

        {isNote ? (
          <div className="flex items-start gap-3">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-highlight/80 text-foreground">
              <Pencil className="size-4" aria-hidden="true" />
            </span>
            <p className="flex-1 text-sm font-medium text-foreground/80">
              {entry.title}
            </p>
          </div>
        ) : (
          <>
            {entry.items && entry.items.length > 0 ? (
              <ul className="flex flex-col gap-2.5">
                {entry.items.map((item) => (
                  <li key={item.id} className="flex items-center gap-2.5">
                    <Circle
                      className="size-4 shrink-0 text-primary"
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                    <span className="text-sm text-foreground/85">
                      {item.label}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex items-center gap-2.5">
                <Circle
                  className="size-4 shrink-0 text-primary"
                  strokeWidth={2}
                  aria-hidden="true"
                />
                <span className="text-sm font-medium text-foreground">
                  {entry.title}
                </span>
              </div>
            )}
          </>
        )}
      </SurfaceCard>
    </article>
  );
}
