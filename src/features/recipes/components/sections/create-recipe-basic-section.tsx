"use client";

import { useCallback, useLayoutEffect, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { RECIPES_COPY } from "@/features/recipes/constants/recipes-copy";
import type { CreateRecipeFormValues } from "@/features/recipes/schemas/create-recipe.schema";

function useAutoGrowTextarea(value: string) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const resize = useCallback(() => {
    const element = textareaRef.current;

    if (!element) {
      return;
    }

    element.style.height = "auto";
    element.style.height = `${element.scrollHeight}px`;
  }, []);

  useLayoutEffect(() => {
    resize();
  }, [resize, value]);

  return { textareaRef, resize };
}

export function CreateRecipeBasicSection() {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<CreateRecipeFormValues>();
  const copy = RECIPES_COPY.create.fields;
  const description = watch("description") ?? "";
  const { textareaRef, resize } = useAutoGrowTextarea(description);
  const { ref: descriptionRef, ...descriptionField } = register("description");

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <input
          {...register("title")}
          placeholder={copy.titlePlaceholder}
          aria-invalid={Boolean(errors.title)}
          className="w-full bg-transparent text-2xl font-semibold leading-tight text-foreground placeholder:text-foreground/30 focus-visible:outline-none"
        />
        {errors.title?.message ? (
          <p className="text-xs text-cta">{errors.title.message}</p>
        ) : null}
      </div>

      <div className="flex flex-col gap-1.5">
        {/* <label
          htmlFor="recipe-description"
          className="text-xs text-foreground/40"
        >
          {copy.descriptionLabel}{" "}
          <span className="text-foreground/30">({copy.descriptionOptional})</span>
        </label> */}

        <div className="border-l-2 border-primary/12 pl-3 transition-colors focus-within:border-primary/25">
          <textarea
            {...descriptionField}
            id="recipe-description"
            ref={(element) => {
              descriptionRef(element);
              textareaRef.current = element;
            }}
            placeholder={copy.descriptionPlaceholder}
            rows={1}
            onInput={resize}
            className="w-full resize-none overflow-hidden bg-transparent text-[15px] leading-relaxed text-foreground/65 placeholder:text-foreground/30 focus-visible:outline-none"
          />
        </div>
      </div>
    </div>
  );
}
