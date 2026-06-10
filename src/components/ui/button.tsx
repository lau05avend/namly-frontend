import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const variantStyles = {
  cta: "bg-cta text-white shadow-sm shadow-cta/25 hover:bg-cta/90 active:bg-cta/95",
  outline:
    "border border-foreground/10 bg-card text-foreground hover:bg-mint/40 active:bg-mint/60",
  ghost:
    "bg-transparent text-foreground/70 hover:text-foreground active:text-foreground",
} as const;

const sizeStyles = {
  default: "h-12 min-h-12 px-5 text-base font-semibold",
  sm: "h-10 min-h-10 px-4 text-sm font-medium",
} as const;

export type ButtonVariant = keyof typeof variantStyles;
export type ButtonSize = keyof typeof sizeStyles;

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      className,
      variant = "cta",
      size = "default",
      type = "button",
      disabled,
      ...props
    },
    ref,
  ) {
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        className={cn(
          "inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          "disabled:pointer-events-none disabled:opacity-50",
          variantStyles[variant],
          sizeStyles[size],
          className,
        )}
        {...props}
      />
    );
  },
);
