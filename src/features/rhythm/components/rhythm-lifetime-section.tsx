import { SectionHeader } from "@/components/ui/section-header";
import { RHYTHM_COPY } from "@/features/rhythm/constants/rhythm-copy";
import { RHYTHM_LIFETIME_ICON_COLORS } from "@/features/rhythm/constants/rhythm-theme";
import type { RhythmLifetime } from "@/features/rhythm/types/rhythm.types";
import { cn } from "@/lib/utils";
import { Flame, Sparkles, UtensilsCrossed } from "lucide-react";

type RhythmLifetimeSectionProps = {
  lifetime: RhythmLifetime;
};

const LIFETIME_ITEMS = [
  { key: "streak" as const, icon: Flame },
  { key: "bestWeek" as const, icon: Sparkles },
  { key: "totalMeals" as const, icon: UtensilsCrossed },
] as const;

export function RhythmLifetimeSection({ lifetime }: RhythmLifetimeSectionProps) {
  const labels = {
    streak: lifetime.longestStreakLabel,
    bestWeek: lifetime.bestWeekCompletionLabel,
    totalMeals: lifetime.totalMealsLoggedLabel,
  };

  return (
    <section className="flex flex-col gap-3.5 border-t border-foreground/6 pt-7">
      <SectionHeader title={RHYTHM_COPY.sections.journey} />

      <ul className="flex flex-col gap-3">
        {LIFETIME_ITEMS.map(({ key, icon: Icon }) => (
          <li
            key={key}
            className="flex items-center gap-3 text-sm leading-relaxed text-foreground/70"
          >
            <Icon
              className={cn("size-4 shrink-0", RHYTHM_LIFETIME_ICON_COLORS[key])}
              strokeWidth={2}
              aria-hidden
            />
            <span>{labels[key]}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
