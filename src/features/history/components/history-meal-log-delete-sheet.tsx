"use client";

import { BottomSheet } from "@/components/ui/bottom-sheet";
import { Button } from "@/components/ui/button";
import { HISTORY_COPY } from "@/features/history/constants/history-copy";

type HistoryMealLogDeleteSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  isDeleting?: boolean;
};

export function HistoryMealLogDeleteSheet({
  open,
  onOpenChange,
  onConfirm,
  isDeleting = false,
}: HistoryMealLogDeleteSheetProps) {
  return (
    <BottomSheet
      open={open}
      onOpenChange={onOpenChange}
      title={HISTORY_COPY.deleteMealTitle}
      description={HISTORY_COPY.deleteMealDescription}
      footer={
        <div className="flex flex-col gap-2">
          <Button
            type="button"
            variant="cta"
            className="w-full bg-cta"
            disabled={isDeleting}
            onClick={onConfirm}
          >
            {HISTORY_COPY.deleteMealConfirm}
          </Button>
          <Button
            type="button"
            variant="ghost"
            className="w-full"
            disabled={isDeleting}
            onClick={() => onOpenChange(false)}
          >
            {HISTORY_COPY.deleteMealCancel}
          </Button>
        </div>
      }
    >
      <div className="pb-4" />
    </BottomSheet>
  );
}
