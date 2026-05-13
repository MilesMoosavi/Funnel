"use client";

import { motion } from "framer-motion";

interface SidebarHeaderProps {
  onToggle: () => void;
  onNewChat?: () => void;
}

export function SidebarHeader({ onToggle, onNewChat }: SidebarHeaderProps) {
  return (
    <>
      <div className="flex items-center px-4 py-3 min-h-14">
        <motion.button
          whileHover={{ background: "rgba(255, 255, 255, 0.06)" }}
          whileTap={{ background: "rgba(255, 255, 255, 0.1)" }}
          onClick={onToggle}
          className="flex items-center justify-center cursor-pointer rounded-md transition-colors duration-200"
          style={{
            width: "2rem",
            height: "2rem",
            background: "transparent",
            border: "none",
            color: "var(--text-secondary)",
          }}
          title="Close Sidebar"
        >
          <svg
            width="25"
            height="25"
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
        onClick={onNewChat}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
        </svg>
        <span className="text-sm" style={{ color: "var(--text-secondary)" }}>
          New chat
        </span>
      </motion.button>
    </>
  );
}
