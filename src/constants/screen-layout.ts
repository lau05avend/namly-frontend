/** Shared chrome for main tab screens (history, planner, recipes). */
export const SCREEN_LAYOUT = {
  topBar:
    "border-b border-foreground/8 bg-background/95 backdrop-blur-sm",
  topBarInner: "mx-auto w-full max-w-lg px-4 py-3",
  content: "mx-auto w-full max-w-lg px-4",
  /** Offset for one fixed header row (title + actions). */
  mainOffset: "pt-[calc(env(safe-area-inset-top)+4.25rem)]",
  headerRow: "flex items-center justify-between gap-3",
  headerTitle: "text-xl font-bold text-foreground",
  headerActions: "flex items-center gap-2",
  iconButton:
    "flex size-9 cursor-pointer items-center justify-center rounded-full bg-card text-foreground/60 transition-colors hover:bg-mint/50 hover:text-primary",
  todayButton:
    "flex size-9 cursor-pointer items-center justify-center rounded-full bg-mint text-sm font-semibold text-primary transition-colors hover:bg-mint/80",
} as const;
