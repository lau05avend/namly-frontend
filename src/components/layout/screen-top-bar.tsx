"use client";

import type { ReactNode } from "react";
import { SCREEN_LAYOUT } from "@/constants/screen-layout";
import { cn } from "@/lib/utils";

type ScreenTopBarProps = {
  children: ReactNode;
  className?: string;
  variant?: "fixed" | "sticky";
};

export function ScreenTopBar({
  children,
  className,
  variant = "fixed",
}: ScreenTopBarProps) {
  return (
    <div
      className={cn(
        "inset-x-0 top-0 z-30",
        SCREEN_LAYOUT.topBar,
        variant === "fixed" ? "fixed" : "sticky shrink-0",
        className,
      )}
    >
      <div className={SCREEN_LAYOUT.topBarInner}>{children}</div>
    </div>
  );
}
