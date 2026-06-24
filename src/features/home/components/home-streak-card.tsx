import { HOME_COPY } from "@/features/home/constants/home-copy";
import { HOME_HERO_SURFACES } from "@/features/home/constants/home-hero-surfaces";
import { StreakGrowthBadge } from "@/features/home/components/streak-growth-badge";
import { cn } from "@/lib/utils";

type HomeStreakCardProps = {
  days: number;
  progressLabel: string;
  progressPercent: number;
  className?: string;
};

export function HomeStreakCard({
  days,
  progressLabel,
  progressPercent,
  className,
}: HomeStreakCardProps) {
  const clampedProgress = Math.min(100, Math.max(0, progressPercent));

  return (
    <div
      className={cn(
        "flex h-full flex-col justify-between px-4 py-3.5",
        HOME_HERO_SURFACES.streak,
        className,
      )}
    >
      <div className="flex flex-col items-center gap-2.5 text-center">
        <StreakGrowthBadge className="items-center" />
        <p className="text-lg font-bold leading-tight text-foreground">
          {HOME_COPY.streak.days(days)}
        </p>
      </div>

      <div className="flex flex-col gap-1.5 pt-1 pb-1 px-1.5">
        <div
          role="progressbar"
          aria-valuenow={clampedProgress}
          aria-valuemin={0}
          aria-valuemax={100}
          className="h-2 overflow-hidden rounded-full bg-cta/12"
        >
          <span
            className="block h-full rounded-full bg-cta/70 transition-all"
            style={{ width: `${clampedProgress}%` }}
          />
        </div>
        <p className="text-center text-[10px] font-medium text-foreground/55">
          {progressLabel}
        </p>
      </div>
    </div>
  );
}
