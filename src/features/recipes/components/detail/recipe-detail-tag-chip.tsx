import { DynamicLucideIcon } from "@/features/onboarding/components/dynamic-lucide-icon";
import type { RecipeDetailTag } from "@/features/recipes/types/recipe-detail.types";
import { cn } from "@/lib/utils";
import { Tag as TagIcon } from "lucide-react";

type RecipeDetailTagChipProps = {
  tag: RecipeDetailTag;
  className?: string;
};

export function RecipeDetailTagChip({ tag, className }: RecipeDetailTagChipProps) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1 rounded-full border border-primary/25 bg-mint/35 px-2 py-1 text-[11px] font-medium text-primary",
        className,
      )}
    >
      <DynamicLucideIcon
        name={tag.iconName ?? ""}
        fallback={TagIcon}
        className="size-3 text-primary"
      />
      <span>{tag.name}</span>
    </span>
  );
}
