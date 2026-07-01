"use client";

import { usePathname } from "next/navigation";
import { useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  getStackMotionDirection,
  STACK_PAGE_TRANSITION,
  STACK_SCREENS,
  type StackMotionDirection,
} from "@/lib/navigation/stack-navigation";
import { cn } from "@/lib/utils";

type StackScreenTransitionProps = {
  children: React.ReactNode;
};

function resolveRenderKeys(
  pathname: string,
  hasHomeCache: boolean,
): string[] {
  if (pathname === "/notifications") {
    return hasHomeCache ? ["/home", "/notifications"] : ["/notifications"];
  }

  return [pathname];
}

export function StackScreenTransition({ children }: StackScreenTransitionProps) {
  const pathname = usePathname();
  const contentCache = useRef(new Map<string, ReactNode>());
  const previousPathname = useRef(pathname);
  const direction = useRef<StackMotionDirection>(0);
  const [renderKeys, setRenderKeys] = useState<string[]>([pathname]);

  contentCache.current.set(pathname, children);

  if (previousPathname.current !== pathname) {
    const nextDirection = getStackMotionDirection(
      previousPathname.current,
      pathname,
    );
    direction.current = nextDirection;
    previousPathname.current = pathname;

    setRenderKeys(
      resolveRenderKeys(pathname, contentCache.current.has("/home")),
    );
  }

  if (!STACK_SCREENS.has(pathname)) {
    return children;
  }

  const motionDirection = direction.current;

  const handleExitComplete = () => {
    if (pathname === "/home") {
      setRenderKeys(["/home"]);
    }
  };

  return (
    <div className="relative min-h-dvh overflow-hidden bg-background">
      <AnimatePresence
        mode="sync"
        initial={false}
        custom={motionDirection}
        onExitComplete={handleExitComplete}
      >
        {renderKeys.map((key) => {
          const content = contentCache.current.get(key);

          if (!content) {
            return null;
          }

          const isNotifications = key === "/notifications";
          const isHomeUnderlay =
            key === "/home" && pathname === "/notifications";
          const shouldEnter =
            isNotifications &&
            motionDirection === 1 &&
            pathname === "/notifications";

          return (
            <motion.div
              key={key}
              custom={motionDirection}
              className={cn(
                "fixed inset-0 min-h-dvh w-full overflow-x-hidden bg-background",
                isNotifications &&
                  "shadow-[-10px_0_28px_rgba(30,45,34,0.07)]",
                isHomeUnderlay && "pointer-events-none",
              )}
              initial={
                shouldEnter
                  ? { x: "100%", zIndex: 20, opacity: 0.96 }
                  : false
              }
              animate={{
                x: 0,
                opacity: 1,
                zIndex: isNotifications && pathname === "/notifications" ? 20 : 10,
              }}
              exit={
                isNotifications
                  ? {
                      x: "100%",
                      opacity: 0.96,
                      zIndex: 20,
                      transition: STACK_PAGE_TRANSITION,
                    }
                  : undefined
              }
              transition={STACK_PAGE_TRANSITION}
            >
              {content}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
