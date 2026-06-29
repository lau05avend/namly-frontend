import type { LucideIcon } from "lucide-react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

type PlannerDashedAddButtonProps = {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  icon?: LucideIcon;
  variant?: "default" | "compact";
  className?: string;
};

export function PlannerDashedAddButton({
  label,
  onClick,
  disabled = false,
  icon: Icon = Plus,
  variant = "default",
  className,
}: PlannerDashedAddButtonProps) {
  if (variant === "compact") {
    return (
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        className={cn(
          "inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border border-dashed border-primary/20 bg-mint/10 px-3.5 py-2 text-sm font-medium text-primary/95 transition-colors hover:border-primary/30 hover:bg-mint/20 hover:text-primary disabled:cursor-not-allowed disabled:opacity-40",
          className,
        )}
      >
        <span className="flex size-5 shrink-0 items-center justify-center rounded-full text-primary">
          <Icon className="size-3" strokeWidth={2.5} aria-hidden />
        </span>
        {label}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl border border-dashed border-primary/20 bg-mint/10 px-4 py-2.5 text-sm font-medium text-primary/95 transition-colors hover:border-primary/30 hover:bg-mint/20 hover:text-primary disabled:cursor-not-allowed disabled:opacity-40",
        className,
      )}
    >
      <Icon className="size-4 shrink-0" strokeWidth={2.25} aria-hidden />
      {label}
    </button>
  );
}
