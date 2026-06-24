import { RHYTHM_SURFACES } from "@/features/rhythm/constants/rhythm-surfaces";
import type {
  RhythmInsightIcon,
  RhythmInsightTone,
} from "@/features/rhythm/types/rhythm.types";
import { cn } from "@/lib/utils";
import {
  ChefHat,
  Clock3,
  Compass,
  Smile,
  Sparkles,
  Sun,
  type LucideIcon,
} from "lucide-react";

const INSIGHT_ICONS: Record<RhythmInsightIcon, LucideIcon> = {
  meal: Sun,
  clock: Clock3,
  variety: Sparkles,
  recipe: ChefHat,
  explore: Compass,
};

const INSIGHT_ICON_SURFACES: Record<RhythmInsightTone, string> = {
  warm: RHYTHM_SURFACES.insightIconWarm,
  calm: RHYTHM_SURFACES.insightIconCalm,
  positive: RHYTHM_SURFACES.insightIconPositive,
  neutral: RHYTHM_SURFACES.insightIconNeutral,
};

type RhythmInsightItemProps = {
  icon: RhythmInsightIcon;
  tone?: RhythmInsightTone;
  message: string;
  className?: string;
};

export function RhythmInsightItem({
  icon,
  tone = "neutral",
  message,
  className,
}: RhythmInsightItemProps) {
  const Icon = INSIGHT_ICONS[icon];

  return (
    <div
      className={cn(
        "flex items-center gap-3 border-b border-foreground/[0.05] py-3 first:pt-0 last:border-b-0",
        className,
      )}
    >
      <span
        className={cn(
          "flex size-9 shrink-0 items-center justify-center rounded-full",
          INSIGHT_ICON_SURFACES[tone],
        )}
      >
        <Icon className="size-4" strokeWidth={2} aria-hidden />
      </span>

      <p className="min-w-0 flex-1 text-sm leading-relaxed text-foreground/75">
        {message}
      </p>

      <span
        className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary"
        aria-hidden
      >
        <Smile className="size-3.5" strokeWidth={2.25} />
      </span>
    </div>
  );
}
