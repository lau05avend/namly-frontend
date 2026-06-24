import { cn } from "@/lib/utils";

type HomeSectionTitleProps = {
  title: string;
  className?: string;
};

export function HomeSectionTitle({ title, className }: HomeSectionTitleProps) {
  return (
    <h2
      className={cn(
        "text-[15px] font-semibold leading-snug tracking-normal text-foreground/82",
        className,
      )}
    >
      {title}
    </h2>
  );
}
