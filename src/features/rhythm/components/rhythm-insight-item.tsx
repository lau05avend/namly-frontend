import { RHYTHM_INSIGHT_ICON_COLORS } from "@/features/rhythm/constants/rhythm-theme";
import type { RhythmInsightIcon } from "@/features/rhythm/types/rhythm.types";
import { cn } from "@/lib/utils";
import {
  ChefHat,
  Clock3,
  Compass,
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

type RhythmInsightItemProps = {
  icon: RhythmInsightIcon;
  message: string;
  className?: string;
};

export function RhythmInsightItem({
  icon,
  message,
  className,
}: RhythmInsightItemProps) {
  const Icon = INSIGHT_ICONS[icon];

  return (
    <div
      className={cn(
        "flex items-start gap-3.5 border-b border-foreground/6 py-3.5 last:border-b-0",
        className,
      )}
    >
      <Icon
        className={cn(
          "mt-0.5 size-5 shrink-0",
          RHYTHM_INSIGHT_ICON_COLORS[icon],
        )}
        strokeWidth={2}
        aria-hidden
      />
      <p className="text-sm leading-relaxed text-foreground/75">{message}</p>
    </div>
  );
}
