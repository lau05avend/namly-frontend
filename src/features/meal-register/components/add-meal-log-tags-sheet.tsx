"use client";

import { useMemo, useState } from "react";
import { BottomSheet } from "@/components/ui/bottom-sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RecipeTagChip } from "@/features/recipes/components/recipe-tag-chip";
import {
  normalizeRecipeTagName,
  recipeTagNameExists,
} from "@/features/recipes/utils/recipe-tag.utils";
import { REGISTER_MEAL_COPY } from "@/features/meal-register/constants/register-meal-copy";
import { useAuth } from "@/hooks/use-auth";
import type { RegisterTagFormValue } from "@/features/meal-register/schemas/register-meal.schema";
import { createRegisterItemId } from "@/features/meal-register/utils/register-item-id";
import type { Tag } from "@/features/tags/types/tag.types";
import { cn } from "@/lib/utils";
import { Plus, Search } from "lucide-react";

type AddMealLogTagsSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  availableTags: Tag[];
  selectedTags: RegisterTagFormValue[];
  onConfirm: (tags: RegisterTagFormValue[]) => void;
};

const CREATING_TAG_ID = "__creating-tag__";
const copy = REGISTER_MEAL_COPY.tags;

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

type CreateTagChipProps = {
  label: string;
  variant?: "subtle" | "create";
  disabled?: boolean;
  onClick: () => void;
};

function CreateTagChip({
  label,
  variant = "subtle",
  disabled = false,
  onClick,
}: CreateTagChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "inline-flex shrink-0 items-center gap-1 rounded-full border px-2 py-1 text-[11px] transition-colors",
        disabled
          ? "cursor-not-allowed border-dashed border-foreground/10 bg-card/40 text-foreground/30"
          : variant === "create"
            ? "cursor-pointer border-dashed border-primary/20 bg-mint/15 font-medium text-primary/80 hover:bg-mint/25"
            : "cursor-pointer border-dashed border-foreground/12 bg-card/60 font-normal text-foreground/50 hover:border-foreground/18 hover:bg-card hover:text-foreground/65",
      )}
    >
      <Plus
        className={cn(
          "size-3",
          disabled
            ? "text-foreground/30"
            : variant === "create"
              ? "text-primary/70"
              : "text-foreground/40",
        )}
        aria-hidden
      />
      {label}
    </button>
  );
}

export function AddMealLogTagsSheet({
  open,
  onOpenChange,
  availableTags,
  selectedTags,
  onConfirm,
}: AddMealLogTagsSheetProps) {
  const { isGuest } = useAuth();
  const [search, setSearch] = useState("");
  const [draftTags, setDraftTags] = useState<RegisterTagFormValue[]>([]);
  const [creatingTagName, setCreatingTagName] = useState<string | null>(null);
  const [prevOpen, setPrevOpen] = useState(open);

  if (open !== prevOpen) {
    setPrevOpen(open);

    if (open) {
      setDraftTags(selectedTags);
      setSearch("");
      setCreatingTagName(null);
    } else {
      setSearch("");
      setCreatingTagName(null);
    }
  }

  const trimmedSearch = search.trim();
  const normalizedSearch = normalizeRecipeTagName(search);

  const draftIds = useMemo(
    () => new Set(draftTags.map((tag) => tag.id)),
    [draftTags],
  );

  const draftNames = useMemo(
    () => draftTags.map((tag) => tag.name),
    [draftTags],
  );

  const availableNames = useMemo(
    () => availableTags.map((tag) => tag.name),
    [availableTags],
  );

  const filteredAvailableTags = useMemo(() => {
    if (!normalizedSearch) {
      return availableTags;
    }

    return availableTags.filter((tag) =>
      normalizeRecipeTagName(tag.name).includes(normalizedSearch),
    );
  }, [availableTags, normalizedSearch]);

  const canAddFromSearch =
    trimmedSearch.length > 0 &&
    !recipeTagNameExists(trimmedSearch, availableNames, draftNames);

  const creationChipLabel = trimmedSearch
    ? copy.createNamed(trimmedSearch)
    : copy.createNew;

  const toggleAvailableTag = (tag: Tag) => {
    if (draftIds.has(tag.id)) {
      setDraftTags((current) => current.filter((item) => item.id !== tag.id));
      return;
    }

    setDraftTags((current) => [...current, toSelectedTag(tag)]);
  };

  const startCreatingTag = (initialName = "") => {
    setCreatingTagName(initialName);
    if (initialName) {
      setSearch("");
    }
  };

  const cancelCreatingTag = () => {
    setCreatingTagName(null);
  };

  const handleCreateTagConfirm = (name: string) => {
    const trimmed = name.trim();
    if (!trimmed) {
      return;
    }

    if (recipeTagNameExists(trimmed, availableNames, draftNames)) {
      return;
    }

    setDraftTags((current) => [...current, toPendingTag(trimmed)]);
    setCreatingTagName(null);
  };

  const handleCreateChipClick = () => {
    if (creatingTagName != null) {
      return;
    }

    if (canAddFromSearch) {
      startCreatingTag(trimmedSearch);
      return;
    }

    startCreatingTag("");
  };

  const clearDraftSelection = () => {
    setDraftTags([]);
    setCreatingTagName(null);
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      setSearch("");
      setCreatingTagName(null);
    }

    onOpenChange(nextOpen);
  };

  const handleConfirm = () => {
    onConfirm(draftTags);
    handleOpenChange(false);
  };

  return (
    <BottomSheet
      open={open}
      onOpenChange={handleOpenChange}
      title={copy.sheetTitle}
      description={copy.sheetDescription}
      footer={
        <div className="flex flex-col gap-2">
          <Button type="button" onClick={handleConfirm}>
            {copy.done}
          </Button>
          {draftTags.length > 0 ? (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={clearDraftSelection}
            >
              {copy.clearAll}
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
            placeholder={copy.searchPlaceholder}
            className="h-9 pl-9 text-sm"
          />
        </div>

        <div className="flex flex-wrap gap-1.5">
          {isGuest ? null : (
            <CreateTagChip
              label={creationChipLabel}
              variant={trimmedSearch && canAddFromSearch ? "create" : "subtle"}
              disabled={
                creatingTagName != null ||
                (Boolean(trimmedSearch) && !canAddFromSearch)
              }
              onClick={handleCreateChipClick}
            />
          )}

          {!isGuest && creatingTagName != null ? (
            <RecipeTagChip
              tag={{
                id: CREATING_TAG_ID,
                name: creatingTagName,
                iconName: null,
              }}
              selected
              createMode
              onToggle={() => undefined}
              onEditEnd={cancelCreatingTag}
              onRename={handleCreateTagConfirm}
            />
          ) : null}

          {filteredAvailableTags.map((tag) => {
            const selected = draftIds.has(tag.id);

            return (
              <RecipeTagChip
                key={tag.id}
                tag={tag}
                selected={selected}
                onToggle={() => toggleAvailableTag(tag)}
                onRemove={selected ? () => toggleAvailableTag(tag) : undefined}
              />
            );
          })}

          {normalizedSearch &&
          filteredAvailableTags.length === 0 &&
          !canAddFromSearch ? (
            <p className="text-sm text-foreground/50">{copy.emptySearch}</p>
          ) : null}
        </div>
      </div>
    </BottomSheet>
  );
}
