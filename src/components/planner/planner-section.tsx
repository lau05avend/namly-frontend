import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type PlannerSectionProps = {
  label: string;
  children: ReactNode;
  className?: string;
};

export function PlannerSection({
  label,
  children,
  className,
}: PlannerSectionProps) {
  return (
    <section className={cn("flex flex-col gap-3", className)}>
      <h2 className="text-[11px] font-semibold tracking-wider text-primary uppercase">
        {label}
      </h2>
      {children}
    </section>
  );
}
