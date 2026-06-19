"use client";

import { useRef, useState } from "react";
import { format, getYear } from "date-fns";
import { es } from "date-fns/locale";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import { PlannedMealCompactPreview } from "@/components/meal/planned-meal-compact-preview";
import { BottomSheet } from "@/components/ui/bottom-sheet";
import { Button } from "@/components/ui/button";
import {
  addDays,
  parseDateKey,
  toDateKey,
} from "@/features/calendar/utils/date";
import { formatPlannedTimeLabel } from "@/features/history/utils/history-meal-log-plan.utils";
import { PlannerLoading } from "@/features/planner/components/planner-loading";
import { REGISTER_MEAL_COPY } from "@/features/meal-register/constants/register-meal-copy";
import { useRegisterPlanPicker } from "@/features/meal-register/queries/use-register-plan-picker";
import type { ScheduledMealSuggestion } from "@/features/meal-register/types/register-meal.types";
import { cn } from "@/lib/utils";

type LinkPlanSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultDate: string;
  onConfirm: (suggestion: ScheduledMealSuggestion) => void;
};

function capitalizeSentence(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function formatPickerDateLabel(dateKey: string, maxLength = 34): string {
  const parsed = parseDateKey(dateKey);
  if (!parsed) {
    return "—";
  }

  const includesYear = getYear(parsed) !== getYear(new Date());
  const variants = includesYear
    ? [
        "EEEE, d 'de' MMMM 'de' yyyy",
        "EEEE, d 'de' MMM 'de' yyyy",
        "EEE, d MMM yyyy",
        "d MMM yyyy",
      ]
    : [
        "EEEE, d 'de' MMMM",
        "EEEE, d 'de' MMM",
        "EEE, d MMM",
        "d MMM",
      ];

  const labels = variants.map((pattern) =>
    capitalizeSentence(format(parsed, pattern, { locale: es })),
  );

  return (
    labels.find((label) => label.length <= maxLength) ??
    labels[labels.length - 1]
  );
}

function shiftBrowseDate(dateKey: string, deltaDays: number): string {
  const parsed = parseDateKey(dateKey) ?? new Date();
  return toDateKey(addDays(parsed, deltaDays));
}

export function LinkPlanSheet({
  open,
  onOpenChange,
  defaultDate,
  onConfirm,
}: LinkPlanSheetProps) {
  const dateInputRef = useRef<HTMLInputElement>(null);
  const [browseDate, setBrowseDate] = useState(defaultDate);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const { data: meals = [], isPending, isError } = useRegisterPlanPicker(
    browseDate,
    open,
  );

  const selectedMeal = meals.find((meal) => meal.id === selectedId);
  const browseDateLabel = formatPickerDateLabel(browseDate);

  const updateBrowseDate = (nextDate: string) => {
    if (!parseDateKey(nextDate)) {
      return;
    }

    setBrowseDate(nextDate);
    setSelectedId(null);
  };

  const openNativeDatePicker = () => {
    const input = dateInputRef.current;
    if (!input) {
      return;
    }

    input.focus();

    try {
      input.showPicker();
    } catch {
      // showPicker is not supported in every browser.
    }
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      setSelectedId(null);
    }

    onOpenChange(nextOpen);
  };

  const handleConfirm = () => {
    if (!selectedMeal) {
      return;
    }

    onConfirm(selectedMeal);
    handleOpenChange(false);
  };

  return (
    <BottomSheet
      open={open}
      onOpenChange={handleOpenChange}
      scrollableContent={false}
      title={REGISTER_MEAL_COPY.plan.pickerTitle}
      description={REGISTER_MEAL_COPY.plan.pickerDescription}
      footer={
        <div className="flex flex-col gap-2">
          <Button
            type="button"
            onClick={handleConfirm}
            disabled={!selectedMeal}
          >
            {REGISTER_MEAL_COPY.plan.pickerConfirm}
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => handleOpenChange(false)}
          >
            {REGISTER_MEAL_COPY.plan.cancel}
          </Button>
        </div>
      }
    >
      <div className="flex min-h-0 flex-1 flex-col gap-4">
        <div className="mb-1 shrink-0">
          <div
            data-vaul-no-drag
            className="flex items-center gap-0.5 rounded-lg border border-foreground/10 bg-card p-0.5"
          >
            <button
              type="button"
              data-vaul-no-drag
              onClick={() => updateBrowseDate(shiftBrowseDate(browseDate, -1))}
              aria-label="Día anterior"
              className="flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-md text-primary transition-colors hover:bg-mint/30"
            >
              <ChevronLeft className="size-3.5" aria-hidden />
            </button>

            <button
              type="button"
              data-vaul-no-drag
              onClick={openNativeDatePicker}
              className="flex min-w-0 flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-md px-2 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-mint/20"
            >
              <CalendarDays className="size-3.5 shrink-0 text-primary" aria-hidden />
              <span className="truncate">{browseDateLabel}</span>
            </button>

            <button
              type="button"
              data-vaul-no-drag
              onClick={() => updateBrowseDate(shiftBrowseDate(browseDate, 1))}
              aria-label="Día siguiente"
              className="flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-md text-primary transition-colors hover:bg-mint/30"
            >
              <ChevronRight className="size-3.5" aria-hidden />
            </button>

            <input
              ref={dateInputRef}
              type="date"
              value={browseDate}
              tabIndex={-1}
              aria-hidden
              data-vaul-no-drag
              onChange={(event) => updateBrowseDate(event.target.value)}
              className="pointer-events-none absolute h-0 w-0 opacity-0"
            />
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto">
          {isPending ? (
            <PlannerLoading variant="compact" />
          ) : isError ? (
            <p className="py-6 text-center text-sm text-foreground/50">
              {REGISTER_MEAL_COPY.errors.load}
            </p>
          ) : meals.length === 0 ? (
            <p className="py-6 text-center text-sm text-foreground/50">
              {REGISTER_MEAL_COPY.plan.pickerEmpty}
            </p>
          ) : (
            <ul className="flex flex-col gap-2 pb-2">
              {meals.map((meal) => {
                const isSelected = meal.id === selectedId;
                const previewItems = meal.recipes.map((recipe) => ({
                  id: recipe.id,
                  label: recipe.title,
                }));

                return (
                  <li key={meal.id}>
                    <button
                      type="button"
                      onClick={() => setSelectedId(meal.id)}
                      aria-pressed={isSelected}
                      className={cn(
                        "w-full rounded-xl border px-3 py-2.5 text-left transition-colors",
                        isSelected
                          ? "border-primary/40 bg-mint/30"
                          : "border-foreground/8 bg-card/40 hover:bg-mint/10",
                      )}
                    >
                      <PlannedMealCompactPreview
                        icon="salad"
                        slotLabel={meal.mealType.name.toUpperCase()}
                        timeLabel={formatPlannedTimeLabel(meal.plannedTime)}
                        items={previewItems}
                        expressNote={
                          meal.isExpress ? meal.expressNote : null
                        }
                      />
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </BottomSheet>
  );
}
