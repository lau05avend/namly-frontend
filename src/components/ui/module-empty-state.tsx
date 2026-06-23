import type { ModuleId } from "@/constants/module-icons";
import { getModuleIcon } from "@/constants/module-icons";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

type ModuleEmptyStateProps = {
  module: ModuleId;
  icon?: LucideIcon;
  title: string;
  description?: string;
  variant?: "screen" | "inline";
  className?: string;
  children?: ReactNode;
};

export function ModuleEmptyState({
  module,
  icon,
  title,
  description,
  variant = "screen",
  className,
  children,
}: ModuleEmptyStateProps) {
  const Icon = icon ?? getModuleIcon(module);
  const isScreen = variant === "screen";

  return (
    <div
      className={cn(
        "flex flex-col",
        isScreen
          ? "items-center gap-3 px-4 py-10 text-center"
          : "items-start gap-2.5 py-2",
        className,
      )}
    >
      <span
        className={cn(
          "flex shrink-0 items-center justify-center bg-mint/70 text-primary",
          isScreen ? "size-14 rounded-3xl" : "size-10 rounded-2xl",
        )}
      >
        <Icon
          className={isScreen ? "size-6" : "size-4"}
          strokeWidth={2}
          aria-hidden
        />
      </span>

      <div
        className={cn(
          "flex flex-col gap-1.5",
          isScreen ? "items-center" : "items-start",
        )}
      >
        <p
          className={cn(
            "leading-relaxed text-foreground/70",
            isScreen ? "text-sm font-medium" : "text-sm text-foreground/50",
          )}
        >
          {title}
        </p>
        {description ? (
          <p
            className={cn(
              "leading-relaxed text-foreground/45",
              isScreen ? "max-w-xs text-sm" : "text-sm",
            )}
          >
            {description}
          </p>
        ) : null}
      </div>

      {children}
    </div>
  );
}
