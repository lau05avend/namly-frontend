"use client";

import type { ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { SurfaceCard } from "@/components/ui/surface-card";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

type CollapsiblePlannerCardProps = {
  title: string;
  hint?: string;
  expanded: boolean;
  onToggle: () => void;
  trailing?: ReactNode;
  children: ReactNode;
  className?: string;
};

export function CollapsiblePlannerCard({
  title,
  hint,
  expanded,
  onToggle,
  trailing,
  children,
  className,
}: CollapsiblePlannerCardProps) {
  return (
    <SurfaceCard className={cn("overflow-hidden p-0", className)}>
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center gap-3 px-4 py-3.5 text-left"
        aria-expanded={expanded}
      >
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-foreground">{title}</p>
          {!expanded && hint ? (
            <p className="text-xs text-foreground/45">{hint}</p>
          ) : null}
        </div>
        {trailing}
        <ChevronDown
          className={cn(
            "size-4 shrink-0 text-foreground/40 transition-transform",
            expanded && "rotate-180",
          )}
          aria-hidden
        />
      </button>

      <AnimatePresence initial={false}>
        {expanded ? (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <div className="flex flex-col gap-3 border-t border-foreground/5 px-4 pt-3 pb-4">
              {children}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </SurfaceCard>
  );
}
