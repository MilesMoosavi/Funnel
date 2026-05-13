import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from "react";
import { motion } from "framer-motion";

import { useAutoResize } from "@/hooks/useAutoResize";

interface ChatInputProps {
  onSend: (message: string) => void;
  onArrowUp?: () => void;
  disabled?: boolean;
}

const MAX_VISIBLE_LINES = 14;
const LINE_HEIGHT = 25; // px at 125% base font-size (text-sm leading-5 = 1.25rem = 25px)
const MAX_HEIGHT = MAX_VISIBLE_LINES * LINE_HEIGHT;

const ChatInput = forwardRef<HTMLTextAreaElement, ChatInputProps>(
  ({ onSend, onArrowUp, disabled }, ref) => {
    const [message, setMessage] = useState("");
    const internalRef = useRef<HTMLTextAreaElement>(null);

    // Sync external ref with internal ref
    useImperativeHandle(ref, () => internalRef.current!);

    // Auto-focus on mount
    useEffect(() => {
      internalRef.current?.focus();
    }, []);

    useAutoResize({
      ref: internalRef,
      value: message,
      maxHeight: MAX_HEIGHT,
      minHeight: LINE_HEIGHT
    });

    const handleSend = () => {
      const trimmed = message.trim();
      if (!trimmed || disabled) return;
      onSend(trimmed);
      setMessage("");
      // Refocus after clear
      setTimeout(() => internalRef.current?.focus(), 0);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
      if (e.key === "ArrowUp" && e.shiftKey && e.ctrlKey && onArrowUp) {
        e.preventDefault();
        onArrowUp();
      }
    };



    return (
      <div className="w-full">
        <div
          className="flex flex-col rounded-2xl"
          style={{
            background: "var(--bg-secondary)",
            border: "1px solid var(--border-subtle)",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
          }}
        >
          <div className="flex flex-row p-3 items-end gap-3 min-h-14">
            {/* Left side: Plus Icon */}
            <motion.button
              whileHover={{ background: "rgba(255, 255, 255, 0.06)" }}
              whileTap={{ background: "rgba(255, 255, 255, 0.1)" }}
              className="flex items-center justify-center shrink-0 cursor-pointer mb-0.5"
              style={{
                width: "2rem",
                height: "2rem",
                borderRadius: "var(--radius-sm)",
                background: "transparent",
                border: "1px solid var(--border-subtle)",
                color: "var(--text-secondary)",
              }}
              title="Attach file"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </motion.button>

            {/* Middle: Auto-expanding Text Input */}
            <textarea
              ref={internalRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your prompt here..."
              rows={1}
              disabled={disabled}
              className="resize-none outline-none text-sm leading-5 py-1.5 px-1 bg-transparent chatbox-scroll flex-1 w-full"
              style={{
                color: "var(--text-primary)",
                minHeight: LINE_HEIGHT,
                maxHeight: MAX_HEIGHT,
                fontFamily: "var(--font-sans)",
                overflowY: "auto",
              }}
            />

            {/* Right side: Mic and Send Icons */}
            <div className="flex items-center gap-3 shrink-0 mb-0.5">
              <motion.button
                whileHover={{ background: "rgba(255, 255, 255, 0.06)" }}
                whileTap={{ background: "rgba(255, 255, 255, 0.1)" }}
                className="flex items-center justify-center shrink-0 cursor-pointer"
                style={{
                  width: "2rem",
                  height: "2rem",
                  borderRadius: "var(--radius-sm)",
                  background: "transparent",
                  border: "none",
                  color: "var(--text-tertiary)",
                }}
                title="Voice input"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                  <line x1="12" y1="19" x2="12" y2="23" />
                  <line x1="8" y1="23" x2="16" y2="23" />
                </svg>
              </motion.button>

              <motion.button
                whileHover={message.trim() && !disabled ? { opacity: 0.9 } : {}}
                whileTap={message.trim() && !disabled ? { opacity: 0.8 } : {}}
                onClick={handleSend}
                disabled={!message.trim() || disabled}
                className="flex items-center justify-center shrink-0 cursor-pointer transition-colors duration-200"
                style={{
                  width: "2rem",
                  height: "2rem",
                  borderRadius: "var(--radius-sm)",
                  background: message.trim() && !disabled
                    ? "var(--bg-active)"
                    : "var(--bg-tertiary)",
                  border: "none",
                  color: message.trim() && !disabled ? "var(--text-primary)" : "var(--text-tertiary)",
                }}
                title="Send"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

ChatInput.displayName = "ChatInput";

export default ChatInput;
