import type { LucideIcon } from "lucide-react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

type RegisterTextActionProps = {
  children: React.ReactNode;
  onClick: () => void;
  icon?: LucideIcon;
  className?: string;
};

export function RegisterTextAction({
  children,
  onClick,
  icon: Icon = Plus,
  className,
}: RegisterTextActionProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex w-fit cursor-pointer items-center gap-1 text-[13px] font-medium text-primary/60 transition-colors hover:text-primary",
        className,
      )}
    >
      <Icon className="size-3.5" strokeWidth={2.25} aria-hidden />
      {children}
    </button>
  );
}
