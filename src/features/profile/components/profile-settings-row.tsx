"use client";

import { cn } from "@/lib/utils";
import { ChevronRight, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

type ProfileSettingsRowProps = {
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  valueLabel?: string;
  trailing?: ReactNode;
  onSelect?: () => void;
  disabled?: boolean;
  destructive?: boolean;
  isLast?: boolean;
};

export function ProfileSettingsRow({
  title,
  subtitle,
  icon: Icon,
  valueLabel,
  trailing,
  onSelect,
  disabled = false,
  destructive = false,
  isLast = false,
}: ProfileSettingsRowProps) {
  const isInteractive = Boolean(onSelect) && !disabled;

  return (
    <div
      className={cn(
        "flex flex-row items-center gap-3 px-3.5 py-2.5 transition-colors",
        !isLast && "border-b border-foreground/[0.05]",
        isInteractive &&
          "cursor-pointer hover:bg-mint/25 active:bg-mint/35",
        disabled && "opacity-60",
      )}
      role={isInteractive ? "button" : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      aria-disabled={disabled || undefined}
      onClick={isInteractive ? onSelect : undefined}
      onKeyDown={
        isInteractive
          ? (event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onSelect?.();
              }
            }
          : undefined
      }
    >
      {Icon ? (
        <span
          className={cn(
            "flex size-8 shrink-0 items-center justify-center rounded-xl bg-mint/60 text-primary",
            destructive && "bg-cta/10 text-cta",
          )}
        >
          <Icon className="size-4" aria-hidden />
        </span>
      ) : null}

      <div className="min-w-0 flex-1">
        <p
          className={cn(
            "text-sm font-semibold text-foreground",
            destructive && "text-cta",
          )}
        >
          {title}
        </p>
        {subtitle ? (
          <p className="text-xs leading-snug text-foreground/45">{subtitle}</p>
        ) : null}
      </div>

      <div className="flex shrink-0 items-center gap-2">
        {trailing ??
          (valueLabel ? (
            <span className="rounded-full bg-foreground/[0.06] px-2 py-0.5 text-[11px] font-medium text-foreground/40">
              {valueLabel}
            </span>
          ) : null)}
        <ChevronRight
          className="size-3.5 shrink-0 text-foreground/25"
          aria-hidden
        />
      </div>
    </div>
  );
}
