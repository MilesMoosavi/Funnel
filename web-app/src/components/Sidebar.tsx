"use client";

import { motion } from "framer-motion";

interface SidebarProps {
  isLoggedIn: boolean;
  displayName: string | null;
  isOpen: boolean;
  onToggle: () => void;
}

export default function Sidebar({
  isLoggedIn,
  displayName,
  isOpen,
  onToggle,
}: SidebarProps) {
  return (
    <motion.aside
      initial={false}
      animate={{
        x: isOpen ? 0 : -280,
        opacity: isOpen ? 1 : 0,
        width: isOpen ? 280 : 0,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="flex flex-col h-full overflow-hidden shrink-0"
      style={{
        background: "var(--bg-secondary)",
        borderRight: isOpen ? "1px solid var(--border-subtle)" : "none",
      }}
    >
      {/* Header */}
      <div className="flex items-center px-4 py-3 min-h-14">
        <motion.button
          whileHover={{ background: "rgba(255, 255, 255, 0.06)" }}
          whileTap={{ background: "rgba(255, 255, 255, 0.1)" }}
          onClick={onToggle}
          className="flex items-center justify-center cursor-pointer rounded-md transition-colors duration-200"
          style={{
            width: 32,
            height: 32,
            background: "transparent",
            border: "none",
            color: "var(--text-secondary)",
          }}
          title="Close Sidebar"
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
      </div>

      {/* New Chat */}
      <motion.button
        whileHover={{ background: "rgba(255, 255, 255, 0.06)" }}
        whileTap={{ background: "rgba(255, 255, 255, 0.1)" }}
        className="flex items-center gap-3 mx-3 px-3 py-2.5 rounded-lg cursor-pointer transition-colors duration-200"
        style={{
          background: "transparent",
          border: "none",
          color: "var(--text-secondary)",
        }}
        title="New chat"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
        </svg>
        <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
          New chat
        </span>
      </motion.button>

      {/* Chat List Area */}
      <div className="flex-1 overflow-y-auto px-3 py-3">
        {isLoggedIn ? (
          <div className="flex flex-col gap-1">
            <div
              className="text-xs px-3 py-1.5 font-semibold uppercase tracking-wider"
              style={{ color: "var(--text-tertiary)" }}
            >
              Chats
            </div>
            <div
              className="flex items-center gap-2 text-xs px-3 py-2"
              style={{ color: "var(--text-tertiary)" }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              No conversations yet
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col items-center justify-center h-full gap-3 px-4 text-center"
          >
            <div
              className="flex items-center justify-center"
              style={{
                width: 48,
                height: 48,
                borderRadius: "var(--radius-lg)",
                background: "var(--bg-glass)",
                border: "1px solid var(--border-subtle)",
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--text-tertiary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: "var(--text-tertiary)" }}>
              Sign in to save chats<br />& use folders
            </p>
          </motion.div>
        )}
      </div>

      {/* Footer — User Info */}
      <div
        className="flex items-center gap-3 px-4 py-3"
        style={{ borderTop: "1px solid var(--border-subtle)" }}
      >
        {/* Avatar */}
        <div
          className="relative flex items-center justify-center"
          style={{
            width: 32,
            height: 32,
            borderRadius: "var(--radius-full)",
            background: isLoggedIn
              ? "linear-gradient(135deg, var(--accent-funnel), var(--accent-gemini))"
              : "var(--bg-tertiary)",
          }}
        >
          <span
            className="text-xs font-bold"
            style={{ color: isLoggedIn ? "white" : "var(--text-secondary)" }}
          >
            {displayName ? displayName[0]?.toUpperCase() : "G"}
          </span>
          {/* Online dot */}
          <div
            style={{
              position: "absolute",
              bottom: -1,
              right: -1,
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: isLoggedIn
                ? "var(--status-online)"
                : "var(--status-offline)",
              border: "2px solid var(--bg-secondary)",
            }}
          />
        </div>

        <div className="flex flex-col flex-1 min-w-0">
          <span
            className="text-xs font-medium truncate"
            style={{ color: "var(--text-primary)" }}
          >
            {displayName}
          </span>
          <span
            className="text-[10px]"
            style={{ color: "var(--text-tertiary)" }}
          >
            {isLoggedIn ? "Online" : "Guest Session"}
          </span>
        </div>

        {/* Settings Gear */}
        <motion.button
          whileHover={{ rotate: 90 }}
          transition={{ duration: 0.3 }}
          className="flex items-center justify-center cursor-pointer"
          style={{
            width: 28,
            height: 28,
            borderRadius: "var(--radius-sm)",
            background: "transparent",
            border: "none",
            color: "var(--text-tertiary)",
          }}
          title="Settings"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
          </svg>
        </motion.button>
      </div>
    </motion.aside>
  );
}
