"use client";

import { PLAN_MEAL_COPY } from "@/features/planner/constants/plan-meal-copy";
import { SurfaceCard } from "@/components/ui/surface-card";
import { cn } from "@/lib/utils";

type ExpressNoteFieldProps = {
  value: string;
  onChange: (value: string) => void;
  error?: string;
};

export function ExpressNoteField({
  value,
  onChange,
  error,
}: ExpressNoteFieldProps) {
  return (
    <SurfaceCard className="flex flex-col gap-2 p-4">
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        rows={4}
        placeholder={PLAN_MEAL_COPY.express.placeholder}
        className={cn(
          "w-full resize-none bg-transparent text-base text-foreground outline-none placeholder:text-foreground/40",
        )}
      />
      <p className="text-xs text-foreground/45">
        {PLAN_MEAL_COPY.express.hint}
      </p>
      {error ? <p className="text-xs text-destructive">{error}</p> : null}
    </SurfaceCard>
  );
}
