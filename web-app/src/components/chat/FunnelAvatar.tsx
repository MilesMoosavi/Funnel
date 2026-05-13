"use client";

import { motion } from "framer-motion";
import { Logo } from "../ui/Logo";
import { useEffect, useState } from "react";

interface FunnelAvatarProps {
  isFirstFunnelResponse?: boolean;
  isLatestFunnelResponse?: boolean;
  isFlyoutSource?: boolean;
}


export const FunnelAvatar = ({ 
  isFirstFunnelResponse, 
  isLatestFunnelResponse,
  isFlyoutSource
}: FunnelAvatarProps) => {
  // Only the dynamically computed flyout source holds the layoutId.
  // This matches the newest visible message, or the very first message unconditionally on mount.
  const holdsLayoutId = isFlyoutSource;

  // We need to know if we are currently flying from the center, flying back to the center,
  // or just handing over between messages.
  const [isMounting, setIsMounting] = useState(true);

  useEffect(() => {
    // After the initial mount flush, we are no longer mounting.
    // We intentionally trigger a synchronous second render to enable the 0s handover logic
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounting(false);
  }, []);

  // Transition logic:
  // - Fly-IN: 0.5s (when first response mounts from NewChatScreen)
  // - Handover: 0s (when flyoutSourceId shifts between avatars during scrolling)
  // - Fly-OUT: 0.5s (governed by NewChatScreen's transition, not this component)
  // isFlyoutSource is intentionally excluded: it would cause a visible 0.5s slide
  // between avatars whenever the user scrolls and flyoutSourceId changes.
  const layoutDuration = (isFirstFunnelResponse && isMounting) ? 0.5 : 0;

  const iconContent = (
    <div className="shrink-0 relative w-8 h-8 flex items-center justify-center">
      <svg className="absolute inset-0 w-8 h-8 -rotate-90 overflow-visible" style={{ zIndex: 1 }}>
        <motion.circle 
          cx="16" cy="16" r="15.5" 
          fill="black"
          initial={{ fillOpacity: 1 }}
          animate={{ fillOpacity: 1 }}
          transition={isLatestFunnelResponse ? { duration: 0.15, delay: 0.5 } : { duration: 0 }}
        />
        <motion.circle 
          cx="16" cy="16" r="15.5" 
          strokeWidth="1.2" 
          fill="none" 
          initial={isLatestFunnelResponse ? { pathLength: 0, stroke: "rgba(255,255,255,0.10)" } : { pathLength: 1, stroke: "rgba(255,255,255,0.08)" }}
          animate={{ pathLength: 1, stroke: "rgba(255,255,255,0.08)" }}
          transition={isLatestFunnelResponse ? { 
            pathLength: { duration: 0.2, delay: 0.5 + 0.15, ease: "easeOut" },
            stroke: { duration: 0.3, delay: 0.5 + 0.35, ease: "easeInOut" } 
          } : { duration: 0 }}
        />
      </svg>
      <div style={{ zIndex: 2, display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "100%" }}>
        <Logo size="65%" color="white" />
      </div>
    </div>
  );

  return (
    <motion.div 
      layoutId={holdsLayoutId ? "funnel-logo" : undefined}
      // If we are NOT the first response, we don't scale up from 0.5, we just appear (instant pop)
      // If we ARE the first response, we inherit the size/scale perfectly from the layout transition, no initial needed.
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }} // STRICT COMPLIANCE: Keep opaque for flight out
      transition={{ 
        layout: { duration: layoutDuration, ease: [0.16, 1, 0.3, 1] } 
      }}
      className="shrink-0 relative w-8 h-8 flex items-center justify-center origin-center"
      style={{ zIndex: 10 }}
    >
      {iconContent}
    </motion.div>
  );
};
