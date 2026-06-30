"use client";

import { useState, type ReactNode } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { ClearSelectionButton } from "@/components/ui/clear-selection-button";
import { RecipeTagChip } from "@/features/recipes/components/recipe-tag-chip";
import { AddMealLogTagsSheet } from "@/features/meal-register/components/add-meal-log-tags-sheet";
import { RegisterFormSection } from "@/features/meal-register/components/register-form-section";
import { RegisterTagsInfoHint } from "@/features/meal-register/components/register-tags-info-hint";
import { REGISTER_MEAL_COPY } from "@/features/meal-register/constants/register-meal-copy";
import type { RegisterMealFormValues } from "@/features/meal-register/schemas/register-meal.schema";
import { useMealLogTags } from "@/features/tags/queries/use-meal-log-tags";
import { Plus } from "lucide-react";

const copy = REGISTER_MEAL_COPY.tags;

type RegisterTagsAddLinkProps = {
  onClick: () => void;
};

function RegisterTagsAddLink({ onClick }: RegisterTagsAddLinkProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex w-fit shrink-0 cursor-pointer items-center gap-1 text-[13px] font-medium text-primary/60 transition-colors hover:text-primary"
    >
      <Plus className="size-3.5" strokeWidth={2.25} aria-hidden />
      {copy.add}
    </button>
  );
}

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

  const openPicker = () => setIsPickerOpen(true);

  const sectionShell = (children: ReactNode) => (
    <RegisterFormSection
      title={REGISTER_MEAL_COPY.sections.tags}
      headerAccessory={<RegisterTagsInfoHint />}
      className="gap-1"
    >
      {children}
    </RegisterFormSection>
  );

  if (isPending) {
    return sectionShell(
      <p className="text-sm text-foreground/50">{copy.loading}</p>,
    );
  }

  if (isError) {
    return sectionShell(
      <p className="text-sm text-foreground/60">{copy.loadError}</p>,
    );
  }

  return (
    <>
      {sectionShell(
        <div className="flex flex-wrap items-center gap-1.5">
          {selectedTags.map((tag) => (
            <RecipeTagChip
              key={tag.id}
              tag={tag}
              selected
              onToggle={openPicker}
              onRemove={() => removeTag(tag.id)}
            />
          ))}

          {selectedTags.length > 0 ? (
            <ClearSelectionButton
              onClick={clearTags}
              size="xs"
              className="shrink-0 text-foreground/35 hover:text-foreground/55"
            >
              {copy.clear}
            </ClearSelectionButton>
          ) : null}

          <RegisterTagsAddLink onClick={openPicker} />
        </div>,
      )}

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
