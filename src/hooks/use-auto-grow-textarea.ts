"use client";

import { useCallback, useLayoutEffect, useRef } from "react";

export function useAutoGrowTextarea(value: string) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const resize = useCallback(() => {
    const element = textareaRef.current;

    if (!element) {
      return;
    }

    element.style.height = "auto";
    element.style.height = `${element.scrollHeight}px`;
  }, []);

  useLayoutEffect(() => {
    resize();
  }, [resize, value]);

  return { textareaRef, resize };
}
