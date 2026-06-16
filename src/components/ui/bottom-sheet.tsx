"use client";

import { Drawer } from "vaul";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type BottomSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
  scrollableContent?: boolean;
};

export function BottomSheet({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  className,
  scrollableContent = true,
}: BottomSheetProps) {
  return (
    <Drawer.Root open={open} onOpenChange={onOpenChange}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-50 bg-foreground/20" />
        <Drawer.Content
          className={cn(
            "fixed inset-x-0 bottom-0 z-50 mx-auto flex max-h-[92dvh] max-w-lg flex-col rounded-t-3xl bg-background outline-none",
            className,
          )}
        >
          <div className="flex shrink-0 flex-col items-center px-4 pt-3 pb-2">
            <div
              className="mb-3 h-1 w-10 rounded-full bg-foreground/15"
              aria-hidden
            />
            <Drawer.Title className="text-base font-bold text-foreground">
              {title}
            </Drawer.Title>
            {description ? (
              <Drawer.Description className="mt-1 text-center text-sm text-foreground/55">
                {description}
              </Drawer.Description>
            ) : null}
          </div>

          <div
            className={cn(
              "min-h-0 flex-1 px-4",
              scrollableContent
                ? "overflow-y-auto"
                : "flex flex-col overflow-hidden",
            )}
          >
            {children}
          </div>

          {footer ? (
            <div className="shrink-0 border-t border-foreground/8 px-4 pt-3 pb-safe">
              {footer}
            </div>
          ) : null}
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
