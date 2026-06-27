"use client";

type MealDateTimeInputsProps = {
  date: string;
  time: string;
  onDateChange: (value: string) => void;
  onTimeChange: (value: string) => void;
  dateLabel?: string;
  timeLabel?: string;
};

const inputClassName =
  "min-h-8 min-w-0 w-full max-w-full bg-transparent py-1 text-sm font-medium leading-normal text-foreground/70 outline-none";

export function MealDateTimeInputs({
  date,
  time,
  onDateChange,
  onTimeChange,
  dateLabel = "Fecha",
  timeLabel = "Hora",
}: MealDateTimeInputsProps) {
  return (
    <div className="grid min-w-0 flex-1 grid-cols-[minmax(0,1.15fr)_auto_minmax(0,0.85fr)] items-center gap-2">
      <input
        type="date"
        value={date}
        onChange={(event) => onDateChange(event.target.value)}
        aria-label={dateLabel}
        className={inputClassName}
      />
      <span className="h-5 w-px shrink-0 bg-foreground/10" aria-hidden />
      <input
        type="time"
        value={time}
        onChange={(event) => onTimeChange(event.target.value)}
        aria-label={timeLabel}
        className={inputClassName}
      />
    </div>
  );
}
