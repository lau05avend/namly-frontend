"use client";

import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { RECIPES_COPY } from "@/features/recipes/constants/recipes-copy";
import { useSaveRecipeInteractions } from "@/features/recipes/queries/use-save-recipe-interactions";
import { useAutoGrowTextarea } from "@/hooks/use-auto-grow-textarea";
import { getUserFacingErrorMessage } from "@/lib/api/get-user-facing-error-message";

type RecipeDetailOpinionSectionProps = {
  recipeId: string;
  initialComment: string | null;
};

function RecipeDetailOpinionEditor({
  recipeId,
  initialComment,
}: RecipeDetailOpinionSectionProps) {
  const copy = RECIPES_COPY.recipeDetail;
  const [opinion, setOpinion] = useState(initialComment ?? "");
  const lastSavedRef = useRef(initialComment ?? "");
  const updateMutation = useSaveRecipeInteractions();
  const { textareaRef, resize } = useAutoGrowTextarea(opinion);

  useEffect(() => {
    const trimmed = opinion.trim();
    const savedTrimmed = lastSavedRef.current.trim();

    if (trimmed === savedTrimmed) {
      return;
    }

    const timeout = window.setTimeout(() => {
      void (async () => {
        const previous = lastSavedRef.current;

        try {
          await updateMutation.mutateAsync({
            recipeId,
            payload: {
              publicComment: trimmed.length > 0 ? trimmed : null,
            },
          });
          lastSavedRef.current = trimmed;
        } catch (error) {
          setOpinion(previous);
          toast.error(getUserFacingErrorMessage(error, copy.feedbackError));
        }
      })();
    }, 700);

    return () => window.clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- debounce opinion only
  }, [opinion, recipeId]);

  return (
    <section className="flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <h2 className="text-sm font-semibold text-foreground/80">
          {copy.sections.opinion}
        </h2>
        <p className="text-xs text-foreground/40">{copy.opinionPlaceholder}</p>
      </div>

      <div className="border-l-2 border-primary/12 pl-3 transition-colors focus-within:border-primary/25">
        <textarea
          ref={textareaRef}
          value={opinion}
          rows={2}
          placeholder={copy.opinionExamples}
          onChange={(event) => {
            setOpinion(event.target.value);
          }}
          onInput={resize}
          className="w-full resize-none overflow-hidden bg-transparent text-[15px] leading-relaxed text-foreground/70 placeholder:text-foreground/30 focus-visible:outline-none"
        />
      </div>
    </section>
  );
}

export function RecipeDetailOpinionSection({
  recipeId,
  initialComment,
}: RecipeDetailOpinionSectionProps) {
  return (
    <RecipeDetailOpinionEditor
      key={recipeId}
      recipeId={recipeId}
      initialComment={initialComment}
    />
  );
}
