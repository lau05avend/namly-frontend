import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  title: string;
  className?: string;
};

export function SectionHeader({ title, className }: SectionHeaderProps) {
  return (
    <h2
      className={cn(
        "text-[11px] font-semibold tracking-wider text-primary uppercase",
        className,
      )}
    >
      {title}
    </h2>
  );
}
