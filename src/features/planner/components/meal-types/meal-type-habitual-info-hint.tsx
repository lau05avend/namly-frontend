"use client";

import { useState } from "react";
import { AnchoredPopoverPanel } from "@/components/ui/anchored-popover-panel";
import { MEAL_TYPES_COPY } from "@/features/planner/constants/meal-types-copy";
import { useAnchoredPopover, type AnchoredPopoverPlacement } from "@/hooks/use-anchored-popover";
import { Info } from "lucide-react";

const infoCopy = MEAL_TYPES_COPY.form.info;

type MealTypeHabitualInfoHintProps = {
  placement?: AnchoredPopoverPlacement;
};

export function MealTypeHabitualInfoHint({
  placement = "top",
}: MealTypeHabitualInfoHintProps) {
  const [open, setOpen] = useState(false);
  const { position, rootRef, buttonRef, popoverRef, stopToggle } = useAnchoredPopover({
    open,
    onClose: () => setOpen(false),
    placement,
  });

  return (
    <div ref={rootRef} className="relative inline-flex">
      <button
        ref={buttonRef}
        type="button"
        onClick={(event) => {
          stopToggle(event);
          setOpen((value) => !value);
        }}
        onPointerDown={stopToggle}
        aria-expanded={open}
        aria-label={infoCopy.ariaLabel}
        className="flex size-5 cursor-pointer items-center justify-center rounded-full text-primary/50 transition-colors hover:bg-primary/8 hover:text-primary"
      >
        <Info className="size-3.5" strokeWidth={2} aria-hidden />
      </button>

      <AnchoredPopoverPanel
        open={open}
        position={position}
        popoverRef={popoverRef}
        ariaLabel={infoCopy.title}
        onPointerInteraction={stopToggle}
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
      </AnchoredPopoverPanel>
    </div>
  );
}
