"use client";

import { useState } from "react";
import { AnchoredPopoverPanel } from "@/components/ui/anchored-popover-panel";
import { REGISTER_MEAL_COPY } from "@/features/meal-register/constants/register-meal-copy";
import { useAnchoredPopover } from "@/hooks/use-anchored-popover";
import { Info, ListChecks, Undo2 } from "lucide-react";

const copy = REGISTER_MEAL_COPY.context.info;
const planInfo = REGISTER_MEAL_COPY.plan.info;

const PLAN_INFO_ITEMS = [
  { icon: ListChecks, text: planInfo.autofillBullet },
  { icon: Undo2, text: planInfo.unlinkBullet },
] as const;

export function RegisterContextInfoHint() {
  const [open, setOpen] = useState(false);
  const { position, rootRef, buttonRef, popoverRef, stopToggle } = useAnchoredPopover({
    open,
    onClose: () => setOpen(false),
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

        <p className="mt-3 text-xs font-semibold text-foreground/70">
          {planInfo.title}
        </p>
        <ul className="mt-2.5 flex flex-col gap-2">
          {PLAN_INFO_ITEMS.map(({ icon: ItemIcon, text }) => (
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
      </AnchoredPopoverPanel>
    </div>
  );
}
