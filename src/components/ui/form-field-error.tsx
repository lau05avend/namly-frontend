import { cn } from "@/lib/utils";

/** Shared field / form error styles — uses CSS vars for reliable rendering. */
export const formErrorTextClass = "text-[var(--destructive)]";

export const formErrorAlertClass =
  "border border-[color-mix(in_srgb,var(--destructive)_28%,transparent)] bg-[color-mix(in_srgb,var(--destructive)_8%,transparent)] text-[var(--destructive)]";

type FormFieldErrorProps = {
  message: string;
  className?: string;
};

export function FormFieldError({ message, className }: FormFieldErrorProps) {
  return (
    <p
      role="alert"
      className={cn("text-xs font-medium", formErrorTextClass, className)}
    >
      {message}
    </p>
  );
}
