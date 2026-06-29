import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type PlannerSectionProps = {
  label?: string;
  description?: string;
  children: ReactNode;
  className?: string;
  headerAccessory?: ReactNode;
  headerTrailing?: ReactNode;
};

export function PlannerSection({
  label,
  description,
  children,
  className,
  headerAccessory,
  headerTrailing,
}: PlannerSectionProps) {
  const showHeader = Boolean(label || headerAccessory || headerTrailing);

  return (
    <section className={cn("flex flex-col gap-3", className)}>
      {showHeader ? (
        <div
          className={cn(
            "flex items-center gap-3",
            headerTrailing ? "justify-between" : "gap-1.5",
          )}
        >
          <div className="flex min-w-0 items-center gap-1.5">
            {label ? (
              <h2 className="text-[11px] font-semibold tracking-wider text-primary uppercase">
                {label}
              </h2>
            ) : null}
            {headerAccessory}
          </div>
          {headerTrailing}
        </div>
      ) : null}
      {description ? (
        <p className="-mt-1 text-sm leading-snug text-foreground/50">{description}</p>
      ) : null}
      {children}
    </section>
  );
}
