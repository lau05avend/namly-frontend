"use client";

import { useMemo, useState } from "react";
import { BottomSheet } from "@/components/ui/bottom-sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DynamicLucideIcon } from "@/features/onboarding/components/dynamic-lucide-icon";
import { REGISTER_MEAL_COPY } from "@/features/meal-register/constants/register-meal-copy";
import type { RegisterTagFormValue } from "@/features/meal-register/schemas/register-meal.schema";
import { createRegisterItemId } from "@/features/meal-register/utils/register-item-id";
import type { Tag } from "@/features/tags/types/tag.types";
import { cn } from "@/lib/utils";
import { Plus, Search, SlidersHorizontal, Tag as TagIcon, X } from "lucide-react";

type MealLogTagPickerProps = {
  availableTags: Tag[];
  selectedTags: RegisterTagFormValue[];
  onChange: (tags: RegisterTagFormValue[]) => void;
  isLoading?: boolean;
  isError?: boolean;
};

function normalizeTagName(name: string): string {
  return name.trim().toLocaleLowerCase("es");
}

function toSelectedTag(tag: Tag): RegisterTagFormValue {
  return {
    id: tag.id,
    name: tag.name,
    iconName: tag.iconName,
    isPending: false,
  };
}

function toPendingTag(name: string): RegisterTagFormValue {
  return {
    id: `pending-${createRegisterItemId()}`,
    name: name.trim(),
    iconName: null,
    isPending: true,
  };
}

type TagChipProps = {
  tag: Pick<RegisterTagFormValue, "id" | "name" | "iconName">;
  selected: boolean;
  onToggle: () => void;
  onRemove?: () => void;
};

function TagChip({ tag, selected, onToggle, onRemove }: TagChipProps) {
  const chipClassName = cn(
    "inline-flex shrink-0 cursor-pointer items-center rounded-full border text-sm font-medium transition-colors",
    selected
      ? "border-primary/25 bg-mint/35 text-primary"
      : "border-foreground/10 bg-card text-foreground/70",
  );

  const label = (
    <>
      <DynamicLucideIcon
        name={tag.iconName ?? ""}
        fallback={TagIcon}
        className={cn(
          "size-3.5",
          selected ? "text-primary" : "text-foreground/40",
        )}
      />
      <span>{tag.name}</span>
    </>
  );

  if (selected && onRemove) {
    return (
      <div className={chipClassName}>
        <button
          type="button"
          onClick={onToggle}
          className="inline-flex cursor-pointer items-center gap-1.5 py-1.5 pr-0.5 pl-3"
        >
          {label}
        </button>
        <button
          type="button"
          onClick={onRemove}
          className="mr-1.5 flex size-4 cursor-pointer items-center justify-center rounded-full text-primary/70 transition-colors hover:bg-primary/10 hover:text-primary"
          aria-label={REGISTER_MEAL_COPY.tags.remove(tag.name)}
        >
          <X className="size-3" aria-hidden />
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={onToggle}
      className={cn(chipClassName, "gap-1.5 px-3 py-1.5")}
    >
      {label}
    </button>
  );
}

export function MealLogTagPicker({
  availableTags,
  selectedTags,
  onChange,
  isLoading = false,
  isError = false,
}: MealLogTagPickerProps) {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [search, setSearch] = useState("");

  const selectedIds = useMemo(
    () => new Set(selectedTags.map((tag) => tag.id)),
    [selectedTags],
  );

  const normalizedSearch = normalizeTagName(search);

  const filteredTags = useMemo(() => {
    if (!normalizedSearch) {
      return availableTags;
    }

    return availableTags.filter((tag) =>
      normalizeTagName(tag.name).includes(normalizedSearch),
    );
  }, [availableTags, normalizedSearch]);

  const canCreateFromSearch = useMemo(() => {
    if (!normalizedSearch) {
      return false;
    }

    const existsInAvailable = availableTags.some(
      (tag) => normalizeTagName(tag.name) === normalizedSearch,
    );
    const existsInSelected = selectedTags.some(
      (tag) => normalizeTagName(tag.name) === normalizedSearch,
    );

    return !existsInAvailable && !existsInSelected;
  }, [availableTags, normalizedSearch, selectedTags]);

  const toggleTag = (tag: Tag) => {
    if (selectedIds.has(tag.id)) {
      onChange(selectedTags.filter((item) => item.id !== tag.id));
      return;
    }

    onChange([...selectedTags, toSelectedTag(tag)]);
  };

  const toggleSelected = (tag: RegisterTagFormValue) => {
    if (selectedIds.has(tag.id)) {
      onChange(selectedTags.filter((item) => item.id !== tag.id));
      return;
    }

    onChange([...selectedTags, tag]);
  };

  const addPendingTag = (name: string) => {
    const trimmed = name.trim();
    if (!trimmed) {
      return;
    }

    const normalized = normalizeTagName(trimmed);
    const existing = availableTags.find(
      (tag) => normalizeTagName(tag.name) === normalized,
    );

    if (existing) {
      if (!selectedIds.has(existing.id)) {
        onChange([...selectedTags, toSelectedTag(existing)]);
      }
      setSearch("");
      return;
    }

    const alreadySelected = selectedTags.some(
      (tag) => normalizeTagName(tag.name) === normalized,
    );
    if (alreadySelected) {
      setSearch("");
      return;
    }

    onChange([...selectedTags, toPendingTag(trimmed)]);
    setSearch("");
  };

  const clearTags = () => {
    onChange([]);
  };

  const hasSelectedTags = selectedTags.length > 0;

  if (isLoading) {
    return (
      <p className="text-sm text-foreground/50">{REGISTER_MEAL_COPY.tags.loading}</p>
    );
  }

  if (isError) {
    return (
      <p className="text-sm text-foreground/60">{REGISTER_MEAL_COPY.tags.loadError}</p>
    );
  }

  return (
    <>
      <div className="-mx-4 flex gap-2 overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <button
          type="button"
          onClick={() => setSheetOpen(true)}
          className={cn(
            "inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors",
            hasSelectedTags
              ? "border-primary/25 bg-mint/30 text-primary"
              : "border-foreground/10 bg-card text-foreground/70",
          )}
        >
          <SlidersHorizontal className="size-3.5" aria-hidden />
          {REGISTER_MEAL_COPY.tags.browse}
        </button>

        {hasSelectedTags ? (
          <button
            type="button"
            onClick={clearTags}
            className="inline-flex shrink-0 cursor-pointer items-center gap-1 px-1 py-1.5 text-sm font-medium text-foreground/45 transition-colors hover:text-primary"
          >
            <X className="size-3.5" aria-hidden />
            {REGISTER_MEAL_COPY.tags.clear}
          </button>
        ) : null}

        {selectedTags.map((tag) => (
          <TagChip
            key={tag.id}
            tag={tag}
            selected
            onToggle={() => toggleSelected(tag)}
            onRemove={() => toggleSelected(tag)}
          />
        ))}

        {availableTags
          .filter((tag) => !selectedIds.has(tag.id))
          .map((tag) => (
            <TagChip
              key={tag.id}
              tag={tag}
              selected={false}
              onToggle={() => toggleTag(tag)}
            />
          ))}
      </div>

      <BottomSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        title={REGISTER_MEAL_COPY.tags.sheetTitle}
        description={REGISTER_MEAL_COPY.tags.sheetDescription}
        footer={
          <div className="flex flex-col gap-2">
            <Button type="button" onClick={() => setSheetOpen(false)}>
              {REGISTER_MEAL_COPY.tags.done}
            </Button>
            {hasSelectedTags ? (
              <Button type="button" variant="ghost" size="sm" onClick={clearTags}>
                {REGISTER_MEAL_COPY.tags.clear}
              </Button>
            ) : null}
          </div>
        }
      >
        <div className="flex flex-col gap-4 pb-4">
          <div className="relative">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-foreground/35" />
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={REGISTER_MEAL_COPY.tags.searchPlaceholder}
              className="pl-9"
            />
          </div>

          {canCreateFromSearch ? (
            <button
              type="button"
              onClick={() => addPendingTag(search)}
              className="inline-flex cursor-pointer items-center gap-2 rounded-2xl border border-dashed border-primary/30 bg-mint/20 px-3 py-2.5 text-sm font-medium text-primary"
            >
              <Plus className="size-4" aria-hidden />
              {REGISTER_MEAL_COPY.tags.createNamed(search.trim())}
            </button>
          ) : null}

          <div className="flex flex-wrap gap-2">
            {filteredTags.length > 0 ? (
              filteredTags.map((tag) => {
                const selected = selectedIds.has(tag.id);

                return (
                  <TagChip
                    key={tag.id}
                    tag={tag}
                    selected={selected}
                    onToggle={() => toggleTag(tag)}
                    onRemove={selected ? () => toggleTag(tag) : undefined}
                  />
                );
              })
            ) : normalizedSearch ? (
              <p className="text-sm text-foreground/50">
                {REGISTER_MEAL_COPY.tags.emptySearch}
              </p>
            ) : null}
          </div>
        </div>
      </BottomSheet>
    </>
  );
}
