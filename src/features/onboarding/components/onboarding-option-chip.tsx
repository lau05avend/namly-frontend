"use client";

import { DynamicLucideIcon } from "@/features/onboarding/components/dynamic-lucide-icon";
import { cn } from "@/lib/utils";

type OnboardingOptionChipProps = {
  label: string;
  iconName: string;
  selected: boolean;
  onSelect: () => void;
  density?: "default" | "compact" | "embedded";
};

export function OnboardingOptionChip({
  label,
  iconName,
  selected,
  onSelect,
  density = "default",
}: OnboardingOptionChipProps) {
  const isCompact = density === "compact";
  const isEmbedded = density === "embedded";

  if (isEmbedded) {
    return (
      <button
        type="button"
        onClick={onSelect}
        aria-pressed={selected}
        className={cn(
          "flex cursor-pointer items-center gap-1.5 rounded-full px-2.5 py-1.5 text-left text-[11px] font-medium transition-colors",
          selected
            ? "bg-primary/12 text-primary"
            : "bg-foreground/[0.04] text-foreground/60 hover:bg-foreground/[0.06]",
        )}
      >
        <DynamicLucideIcon
          name={iconName}
          className={cn(
            "size-3 shrink-0",
            selected ? "text-primary" : "text-foreground/40",
          )}
        />
        <span className="min-w-0 leading-snug">{label}</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={cn(
        "flex cursor-pointer items-center text-left font-medium transition-colors",
        isCompact
          ? "gap-2 rounded-xl border px-2.5 py-2 text-xs"
          : "gap-2.5 rounded-full border px-4 py-3 text-sm",
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
          "flex shrink-0 items-center justify-center rounded-full",
          isCompact ? "size-6" : "size-8",
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
      <span className="min-w-0 flex-1 leading-snug">{label}</span>
    </button>
  );
}
