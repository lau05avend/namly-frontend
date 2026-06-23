import { RECIPES_COPY } from "@/features/recipes/constants/recipes-copy";
import type { RecipeDetailStep } from "@/features/recipes/types/recipe-detail.types";
import { Clock } from "lucide-react";

type RecipeDetailPreparationSectionProps = {
  steps: RecipeDetailStep[];
};

export function RecipeDetailPreparationSection({
  steps,
}: RecipeDetailPreparationSectionProps) {
  const copy = RECIPES_COPY.recipeDetail;
  const stepsCopy = RECIPES_COPY.create.steps;

  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-sm font-semibold text-foreground/80">
        {copy.sections.preparation}
      </h2>

      {steps.length === 0 ? (
        <p className="text-sm text-foreground/45">{copy.preparationEmpty}</p>
      ) : (
        <ol className="flex flex-col gap-3">
          {steps.map((step, index) => (
            <li
              key={`${step.stepOrder}-${index}`}
              className="rounded-xl border border-foreground/6 bg-card/40 px-3.5 py-3"
            >
              <div className="flex items-start gap-3">
                <span
                  className="flex size-7 shrink-0 items-center justify-center rounded-full bg-mint/45 text-sm font-semibold tabular-nums text-primary"
                  aria-hidden
                >
                  {index + 1}
                </span>

                <div className="min-w-0 flex-1 pt-0.5">
                  <p className="text-[15px] leading-relaxed text-foreground/85">
                    {step.description}
                  </p>

                  {step.durationMinutes != null && step.durationMinutes > 0 ? (
                    <p className="mt-1.5 inline-flex items-center gap-1 text-xs font-medium text-primary/60">
                      <Clock className="size-3.5" aria-hidden />
                      <span>
                        {step.durationMinutes} {stepsCopy.durationLabel}
                      </span>
                    </p>
                  ) : null}
                </div>
              </div>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
