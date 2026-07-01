"use client";

import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { BottomSheet } from "@/components/ui/bottom-sheet";
import { Input } from "@/components/ui/input";
import { MealTypeCreateRow } from "@/features/planner/components/meal-types/meal-type-create-row";
import { MealTypeSettingsLink } from "@/features/planner/components/meal-types/meal-type-settings-link";
import { MEAL_TYPES_COPY } from "@/features/planner/constants/meal-types-copy";
import { useCreateMealType } from "@/features/planner/queries/use-create-meal-type";
import { useMealTypes } from "@/features/planner/queries/use-meal-types";
import type { MealType } from "@/features/planner/types/meal-type.types";
import {
  getNextSortOrder,
  normalizeMealTypeName,
  sortMealTypes,
} from "@/features/planner/utils/meal-type-order";
import { getUserFacingErrorMessage } from "@/lib/api/get-user-facing-error-message";
import {
  buildMealTypesManagementPath,
  resolveFormReturnPath,
} from "@/lib/navigation/meal-types-return";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";
import { Check, Plus, Search } from "lucide-react";

type SelectMealTypeSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedId: string;
  onSelect: (mealTypeId: string) => void;
};

export function SelectMealTypeSheet({
  open,
  onOpenChange,
  selectedId,
  onSelect,
}: SelectMealTypeSheetProps) {
  const router = useRouter();
  const { isGuest } = useAuth();
  const { data: mealTypes, isPending, isError } = useMealTypes();
  const createMutation = useCreateMealType();
  const [search, setSearch] = useState("");
  const [creatingMealTypeName, setCreatingMealTypeName] = useState<string | null>(
    null,
  );
  const searchInputRef = useRef<HTMLInputElement>(null);

  const sortedMealTypes = useMemo(
    () => sortMealTypes(mealTypes ?? []),
    [mealTypes],
  );

  const trimmedSearch = search.trim();
  const normalizedSearch = normalizeMealTypeName(search);

  const filteredMealTypes = useMemo(() => {
    if (!normalizedSearch) {
      return sortedMealTypes;
    }

    return sortedMealTypes.filter((mealType) =>
      normalizeMealTypeName(mealType.name).includes(normalizedSearch),
    );
  }, [normalizedSearch, sortedMealTypes]);

  const canAddFromSearch = useMemo(() => {
    if (!normalizedSearch) {
      return false;
    }

    return !sortedMealTypes.some(
      (mealType) => normalizeMealTypeName(mealType.name) === normalizedSearch,
    );
  }, [normalizedSearch, sortedMealTypes]);

  const creationChipLabel = trimmedSearch
    ? MEAL_TYPES_COPY.selectSheet.createNamed(trimmedSearch)
    : MEAL_TYPES_COPY.selectSheet.createNew;

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      setSearch("");
      setCreatingMealTypeName(null);
    }

    onOpenChange(nextOpen);
  };

  const handleSelect = (mealTypeId: string) => {
    onSelect(mealTypeId);
    handleOpenChange(false);
  };

  const startCreatingMealType = (initialName = "") => {
    setCreatingMealTypeName(initialName);

    if (initialName) {
      setSearch("");
    }
  };

  const cancelCreatingMealType = () => {
    setCreatingMealTypeName(null);
  };

  const handleCreateConfirm = async (name: string) => {
    const trimmed = name.trim();

    if (!trimmed) {
      return;
    }

    const normalized = normalizeMealTypeName(trimmed);
    const exists = sortedMealTypes.some(
      (mealType) => normalizeMealTypeName(mealType.name) === normalized,
    );

    if (exists) {
      toast.error(MEAL_TYPES_COPY.duplicateName);
      return;
    }

    try {
      const created = await createMutation.mutateAsync({
        name: trimmed,
        sortOrder: getNextSortOrder(sortedMealTypes),
      });

      toast.success(MEAL_TYPES_COPY.createSuccess);
      setCreatingMealTypeName(null);
      onSelect(created.id);
      handleOpenChange(false);
    } catch (error) {
      toast.error(
        getUserFacingErrorMessage(error, MEAL_TYPES_COPY.saveError),
      );
    }
  };

  const handleCreateChipClick = () => {
    if (creatingMealTypeName != null) {
      return;
    }

    if (canAddFromSearch) {
      startCreatingMealType(trimmedSearch);
      return;
    }

    startCreatingMealType("");
  };

  const handleManageTypes = () => {
    handleOpenChange(false);

    const returnTo =
      typeof window !== "undefined"
        ? resolveFormReturnPath(
            window.location.pathname,
            window.location.search,
          )
        : null;

    router.push(buildMealTypesManagementPath(returnTo));
  };

  const isCreatingChipDisabled =
    isGuest ||
    createMutation.isPending ||
    creatingMealTypeName != null ||
    (Boolean(trimmedSearch) && !canAddFromSearch);

  return (
    <BottomSheet
      open={open}
      onOpenChange={handleOpenChange}
      title={MEAL_TYPES_COPY.selectSheet.title}
      description={MEAL_TYPES_COPY.selectSheet.subtitle}
      headerAccessory={
        isGuest ? null : (
          <div className="flex justify-center">
            <MealTypeSettingsLink onPress={handleManageTypes} />
          </div>
        )
      }
      compact
      scrollableContent={false}
    >
      <div className="flex min-h-0 flex-1 flex-col">
        <div className="flex shrink-0 flex-col gap-3 border-b border-foreground/6 pb-3 pt-1">
          <div className="relative">
            <Search
              className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-foreground/35"
              aria-hidden
            />
            <Input
              ref={searchInputRef}
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={MEAL_TYPES_COPY.selectSheet.searchPlaceholder}
              className="h-11 pl-9 text-sm"
            />
          </div>

          {isGuest ? null : (
            <button
              type="button"
              disabled={isCreatingChipDisabled}
              onClick={handleCreateChipClick}
              className={cn(
                "inline-flex w-full cursor-pointer items-center gap-2 rounded-2xl border border-dashed px-3 py-2.5 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-60",
                isCreatingChipDisabled
                  ? "border-foreground/10 bg-card/40 text-foreground/30"
                  : trimmedSearch && canAddFromSearch
                    ? "border-primary/30 bg-mint/20 text-primary hover:bg-mint/30"
                    : "border-foreground/12 bg-card/60 text-foreground/50 hover:border-foreground/18 hover:bg-card hover:text-foreground/65",
              )}
            >
              <Plus
                className={cn(
                  "size-4 shrink-0",
                  isCreatingChipDisabled ? "text-foreground/30" : "text-primary",
                )}
                aria-hidden
              />
              {creationChipLabel}
            </button>
          )}
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto py-3 pb-4">
          {isPending ? (
            <p className="text-sm text-foreground/50">{MEAL_TYPES_COPY.loading}</p>
          ) : null}

          {isError ? (
            <p className="text-sm text-foreground/60">{MEAL_TYPES_COPY.loadError}</p>
          ) : null}

          {!isPending && !isError ? (
            <ul className="flex flex-col gap-1">
              {creatingMealTypeName != null ? (
                <MealTypeCreateRow
                  initialName={creatingMealTypeName}
                  isSubmitting={createMutation.isPending}
                  onConfirm={(name) => void handleCreateConfirm(name)}
                  onCancel={cancelCreatingMealType}
                />
              ) : null}

              {filteredMealTypes.length > 0 ? (
                filteredMealTypes.map((mealType) => (
                  <MealTypeSelectRow
                    key={mealType.id}
                    mealType={mealType}
                    selected={mealType.id === selectedId}
                    onSelect={() => handleSelect(mealType.id)}
                  />
                ))
              ) : creatingMealTypeName == null ? (
                normalizedSearch ? (
                  <p className="py-2 text-sm text-foreground/50">
                    {MEAL_TYPES_COPY.selectSheet.emptySearch}
                  </p>
                ) : (
                  <p className="py-2 text-sm text-foreground/50">
                    {MEAL_TYPES_COPY.empty}
                  </p>
                )
              ) : null}
            </ul>
          ) : null}
        </div>
      </div>
    </BottomSheet>
  );
}

type MealTypeSelectRowProps = {
  mealType: MealType;
  selected: boolean;
  onSelect: () => void;
};

function MealTypeSelectRow({
  mealType,
  selected,
  onSelect,
}: MealTypeSelectRowProps) {
  return (
    <li>
      <button
        type="button"
        onClick={onSelect}
        className={cn(
          "flex w-full cursor-pointer items-center gap-2 rounded-2xl px-3 py-3 text-left transition-colors",
          selected
            ? "bg-mint/35 text-primary"
            : "bg-card text-foreground/80 hover:bg-mint/15",
        )}
      >
        <span className="min-w-0 flex-1 text-sm font-medium">{mealType.name}</span>

        {mealType.isFrequent ? (
          <span className="shrink-0 rounded-full bg-mint/40 px-2 py-0.5 text-[10px] font-semibold text-primary">
            {MEAL_TYPES_COPY.selectSheet.habitualBadge}
          </span>
        ) : null}

        {selected ? (
          <Check className="size-4 shrink-0 text-primary" aria-hidden />
        ) : null}
      </button>
    </li>
  );
}
