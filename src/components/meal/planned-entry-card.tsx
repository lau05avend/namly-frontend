import { SurfaceCard } from "@/components/ui/surface-card";
import type { PlannerEntry } from "@/features/planner/types/planner.types";
import { cn } from "@/lib/utils";
import { Circle, Pencil, Salad } from "lucide-react";

type PlannedEntryCardProps = {
  entry: PlannerEntry;
  onSelect?: () => void;
};

function MealMetaLabels({
  entry,
  isFeatured,
  isMissed,
  useExpressStyle,
}: {
  entry: PlannerEntry;
  isFeatured: boolean;
  isMissed: boolean;
  useExpressStyle: boolean;
}) {
  if (useExpressStyle) {
    return (
      <p className="flex min-w-0 flex-1 items-center gap-1.5 truncate text-[10px] font-semibold text-foreground/40">
        <span className="tracking-wider uppercase">{entry.slotLabel}</span>
        <span className="text-foreground/25">·</span>
        <span className="font-semibold text-foreground/50">
          {entry.timeLabel}
        </span>
      </p>
    );
  }

  return (
    <div className="flex min-w-0 flex-1 items-center gap-2">
      <span
        className={cn(
          "shrink-0 font-semibold tracking-wider uppercase",
          isFeatured
            ? "text-[11px] text-foreground/45"
            : "text-[10px] text-foreground/40",
        )}
      >
        {entry.slotLabel}
      </span>
      <span
        className="size-0.5 shrink-0 rounded-full bg-foreground/20"
        aria-hidden
      />
      <span
        className={cn(
          "truncate font-semibold",
          isFeatured
            ? "text-base font-semibold text-foreground/75"
            : isMissed
              ? "text-sm text-foreground/40"
              : "text-sm text-foreground/50",
        )}
      >
        {entry.timeLabel}
      </span>
    </div>
  );
}

function splitTimeLabel(timeLabel: string): { time: string; period?: string } {
  const match = timeLabel.match(/^(\d{1,2}:\d{2})\s+(.+)$/);
  if (!match) {
    return { time: timeLabel };
  }

  return {
    time: match[1],
    period: match[2].replace(/\s/g, "").toLowerCase(),
  };
}

function FeaturedHeroTime({ timeLabel }: { timeLabel: string }) {
  const { time, period } = splitTimeLabel(timeLabel);

  return (
    <p className="flex items-baseline justify-end gap-1 tabular-nums">
      <span className="text-[15px] font-semibold leading-none text-foreground/50">
        {time}
      </span>
      {period ? (
        <span className="text-[10px] font-semibold tracking-wide text-foreground/50 uppercase">
          {period}
        </span>
      ) : null}
    </p>
  );
}

export function PlannedEntryCard({ entry, onSelect }: PlannedEntryCardProps) {
  const isFeatured = entry.variant === "featured";
  const isNote = entry.kind === "note";
  const isMissed = entry.status === "missed";
  const isUpcomingMeta = entry.status === "upcoming" && !isFeatured;
  const recipeCount = entry.items?.length ?? 0;
  const isFeaturedRecipeCard = isFeatured && recipeCount > 0;
  const isCompactRecipeCard = recipeCount > 0 && !isFeatured;
  const recipeCountLabel =
    recipeCount === 1 ? "1 receta" : `${recipeCount} recetas`;

  if (isNote) {
    if (isFeatured) {
      return (
        <SurfaceCard
          className={cn(
            "flex flex-col gap-2 border border-primary/10 bg-mint/50 px-4 py-3.5 shadow-none",
            onSelect && "cursor-pointer active:scale-[0.99]",
          )}
          role={onSelect ? "button" : undefined}
          tabIndex={onSelect ? 0 : undefined}
          onClick={onSelect}
        >
          <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-3 gap-y-1.5">
            <div className="flex min-w-0 items-center gap-2">
              <span className="text-[11px] font-bold tracking-wider text-foreground/45 uppercase">
                {entry.slotLabel}
              </span>
              {entry.badge ? (
                <span className="shrink-0 rounded-full bg-cta/15 px-2 py-0.5 text-[10px] font-semibold text-cta">
                  {entry.badge}
                </span>
              ) : null}
            </div>

            {entry.countdownLabel ? (
              <span className="justify-self-end rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">
                {entry.countdownLabel}
              </span>
            ) : null}

            <div className="col-start-1 row-start-2 flex min-w-0 items-center gap-2.5">
              <Pencil
                className="size-3 shrink-0 text-primary"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <span className="truncate text-sm leading-snug text-foreground/90">
                {entry.title}
              </span>
            </div>

            <div className="col-start-2 row-start-2 self-start justify-self-end pt-0.5">
              <FeaturedHeroTime timeLabel={entry.timeLabel} />
            </div>
          </div>
        </SurfaceCard>
      );
    }

    return (
      <SurfaceCard
        className={cn(
          "flex items-center gap-2.5 border-dashed border-foreground/12 bg-card/10 px-3.5 py-2 shadow-none",
          isFeatured && "border-primary/15 bg-mint/40 px-3 py-2.5",
          isMissed && "border-foreground/8 bg-foreground/[0.015]",
          onSelect && "cursor-pointer active:scale-[0.99]",
        )}
        role={onSelect ? "button" : undefined}
        tabIndex={onSelect ? 0 : undefined}
        onClick={onSelect}
      >
        <span
          className={cn(
            "flex size-7 shrink-0 items-center justify-center rounded-lg",
            isMissed
              ? "bg-highlight/25 text-foreground/40"
              : "bg-highlight/40 text-foreground/75",
            isFeatured && !isMissed && "size-8 bg-highlight/60",
          )}
        >
          <Pencil
            className={isFeatured ? "size-3.5" : "size-3"}
            aria-hidden="true"
          />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <p className="flex min-w-0 items-center gap-1.5 truncate text-[10px] font-semibold text-foreground/40">
              <span className="tracking-wider uppercase">
                {entry.slotLabel}
              </span>
              <span className="text-foreground/25">·</span>
              <span
                className={cn(
                  "font-semibold",
                  isMissed ? "text-foreground/40" : "text-foreground/50",
                )}
              >
                {entry.timeLabel}
              </span>
            </p>
            {entry.badge ? (
              <span
                className={cn(
                  "shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold",
                  isMissed
                    ? "bg-foreground/8 text-foreground/45"
                    : "bg-cta/15 text-cta",
                )}
              >
                {entry.badge}
              </span>
            ) : null}
          </div>
          <p
            className={cn(
              "mt-0.5 truncate",
              isFeatured ? "text-sm" : "text-xs",
              isMissed
                ? "text-foreground/45"
                : "font-medium text-foreground/80",
            )}
          >
            {entry.title}
          </p>
        </div>
      </SurfaceCard>
    );
  }

  return (
    <SurfaceCard
      className={cn(
        "flex flex-col",
        isFeatured &&
          "gap-2 border border-primary/10 bg-mint/50 px-4 py-3.5 shadow-none",
        !isFeatured &&
          "gap-2 border-foreground/6 bg-card/10 px-3.5 py-3 shadow-none",
        isMissed && "border-foreground/8 bg-foreground/[0.015]",
        onSelect && "cursor-pointer active:scale-[0.99]",
      )}
      role={onSelect ? "button" : undefined}
      tabIndex={onSelect ? 0 : undefined}
      onClick={onSelect}
    >
      {!isCompactRecipeCard && !isFeaturedRecipeCard ? (
        <div className="flex items-center justify-between gap-2">
          <MealMetaLabels
            entry={entry}
            isFeatured={isFeatured}
            isMissed={isMissed}
            useExpressStyle={isUpcomingMeta}
          />

          <div className="flex shrink-0 items-center gap-1.5">
            {entry.countdownLabel ? (
              <span
                className={cn(
                  "rounded-full font-semibold",
                  isFeatured
                    ? "bg-primary px-3 py-1 text-xs text-white"
                    : "bg-mint px-2 py-0.5 text-[11px] text-primary",
                )}
              >
                {entry.countdownLabel}
              </span>
            ) : null}
          </div>
        </div>
      ) : null}

      {entry.items && entry.items.length > 0 ? (
        <div className={cn("flex flex-col", isFeatured ? "gap-1.5" : "gap-2")}>
          {isFeatured ? (
            <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-3 gap-y-1.5">
              <span className="text-[11px] font-bold tracking-wider text-foreground/45 uppercase">
                {entry.slotLabel}
              </span>

              {entry.countdownLabel ? (
                <span className="justify-self-end rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">
                  {entry.countdownLabel}
                </span>
              ) : null}

              <ul className="col-start-1 row-start-2 flex flex-col gap-1">
                {entry.items.slice(0, 3).map((item) => (
                  <li key={item.id} className="flex items-center gap-2.5">
                    <Salad
                      className="size-4 shrink-0 text-primary"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                    <span className="block min-w-0 truncate text-sm leading-snug text-foreground/90">
                      {item.label}
                    </span>
                  </li>
                ))}
                {entry.items.length > 3 ? (
                  <li className="pl-[26px]">
                    <span className="text-xs font-medium text-foreground/45">
                      +{entry.items.length - 3} recetas más
                    </span>
                  </li>
                ) : null}
              </ul>

              <div className="col-start-2 row-start-2 self-start justify-self-end pt-0.5">
                <FeaturedHeroTime timeLabel={entry.timeLabel} />
              </div>
            </div>
          ) : (
            <div className="flex items-start gap-2.5">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary/80">
                <Salad className="size-3.5" aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="flex min-w-0 items-center gap-1.5 truncate text-[10px] font-semibold text-foreground/40">
                    <span className="tracking-wider uppercase">
                      {entry.slotLabel}
                    </span>
                    <span className="text-foreground/25">·</span>
                    <span className="font-semibold text-foreground/50">
                      {entry.timeLabel}
                    </span>
                  </p>
                  <span className="shrink-0 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                    {recipeCountLabel}
                  </span>
                </div>
                <ul className="mt-0.5 flex flex-col gap-1">
                  {entry.items.slice(0, 3).map((item) => (
                    <li key={item.id}>
                      <span
                        className={cn(
                          "block truncate text-xs leading-snug",
                          isMissed
                            ? "text-foreground/45"
                            : "font-medium text-foreground/85",
                        )}
                      >
                        {item.label}
                      </span>
                    </li>
                  ))}
                  {entry.items.length > 3 ? (
                    <li>
                      <span className="text-xs font-medium text-foreground/45">
                        +{entry.items.length - 3} recetas más
                      </span>
                    </li>
                  ) : null}
                </ul>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center gap-2.5">
          <Circle
            className={cn(
              "size-3.5 shrink-0",
              isMissed ? "text-foreground/25" : "text-primary/70",
            )}
            strokeWidth={2}
            aria-hidden="true"
          />
          <span
            className={cn(
              isFeatured
                ? "text-base font-semibold text-foreground"
                : isMissed
                  ? "text-sm text-foreground/45"
                  : "text-sm font-medium text-foreground/85",
            )}
          >
            {entry.title}
          </span>
        </div>
      )}
    </SurfaceCard>
  );
}
