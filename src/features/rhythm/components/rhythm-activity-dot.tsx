import type { RhythmActivityIntensity } from "@/features/rhythm/types/rhythm.types";
import { cn } from "@/lib/utils";

type RhythmActivityDotProps = {
  intensity: RhythmActivityIntensity;
  isToday?: boolean;
  className?: string;
};

export function RhythmActivityDot({
  intensity,
  isToday = false,
  className,
}: RhythmActivityDotProps) {
  return (
    <div
      className={cn(
        "flex size-9 items-center justify-center rounded-full",
        isToday && "ring-2 ring-foreground/15 ring-offset-2 ring-offset-background",
        className,
      )}
    >
      <span
        className={cn(
          "relative block size-5 overflow-hidden rounded-full border-2",
          intensity === 0 && "border-foreground/12 bg-transparent",
          intensity === 0.5 && "border-highlight bg-highlight/25",
          intensity === 1 && "border-primary bg-primary",
        )}
        aria-hidden
      >
        {intensity === 0.5 ? (
          <span className="absolute inset-y-0 left-0 w-1/2 bg-highlight" />
        ) : null}
      </span>
    </div>
  );
}
