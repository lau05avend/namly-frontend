"use client";

import { useState } from "react";
import { AnchoredPopoverPanel } from "@/components/ui/anchored-popover-panel";
import { REGISTER_MEAL_COPY } from "@/features/meal-register/constants/register-meal-copy";
import { useAnchoredPopover } from "@/hooks/use-anchored-popover";
import { Info } from "lucide-react";

const copy = REGISTER_MEAL_COPY.tags.info;

export function RegisterTagsInfoHint() {
  const [open, setOpen] = useState(false);
  const { position, rootRef, buttonRef, popoverRef, stopToggle } = useAnchoredPopover({
    open,
    onClose: () => setOpen(false),
    placement: "bottom",
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
        aria-label={copy.ariaLabel}
        className="flex size-5 cursor-pointer items-center justify-center rounded-full text-primary/50 transition-colors hover:bg-primary/8 hover:text-primary"
      >
        <Info className="size-3.5" strokeWidth={2} aria-hidden />
      </button>

      <AnchoredPopoverPanel
        open={open}
        position={position}
        popoverRef={popoverRef}
        ariaLabel={copy.ariaLabel}
        onPointerInteraction={stopToggle}
      >
        <p className="text-[11px] leading-snug text-foreground/60">{copy.body}</p>
      </AnchoredPopoverPanel>
    </div>
  );
}
