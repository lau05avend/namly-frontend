"use client";

import { useCallback, useEffect, useRef } from "react";
import { MEAL_TYPES_COPY } from "@/features/planner/constants/meal-types-copy";
import { Check } from "lucide-react";

type MealTypeCreateRowProps = {
  initialName: string;
  isSubmitting: boolean;
  onConfirm: (name: string) => void;
  onCancel: () => void;
};

export function MealTypeCreateRow({
  initialName,
  isSubmitting,
  onConfirm,
  onCancel,
}: MealTypeCreateRowProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const draftNameRef = useRef(initialName);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      inputRef.current?.focus();
      inputRef.current?.select();
    });

    return () => cancelAnimationFrame(frame);
  }, []);

  const cancel = useCallback(() => {
    draftNameRef.current = initialName;
    if (inputRef.current) {
      inputRef.current.value = initialName;
    }
    onCancel();
  }, [initialName, onCancel]);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      const target = event.target;
      if (!(target instanceof Node)) {
        return;
      }

      if (containerRef.current?.contains(target)) {
        return;
      }

      cancel();
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
    };
  }, [cancel]);

  const commit = () => {
    if (isSubmitting) {
      return;
    }

    const trimmed = (inputRef.current?.value ?? draftNameRef.current).trim();

    if (!trimmed) {
      cancel();
      return;
    }

    onConfirm(trimmed);
  };

  return (
    <li>
      <div
        ref={containerRef}
        className="flex w-full items-center gap-2 rounded-2xl bg-mint/35 px-3 py-2.5 text-primary"
      >
        <input
          ref={inputRef}
          defaultValue={initialName}
          placeholder={MEAL_TYPES_COPY.selectSheet.createPlaceholder}
          onChange={(event) => {
            draftNameRef.current = event.target.value;
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              commit();
            }

            if (event.key === "Escape") {
              event.preventDefault();
              cancel();
            }
          }}
          aria-label={MEAL_TYPES_COPY.selectSheet.createNew}
          className="min-w-0 flex-1 bg-transparent text-sm font-medium outline-none placeholder:text-primary/40"
        />

        <button
          type="button"
          disabled={isSubmitting}
          onMouseDown={(event) => event.preventDefault()}
          onClick={commit}
          aria-label={MEAL_TYPES_COPY.selectSheet.confirmCreate}
          className="flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full text-primary transition-colors hover:bg-mint/50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Check className="size-4" strokeWidth={2.5} aria-hidden />
        </button>
      </div>
    </li>
  );
}
