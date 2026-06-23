"use client";

import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type TabBarItem<T extends string> = {
  id: T;
  label: string;
  icon?: LucideIcon;
};

type TabBarProps<T extends string> = {
  items: TabBarItem<T>[];
  activeId: T;
  onChange: (id: T) => void;
  className?: string;
  align?: "start" | "center" | "stretch";
};

export function TabBar<T extends string>({
  items,
  activeId,
  onChange,
  className,
  align = "start",
}: TabBarProps<T>) {
  return (
    <div
      className={cn(
        "flex w-full border-b border-foreground/8",
        align === "center" && "justify-center gap-10",
        align === "start" && "gap-6",
        className,
      )}
      role="tablist"
    >
      {items.map((item) => {
        const isActive = item.id === activeId;
        const Icon = item.icon;

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onChange(item.id)}
            className={cn(
              "relative flex cursor-pointer items-center gap-1.5 pb-3 text-sm font-medium transition-colors",
              align === "stretch" && "flex-1 justify-center",
              isActive
                ? "font-semibold text-primary"
                : "text-foreground/45",
            )}
            aria-selected={isActive}
            role="tab"
          >
            {Icon ? (
              <Icon
                className={cn(
                  "size-4 shrink-0",
                  isActive ? "text-primary" : "text-foreground/40",
                )}
                strokeWidth={isActive ? 2.25 : 2}
                aria-hidden
              />
            ) : null}
            {item.label}
            {isActive ? (
              <span className="absolute inset-x-0 -bottom-px h-[3px] rounded-full bg-primary" />
            ) : null}
          </button>
        );
      })}
    </div>
  );
}
