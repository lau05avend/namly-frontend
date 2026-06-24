import {
  getStreakGrowthStage,
  type StreakGrowthStage,
} from "@/features/home/constants/streak-growth-stages";
import { cn } from "@/lib/utils";

type StreakGrowthBadgeProps = {
  stage?: StreakGrowthStage;
  className?: string;
};

export function StreakGrowthBadge({
  stage,
  className,
}: StreakGrowthBadgeProps) {
  const resolvedStage = stage ?? getStreakGrowthStage(1);
  const {
    Icon,
    accentIcon: AccentIcon,
    label,
    iconContainerClass,
    iconClass,
    labelClass,
  } = resolvedStage;

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <span
        className={cn(
          "relative flex size-11 shrink-0 items-center justify-center rounded-full",
          iconContainerClass,
        )}
      >
        <Icon
          className={cn("size-5", iconClass)}
          stroke="currentColor"
          strokeWidth={1.5}
          aria-hidden="true"
        />
        {AccentIcon ? (
          <span className="absolute -top-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full bg-card shadow-sm">
            <AccentIcon
              className="size-2.5 text-highlight"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth={1.5}
              aria-hidden="true"
            />
          </span>
        ) : null}
      </span>
      <p className={cn("text-center text-xs font-semibold leading-snug", labelClass)}>
        {label}
      </p>
    </div>
  );
}
