import { HISTORY_COPY } from "@/features/history/constants/history-copy";
import { resolveMoodFromScore } from "@/features/history/utils/history-meal-log-mood.utils";
import { cn } from "@/lib/utils";

type HistoryMealLogMoodBadgeProps = {
  score: number | null;
  className?: string;
};

export function HistoryMealLogMoodBadge({
  score,
  className,
}: HistoryMealLogMoodBadgeProps) {
  const mood = resolveMoodFromScore(score);

  if (!mood) {
    return null;
  }

  return (
    <span className={cn("group absolute top-3 right-3", className)}>
      <span
        className="pointer-events-none absolute top-full right-0 z-10 mt-2 whitespace-nowrap rounded-lg border border-foreground/8 bg-background/95 px-2.5 py-1.5 text-xs font-medium text-foreground/70 opacity-0 shadow-sm backdrop-blur-sm transition-opacity duration-150 group-hover:opacity-100"
        role="tooltip"
      >
        {HISTORY_COPY.moodHint}
      </span>

      <span
        className="flex size-11 items-center justify-center rounded-full border border-foreground/8 bg-background/90 text-2xl shadow-sm backdrop-blur-sm"
        role="img"
        aria-label={`${HISTORY_COPY.moodHint}: ${mood.label}`}
      >
        {mood.emoji}
      </span>
    </span>
  );
}
