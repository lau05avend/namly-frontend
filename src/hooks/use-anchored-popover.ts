import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

const POPOVER_WIDTH = 288;
const VIEWPORT_MARGIN = 16;
const POPOVER_GAP = 8;

export type AnchoredPopoverPlacement = "top" | "bottom";

export type AnchoredPopoverPosition = {
  top: number;
  left: number;
  width: number;
  placement: AnchoredPopoverPlacement;
};

export function clampAnchoredPopoverPosition(
  anchor: DOMRect,
  placement: AnchoredPopoverPlacement = "top",
): AnchoredPopoverPosition {
  const width = Math.min(POPOVER_WIDTH, window.innerWidth - VIEWPORT_MARGIN * 2);
  let left = anchor.left;
  const maxLeft = window.innerWidth - VIEWPORT_MARGIN - width;

  if (left > maxLeft) {
    left = maxLeft;
  }

  if (left < VIEWPORT_MARGIN) {
    left = VIEWPORT_MARGIN;
  }

  return {
    top: placement === "top" ? anchor.top - POPOVER_GAP : anchor.bottom + POPOVER_GAP,
    left,
    width,
    placement,
  };
}

type UseAnchoredPopoverOptions = {
  open: boolean;
  onClose: () => void;
  placement?: AnchoredPopoverPlacement;
};

export function useAnchoredPopover({
  open,
  onClose,
  placement = "top",
}: UseAnchoredPopoverOptions) {
  const [position, setPosition] = useState<AnchoredPopoverPosition | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const updatePosition = useCallback(() => {
    if (!buttonRef.current) {
      return;
    }

    setPosition(clampAnchoredPopoverPosition(buttonRef.current.getBoundingClientRect(), placement));
  }, [placement]);

  useLayoutEffect(() => {
    if (!open) {
      return;
    }

    updatePosition();

    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);

    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [open, updatePosition, placement]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const handlePointerDown = (event: Event) => {
      const target = event.target;

      if (!(target instanceof Node)) {
        return;
      }

      if (rootRef.current?.contains(target) || popoverRef.current?.contains(target)) {
        return;
      }

      onClose();
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
    };
  }, [open, onClose]);

  const stopToggle = useCallback((event: { stopPropagation: () => void }) => {
    event.stopPropagation();
  }, []);

  return {
    position,
    rootRef,
    buttonRef,
    popoverRef,
    stopToggle,
  };
}
