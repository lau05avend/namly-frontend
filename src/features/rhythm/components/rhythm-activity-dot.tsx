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
        "flex size-8 items-center justify-center rounded-full",
        isToday && "ring-2 ring-primary/30 ring-offset-2 ring-offset-background",
        className,
      )}
    >
      <span
        className={cn(
          "block size-[1.125rem] rounded-full",
          intensity === 0 && "border-[1.5px] border-foreground/14 bg-transparent",
          intensity === 1 && "bg-primary/35",
          intensity === 2 && "bg-primary/65",
          intensity === 3 && "bg-primary",
        )}
        aria-hidden
      />
    </div>
  );
}
