"use client";

import { useState, useCallback } from "react";

/**
 * Shared clipboard copy hook with timed "copied" feedback state.
 * Used by CodeBlock and UserBubble to deduplicate the
 * clipboard.writeText + setTimeout pattern.
 */
export function useCopy(resetMs = 1500) {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), resetMs);
  }, [resetMs]);

  return { copied, copy };
}
