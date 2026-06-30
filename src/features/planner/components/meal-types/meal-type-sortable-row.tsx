"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { MEAL_TYPES_COPY } from "@/features/planner/constants/meal-types-copy";
import type { MealType } from "@/features/planner/types/meal-type.types";
import { cn } from "@/lib/utils";
import { GripVertical } from "lucide-react";

const SORTABLE_TRANSITION = "transform 520ms cubic-bezier(0.22, 0.03, 0.26, 1)";

type MealTypeSortableRowProps = {
  mealType: MealType;
  isFirst?: boolean;
  isLast?: boolean;
  dragDisabled?: boolean;
  onPress: () => void;
};

export function MealTypeSortableRow({
  mealType,
  isFirst = false,
  isLast = false,
  dragDisabled = false,
  onPress,
}: MealTypeSortableRowProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: mealType.id,
    disabled: dragDisabled,
    transition: {
      duration: 480,
      easing: "cubic-bezier(0.22, 0.03, 0.26, 1)",
    },
  });

  return (
    <li
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition: isDragging ? undefined : (transition ?? SORTABLE_TRANSITION),
      }}
      className={cn(
        "relative flex items-center gap-2 border-b border-foreground/6 bg-card px-2.5 py-1 last:border-b-0",
        isDragging && "z-50 shadow-[0_10px_28px_-10px_rgba(30,45,34,0.14)]",
        isFirst && isLast && "rounded-2xl border-b-0",
        isFirst && !isLast && "rounded-t-2xl",
        isLast && !isFirst && "rounded-b-2xl border-b-0",
      )}
      {...attributes}
    >
      <button
        type="button"
        data-vaul-no-drag
        disabled={dragDisabled}
        aria-label={`${MEAL_TYPES_COPY.reorder} ${mealType.name}`}
        className={cn(
          "flex size-9 shrink-0 cursor-grab touch-none items-center justify-center rounded-full text-foreground/25 transition-colors active:cursor-grabbing",
          "hover:bg-mint/35 hover:text-foreground/45 disabled:cursor-not-allowed disabled:opacity-35",
        )}
        {...listeners}
      >
        <GripVertical className="size-4" strokeWidth={2} aria-hidden />
      </button>

      <button
        type="button"
        onClick={onPress}
        disabled={dragDisabled}
        className="min-w-0 flex-1 cursor-pointer rounded-xl px-1 py-2.5 text-left text-sm font-medium text-foreground/80 transition-colors hover:bg-mint/15 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {mealType.name}
      </button>
    </li>
  );
}
