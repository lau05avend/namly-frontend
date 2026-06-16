import { RecipePlaceholderIcon } from "@/features/recipes/constants/recipe-placeholder";
import { cn } from "@/lib/utils";

type RecipeCoverThumbProps = {
  coverUrl?: string | null;
  className?: string;
};

export function RecipeCoverThumb({
  coverUrl,
  className,
}: RecipeCoverThumbProps) {
  return (
    <div
      className={cn(
        "relative size-11 shrink-0 overflow-hidden rounded-lg border border-foreground/8 bg-foreground/[0.04]",
        className,
      )}
    >
      {coverUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={coverUrl} alt="" className="size-full object-cover" />
      ) : (
        <span
          className="flex size-full items-center justify-center bg-card"
          aria-hidden
        >
          <RecipePlaceholderIcon
            className="size-6 text-foreground/[0.09]"
            strokeWidth={1.25}
          />
        </span>
      )}
    </div>
  );
}
