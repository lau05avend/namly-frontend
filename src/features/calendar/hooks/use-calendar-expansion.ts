"use client";

import { useCallback, useState } from "react";

export function useCalendarExpansion(initialExpanded = false) {
  const [isExpanded, setIsExpanded] = useState(initialExpanded);

  const toggle = useCallback(() => {
    setIsExpanded((value) => !value);
  }, []);

  const collapse = useCallback(() => {
    setIsExpanded(false);
  }, []);

  const expand = useCallback(() => {
    setIsExpanded(true);
  }, []);

  return { isExpanded, toggle, collapse, expand, setIsExpanded };
}
