"use client";

import { useEffect, useRef, useState } from "react";
import { REGISTER_MEAL_COPY } from "@/features/meal-register/constants/register-meal-copy";
import { cn } from "@/lib/utils";
import { Info, Link2, ListChecks, Undo2 } from "lucide-react";

const INFO_ITEMS = [
  {
    icon: Link2,
    text: REGISTER_MEAL_COPY.plan.info.linkBullet,
  },
  {
    icon: ListChecks,
    text: REGISTER_MEAL_COPY.plan.info.autofillBullet,
  },
  {
    icon: Undo2,
    text: REGISTER_MEAL_COPY.plan.info.unlinkBullet,
  },
] as const;

export function RegisterPlanInfoHint() {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target;

      if (!(target instanceof Node) || !rootRef.current?.contains(target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative inline-flex">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label={REGISTER_MEAL_COPY.plan.info.ariaLabel}
        className="flex size-5 cursor-pointer items-center justify-center rounded-full text-primary/50 transition-colors hover:bg-primary/8 hover:text-primary"
      >
        <Info className="size-3.5" strokeWidth={2} aria-hidden />
      </button>

      {open ? (
        <div
          role="dialog"
          aria-label={REGISTER_MEAL_COPY.plan.info.title}
          className={cn(
            "absolute top-full left-0 z-30 mt-2 w-[min(18rem,calc(100vw-2rem))]",
            "rounded-xl border border-foreground/8 bg-card p-3 shadow-md shadow-foreground/5",
          )}
        >
          <p className="text-xs font-semibold text-foreground">
            {REGISTER_MEAL_COPY.plan.info.title}
          </p>
          <ul className="mt-2.5 flex flex-col gap-2">
            {INFO_ITEMS.map(({ icon: ItemIcon, text }) => (
              <li key={text} className="flex items-start gap-2">
                <ItemIcon
                  className="mt-0.5 size-3.5 shrink-0 text-primary/70"
                  strokeWidth={2}
                  aria-hidden
                />
                <span className="text-[11px] leading-snug text-foreground/60">
                  {text}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
