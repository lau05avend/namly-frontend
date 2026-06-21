"use client";

import { BottomSheet } from "@/components/ui/bottom-sheet";
import { Button } from "@/components/ui/button";
import { DynamicLucideIcon } from "@/features/onboarding/components/dynamic-lucide-icon";
import { PLAN_MEAL_COPY } from "@/features/planner/constants/plan-meal-copy";
import type { Tag } from "@/features/tags/types/tag.types";
import { cn } from "@/lib/utils";
import { SlidersHorizontal, Tag as TagIcon, X } from "lucide-react";

type RecipeTagFiltersProps = {
  tags: Tag[];
  selectedTagIds: string[];
  onToggleTag: (tagId: string) => void;
  onClearTags: () => void;
  tagsSheetOpen: boolean;
  onTagsSheetOpenChange: (open: boolean) => void;
  parentOpen?: boolean;
  layout?: "sheet" | "page";
};

function TagChip({
  tag,
  selected,
  onToggle,
  onRemove,
}: {
  tag: Tag;
  selected: boolean;
  onToggle: () => void;
  onRemove?: () => void;
}) {
  const chipClassName = cn(
    "inline-flex shrink-0 items-center rounded-full border text-[11px] font-medium transition-colors",
    selected
      ? "border-primary/25 bg-mint/35 text-primary"
      : "border-foreground/8 bg-card text-foreground/50",
  );

  const label = (
    <>
      <DynamicLucideIcon
        name={tag.iconName ?? ""}
        fallback={TagIcon}
        className={cn(
          "size-3",
          selected ? "text-primary" : "text-foreground/30",
        )}
      />
      {tag.name}
    </>
  );

  if (selected && onRemove) {
    return (
      <div className={chipClassName}>
        <button
          type="button"
          onClick={onToggle}
          className="inline-flex items-center gap-1 py-1 pr-0.5 pl-2"
        >
          {label}
        </button>
        <button
          type="button"
          onClick={onRemove}
          className="mr-1 flex size-4 items-center justify-center rounded-full text-primary/70 transition-colors hover:bg-primary/10 hover:text-primary"
          aria-label={PLAN_MEAL_COPY.recipes.removeTag(tag.name)}
        >
          <X className="size-2.5" aria-hidden />
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={onToggle}
      className={cn(chipClassName, "gap-1 px-2 py-1")}
    >
      {label}
    </button>
  );
}

export function RecipeTagFilters({
  tags,
  selectedTagIds,
  onToggleTag,
  onClearTags,
  tagsSheetOpen,
  onTagsSheetOpenChange,
  parentOpen = true,
  layout = "sheet",
}: RecipeTagFiltersProps) {
  if (tags.length === 0) {
    return null;
  }

  const hasSelectedTags = selectedTagIds.length > 0;

  return (
    <>
      <div
        className={cn(
          "flex min-w-0 gap-1.5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          layout === "sheet" && "-mx-4 px-4",
        )}
      >
        <button
          type="button"
          onClick={() => onTagsSheetOpenChange(true)}
          className={cn(
            "inline-flex shrink-0 items-center gap-1 rounded-full border px-2 py-1 text-[11px] font-medium transition-colors",
            hasSelectedTags
              ? "border-primary/25 bg-mint/30 text-primary"
              : "border-foreground/8 bg-card text-foreground/50",
          )}
        >
          <SlidersHorizontal className="size-3" aria-hidden />
          {hasSelectedTags
            ? PLAN_MEAL_COPY.recipes.moreFiltersCount(selectedTagIds.length)
            : PLAN_MEAL_COPY.recipes.moreFilters}
        </button>

        {hasSelectedTags ? (
          <button
            type="button"
            onClick={onClearTags}
            className="inline-flex shrink-0 items-center gap-0.5 px-1 py-1 text-[11px] font-medium text-foreground/45 transition-colors hover:text-primary"
          >
            <X className="size-2.5" aria-hidden />
            {PLAN_MEAL_COPY.recipes.clearTags}
          </button>
        ) : null}

        {tags.map((tag) => {
          const selected = selectedTagIds.includes(tag.id);

          return (
            <TagChip
              key={tag.id}
              tag={tag}
              selected={selected}
              onToggle={() => onToggleTag(tag.id)}
              onRemove={selected ? () => onToggleTag(tag.id) : undefined}
            />
          );
        })}
      </div>

      <BottomSheet
        open={parentOpen && tagsSheetOpen}
        onOpenChange={onTagsSheetOpenChange}
        title={PLAN_MEAL_COPY.recipes.tagsSheetTitle}
        description={PLAN_MEAL_COPY.recipes.tagsSheetDescription}
        footer={
          <div className="flex flex-col gap-2">
            <Button type="button" onClick={() => onTagsSheetOpenChange(false)}>
              {PLAN_MEAL_COPY.recipes.tagsSheetDone}
            </Button>
            {hasSelectedTags ? (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={onClearTags}
              >
                {PLAN_MEAL_COPY.recipes.clearTags}
              </Button>
            ) : null}
          </div>
        }
      >
        <div className="flex flex-wrap gap-2 pb-4">
          {tags.map((tag) => {
            const selected = selectedTagIds.includes(tag.id);

            return (
              <TagChip
                key={tag.id}
                tag={tag}
                selected={selected}
                onToggle={() => onToggleTag(tag.id)}
                onRemove={selected ? () => onToggleTag(tag.id) : undefined}
              />
            );
          })}
        </div>
      </BottomSheet>
    </>
  );
}
