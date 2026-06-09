import { SurfaceCard } from "@/components/ui/surface-card";
import { cn } from "@/lib/utils";
import { Cherry } from "lucide-react";

type StreakCardProps = {
  days: number;
  contextLabel: string;
  personalBestLabel: string;
  progressLabel: string;
  progressPercent: number;
  className?: string;
};

export function StreakCard({
  days,
  contextLabel,
  personalBestLabel,
  progressLabel,
  progressPercent,
  className,
}: StreakCardProps) {
  const clampedProgress = Math.min(100, Math.max(0, progressPercent));

  return (
    <SurfaceCard
      className={cn(
        "flex h-full min-h-[220px] flex-col items-center justify-between gap-4 p-4 text-center",
        className,
      )}
    >
      <section className="flex flex-col items-center gap-2 pt-1">
        <Cherry className="size-6 text-cta" aria-hidden="true" />
        <p className="text-4xl font-bold leading-none text-foreground">{days}</p>
        <p className="text-sm text-foreground/60">{contextLabel}</p>
        <p className="text-xs text-foreground/45">{personalBestLabel}</p>
      </section>

      <section className="flex w-full flex-col gap-2">
        <p className="text-[11px] text-foreground/50">{progressLabel}</p>
        <div
          role="progressbar"
          aria-valuenow={clampedProgress}
          aria-valuemin={0}
          aria-valuemax={100}
          className="h-2 overflow-hidden rounded-full bg-mint"
        >
          <span
            className="block h-full rounded-full bg-primary transition-all"
            style={{ width: `${clampedProgress}%` }}
          />
        </div>
      </section>
    </SurfaceCard>
  );
}
