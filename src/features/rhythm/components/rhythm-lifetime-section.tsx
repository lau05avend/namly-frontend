import { SectionHeader } from "@/components/ui/section-header";
import { RHYTHM_COPY } from "@/features/rhythm/constants/rhythm-copy";
import { RHYTHM_SURFACES } from "@/features/rhythm/constants/rhythm-surfaces";
import type { RhythmLifetime } from "@/features/rhythm/types/rhythm.types";
import { cn } from "@/lib/utils";
import { Flame, Heart, Leaf, Sparkles } from "lucide-react";

type RhythmLifetimeSectionProps = {
  lifetime: RhythmLifetime;
};

const LIFETIME_ITEMS = [
  {
    key: "streak" as const,
    icon: Flame,
    iconSurface: RHYTHM_SURFACES.lifetimeIconStreak,
    heartClassName: "text-cta fill-cta/25",
  },
  {
    key: "bestWeek" as const,
    icon: Sparkles,
    iconSurface: RHYTHM_SURFACES.lifetimeIconBestWeek,
    heartClassName: "text-highlight fill-highlight/35",
  },
  {
    key: "totalMeals" as const,
    icon: Leaf,
    iconSurface: RHYTHM_SURFACES.lifetimeIconMeals,
    heartClassName: "text-primary fill-primary/20",
  },
] as const;

export function RhythmLifetimeSection({ lifetime }: RhythmLifetimeSectionProps) {
  const labels = {
    streak: lifetime.longestStreakLabel,
    bestWeek: lifetime.bestWeekCompletionLabel,
    totalMeals: lifetime.totalMealsLoggedLabel,
  };

  return (
    <section className={cn("flex flex-col gap-3", RHYTHM_SURFACES.sectionCard)}>
      <SectionHeader
        title={RHYTHM_COPY.sections.journey}
        className="text-primary/60"
      />

      <ul className="flex flex-col">
        {LIFETIME_ITEMS.map(
          ({ key, icon: Icon, iconSurface, heartClassName }) => (
            <li
              key={key}
              className="flex items-center gap-3 border-b border-foreground/[0.05] py-3.5 first:pt-0 last:border-b-0"
            >
              <span
                className={cn(
                  "flex size-9 shrink-0 items-center justify-center rounded-full",
                  iconSurface,
                )}
              >
                <Icon className="size-4" strokeWidth={2} aria-hidden />
              </span>

              <span className="min-w-0 flex-1 text-sm leading-relaxed text-foreground/72">
                {labels[key]}
              </span>

              <Heart
                className={cn("size-4 shrink-0", heartClassName)}
                strokeWidth={2}
                aria-hidden
              />
            </li>
          ),
        )}
      </ul>
    </section>
  );
}
