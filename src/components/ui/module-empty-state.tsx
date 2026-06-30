import { MODULE_ICONS, type ModuleId } from "@/constants/module-icons";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import { createElement, type ReactNode } from "react";

type ModuleEmptyStateProps = {
  module: ModuleId;
  icon?: LucideIcon;
  title: string;
  description?: string;
  variant?: "screen" | "inline";
  className?: string;
  children?: ReactNode;
};

function renderModuleIcon(Icon: LucideIcon, className: string) {
  return createElement(Icon, {
    className,
    strokeWidth: 2,
    "aria-hidden": true,
  });
}

export function ModuleEmptyState({
  module,
  icon,
  title,
  description,
  variant = "screen",
  className,
  children,
}: ModuleEmptyStateProps) {
  const moduleIcon = icon ?? MODULE_ICONS[module];
  const isScreen = variant === "screen";

  if (!isScreen) {
    return (
      <div
        className={cn(
          "grid grid-cols-[auto_1fr] items-start gap-x-3 gap-y-2 py-2",
          className,
        )}
      >
        <span className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-mint/70 text-primary">
          {renderModuleIcon(moduleIcon, "size-4")}
        </span>

        <div className="flex min-w-0 flex-col gap-1 pt-0.5">
          <p className="text-sm leading-snug text-foreground/50">{title}</p>
          {description ? (
            <p className="text-sm leading-snug text-foreground/45">
              {description}
            </p>
          ) : null}
        </div>

        {children ? <div className="col-span-full">{children}</div> : null}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex flex-col items-center gap-3 px-4 py-10 text-center",
        className,
      )}
    >
      <span className="flex size-14 shrink-0 items-center justify-center rounded-3xl bg-mint/70 text-primary">
        {renderModuleIcon(moduleIcon, "size-6")}
      </span>

      <div className="flex flex-col items-center gap-1.5">
        <p className="text-sm font-medium leading-relaxed text-foreground/70">
          {title}
        </p>
        {description ? (
          <p className="max-w-xs text-sm leading-relaxed text-foreground/45">
            {description}
          </p>
        ) : null}
      </div>

      {children}
    </div>
  );
}
