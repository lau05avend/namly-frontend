"use client";

import { cn } from "@/lib/utils";
import { Camera, Plus } from "lucide-react";

type FabIcon = "camera" | "plus";

type FloatingActionButtonProps = {
  label: string;
  icon?: FabIcon;
  onClick?: () => void;
  className?: string;
};

const ICONS = {
  camera: Camera,
  plus: Plus,
} as const;

export function FloatingActionButton({
  label,
  icon = "camera",
  onClick,
  className,
}: FloatingActionButtonProps) {
  const Icon = ICONS[icon];

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={cn(
        "fixed right-5 bottom-24 z-50 flex size-14 items-center justify-center rounded-full bg-cta text-white shadow-lg shadow-cta/30 transition-transform active:scale-95",
        className,
      )}
    >
      <Icon className="size-6" strokeWidth={2.25} aria-hidden="true" />
    </button>
  );
}
