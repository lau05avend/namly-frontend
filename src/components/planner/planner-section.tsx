import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type PlannerSectionProps = {
  label?: string;
  children: ReactNode;
  className?: string;
  headerAccessory?: ReactNode;
};

export function PlannerSection({
  label,
  children,
  className,
  headerAccessory,
}: PlannerSectionProps) {
  const showHeader = Boolean(label || headerAccessory);

  return (
    <section className={cn("flex flex-col gap-3", className)}>
      {showHeader ? (
        <div className="flex items-center gap-1.5">
          {label ? (
            <h2 className="text-[11px] font-semibold tracking-wider text-primary uppercase">
              {label}
            </h2>
          ) : null}
          {headerAccessory}
        </div>
      ) : null}
      {children}
    </section>
  );
}
