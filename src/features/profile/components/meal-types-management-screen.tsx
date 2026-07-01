"use client";

import { useMemo, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  type DragEndEvent,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  restrictToParentElement,
  restrictToVerticalAxis,
} from "@dnd-kit/modifiers";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { MealTypeEditorSheet } from "@/features/planner/components/meal-types/meal-type-editor-sheet";
import { MealTypeSortableRow } from "@/features/planner/components/meal-types/meal-type-sortable-row";
import { MEAL_TYPES_COPY } from "@/features/planner/constants/meal-types-copy";
import { useMealTypes } from "@/features/planner/queries/use-meal-types";
import { useReorderMealTypes } from "@/features/planner/queries/use-reorder-meal-types";
import type { MealType } from "@/features/planner/types/meal-type.types";
import {
  reorderMealTypesList,
  sortMealTypes,
} from "@/features/planner/utils/meal-type-order";
import { EditProfileHeader } from "@/features/profile/components/edit-profile-header";
import { PROFILE_SURFACES } from "@/features/profile/constants/profile-surfaces";
import { useAuth } from "@/hooks/use-auth";
import { getUserFacingErrorMessage } from "@/lib/api/get-user-facing-error-message";
import {
  resolveMealTypesBackLabel,
} from "@/lib/navigation/meal-types-return";
import { resolveInternalReturnPath } from "@/lib/navigation/resolve-internal-return-path";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";

type EditorState =
  | { kind: "closed" }
  | { kind: "create" }
  | { kind: "edit"; mealType: MealType };

type MealTypesManagementScreenProps = {
  returnTo?: string;
};

export function MealTypesManagementScreen({
  returnTo,
}: MealTypesManagementScreenProps) {
  const router = useRouter();
  const { isGuest, loading: authLoading } = useAuth();
  const safeReturnTo = resolveInternalReturnPath(returnTo);
  const backLabel = resolveMealTypesBackLabel(safeReturnTo);
  const { data: mealTypes, isPending, isError, refetch } = useMealTypes();
  const reorderMutation = useReorderMealTypes();
  const [editorState, setEditorState] = useState<EditorState>({ kind: "closed" });

  const sortedMealTypes = useMemo(
    () => sortMealTypes(mealTypes ?? []),
    [mealTypes],
  );

  const sortableIds = sortedMealTypes.map((mealType) => mealType.id);
  const isEditorOpen = editorState.kind !== "closed";
  const dragDisabled = isEditorOpen || reorderMutation.isPending;

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 6 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  useEffect(() => {
    if (authLoading || !isGuest) {
      return;
    }

    router.replace("/profile");
  }, [authLoading, isGuest, router]);

  const handleBack = () => {
    if (safeReturnTo) {
      router.replace(safeReturnTo);
      return;
    }

    router.push("/profile");
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id || dragDisabled) {
      return;
    }

    const fromIndex = sortedMealTypes.findIndex(
      (mealType) => mealType.id === active.id,
    );
    const toIndex = sortedMealTypes.findIndex(
      (mealType) => mealType.id === over.id,
    );

    if (fromIndex < 0 || toIndex < 0) {
      return;
    }

    const reordered = reorderMealTypesList(sortedMealTypes, fromIndex, toIndex);

    reorderMutation.mutate(
      { original: sortedMealTypes, reordered },
      {
        onError: (error) => {
          toast.error(
            getUserFacingErrorMessage(error, MEAL_TYPES_COPY.reorderError),
          );
        },
      },
    );
  };

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-lg flex-col bg-background px-4 pb-8">
      <EditProfileHeader
        title={MEAL_TYPES_COPY.management.title}
        subtitle={MEAL_TYPES_COPY.management.subtitle}
        backLabel={backLabel}
        onCancel={handleBack}
        withSave={false}
      />

      <div className="flex flex-1 flex-col gap-4 pt-4">
        {isPending ? (
          <p className="text-sm text-foreground/50">{MEAL_TYPES_COPY.loading}</p>
        ) : null}

        {isError ? (
          <div className="flex flex-col items-center gap-3 py-8 text-center">
            <p className="text-sm text-foreground/60">{MEAL_TYPES_COPY.loadError}</p>
            <button
              type="button"
              onClick={() => void refetch()}
              className="cursor-pointer text-sm font-semibold text-primary underline-offset-2 hover:underline"
            >
              Reintentar
            </button>
          </div>
        ) : null}

        {!isPending && !isError && sortedMealTypes.length === 0 ? (
          <p className="text-sm text-foreground/50">{MEAL_TYPES_COPY.empty}</p>
        ) : null}

        {!isPending && !isError && sortedMealTypes.length > 0 ? (
          <div className="flex flex-col gap-2">
            <p className="text-xs text-foreground/45">
              {MEAL_TYPES_COPY.management.reorderHint}
            </p>

            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              modifiers={[restrictToVerticalAxis, restrictToParentElement]}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={sortableIds}
                strategy={verticalListSortingStrategy}
              >
                <ul
                  className={cn(PROFILE_SURFACES.settingsCard, "relative overflow-hidden")}
                  data-vaul-no-drag
                >
                  {sortedMealTypes.map((mealType, index) => (
                    <MealTypeSortableRow
                      key={mealType.id}
                      mealType={mealType}
                      isFirst={index === 0}
                      isLast={index === sortedMealTypes.length - 1}
                      dragDisabled={dragDisabled}
                      onPress={() =>
                        setEditorState({ kind: "edit", mealType })
                      }
                    />
                  ))}
                </ul>
              </SortableContext>
            </DndContext>
          </div>
        ) : null}

        <Button
          type="button"
          variant="outline"
          onClick={() => setEditorState({ kind: "create" })}
          className="mt-auto"
        >
          <Plus className="size-4" aria-hidden />
          {MEAL_TYPES_COPY.management.newType}
        </Button>
      </div>

      <MealTypeEditorSheet
        open={isEditorOpen}
        onOpenChange={(open) => {
          if (!open) {
            setEditorState({ kind: "closed" });
          }
        }}
        mode={editorState.kind === "edit" ? "edit" : "create"}
        mealType={editorState.kind === "edit" ? editorState.mealType : undefined}
        existingMealTypes={sortedMealTypes}
      />
    </div>
  );
}
