"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChatMessage } from "@/types/chat";
import { FunnelAvatar } from "./FunnelAvatar";
import { TypingIndicator } from "./TypingIndicator";
import { MarkdownRenderer } from "./MarkdownRenderer";

/* ─── Unified ModelBubble ─── */
export function ModelBubble({
  message,
  isFirstFunnelResponse,
  isLatestFunnelResponse,
  isFlyoutSource
}: {
  message: ChatMessage;
  isFirstFunnelResponse?: boolean;
  isLatestFunnelResponse?: boolean;
  isFlyoutSource?: boolean;
}) {
  const avatar = <FunnelAvatar isFirstFunnelResponse={isFirstFunnelResponse} isLatestFunnelResponse={isLatestFunnelResponse} isFlyoutSource={isFlyoutSource} />;

  return (
    <div className="flex w-full mb-6 justify-start relative z-0">
      <motion.div
        layout="position"
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="group flex flex-col gap-1 max-w-[85%] items-start"
      >
        <motion.div
          layout="position"
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-end gap-2 min-w-0 max-w-full flex-row"
        >
          {/* Static Avatar - Never unmounts, so it never redraws */}
          {avatar}

          <AnimatePresence mode="wait">
            {message.isLoading ? (
              <motion.div
                key="thinking"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{
                  duration: 0.3,
                  delay: isFirstFunnelResponse ? 0.5 : 0
                }}
                className="flex items-end h-11 min-w-16.5"
              >
                <div className="flex items-center justify-center h-full">
                  <TypingIndicator />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="standard"
                initial={{ opacity: 0, x: -10, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="relative min-w-0 px-4 py-2.5 bg-[#3A3A3C] text-[#F5F5F7] rounded-[20px] imessage-tail-model"
                style={{ '--tail-bg': '#3A3A3C' } as React.CSSProperties}
              >
                <div className="text-[15px] leading-normal markdown-content max-w-full wrap-break-word whitespace-pre-wrap">
                  <MarkdownRenderer content={message.content} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Timestamp synced with the Model layout */}
        <motion.div
          layout="position"
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-[10px] px-1 font-medium tracking-tight uppercase opacity-0 group-hover:opacity-40 transition-opacity duration-200 ml-10"
          style={{ color: "var(--text-primary)" }}
        >
          {new Date(message.timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </motion.div>
      </motion.div>
    </div>
  );
}
