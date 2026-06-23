"use client";

import { useCallback, useEffect, useRef } from "react";
import { DynamicLucideIcon } from "@/features/onboarding/components/dynamic-lucide-icon";
import { RECIPES_COPY } from "@/features/recipes/constants/recipes-copy";
import type { CreateRecipeTagFormValue } from "@/features/recipes/schemas/create-recipe.schema";
import { cn } from "@/lib/utils";
import { Check, Tag as TagIcon, X } from "lucide-react";

const LONG_PRESS_MS = 450;
const SINGLE_CLICK_DELAY_MS = 240;

type RecipeTagChipProps = {
  tag: Pick<CreateRecipeTagFormValue, "id" | "name" | "iconName">;
  selected: boolean;
  editable?: boolean;
  createMode?: boolean;
  isSubmitting?: boolean;
  isEditing?: boolean;
  onEditStart?: () => void;
  onEditEnd?: () => void;
  onToggle: () => void;
  onRemove?: () => void;
  onRename?: (name: string) => void | Promise<void>;
};

export function RecipeTagChip({
  tag,
  selected,
  editable = false,
  createMode = false,
  isSubmitting = false,
  isEditing = false,
  onEditStart,
  onEditEnd,
  onToggle,
  onRemove,
  onRename,
}: RecipeTagChipProps) {
  const copy = RECIPES_COPY.create.tags;
  const inputId = `recipe-tag-edit-${tag.id}`;
  const isEditActive = createMode || isEditing;
  const draftNameRef = useRef(tag.name);
  const inputRef = useRef<HTMLInputElement>(null);
  const editContainerRef = useRef<HTMLDivElement>(null);
  const longPressTimerRef = useRef<number | null>(null);
  const longPressTriggeredRef = useRef(false);
  const singleClickTimerRef = useRef<number | null>(null);
  const skipToggleRef = useRef(false);

  const clearLongPressTimer = () => {
    if (longPressTimerRef.current != null) {
      window.clearTimeout(longPressTimerRef.current);
      longPressTimerRef.current = null;
    }
  };

  const clearSingleClickTimer = () => {
    if (singleClickTimerRef.current != null) {
      window.clearTimeout(singleClickTimerRef.current);
      singleClickTimerRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      clearSingleClickTimer();
      clearLongPressTimer();
    };
  }, []);

  useEffect(() => {
    if (!isEditActive) {
      draftNameRef.current = tag.name;
      if (inputRef.current) {
        inputRef.current.value = tag.name;
      }
    }
  }, [isEditActive, tag.name]);

  useEffect(() => {
    if (!isEditActive) {
      return;
    }

    const frame = requestAnimationFrame(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });

    return () => cancelAnimationFrame(frame);
  }, [isEditActive]);

  const startEdit = () => {
    if (!editable || !onRename || !onEditStart) {
      return;
    }

    clearLongPressTimer();
    clearSingleClickTimer();
    skipToggleRef.current = true;
    draftNameRef.current = tag.name;
    onEditStart();
  };

  const startLongPress = () => {
    if (!editable || !onRename || !onEditStart) {
      return;
    }

    clearLongPressTimer();
    longPressTimerRef.current = window.setTimeout(() => {
      longPressTriggeredRef.current = true;
      startEdit();
    }, LONG_PRESS_MS);
  };

  const handleChipClick = () => {
    if (longPressTriggeredRef.current) {
      longPressTriggeredRef.current = false;
      return;
    }

    if (skipToggleRef.current) {
      skipToggleRef.current = false;
      return;
    }

    clearSingleClickTimer();
    singleClickTimerRef.current = window.setTimeout(() => {
      onToggle();
      singleClickTimerRef.current = null;
    }, SINGLE_CLICK_DELAY_MS);
  };

  const handleDoubleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    startEdit();
  };

  const cancelEdit = useCallback(() => {
    draftNameRef.current = tag.name;
    if (inputRef.current) {
      inputRef.current.value = tag.name;
    }
    onEditEnd?.();
  }, [onEditEnd, tag.name]);

  useEffect(() => {
    if (!isEditActive) {
      return;
    }

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target;
      if (!(target instanceof Node)) {
        return;
      }

      if (editContainerRef.current?.contains(target)) {
        return;
      }

      cancelEdit();
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
    };
  }, [cancelEdit, isEditActive]);

  const commitEdit = async () => {
    if (isSubmitting) {
      return;
    }

    const trimmed = (inputRef.current?.value ?? draftNameRef.current).trim();

    if (!trimmed) {
      cancelEdit();
      return;
    }

    if (createMode) {
      await onRename?.(trimmed);
      return;
    }

    if (trimmed === tag.name) {
      cancelEdit();
      return;
    }

    onEditEnd?.();
    await onRename?.(trimmed);
  };

  const chipClassName = cn(
    "inline-flex shrink-0 items-center rounded-full border text-[11px] font-medium transition-colors",
    selected
      ? "border-primary/25 bg-mint/35 text-primary"
      : "border-foreground/8 bg-card text-foreground/50",
  );

  if (isEditActive) {
    return (
      <div
        ref={editContainerRef}
        className="inline-flex shrink-0 items-center gap-0.5 rounded-full border border-primary/25 bg-mint/35 py-1 pl-2 pr-0.5"
      >
        {createMode ? (
          <TagIcon className="size-3 shrink-0 text-primary" aria-hidden />
        ) : null}
        <input
          ref={inputRef}
          id={inputId}
          name="recipeTagName"
          defaultValue={tag.name}
          placeholder={copy.createPlaceholder}
          onChange={(event) => {
            draftNameRef.current = event.target.value;
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              void commitEdit();
            }

            if (event.key === "Escape") {
              event.preventDefault();
              cancelEdit();
            }
          }}
          aria-label={createMode ? copy.createNew : copy.editName}
          className="min-w-[4.5rem] max-w-32 border-0 bg-transparent text-[11px] font-medium text-primary outline-none ring-0 focus:ring-0 placeholder:text-primary/40"
        />

        <button
          type="button"
          disabled={isSubmitting}
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => void commitEdit()}
          aria-label={copy.saveEdit}
          className="flex size-5 shrink-0 cursor-pointer items-center justify-center rounded-full text-primary transition-colors hover:bg-mint/50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Check className="size-3" strokeWidth={2.5} aria-hidden />
        </button>
      </div>
    );
  }

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
      <span>{tag.name}</span>
    </>
  );

  if (selected && onRemove) {
    return (
      <div className={chipClassName}>
        <button
          type="button"
          onClick={handleChipClick}
          onDoubleClick={editable ? handleDoubleClick : undefined}
          onTouchStart={editable ? startLongPress : undefined}
          onTouchEnd={clearLongPressTimer}
          onTouchMove={clearLongPressTimer}
          onContextMenu={(event) => event.preventDefault()}
          className="inline-flex cursor-pointer items-center gap-1 py-1 pr-0.5 pl-2"
        >
          {label}
        </button>
        <button
          type="button"
          onClick={onRemove}
          className="mr-1 flex size-4 cursor-pointer items-center justify-center rounded-full text-primary/70 transition-colors hover:bg-primary/10 hover:text-primary"
          aria-label={copy.remove(tag.name)}
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
      className={cn(chipClassName, "cursor-pointer gap-1 px-2 py-1")}
    >
      {label}
    </button>
  );
}
