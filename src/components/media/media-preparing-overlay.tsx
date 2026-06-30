"use client";

import { MEDIA_PREPARING_COPY } from "@/components/media/media-preparing-copy";
import { cn } from "@/lib/utils";

type MediaPreparingOverlayProps = {
  variant?: "overlay" | "placeholder" | "circle";
  className?: string;
  /** @deprecated Use `spinnerSize` — kept for callers still passing `logoSize`. */
  logoSize?: number;
  spinnerSize?: number;
};

const SPINNER_SIZE = {
  overlay: 32,
  placeholder: 32,
  circle: 24,
} as const;

function MediaPreparingSpinner({ size }: { size: number }) {
  return (
    <div
      className="animate-spin rounded-full border-2 border-mint border-t-primary"
      style={{ width: size, height: size }}
      aria-hidden
    />
  );
}

function MediaPreparingIndicator({
  spinnerSize,
  showLabel = true,
}: {
  spinnerSize: number;
  showLabel?: boolean;
}) {
  return (
    <div className="flex flex-col items-center">
      <MediaPreparingSpinner size={spinnerSize} />
      {false ? (
        <p className="mt-2.5 text-xs font-medium text-foreground/75">
          {MEDIA_PREPARING_COPY}
        </p>
      ) : (
        <span className="sr-only">{MEDIA_PREPARING_COPY}</span>
      )}
    </div>
  );
}

export function MediaPreparingOverlay({
  variant = "overlay",
  className,
  logoSize,
  spinnerSize,
}: MediaPreparingOverlayProps) {
  const size = spinnerSize ?? logoSize ?? SPINNER_SIZE[variant];

  if (variant === "placeholder") {
    return (
      <div
        className={cn(
          "flex items-center justify-center rounded-3xl border border-foreground/6 bg-mint/20 p-6",
          className,
        )}
        aria-busy="true"
        aria-live="polite"
      >
        <MediaPreparingIndicator spinnerSize={size} />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "absolute inset-0 flex items-center justify-center bg-background/10 backdrop-blur-sm",
        variant === "circle" && "rounded-full",
        className,
      )}
      aria-busy="true"
      aria-live="polite"
    >
      <MediaPreparingIndicator
        spinnerSize={size}
        showLabel={variant !== "circle"}
      />
    </div>
  );
}
