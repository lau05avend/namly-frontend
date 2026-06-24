"use client";

import { HomeSectionTitle } from "@/features/home/components/home-section-title";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState, type ReactNode } from "react";

type HomeSectionProps = {
  title: string;
  subtitle?: string;
  collapsible?: boolean;
  defaultExpanded?: boolean;
  children: ReactNode;
  className?: string;
};

export function HomeSection({
  title,
  subtitle,
  collapsible = false,
  defaultExpanded = true,
  children,
  className,
}: HomeSectionProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  const subtitleNode = subtitle ? (
    <p className="text-sm leading-snug text-foreground/52">{subtitle}</p>
  ) : null;

  const headerContent = (
    <div className="flex min-w-0 flex-1 flex-col gap-1">
      <HomeSectionTitle title={title} />
      {subtitleNode}
    </div>
  );

  return (
    <section className={cn("flex flex-col gap-3.5", className)}>
      {collapsible ? (
        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          aria-expanded={expanded}
          className="flex w-full cursor-pointer items-start justify-between gap-3 text-left"
        >
          {headerContent}
          {expanded ? (
            <ChevronUp
              className="mt-0.5 size-4 shrink-0 text-foreground/30"
              aria-hidden
            />
          ) : (
            <ChevronDown
              className="mt-0.5 size-4 shrink-0 text-foreground/30"
              aria-hidden
            />
          )}
        </button>
      ) : (
        headerContent
      )}

      {collapsible ? (
        <AnimatePresence initial={false}>
          {expanded ? (
            <motion.div
              key="home-section-content"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
              className="overflow-hidden"
            >
              {children}
            </motion.div>
          ) : null}
        </AnimatePresence>
      ) : (
        children
      )}
    </section>
  );
}
