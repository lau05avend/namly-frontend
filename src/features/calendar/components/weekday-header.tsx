import { WEEKDAY_LABELS_SHORT } from "@/features/calendar/constants/weekday-labels";

export function WeekdayHeader() {
  return (
    <div className="grid grid-cols-7 gap-1" aria-hidden>
      {WEEKDAY_LABELS_SHORT.map((label) => (
        <span
          key={label}
          className="py-1 text-center text-[11px] font-medium tracking-wide text-foreground/45"
        >
          {label}
        </span>
      ))}
    </div>
  );
}
