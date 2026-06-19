import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { CircleCheck, Sparkles } from "lucide-react";

export type PlanCompactRowVariant = "suggested" | "linked";

type PlanCompactRowProps = {
  label: string;
  secondaryLine?: string;
  variant?: PlanCompactRowVariant;
  trailing?: ReactNode;
  onPress?: () => void;
  ariaLabel?: string;
  className?: string;
};

const VARIANT_CONFIG: Record<
  PlanCompactRowVariant,
  {
    Icon: LucideIcon;
    iconWrap: string;
    iconClass: string;
    labelClass: string;
    rowClass: string;
  }
> = {
  suggested: {
    Icon: Sparkles,
    iconWrap: "size-7 rounded-full bg-highlight/15",
    iconClass: "size-3.5 text-highlight",
    labelClass: "text-foreground/60",
    rowClass: "border-primary/12 bg-mint/15",
  },
  linked: {
    Icon: CircleCheck,
    iconWrap: "size-7 rounded-full bg-primary/12 text-primary",
    iconClass: "size-3.5",
    labelClass: "text-primary",
    rowClass: "border-primary/15 bg-mint/20",
  },
};

export function PlanCompactRow({
  label,
  secondaryLine,
  variant = "linked",
  trailing,
  onPress,
  ariaLabel,
  className,
}: PlanCompactRowProps) {
  const config = VARIANT_CONFIG[variant];
  const Icon = config.Icon;

  const content = (
    <>
      <span className="flex shrink-0 items-center gap-1.5">
        <span
          className={cn(
            "flex shrink-0 items-center justify-center",
            config.iconWrap,
          )}
        >
          <Icon className={config.iconClass} strokeWidth={2} aria-hidden />
        </span>
        <span
          className={cn(
            "text-[11px] font-semibold leading-none",
            config.labelClass,
          )}
        >
          {label}
        </span>
        {secondaryLine ? (
          <span
            className="min-w-3 text-[11px] leading-none text-foreground/40"
            aria-hidden
          >
            ·
          </span>
        ) : null}
      </span>

      {secondaryLine ? (
        <p className="min-w-0 flex-1 truncate text-[11px] leading-none text-foreground/75">
          {secondaryLine}
        </p>
      ) : (
        <span className="min-w-0 flex-1" />
      )}

      {trailing}
    </>
  );

  const rowClassName = cn(
    "flex w-full min-w-0 items-center gap-2 rounded-lg border px-2.5 py-2 text-left",
    config.rowClass,
    className,
  );

  if (onPress) {
    return (
      <button
        type="button"
        onClick={onPress}
        aria-label={ariaLabel}
        className={cn(
          rowClassName,
          "cursor-pointer transition-[border-color,opacity] hover:border-primary/20 hover:opacity-90 active:opacity-80",
        )}
      >
        {content}
      </button>
    );
  }

  return <div className={rowClassName}>{content}</div>;
}
