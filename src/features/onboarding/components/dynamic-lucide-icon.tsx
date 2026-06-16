"use client";

import { createElement } from "react";
import { Circle, type LucideIcon } from "lucide-react";
import { resolveLucideIcon } from "@/features/onboarding/utils/resolve-lucide-icon";

type DynamicLucideIconProps = {
  name: string;
  className?: string;
  fallback?: LucideIcon;
};

export function DynamicLucideIcon({
  name,
  className,
  fallback = Circle,
}: DynamicLucideIconProps) {
  return createElement(resolveLucideIcon(name, fallback), {
    className,
    "aria-hidden": true,
  });
}
