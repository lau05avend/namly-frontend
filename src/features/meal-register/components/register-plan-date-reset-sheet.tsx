"use client";

import { BottomSheet } from "@/components/ui/bottom-sheet";
import { Button } from "@/components/ui/button";
import { REGISTER_MEAL_COPY } from "@/features/meal-register/constants/register-meal-copy";

type RegisterPlanDateResetSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
};

export function RegisterPlanDateResetSheet({
  open,
  onOpenChange,
  onConfirm,
}: RegisterPlanDateResetSheetProps) {
  return (
    <BottomSheet
      open={open}
      onOpenChange={onOpenChange}
      compact
      title={REGISTER_MEAL_COPY.plan.dateReset.title}
      description={REGISTER_MEAL_COPY.plan.dateReset.description}
      footer={
        <div className="flex flex-col gap-2.5">
          <Button type="button" className="w-full" onClick={onConfirm}>
            {REGISTER_MEAL_COPY.plan.dateReset.confirm}
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="w-full"
            onClick={() => onOpenChange(false)}
          >
            {REGISTER_MEAL_COPY.plan.dateReset.cancel}
          </Button>
        </div>
      }
    />
  );
}
