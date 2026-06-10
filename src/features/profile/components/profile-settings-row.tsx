"use client";

import { SurfaceCard } from "@/components/ui/surface-card";
import { cn } from "@/lib/utils";
import { ChevronRight, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

type ProfileSettingsRowProps = {
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  trailing?: ReactNode;
  onSelect?: () => void;
  disabled?: boolean;
  destructive?: boolean;
};

export function ProfileSettingsRow({
  title,
  subtitle,
  icon: Icon,
  trailing,
  onSelect,
  disabled = false,
  destructive = false,
}: ProfileSettingsRowProps) {
  const isInteractive = Boolean(onSelect) && !disabled;

  return (
    <SurfaceCard
      className={cn(
        "flex flex-row items-center gap-3 p-4 transition-colors",
        isInteractive &&
          "cursor-pointer hover:bg-mint/30 active:scale-[0.99]",
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
            "flex size-10 shrink-0 items-center justify-center rounded-2xl bg-mint/60",
            destructive && "bg-cta/10 text-cta",
          )}
        >
          <Icon className="size-5" aria-hidden />
        </span>
      ) : null}

      <div className="min-w-0 flex-1">
        <p
          className={cn(
            "font-semibold text-foreground",
            destructive && "text-cta",
          )}
        >
          {title}
        </p>
        {subtitle ? (
          <p className="text-sm text-foreground/50">{subtitle}</p>
        ) : null}
      </div>

      {trailing ?? (
        <ChevronRight
          className="size-4 shrink-0 text-foreground/30"
          aria-hidden
        />
      )}
    </SurfaceCard>
  );
}
