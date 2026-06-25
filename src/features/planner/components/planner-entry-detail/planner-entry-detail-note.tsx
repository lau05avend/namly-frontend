import { PlannerSection } from "@/components/planner/planner-section";
import { PLANNER_COPY } from "@/features/planner/constants/planner-copy";
import { PLANNER_DETAIL_SECTION_CLASS } from "@/features/planner/constants/planner-detail-surfaces";
import { cn } from "@/lib/utils";
import { Pencil } from "lucide-react";

type PlannerEntryDetailNoteProps = {
  content: string;
  className?: string;
};

export function PlannerEntryDetailNote({
  content,
  className,
}: PlannerEntryDetailNoteProps) {
  if (!content.trim()) {
    return null;
  }

  return (
    <PlannerSection
      label={PLANNER_COPY.detail.noteLabel}
      className={cn(PLANNER_DETAIL_SECTION_CLASS, className)}
    >
      <div className="flex items-start gap-3 rounded-2xl border border-foreground/8 bg-card px-3 py-2.5">
        <span className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-highlight/40 text-foreground/70">
          <Pencil className="size-3.5" strokeWidth={1.5} aria-hidden />
        </span>
        <p className="pt-0.5 text-sm leading-relaxed text-foreground/85">
          {content}
        </p>
      </div>
    </PlannerSection>
  );
}
