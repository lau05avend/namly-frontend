import { cn } from "@/lib/utils";

type HomeSectionTitleVariant = "default" | "utility" | "utility-accent" | "utility-primary";

type HomeSectionTitleProps = {
  title: string;
  variant?: HomeSectionTitleVariant;
  className?: string;
};

export function HomeSectionTitle({
  title,
  variant = "default",
  className,
}: HomeSectionTitleProps) {
  return (
    <h2
      className={cn(
        variant === "utility"
          ? "text-[11px] font-bold uppercase tracking-wider text-foreground/40"
          : variant === "utility-accent"
            ? "text-[11px] font-bold uppercase tracking-wider text-cta"
            : variant === "utility-primary"
              ? "text-[11px] font-bold uppercase tracking-wider text-primary/65"
              : "text-[15px] font-semibold leading-snug tracking-normal text-foreground/82",
        className,
      )}
    >
      {title}
    </h2>
  );
}
