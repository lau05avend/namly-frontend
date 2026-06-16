export const CALENDAR_LAYOUT_SPRING = {
  type: "spring" as const,
  stiffness: 220,
  damping: 28,
  mass: 0.9,
};

export const CALENDAR_ROW_FADE = {
  duration: 0.22,
  ease: [0.25, 0.1, 0.25, 1] as const,
};

export const CALENDAR_ROW_STAGGER = 0.04;
