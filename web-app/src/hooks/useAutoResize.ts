"use client";

import { useEffect, RefObject } from "react";

interface useAutoResizeProps {
  ref: RefObject<HTMLTextAreaElement | null>;
  value: string;
  maxHeight?: number;
  minHeight?: number;
}

export function useAutoResize({ ref, value, maxHeight, minHeight }: useAutoResizeProps) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Reset height to auto to measure scrollHeight accurately
    el.style.height = "auto";
    
    let newHeight = el.scrollHeight;
    
    if (maxHeight) {
      newHeight = Math.min(newHeight, maxHeight);
    }
    
    if (minHeight) {
      newHeight = Math.max(newHeight, minHeight);
    }

    el.style.height = `${newHeight}px`;
    
    // Manage scrollbar visibility
    if (maxHeight && el.scrollHeight > maxHeight) {
      el.style.overflowY = "auto";
    } else {
      el.style.overflowY = "hidden";
    }
  }, [ref, value, maxHeight, minHeight]);
}
