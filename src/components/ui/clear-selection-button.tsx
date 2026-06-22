import { cn } from "@/lib/utils";
import { X } from "lucide-react";

type ClearSelectionButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "xs";
};

export function ClearSelectionButton({
  onClick,
  children,
  className,
  size = "sm",
}: ClearSelectionButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex shrink-0 cursor-pointer items-center font-medium text-foreground/45 transition-colors hover:text-primary",
        size === "sm" && "gap-1 text-xs",
        size === "xs" && "gap-0.5 px-1 py-1 text-[11px]",
        className,
      )}
    >
      <X
        className={cn(size === "sm" ? "size-3" : "size-2.5")}
        aria-hidden
      />
      {children}
    </button>
  );
}
