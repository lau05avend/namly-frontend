import { DynamicLucideIcon } from "@/features/onboarding/components/dynamic-lucide-icon";
import type { HistoryMealLogTag } from "@/features/history/types/history.types";
import { cn } from "@/lib/utils";
import { Tag as TagIcon } from "lucide-react";

type HistoryMealLogTagsProps = {
  tags: HistoryMealLogTag[];
  className?: string;
};

export function HistoryMealLogTags({ tags, className }: HistoryMealLogTagsProps) {
  if (tags.length === 0) {
    return null;
  }

  return (
    <ul className={cn("flex flex-wrap gap-2", className)}>
      {tags.map((tag) => (
        <li key={tag.id}>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-foreground/10 bg-card px-3 py-1.5 text-sm font-medium text-foreground/70">
            <DynamicLucideIcon
              name={tag.iconName ?? ""}
              fallback={TagIcon}
              className="size-3.5 text-foreground/40"
            />
            <span>{tag.name}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}
