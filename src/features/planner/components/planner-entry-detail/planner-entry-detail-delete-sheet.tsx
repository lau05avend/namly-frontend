"use client";

import { BottomSheet } from "@/components/ui/bottom-sheet";
import { Button } from "@/components/ui/button";
import { PLANNER_COPY } from "@/features/planner/constants/planner-copy";

type PlannerEntryDetailDeleteSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  isDeleting?: boolean;
};

export function PlannerEntryDetailDeleteSheet({
  open,
  onOpenChange,
  onConfirm,
  isDeleting = false,
}: PlannerEntryDetailDeleteSheetProps) {
  const copy = PLANNER_COPY.detail;

  return (
    <BottomSheet
      open={open}
      onOpenChange={onOpenChange}
      title={copy.deletePlanTitle}
      description={copy.deletePlanDescription}
      footer={
        <div className="flex flex-col gap-2">
          <Button
            type="button"
            variant="cta"
            className="w-full bg-cta"
            disabled={isDeleting}
            onClick={onConfirm}
          >
            {copy.deletePlanConfirm}
          </Button>
          <Button
            type="button"
            variant="ghost"
            className="w-full"
            disabled={isDeleting}
            onClick={() => onOpenChange(false)}
          >
            {copy.deletePlanCancel}
          </Button>
        </div>
      }
    >
      <div className="pb-4" />
    </BottomSheet>
  );
}
