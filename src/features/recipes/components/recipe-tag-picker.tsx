"use client";

import { useMemo, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { BottomSheet } from "@/components/ui/bottom-sheet";
import { Button } from "@/components/ui/button";
import { ClearSelectionButton } from "@/components/ui/clear-selection-button";
import { Input } from "@/components/ui/input";
import { RecipeTagChip } from "@/features/recipes/components/recipe-tag-chip";
import { RECIPES_COPY } from "@/features/recipes/constants/recipes-copy";
import type { CreateRecipeTagFormValue } from "@/features/recipes/schemas/create-recipe.schema";
import {
  normalizeRecipeTagName,
  recipeTagNameExists,
  recipeTagNameExistsExcluding,
} from "@/features/recipes/utils/recipe-tag.utils";
import { tagQueryKeys } from "@/features/tags/constants/query-keys";
import {
  createRecipeTags,
  RECIPE_TAG_CATEGORY,
  updateRecipeTag,
} from "@/features/tags/services/tags.service";
import type { Tag } from "@/features/tags/types/tag.types";
import { cn } from "@/lib/utils";
import { Plus, Search } from "lucide-react";

type RecipeTagPickerProps = {
  availableTags: Tag[];
  selectedTags: CreateRecipeTagFormValue[];
  onChange: (tags: CreateRecipeTagFormValue[]) => void;
  isLoading?: boolean;
  isError?: boolean;
};

function toSelectedTag(tag: Tag): CreateRecipeTagFormValue {
  return {
    id: tag.id,
    name: tag.name,
    iconName: tag.iconName,
    isPending: false,
  };
}

const CREATING_TAG_ID = "__creating-tag__";

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

export function RecipeTagPicker({
  availableTags,
  selectedTags,
  onChange,
  isLoading = false,
  isError = false,
}: RecipeTagPickerProps) {
  const copy = RECIPES_COPY.create.tags;
  const queryClient = useQueryClient();
  const searchInputRef = useRef<HTMLInputElement>(null);

  const [sheetOpen, setSheetOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [draftTags, setDraftTags] = useState<CreateRecipeTagFormValue[]>([]);
  const [isCreatingTag, setIsCreatingTag] = useState(false);
  const [editingTagId, setEditingTagId] = useState<string | null>(null);
  const [creatingTagName, setCreatingTagName] = useState<string | null>(null);

  const handleEditStart = (tagId: string) => {
    setCreatingTagName(null);
    setEditingTagId((current) => (current === tagId ? current : tagId));
  };

  const handleEditEnd = () => {
    setEditingTagId(null);
  };

  const cancelCreatingTag = () => {
    setCreatingTagName(null);
  };

  const openSheet = () => {
    setDraftTags(selectedTags);
    setSearch("");
    setSheetOpen(true);
  };

  const handleSheetOpenChange = (open: boolean) => {
    if (!open) {
      setEditingTagId(null);
      setCreatingTagName(null);
    }

    if (open) {
      setDraftTags(selectedTags);
      setSearch("");
    }

    setSheetOpen(open);
  };

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

  const invalidateRecipeTags = async () => {
    await queryClient.invalidateQueries({
      queryKey: tagQueryKeys.byCategory(RECIPE_TAG_CATEGORY),
    });
  };

  const addTagToCache = (tag: Tag) => {
    queryClient.setQueryData<Tag[]>(
      tagQueryKeys.byCategory(RECIPE_TAG_CATEGORY),
      (current = []) => {
        if (current.some((item) => item.id === tag.id)) {
          return current;
        }

        return [...current, tag];
      },
    );
  };

  const renameTagInList = (
    tags: CreateRecipeTagFormValue[],
    tagId: string,
    name: string,
    iconName: string | null = null,
  ): CreateRecipeTagFormValue[] =>
    tags.map((tag) =>
      tag.id === tagId ? { ...tag, name, iconName: iconName ?? tag.iconName } : tag,
    );

  const handleRenameTag = async (
    tag: CreateRecipeTagFormValue,
    nextName: string,
    context: "form" | "draft",
  ) => {
    const trimmed = nextName.trim();
    if (!trimmed || trimmed === tag.name) {
      return;
    }

    const namePool =
      context === "draft"
        ? { available: availableTags, selected: draftTags }
        : { available: availableTags, selected: selectedTags };

    if (
      recipeTagNameExistsExcluding(
        trimmed,
        tag.id,
        namePool.available,
        namePool.selected,
      )
    ) {
      toast.error(copy.duplicateName);
      return;
    }

    try {
      const updated = await updateRecipeTag(tag.id, {
        name: trimmed,
        iconName: tag.iconName,
      });

      const updater = (tags: CreateRecipeTagFormValue[]) =>
        renameTagInList(tags, tag.id, updated.name, updated.iconName);

      if (context === "draft") {
        setDraftTags(updater);
      } else {
        onChange(updater(selectedTags));
      }

      await invalidateRecipeTags();
    } catch (error) {
      const message =
        error instanceof Error && error.message
          ? error.message
          : copy.renameError;
      toast.error(message);
    }
  };

  const toggleAvailableTag = (tag: Tag) => {
    if (draftIds.has(tag.id)) {
      setDraftTags((current) => current.filter((item) => item.id !== tag.id));
      return;
    }

    setDraftTags((current) => [...current, toSelectedTag(tag)]);
  };

  const startCreatingTag = (initialName = "") => {
    setEditingTagId(null);
    setCreatingTagName(initialName);
    if (initialName) {
      setSearch("");
    }
  };

  const handleCreateTagConfirm = async (name: string) => {
    const trimmed = name.trim();
    if (!trimmed) {
      return;
    }

    if (recipeTagNameExists(trimmed, availableNames, draftNames)) {
      toast.error(copy.duplicateName);
      return;
    }

    setIsCreatingTag(true);

    try {
      const created = await createRecipeTags([
        { name: trimmed, iconName: null },
      ]);
      const newTag = created[0];

      if (!newTag) {
        throw new Error(copy.createError);
      }

      addTagToCache(newTag);
      setDraftTags((current) => [...current, toSelectedTag(newTag)]);
      setCreatingTagName(null);
      await invalidateRecipeTags();
    } catch (error) {
      const message =
        error instanceof Error && error.message
          ? error.message
          : copy.createError;
      toast.error(message);
    } finally {
      setIsCreatingTag(false);
    }
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

  const clearSelectedTags = () => {
    onChange([]);
    setEditingTagId(null);
  };

  const removeSelectedTag = (tagId: string) => {
    onChange(selectedTags.filter((tag) => tag.id !== tagId));
  };

  const clearDraftSelection = () => {
    setDraftTags([]);
    setEditingTagId(null);
    setCreatingTagName(null);
  };

  const handleDone = () => {
    onChange(draftTags);
    setSheetOpen(false);
  };

  if (isLoading) {
    return <p className="text-sm text-foreground/50">{copy.loading}</p>;
  }

  if (isError) {
    return <p className="text-sm text-foreground/60">{copy.loadError}</p>;
  }

  return (
    <>
      <div className="flex flex-col gap-3">
        {selectedTags.length > 0 ? (
          <div className="flex flex-wrap items-center gap-1.5">
            {selectedTags.map((tag) => (
              <RecipeTagChip
                key={tag.id}
                tag={tag}
                selected
                editable
                isEditing={editingTagId === tag.id}
                onEditStart={() => handleEditStart(tag.id)}
                onEditEnd={handleEditEnd}
                onToggle={() => removeSelectedTag(tag.id)}
                onRemove={() => removeSelectedTag(tag.id)}
                onRename={(name) => handleRenameTag(tag, name, "form")}
              />
            ))}

            <ClearSelectionButton
              onClick={clearSelectedTags}
              size="xs"
              className="shrink-0 text-foreground/35 hover:text-foreground/55"
            >
              {copy.clear}
            </ClearSelectionButton>
          </div>
        ) : null}

        <button
          type="button"
          onClick={openSheet}
          className="inline-flex w-fit cursor-pointer items-center gap-1 text-[13px] font-medium text-primary/60 transition-colors hover:text-primary"
        >
          <Plus className="size-3.5" strokeWidth={2.25} aria-hidden />
          {copy.add}
        </button>
      </div>

      <BottomSheet
        open={sheetOpen}
        onOpenChange={handleSheetOpenChange}
        title={copy.sheetTitle}
        description={copy.sheetDescription}
        footer={
          <div className="flex flex-col gap-2">
            <Button type="button" onClick={handleDone}>
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
        <div className="flex flex-col gap-4 pb-4 mt-2">
          <div className="relative">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-foreground/35" />
            <Input
              ref={searchInputRef}
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={copy.searchPlaceholder}
              className="h-9 pl-9 text-sm"
            />
          </div>

          <div className="flex flex-wrap gap-1.5">
            <CreateTagChip
              label={creationChipLabel}
              variant={trimmedSearch && canAddFromSearch ? "create" : "subtle"}
              disabled={
                isCreatingTag ||
                creatingTagName != null ||
                (Boolean(trimmedSearch) && !canAddFromSearch)
              }
              onClick={handleCreateChipClick}
            />

            {creatingTagName != null ? (
              <RecipeTagChip
                tag={{
                  id: CREATING_TAG_ID,
                  name: creatingTagName,
                  iconName: null,
                }}
                selected
                createMode
                isSubmitting={isCreatingTag}
                onToggle={() => undefined}
                onEditEnd={cancelCreatingTag}
                onRename={handleCreateTagConfirm}
              />
            ) : null}

            {filteredAvailableTags.map((tag) => {
              const selected = draftIds.has(tag.id);
              const draftTag = draftTags.find((item) => item.id === tag.id);

              return (
                <RecipeTagChip
                  key={tag.id}
                  tag={draftTag ?? tag}
                  selected={selected}
                  editable={selected}
                  isEditing={editingTagId === tag.id}
                  onEditStart={() => handleEditStart(tag.id)}
                  onEditEnd={handleEditEnd}
                  onToggle={() => toggleAvailableTag(tag)}
                  onRemove={selected ? () => toggleAvailableTag(tag) : undefined}
                  onRename={
                    selected && draftTag
                      ? (name) => handleRenameTag(draftTag, name, "draft")
                      : undefined
                  }
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
    </>
  );
}
