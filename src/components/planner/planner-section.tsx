import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type PlannerSectionProps = {
  label: string;
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
  return (
    <section className={cn("flex flex-col gap-3", className)}>
      <div className="flex items-center gap-1.5">
        <h2 className="text-[11px] font-semibold tracking-wider text-primary uppercase">
          {label}
        </h2>
        {headerAccessory}
      </div>
      {children}
    </section>
  );
}
