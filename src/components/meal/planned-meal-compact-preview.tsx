import { cn } from "@/lib/utils";
import { CircleCheck } from "lucide-react";

export type PlannedMealPreviewItem = {
  id: string;
  label: string;
};

type PlannedMealCompactPreviewProps = {
  slotLabel?: string;
  timeLabel?: string;
  items?: PlannedMealPreviewItem[];
  expressNote?: string | null;
  className?: string;
};

function PreviewMetaRow({
  slotLabel,
  timeLabel,
}: {
  slotLabel: string;
  timeLabel: string;
}) {
  return (
    <p className="flex min-w-0 items-center gap-1.5 truncate text-[10px] font-semibold text-foreground/40">
      <span className="tracking-wider uppercase">{slotLabel}</span>
      <span className="text-foreground/25">·</span>
      <span className="font-semibold text-foreground/50">{timeLabel}</span>
    </p>
  );
}

function PreviewIcon() {
  return (
    <span className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary/80">
      <CircleCheck className="size-3.5" aria-hidden />
    </span>
  );
}

export function PlannedMealCompactPreview({
  slotLabel,
  timeLabel,
  items = [],
  expressNote,
  className,
}: PlannedMealCompactPreviewProps) {
  const trimmedExpressNote = expressNote?.trim() ?? "";
  const isExpress = trimmedExpressNote.length > 0 && items.length === 0;
  const showMeta = Boolean(slotLabel && timeLabel);
  const recipeLine = items.map((item) => item.label).join(", ");

  if (isExpress) {
    return (
      <div className={cn("flex items-start gap-2.5", className)}>
        <PreviewIcon />
        <div className="min-w-0 flex-1">
          {showMeta ? (
            <PreviewMetaRow
              slotLabel={slotLabel!}
              timeLabel={timeLabel!}
            />
          ) : null}
          <p className="mt-0.5 truncate text-xs leading-snug text-foreground/55">
            {trimmedExpressNote}
          </p>
        </div>
      </div>
    );
  }

  if (items.length > 0) {
    return (
      <div className={cn("flex items-start gap-2.5", className)}>
        <PreviewIcon />
        <div className="min-w-0 flex-1">
          {showMeta ? (
            <PreviewMetaRow
              slotLabel={slotLabel!}
              timeLabel={timeLabel!}
            />
          ) : null}
          <p
            className={cn(
              "truncate text-xs leading-snug text-foreground/55",
              showMeta ? "mt-0.5" : null,
            )}
          >
            {recipeLine}
          </p>
        </div>
      </div>
    );
  }

  if (!showMeta) {
    return null;
  }

  return (
    <div className={cn("flex items-start gap-2.5", className)}>
      <PreviewIcon />
      <div className="min-w-0 flex-1">
        <PreviewMetaRow slotLabel={slotLabel!} timeLabel={timeLabel!} />
      </div>
    </div>
  );
}
