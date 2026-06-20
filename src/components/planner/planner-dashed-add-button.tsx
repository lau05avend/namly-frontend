import type { LucideIcon } from "lucide-react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

type PlannerDashedAddButtonProps = {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  icon?: LucideIcon;
  className?: string;
};

export function PlannerDashedAddButton({
  label,
  onClick,
  disabled = false,
  icon: Icon = Plus,
  className,
}: PlannerDashedAddButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl border border-dashed border-foreground/15 bg-card/50 px-4 py-3 text-sm font-medium text-foreground/55 transition-colors hover:border-primary/25 hover:bg-mint/30 hover:text-primary disabled:cursor-not-allowed disabled:opacity-40",
        className,
      )}
    >
      <Icon className="size-4" aria-hidden />
      {label}
    </button>
  );
}
