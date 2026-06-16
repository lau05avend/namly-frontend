"use client";

import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp, type LucideIcon } from "lucide-react";
import { useState, type ReactNode } from "react";

type PlannerDaySectionTone = "primary" | "default" | "muted";

type PlannerDaySectionProps = {
  title: string;
  subtitle?: string;
  subtitleInline?: boolean;
  subtitleTrailingIcon?: LucideIcon;
  icon?: LucideIcon;
  tone?: PlannerDaySectionTone;
  surface?: boolean;
  collapsible?: boolean;
  defaultExpanded?: boolean;
  children: ReactNode;
};

const titleToneClass: Record<PlannerDaySectionTone, string> = {
  primary: "text-foreground/65",
  default: "text-foreground/43",
  muted: "text-foreground/40",
};

const iconToneClass: Record<PlannerDaySectionTone, string> = {
  primary: "bg-primary/10 text-primary",
  default: "bg-foreground/5 text-foreground/40",
  muted: "bg-foreground/5 text-foreground/34",
};

const surfaceClass: Record<PlannerDaySectionTone, string> = {
  primary: "",
  default: "rounded-2xl border border-foreground/6 bg-card/40 px-3.5 py-4",
  muted: "rounded-2xl border border-foreground/7 bg-foreground/[0.02] px-3.5 py-4",
};

export function PlannerDaySection({
  title,
  subtitle,
  subtitleInline = false,
  subtitleTrailingIcon: SubtitleTrailingIcon,
  icon: Icon,
  tone = "default",
  surface = true,
  collapsible = false,
  defaultExpanded = true,
  children,
}: PlannerDaySectionProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  const handleToggle = () => {
    if (!collapsible) {
      return;
    }

    setExpanded((value) => !value);
  };

  const HeaderTag = collapsible ? "button" : "div";

  return (
    <section
      className={cn("flex flex-col", surface && surfaceClass[tone])}
    >
      <header className="flex flex-col gap-1">
        <HeaderTag
          type={collapsible ? "button" : undefined}
          onClick={collapsible ? handleToggle : undefined}
          aria-expanded={collapsible ? expanded : undefined}
          className={cn(
            "flex w-full flex-col gap-1 text-left",
            collapsible && "cursor-pointer",
          )}
        >
          <div className="flex items-center gap-2.5">
            {Icon ? (
              <span
                className={cn(
                  "flex size-7 shrink-0 items-center justify-center rounded-full",
                  iconToneClass[tone],
                )}
              >
                <Icon className="size-3.5" aria-hidden="true" />
              </span>
            ) : null}

            <div className="flex min-w-0 flex-1 items-center gap-3">
              <h2
                className={cn(
                  "shrink-0 text-[12px] font-semibold tracking-wider uppercase",
                  titleToneClass[tone],
                )}
              >
                {title}
              </h2>
              {/* {subtitle && subtitleInline ? (
                <span className="flex min-w-0 items-center gap-1.5 text-sm leading-snug text-foreground/45">
                  <span className="truncate">{subtitle}</span>
                  {SubtitleTrailingIcon ? (
                    <SubtitleTrailingIcon
                      className="size-3.5 shrink-0 text-primary"
                      aria-hidden="true"
                    />
                  ) : null}
                </span>
              ) : null} */}
              <div
                className="h-px flex-1 bg-foreground/10"
                aria-hidden="true"
              />
            </div>

            {collapsible ? (
              expanded ? (
                <ChevronUp
                  className="size-4 shrink-0 text-foreground/25"
                  aria-hidden="true"
                />
              ) : (
                <ChevronDown
                  className="size-4 shrink-0 text-foreground/25"
                  aria-hidden="true"
                />
              )
            ) : null}
          </div>

          {subtitle && !subtitleInline ? (
            <p
              className={cn(
                "flex items-center gap-1.5 text-sm leading-snug text-foreground/45",
                Icon && "pl-9",
              )}
            >
              <span>{subtitle}</span>
              {SubtitleTrailingIcon ? (
                <SubtitleTrailingIcon
                  className="size-3.5 shrink-0 text-primary"
                  aria-hidden="true"
                />
              ) : null}
            </p>
          ) : null}
        </HeaderTag>
      </header>

      <AnimatePresence initial={false}>
        {expanded ? (
          <motion.div
            key="section-content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <div
              className={cn(
                "flex flex-col gap-2.5",
                subtitle && !subtitleInline ? "pt-2.5" : "pt-3",
              )}
            >
              {children}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
