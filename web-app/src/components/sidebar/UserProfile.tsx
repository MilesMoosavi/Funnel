"use client";

import { motion } from "framer-motion";

interface UserProfileProps {
  isLoggedIn: boolean;
  displayName: string | null;
}

export function UserProfile({ isLoggedIn, displayName }: UserProfileProps) {
  return (
    <div
      className="flex items-center gap-3 px-4 py-3"
      style={{ borderTop: "1px solid var(--border-subtle)" }}
    >
      {/* Avatar */}
      <div
        className="relative flex items-center justify-center"
        style={{
          width: "2rem",
          height: "2rem",
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
            width: "0.625rem",
            height: "0.625rem",
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
          width: "1.75rem",
          height: "1.75rem",
          borderRadius: "var(--radius-sm)",
          background: "transparent",
          border: "none",
          color: "var(--text-tertiary)",
        }}
        title="Settings"
      >
        <svg
          width="18"
          height="18"
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
  );
}
