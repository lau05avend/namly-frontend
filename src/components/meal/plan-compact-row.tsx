import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Circle, CircleCheck } from "lucide-react";

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
    Icon: CircleCheck,
    iconWrap: "size-7 rounded-full bg-foreground/6",
    iconClass: "size-3.5 text-foreground/30",
    labelClass: "text-foreground/50",
    rowClass: "border-foreground/8 bg-card",
  },
  linked: {
    Icon: CircleCheck,
    iconWrap: "size-7 rounded-full bg-primary/12 text-primary",
    iconClass: "size-3.5",
    labelClass: "text-primary",
    rowClass: "border-primary/15 bg-mint/20",
  },
};

function PlanCompactRowContent({
  label,
  secondaryLine,
  config,
}: {
  label: string;
  secondaryLine?: string;
  config: (typeof VARIANT_CONFIG)[PlanCompactRowVariant];
}) {
  const Icon = config.Icon;

  return (
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
    </>
  );
}

export const PLAN_COMPACT_ROW_VARIANTS = VARIANT_CONFIG;

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

  const rowClassName = cn(
    "flex w-full min-w-0 items-center gap-2 rounded-lg border px-2.5 py-2 text-left transition-colors duration-300",
    config.rowClass,
    className,
  );

  if (onPress) {
    if (trailing) {
      return (
        <div className={cn(rowClassName, "gap-1")}>
          <button
            type="button"
            onClick={onPress}
            aria-label={ariaLabel}
            className="flex min-w-0 flex-1 cursor-pointer items-center gap-2 text-left transition-opacity hover:opacity-90 active:opacity-80"
          >
            <PlanCompactRowContent
              label={label}
              secondaryLine={secondaryLine}
              config={config}
            />
          </button>
          {trailing}
        </div>
      );
    }

    return (
      <button
        type="button"
        onClick={onPress}
        aria-label={ariaLabel}
        className={cn(
          rowClassName,
          "cursor-pointer transition-opacity hover:opacity-90 active:opacity-80",
        )}
      >
        <PlanCompactRowContent
          label={label}
          secondaryLine={secondaryLine}
          config={config}
        />
        {trailing}
      </button>
    );
  }

  return (
    <div className={rowClassName}>
      <PlanCompactRowContent
        label={label}
        secondaryLine={secondaryLine}
        config={config}
      />
      {trailing}
    </div>
  );
}
