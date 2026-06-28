"use client";

import { useMemo, useState } from "react";
import { BottomSheet } from "@/components/ui/bottom-sheet";
import { Input } from "@/components/ui/input";
import { RECIPES_COPY } from "@/features/recipes/constants/recipes-copy";
import type { MeasurementUnit } from "@/features/recipes/types/measurement-unit.types";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

type MeasurementUnitPickerSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  ingredientIndex: number | null;
  units: MeasurementUnit[];
  selectedUnitId?: string;
  onSelect: (unitId: string, ingredientIndex: number) => void;
};

function normalizeSearch(value: string): string {
  return value.trim().toLocaleLowerCase("es");
}

export function MeasurementUnitPickerSheet({
  open,
  onOpenChange,
  ingredientIndex,
  units,
  selectedUnitId,
  onSelect,
}: MeasurementUnitPickerSheetProps) {
  const copy = RECIPES_COPY.create.ingredients;
  const [search, setSearch] = useState("");

  const handleOpenChange = (nextOpen: boolean) => {
    onOpenChange(nextOpen);

    if (!nextOpen) {
      setSearch("");
    }
  };

  const normalizedSearch = normalizeSearch(search);

  const filteredUnits = useMemo(() => {
    if (!normalizedSearch) {
      return units;
    }

    return units.filter(
      (unit) =>
        normalizeSearch(unit.name).includes(normalizedSearch) ||
        normalizeSearch(unit.abbreviation).includes(normalizedSearch),
    );
  }, [normalizedSearch, units]);

  const handleSelect = (unitId: string) => {
    if (ingredientIndex == null) {
      return;
    }

    onSelect(unitId, ingredientIndex);
    handleOpenChange(false);
  };

  return (
    <BottomSheet
      open={open}
      onOpenChange={handleOpenChange}
      title={copy.unitPickerTitle}
      compact
      scrollableContent={false}
    >
      <div className="flex min-h-0 flex-1 flex-col">
        <div className="shrink-0 border-b border-foreground/6 pb-3 pt-1">
          <div className="relative">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-foreground/35" />
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={copy.unitSearchPlaceholder}
              className="h-11 pl-9 text-sm"
            />
          </div>
        </div>

        <ul className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto py-3 pb-4">
          {filteredUnits.map((unit) => {
            const selected = unit.id === selectedUnitId;

            return (
              <li key={unit.id}>
                <button
                  type="button"
                  onClick={() => handleSelect(unit.id)}
                  className={cn(
                    "flex w-full cursor-pointer items-center justify-between gap-3 rounded-2xl px-3 py-2.5 text-left transition-colors",
                    selected
                      ? "bg-mint/35 text-primary"
                      : "bg-card text-foreground/70 hover:bg-mint/20",
                  )}
                >
                  <span className="text-sm font-medium">{unit.name}</span>
                  <span className="text-xs font-semibold uppercase tracking-wide opacity-70">
                    {unit.abbreviation}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </BottomSheet>
  );
}
