"use client";

type MealDateTimeInputsProps = {
  date: string;
  time: string;
  onDateChange: (value: string) => void;
  onTimeChange: (value: string) => void;
  dateLabel?: string;
  timeLabel?: string;
};

export function MealDateTimeInputs({
  date,
  time,
  onDateChange,
  onTimeChange,
  dateLabel = "Fecha",
  timeLabel = "Hora",
}: MealDateTimeInputsProps) {
  return (
    <>
      <input
        type="date"
        value={date}
        onChange={(event) => onDateChange(event.target.value)}
        aria-label={dateLabel}
        className="min-h-8 w-[65%] shrink-0 bg-transparent py-1 text-sm font-medium leading-normal text-foreground/70 outline-none"
      />
      <span className="h-5 w-px shrink-0 bg-foreground/10" aria-hidden />
      <input
        type="time"
        value={time}
        onChange={(event) => onTimeChange(event.target.value)}
        aria-label={timeLabel}
        className="min-h-8 min-w-0 flex-1 bg-transparent py-1 text-sm font-medium leading-normal text-foreground/70 outline-none"
      />
    </>
  );
}
