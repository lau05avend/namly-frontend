"use client";

import { cn } from "@/lib/utils";

export type TabBarItem<T extends string> = {
  id: T;
  label: string;
};

type TabBarProps<T extends string> = {
  items: TabBarItem<T>[];
  activeId: T;
  onChange: (id: T) => void;
  className?: string;
};

export function TabBar<T extends string>({
  items,
  activeId,
  onChange,
  className,
}: TabBarProps<T>) {
  return (
    <div className={cn("flex gap-6 border-b border-foreground/8", className)}>
      {items.map((item) => {
        const isActive = item.id === activeId;

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onChange(item.id)}
            className={cn(
              "relative pb-3 text-sm font-medium transition-colors",
              isActive
                ? "font-semibold text-primary"
                : "text-foreground/45",
            )}
            aria-selected={isActive}
            role="tab"
          >
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
