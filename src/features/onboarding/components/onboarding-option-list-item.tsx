"use client";

import { DynamicLucideIcon } from "@/features/onboarding/components/dynamic-lucide-icon";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

type OnboardingOptionListItemProps = {
  label: string;
  iconName: string;
  selected: boolean;
  onSelect: () => void;
  density?: "default" | "compact" | "embedded";
  multiSelect?: boolean;
};

const optionLabelClass =
  "min-w-0 flex-1 hyphens-auto break-words leading-snug";

export function OnboardingOptionListItem({
  label,
  iconName,
  selected,
  onSelect,
  density = "default",
  multiSelect = false,
}: OnboardingOptionListItemProps) {
  const isCompact = density === "compact";
  const isEmbedded = density === "embedded";

  if (isEmbedded) {
    return (
      <button
        type="button"
        onClick={onSelect}
        aria-pressed={selected}
        className={cn(
          "flex w-full min-w-0 cursor-pointer items-center gap-2.5 rounded-lg px-2 py-2 text-left text-xs transition-colors",
          selected
            ? "bg-mint/55 font-medium text-primary"
            : "text-foreground/68 hover:bg-foreground/[0.03]",
        )}
      >
        <DynamicLucideIcon
          name={iconName}
          className={cn(
            "size-3.5 shrink-0",
            selected ? "text-primary" : "text-foreground/40",
          )}
        />
        <span className={optionLabelClass}>{label}</span>
        <span
          className={cn(
            "size-3.5 shrink-0 border",
            multiSelect ? "rounded-[4px]" : "rounded-full",
            selected
              ? "border-primary bg-primary"
              : "border-foreground/18 bg-transparent",
          )}
          aria-hidden
        />
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={cn(
        "flex w-full min-w-0 cursor-pointer items-center text-left font-medium transition-colors",
        isCompact
          ? "gap-2.5 rounded-xl border px-2.5 py-2 text-xs"
          : "gap-3 rounded-3xl border px-4 py-3.5 text-sm",
        selected
          ? isCompact
            ? "border-primary/35 bg-mint/45 text-primary"
            : "border-primary bg-mint text-primary"
          : isCompact
            ? "border-foreground/8 bg-card/50 text-foreground/75 hover:border-primary/20 hover:bg-mint/20"
            : "border-foreground/10 bg-card text-foreground/80 hover:border-primary/30 hover:bg-mint/30",
      )}
    >
      <span
        className={cn(
          "flex shrink-0 items-center justify-center",
          isCompact ? "size-7 rounded-lg" : "size-9 rounded-2xl",
          selected
            ? "bg-primary/12 text-primary"
            : isCompact
              ? "bg-mint/50 text-foreground/45"
              : "bg-mint/60 text-foreground/50",
        )}
      >
        <DynamicLucideIcon
          name={iconName}
          className={isCompact ? "size-3.5" : "size-4"}
        />
      </span>
      <span className={optionLabelClass}>{label}</span>
      {!isCompact ? (
        <ChevronRight
          className={cn(
            "size-4 shrink-0",
            selected ? "text-primary" : "text-foreground/25",
          )}
          aria-hidden
        />
      ) : null}
    </button>
  );
}
