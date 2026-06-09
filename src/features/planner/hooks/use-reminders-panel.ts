"use client";

import { useCallback, useState } from "react";
import type { PlanEntryMode } from "@/features/planner/schemas/plan-meal.schema";

export function useRemindersPanel(entryMode: PlanEntryMode) {
  const [expanded, setExpanded] = useState(entryMode !== "express");
  const [prevEntryMode, setPrevEntryMode] = useState(entryMode);

  if (entryMode !== prevEntryMode) {
    setPrevEntryMode(entryMode);
    if (entryMode === "express") {
      setExpanded(false);
    }
  }

  const toggle = useCallback(() => {
    setExpanded((value) => !value);
  }, []);

  return { expanded, toggle, setExpanded };
}
