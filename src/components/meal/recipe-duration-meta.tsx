import {
  formatRecipeDuration,
  formatRecipeDurationAriaLabel,
  RECIPE_NO_DURATION_LABEL,
} from "@/features/recipes/utils/format-recipe-duration";
import { cn } from "@/lib/utils";
import { Clock } from "lucide-react";

type RecipeDurationMetaProps = {
  durationMinutes?: number | null;
  className?: string;
};

export function RecipeDurationMeta({
  durationMinutes,
  className,
}: RecipeDurationMetaProps) {
  const label = formatRecipeDuration(durationMinutes);
  const ariaLabel = formatRecipeDurationAriaLabel(durationMinutes);

  if (!label || !ariaLabel) {
    return (
      <span
        className={cn("text-[12px] text-foreground/35", className)}
        aria-label={RECIPE_NO_DURATION_LABEL}
      >
        {RECIPE_NO_DURATION_LABEL}
      </span>
    );
  }

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 text-[12px] text-foreground/45",
        className,
      )}
      aria-label={ariaLabel}
    >
      <Clock className="size-3 shrink-0" aria-hidden />
      <span className="tabular-nums">{label}</span>
    </span>
  );
}
