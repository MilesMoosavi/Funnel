"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import ExtensionStatus, { type ConnectionState } from "./ExtensionStatus";

interface ChatHeaderProps {
  conversationName: string;
  uid: string;
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
}

export default function ChatHeader({
  conversationName,
  uid,
  isSidebarOpen,
  onToggleSidebar,
}: ChatHeaderProps) {
  const [connectionState, setConnectionState] = useState<ConnectionState>("disconnected");
  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="flex items-center justify-between px-4 py-3"
      style={{
        background: "var(--bg-secondary)",
        borderBottom: "1px solid var(--border-subtle)",
        minHeight: 56,
      }}
    >
      {/* Left — Sidebar Toggle + Minimal Status */}
      <div className="flex items-center gap-2 flex-1">
        {!isSidebarOpen && (
          <div className="flex items-center gap-3 pl-1">
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ background: "rgba(255, 255, 255, 0.06)" }}
              whileTap={{ background: "rgba(255, 255, 255, 0.1)" }}
              onClick={onToggleSidebar}
              className="flex items-center justify-center cursor-pointer rounded-md transition-colors duration-200"
              style={{
                width: 32,
                height: 32,
                background: "transparent",
                border: "none",
                color: "var(--text-secondary)",
              }}
              title="Open Sidebar"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </motion.button>
            <motion.button
              whileHover={{ background: "rgba(255, 255, 255, 0.06)" }}
              whileTap={{ background: "rgba(255, 255, 255, 0.1)" }}
              className="flex items-center justify-center cursor-pointer rounded-md transition-colors duration-200"
              style={{
                width: 32,
                height: 32,
                background: "transparent",
                border: "none",
                color: "var(--text-secondary)",
              }}
              title="New Chat"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
            </motion.button>
          </div>
        )}
      </div>

      {/* Center — Connection status / LLM count (replaces dropdown when disconnected) */}
      <div className="flex items-center justify-center flex-1">
        {connectionState !== "connected" ? (
          <ExtensionStatus uid={uid} minimal={false} onStateChange={setConnectionState} />
        ) : (
          <motion.button
            whileHover={{ background: "rgba(255, 255, 255, 0.06)" }}
            whileTap={{ background: "rgba(255, 255, 255, 0.1)" }}
            className="flex items-center gap-2 px-4 py-2 rounded-md cursor-pointer transition-colors duration-200"
            style={{
              border: "none",
            }}
            title="Configure LLMs"
          >
            <span
              className="h-2 w-2 rounded-full"
              style={{
                background: "var(--status-connected)",
              }}
            />

            <span
              className="text-sm font-semibold"
              style={{ color: "var(--text-primary)" }}
            >
              0 LLMs active
            </span>

            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--text-tertiary)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </motion.button>
        )}
      </div>

      {/* Right — Window Actions (Help only) */}
      <div className="flex items-center gap-2 flex-1 justify-end">
        <motion.button
          whileHover={{ background: "rgba(255, 255, 255, 0.06)" }}
          whileTap={{ background: "rgba(255, 255, 255, 0.1)" }}
          className="flex items-center justify-center cursor-pointer transition-colors duration-200"
          style={{
            width: 32,
            height: 32,
            borderRadius: "var(--radius-sm)",
            border: "none",
            color: "var(--text-tertiary)",
          }}
          title="Help"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        </motion.button>
      </div>
    </motion.header>
  );
}
