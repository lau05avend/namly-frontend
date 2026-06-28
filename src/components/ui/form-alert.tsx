import { cn } from "@/lib/utils";
import { formErrorAlertClass } from "@/components/ui/form-field-error";

type FormAlertProps = {
  message: string;
  className?: string;
  centered?: boolean;
};

export function FormAlert({
  message,
  className,
  centered = false,
}: FormAlertProps) {
  return (
    <p
      role="alert"
      className={cn(
        "rounded-xl px-3 py-2.5 text-xs leading-relaxed font-medium",
        formErrorAlertClass,
        centered && "text-center",
        className,
      )}
    >
      {message}
    </p>
  );
}
