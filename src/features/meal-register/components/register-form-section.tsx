import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type RegisterFormSectionProps = {
  title?: string;
  hint?: string;
  description?: string;
  children: ReactNode;
  headerAccessory?: ReactNode;
  headerTrailing?: ReactNode;
  className?: string;
};

export function RegisterFormSection({
  title,
  hint,
  description,
  children,
  headerAccessory,
  headerTrailing,
  className,
}: RegisterFormSectionProps) {
  const showHeader = Boolean(title || headerAccessory || headerTrailing);

  return (
    <section className={cn("flex flex-col gap-3", className)}>
      {showHeader ? (
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-center gap-1.5">
            {title ? (
              hint ? (
                <div className="flex min-w-0 flex-col gap-1">
                  <h2 className="text-[11px] font-semibold tracking-wider text-foreground uppercase">
                    {title}
                  </h2>
                  <p className="text-xs text-foreground/40">{hint}</p>
                </div>
              ) : (
                <h2 className="text-[11px] font-semibold tracking-wider text-foreground uppercase">
                  {title}
                </h2>
              )
            ) : null}
            {headerAccessory}
          </div>
          {headerTrailing}
        </div>
      ) : null}
      {description ? (
        <p className="-mt-1 text-sm leading-snug text-foreground/50">
          {description}
        </p>
      ) : null}
      {children}
    </section>
  );
}
