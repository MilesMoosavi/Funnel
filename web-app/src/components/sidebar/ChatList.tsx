"use client";

import { motion } from "framer-motion";

interface ChatListProps {
  isLoggedIn: boolean;
}

export function ChatList({ isLoggedIn }: ChatListProps) {
  return (
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
              width: "3rem",
              height: "3rem",
              borderRadius: "var(--radius-lg)",
              background: "var(--bg-glass)",
              border: "1px solid var(--border-subtle)",
            }}
          >
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="var(--text-tertiary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
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
  );
}
