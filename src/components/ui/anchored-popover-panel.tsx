"use client";

import type { ReactNode, RefObject } from "react";
import { createPortal } from "react-dom";
import type { AnchoredPopoverPosition } from "@/hooks/use-anchored-popover";
import { cn } from "@/lib/utils";

type AnchoredPopoverPanelProps = {
  open: boolean;
  position: AnchoredPopoverPosition | null;
  popoverRef: RefObject<HTMLDivElement | null>;
  ariaLabel: string;
  onPointerInteraction?: (event: { stopPropagation: () => void }) => void;
  children: ReactNode;
};

export function AnchoredPopoverPanel({
  open,
  position,
  popoverRef,
  ariaLabel,
  onPointerInteraction,
  children,
}: AnchoredPopoverPanelProps) {
  if (!open || !position || typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <div
      ref={popoverRef}
      role="dialog"
      aria-label={ariaLabel}
      style={{
        top: position.top,
        left: position.left,
        width: position.width,
      }}
      onClick={onPointerInteraction}
      onPointerDown={onPointerInteraction}
      className={cn(
        "fixed z-50",
        position.placement === "top" && "-translate-y-full",
        "rounded-xl border border-foreground/8 bg-card p-3 shadow-md shadow-foreground/5",
      )}
    >
      {children}
    </div>,
    document.body,
  );
}
