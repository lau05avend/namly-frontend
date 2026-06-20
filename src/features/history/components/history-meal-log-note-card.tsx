import { PlannerSection } from "@/components/planner/planner-section";
import { HistoryDetailSurface } from "@/features/history/components/history-detail-surface";
import { HISTORY_COPY } from "@/features/history/constants/history-copy";
import { cn } from "@/lib/utils";
import { MessageCircle } from "lucide-react";

type HistoryMealLogNoteCardProps = {
  content: string;
  className?: string;
};

export function HistoryMealLogNoteCard({
  content,
  className,
}: HistoryMealLogNoteCardProps) {
  if (!content.trim()) {
    return null;
  }

  return (
    <PlannerSection
      label={HISTORY_COPY.noteLabel}
      className={cn("gap-2", className)}
    >
      <HistoryDetailSurface className="flex items-start gap-3 px-3.5 py-3">
        <MessageCircle
          className="mt-0.5 size-4 shrink-0 text-foreground/35"
          strokeWidth={1.75}
          aria-hidden
        />
        <p className="text-sm leading-relaxed text-foreground/85">{content}</p>
      </HistoryDetailSurface>
    </PlannerSection>
  );
}
