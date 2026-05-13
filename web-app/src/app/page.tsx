"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Sidebar from "@/components/Sidebar";
import ChatHeader from "@/components/ChatHeader";
import ChatWindow from "@/components/chat-window/ChatWindow";
import { useUser } from "@/providers/UserProvider";

export default function Home() {
  const { user, isLoading } = useUser();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [chatId, setChatId] = useState(() => crypto.randomUUID());

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const handleNewChat = () => setChatId(crypto.randomUUID());

  // Prevent flash before user is loaded
  if (isLoading || !user) {
    return (
      <div
        className="flex items-center justify-center h-screen"
        style={{ background: "var(--bg-primary)" }}
      />
    );
  }

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "var(--bg-primary)" }}>
      <Sidebar
        isLoggedIn={user.role === "authenticated"}
        displayName={user.displayName}
        isOpen={isSidebarOpen}
        onToggle={toggleSidebar}
        onNewChat={handleNewChat}
      />

      <main
        className="flex flex-col flex-1 min-w-0 h-full relative"
        onClick={() => isSidebarOpen && setIsSidebarOpen(false)}
      >
        <ChatHeader
          uid={user.uid}
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={toggleSidebar}
          onNewChat={handleNewChat}
        />

        <div className="flex-1 min-h-0 flex flex-col">
          <ChatWindow key={chatId} />
        </div>

        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2, ease: "easeOut" }}
          className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20"
        >
          <div
            className="flex items-center gap-1.5 text-[10px] tracking-tight px-2 py-1 rounded-full whitespace-nowrap max-w-[92vw] overflow-hidden"
            style={{ color: "var(--text-tertiary)", background: "rgba(15, 15, 15, 0.55)" }}
          >
            <span className="truncate">AI responses can be inaccurate</span>
            <span className="hidden sm:inline" aria-hidden="true">
              &middot;
            </span>
            <span className="hidden sm:inline truncate">
              Created by <a href="https://milesmoosavi.me" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors underline-offset-2 hover:underline">Miles Moosavi</a>, 2026
            </span>
          </div>
        </motion.footer>
      </main>
    </div>
  );
}
