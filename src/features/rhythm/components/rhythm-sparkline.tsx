import { cn } from "@/lib/utils";

type RhythmSparklineProps = {
  className?: string;
};

export function RhythmSparkline({ className }: RhythmSparklineProps) {
  return (
    <svg
      viewBox="0 0 52 28"
      fill="none"
      aria-hidden
      className={cn("h-7 w-12 shrink-0 opacity-80", className)}
    >
      <path
        d="M2 20 C10 8, 16 22, 24 12 S36 6, 50 16"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
