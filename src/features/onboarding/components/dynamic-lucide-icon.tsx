"use client";

import { createElement } from "react";
import { resolveLucideIcon } from "@/features/onboarding/utils/resolve-lucide-icon";

type DynamicLucideIconProps = {
  name: string;
  className?: string;
};

export function DynamicLucideIcon({ name, className }: DynamicLucideIconProps) {
  return createElement(resolveLucideIcon(name), {
    className,
    "aria-hidden": true,
  });
}
