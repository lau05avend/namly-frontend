import {
  BookOpen,
  CalendarDays,
  Clock,
  FolderHeart,
  Home,
  Library,
  UserRound,
  type LucideIcon,
} from "lucide-react";

/** Module icons aligned with navigation and section headers. */
export const MODULE_ICONS = {
  recipes: BookOpen,
  collections: FolderHeart,
  planner: CalendarDays,
  history: Clock,
  profile: UserRound,
  home: Home,
  /** Tab icon for recipes library (nav); empty states use `recipes` (BookOpen). */
  recipesLibrary: Library,
} as const;

export type ModuleId = keyof typeof MODULE_ICONS;

export function getModuleIcon(module: ModuleId): LucideIcon {
  return MODULE_ICONS[module];
}
