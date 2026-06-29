"use client";

import { useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { ClearSelectionButton } from "@/components/ui/clear-selection-button";
import { RecipeTagChip } from "@/features/recipes/components/recipe-tag-chip";
import { AddMealLogTagsSheet } from "@/features/meal-register/components/add-meal-log-tags-sheet";
import { REGISTER_MEAL_COPY } from "@/features/meal-register/constants/register-meal-copy";
import type { RegisterMealFormValues } from "@/features/meal-register/schemas/register-meal.schema";
import { useMealLogTags } from "@/features/tags/queries/use-meal-log-tags";
import { Plus } from "lucide-react";

const copy = REGISTER_MEAL_COPY.tags;

export function RegisterTagsSection() {
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const { control, setValue } = useFormContext<RegisterMealFormValues>();
  const selectedTags = useWatch({ control, name: "tags" }) ?? [];

  const {
    data: availableTags = [],
    isPending,
    isError,
  } = useMealLogTags();

  const removeTag = (tagId: string) => {
    setValue(
      "tags",
      selectedTags.filter((tag) => tag.id !== tagId),
      { shouldDirty: true },
    );
  };

  const clearTags = () => {
    setValue("tags", [], { shouldDirty: true });
  };

  if (isPending) {
    return (
      <section className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <h2 className="text-sm font-semibold text-foreground/80">
            {copy.tagsEmpty}
          </h2>
          <p className="text-xs text-foreground/40">{copy.tagsEmptyHint}</p>
        </div>
        <p className="text-sm text-foreground/50">{copy.loading}</p>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <h2 className="text-sm font-semibold text-foreground/80">
            {copy.tagsEmpty}
          </h2>
          <p className="text-xs text-foreground/40">{copy.tagsEmptyHint}</p>
        </div>
        <p className="text-sm text-foreground/60">{copy.loadError}</p>
      </section>
    );
  }

  return (
    <>
      <section className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <h2 className="text-sm font-semibold text-foreground/80">
            {copy.tagsEmpty}
          </h2>
          <p className="text-xs text-foreground/40">{copy.tagsEmptyHint}</p>
        </div>

        <div className="flex flex-col gap-3">
          {selectedTags.length > 0 ? (
            <div className="flex flex-wrap items-center gap-1.5">
              {selectedTags.map((tag) => (
                <RecipeTagChip
                  key={tag.id}
                  tag={tag}
                  selected
                  onToggle={() => removeTag(tag.id)}
                  onRemove={() => removeTag(tag.id)}
                />
              ))}

              <ClearSelectionButton
                onClick={clearTags}
                size="xs"
                className="shrink-0 text-foreground/35 hover:text-foreground/55"
              >
                {copy.clear}
              </ClearSelectionButton>
            </div>
          ) : null}

          <button
            type="button"
            onClick={() => setIsPickerOpen(true)}
            className="inline-flex w-fit cursor-pointer items-center gap-1 text-[13px] font-medium text-primary/60 transition-colors hover:text-primary"
          >
            <Plus className="size-3.5" strokeWidth={2.25} aria-hidden />
            {copy.add}
          </button>
        </div>
      </section>

      <AddMealLogTagsSheet
        open={isPickerOpen}
        onOpenChange={setIsPickerOpen}
        availableTags={availableTags}
        selectedTags={selectedTags}
        onConfirm={(tags) => {
          setValue("tags", tags, { shouldDirty: true });
        }}
      />
    </>
  );
}
