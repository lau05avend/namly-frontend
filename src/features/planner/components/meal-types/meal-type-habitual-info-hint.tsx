"use client";

import { useEffect, useRef, useState } from "react";
import { MEAL_TYPES_COPY } from "@/features/planner/constants/meal-types-copy";
import { cn } from "@/lib/utils";
import { Info } from "lucide-react";

const infoCopy = MEAL_TYPES_COPY.form.info;

export function MealTypeHabitualInfoHint() {
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
        aria-label={infoCopy.ariaLabel}
        className="flex size-5 cursor-pointer items-center justify-center rounded-full text-primary/50 transition-colors hover:bg-primary/8 hover:text-primary"
      >
        <Info className="size-3.5" strokeWidth={2} aria-hidden />
      </button>

      {open ? (
        <div
          role="dialog"
          aria-label={infoCopy.title}
          className={cn(
            "absolute top-full left-0 z-30 mt-2 w-[min(18rem,calc(100vw-2rem))]",
            "rounded-xl border border-foreground/8 bg-card p-3 shadow-md shadow-foreground/5",
          )}
        >
          <p className="text-xs font-semibold text-foreground">{infoCopy.title}</p>
          <p className="mt-1.5 text-[11px] leading-snug text-foreground/60">
            {infoCopy.description}
          </p>
          <ul className="mt-2.5 list-disc space-y-1.5 pl-4">
            {infoCopy.bullets.map((bullet) => (
              <li
                key={bullet}
                className="text-[11px] leading-snug text-foreground/60"
              >
                {bullet}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
