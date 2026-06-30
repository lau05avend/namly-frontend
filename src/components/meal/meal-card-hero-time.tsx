import { cn } from "@/lib/utils";

function splitTimeLabel(timeLabel: string): { time: string; period?: string } {
  const match = timeLabel.match(/^(\d{1,2}:\d{2})\s+(.+)$/);
  if (!match) {
    return { time: timeLabel };
  }

  return {
    time: match[1],
    period: match[2].replace(/\s/g, "").toLowerCase(),
  };
}

type MealCardHeroTimeProps = {
  timeLabel: string;
  className?: string;
};

export function MealCardHeroTime({ timeLabel, className }: MealCardHeroTimeProps) {
  const { time, period } = splitTimeLabel(timeLabel);

  return (
    <p
      className={cn(
        "flex items-baseline justify-end gap-1 tabular-nums",
        className,
      )}
    >
      <span className="text-[15px] font-semibold leading-none text-foreground/50">
        {time}
      </span>
      {period ? (
        <span className="text-[10px] font-semibold tracking-wide text-foreground/50 uppercase">
          {period}
        </span>
      ) : null}
    </p>
  );
}
