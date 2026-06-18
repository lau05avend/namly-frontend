"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  BookOpen,
  CalendarDays,
  Clock,
  Home,
  UserRound,
  type LucideIcon,
} from "lucide-react";

export type BottomNavItem = {
  id: string;
  href: string;
  label: string;
  icon: LucideIcon;
};

const DEFAULT_ITEMS: BottomNavItem[] = [
  { id: "history", href: "/history", label: "Historial", icon: Clock },
  { id: "planner", href: "/planner", label: "Plan", icon: BookOpen },
  { id: "home", href: "/home", label: "Inicio", icon: Home },
  { id: "calendar", href: "/planner", label: "Calendario", icon: CalendarDays },
  { id: "profile", href: "/profile", label: "Perfil", icon: UserRound },
];

type BottomNavProps = {
  activeId?: string;
  items?: BottomNavItem[];
};

export function BottomNav({
  activeId = "home",
  items = DEFAULT_ITEMS,
}: BottomNavProps) {
  return (
    <nav
      aria-label="Navegación principal"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-foreground/8 bg-card/95 backdrop-blur-sm pb-safe"
    >
      <ul className="mx-auto flex max-w-lg items-center justify-around px-2 pt-2">
        {items.map((item) => {
          const isActive = item.id === activeId;
          const Icon = item.icon;

          return (
            <li key={item.id}>
              <Link
                href={item.href}
                className={cn(
                  "flex cursor-pointer flex-col items-center gap-1 px-3 py-2 transition-colors",
                  isActive ? "text-primary" : "text-foreground/40",
                )}
                aria-current={isActive ? "page" : undefined}
              >
                <Icon className="size-5" strokeWidth={isActive ? 2.5 : 2} aria-hidden />
                <span className="sr-only">{item.label}</span>
                {isActive ? (
                  <span className="size-1.5 rounded-full bg-primary" aria-hidden />
                ) : (
                  <span className="size-1.5" aria-hidden />
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
