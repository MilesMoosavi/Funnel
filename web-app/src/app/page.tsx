"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Sidebar from "@/components/Sidebar";
import ChatHeader from "@/components/ChatHeader";
import ChatInput from "@/components/ChatInput";
import WelcomeScreen from "@/components/WelcomeScreen";
import { getOrCreateUser, type FunnelUser } from "@/lib/auth";

export default function Home() {
  const [user, setUser] = useState<FunnelUser | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const u = getOrCreateUser();
      setUser(u);
    }, 0);

    return () => clearTimeout(timeoutId);
  }, []);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  // Prevent flash before user is loaded
  if (!user) {
    return (
      <div
        className="flex items-center justify-center h-screen"
        style={{ background: "var(--bg-primary)" }}
      />
    );
  }

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "var(--bg-primary)" }}>
      {/* Left Sidebar */}
      <Sidebar
        isLoggedIn={user.role === "authenticated"}
        displayName={user.displayName}
        isOpen={isSidebarOpen}
        onToggle={toggleSidebar}
      />

      {/* Main Chat Area */}
      <main
        className="flex flex-col flex-1 min-w-0 h-full relative"
        onClick={() => isSidebarOpen && setIsSidebarOpen(false)}
      >
        {/* Header */}
        <ChatHeader
          conversationName="Configure LLMs"
          uid={user.uid}
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={toggleSidebar}
        />

        {/* Chat Body — Empty State */}
        <div className="flex-1 overflow-y-auto flex flex-col items-center justify-center">
          <div className="w-full max-w-3xl flex flex-col items-center gap-6 px-4 pb-20">
            <WelcomeScreen />

            {/* Input Bar */}
            <ChatInput
              onSend={(msg) => {
                // In Batch 1, just log it. Batch 2-3 will wire this to the extension.
                console.log("[FunnelLM] Prompt submitted:", msg);
                console.log("[FunnelLM] User UID:", user.uid);
              }}
            />
          </div>
        </div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2, ease: "easeOut" }}
          className="py-2 flex justify-center"
        >
          <a
            href="https://milesmoosavi.me"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 opacity-40 hover:opacity-100 transition-opacity duration-200 no-underline"
            style={{ color: "var(--text-tertiary)" }}
          >
            <span className="text-[10px] tracking-tight">A project by Miles Moosavi</span>
            <svg
              width="8"
              height="8"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        </motion.footer>
      </main>
    </div>
  );
}
