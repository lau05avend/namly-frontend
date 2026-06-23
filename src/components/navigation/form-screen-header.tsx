"use client";

import { cn } from "@/lib/utils";
import { ArrowLeft, Check } from "lucide-react";

type FormScreenHeaderProps = {
  title: string;
  subtitle?: string;
  backLabel: string;
  saveLabel: string;
  onBack: () => void;
  onSave?: () => void;
  isSaving?: boolean;
  saveType?: "button" | "submit";
  className?: string;
};

const ACTION_SLOT = "size-8";

export function FormScreenHeader({
  title,
  subtitle,
  backLabel,
  saveLabel,
  onBack,
  onSave,
  isSaving = false,
  saveType = "button",
  className,
}: FormScreenHeaderProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-30 -mx-1 border-b border-foreground/8 bg-background/95 backdrop-blur-sm pt-3 pb-1",
        className,
      )}
    >
      <div className="mx-auto grid w-full max-w-lg grid-cols-[2.25rem_1fr_2.25rem] items-center gap-2 px-4 py-1.5">
        <button
          type="button"
          onClick={onBack}
          aria-label={backLabel}
          className={cn(
            "flex cursor-pointer items-center justify-center rounded-full text-foreground/50 transition-colors hover:bg-foreground/5 hover:text-foreground/80",
            ACTION_SLOT,
          )}
        >
          <ArrowLeft className="size-5" strokeWidth={2} aria-hidden />
        </button>

        <div className="min-w-0 text-center">
          <h1 className="truncate text-sm font-semibold text-foreground">
            {title}
          </h1>
          {subtitle ? (
            <p className="truncate text-[11px] text-foreground/45">{subtitle}</p>
          ) : null}
        </div>

        <button
          type={saveType}
          onClick={saveType === "button" ? onSave : undefined}
          disabled={isSaving}
          aria-label={saveLabel}
          className={cn(
            "flex cursor-pointer items-center justify-center justify-self-end rounded-full bg-primary text-white shadow-sm shadow-primary/15 transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-45",
            ACTION_SLOT,
          )}
        >
          <Check className="size-4" strokeWidth={2.5} aria-hidden />
        </button>
      </div>
    </header>
  );
}
