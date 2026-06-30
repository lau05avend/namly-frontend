import { forwardRef, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

const invalidInputClass =
  "aria-[invalid=true]:border-[color-mix(in_srgb,var(--destructive)_45%,transparent)] aria-[invalid=true]:bg-[color-mix(in_srgb,var(--destructive)_6%,transparent)] aria-[invalid=true]:focus-visible:ring-[color-mix(in_srgb,var(--destructive)_25%,transparent)] aria-[invalid=true]:[&:not(:focus-visible)]:shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--destructive)_22%,transparent)]";

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, type = "text", ...props },
  ref,
) {
  return (
    <input
      ref={ref}
      type={type}
      className={cn(
        "h-14 w-full rounded-full border border-foreground/10 bg-card px-5 text-base text-foreground",
        "placeholder:text-foreground/40",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        invalidInputClass,
        "disabled:pointer-events-none disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
});
