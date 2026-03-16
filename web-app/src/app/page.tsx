"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "@/components/Sidebar";
import ChatHeader from "@/components/ChatHeader";
import ChatInput from "@/components/ChatInput";
import NewChatScreen from "@/components/NewChatScreen";
import ChatBubble, { type ChatMessage } from "@/components/ChatBubble";
import { getOrCreateUser, type FunnelUser } from "@/lib/auth";

export default function Home() {
  const [user, setUser] = useState<FunnelUser | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const chatScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const u = getOrCreateUser();
      setUser(u);
    }, 0);

    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    if (!chatScrollRef.current || messages.length === 0) return;

    chatScrollRef.current.scrollTo({
      top: chatScrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages.length]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleNewChat = () => setMessages([]);

  const handleSendMessage = (content: string) => {
    const userMsgId = crypto.randomUUID();
    const newUserMessage: ChatMessage = {
      id: userMsgId,
      sender: "user",
      content,
      timestamp: Date.now(),
    };
    
    const funnelMsgId = crypto.randomUUID();
    const loadingMessage: ChatMessage = {
      id: funnelMsgId,
      sender: "funnel",
      content: "",
      timestamp: Date.now(),
      isLoading: true,
    };

    setMessages((prev) => [...prev, newUserMessage, loadingMessage]);
    
    // Log for Batch 1 testing
    console.log("[Funnel] Prompt submitted:", content);
  };

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
        onNewChat={handleNewChat}
      />

      {/* Main Chat Area */}
      <main
        className="flex flex-col flex-1 min-w-0 h-full relative"
        onClick={() => isSidebarOpen && setIsSidebarOpen(false)}
      >
        {/* Header — Hardcoded title as requested to avoid unasked changes */}
        <ChatHeader
          uid={user.uid}
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={toggleSidebar}
          onNewChat={handleNewChat}
        />

        {/* Chat Body */}
        <div className="flex-1 min-h-0 flex flex-col">
          <AnimatePresence mode="wait">
            {messages.length === 0 ? (
              <div key="new-chat-pane" className="flex-1 min-h-0 overflow-y-auto flex flex-col items-center">
                <div className="w-full max-w-3xl flex flex-col items-center gap-6 px-4 py-8 flex-1">
                  {/* State 1: New Chat — Input Centered below NewChatScreen */}
                  <div className="flex-1 flex flex-col items-center justify-center w-full h-full">
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="flex flex-col items-center gap-12 w-full"
                    >
                      <NewChatScreen />
                      <motion.div
                        layoutId="chat-input-wrapper"
                        className="w-full max-w-2xl"
                        transition={{ type: "spring", bounce: 0, duration: 0.6 }}
                      >
                        <ChatInput onSend={handleSendMessage} />
                      </motion.div>
                    </motion.div>
                  </div>
                </div>
              </div>
            ) : (
              <div key="active-chat-pane" className="flex-1 min-h-0 flex flex-col">
                {/* State 2: Active Chat — Only this pane scrolls */}
                <div
                  ref={chatScrollRef}
                  className="flex-1 min-h-0 overflow-y-auto flex flex-col items-center"
                >
                  <div className="w-full max-w-3xl px-4 py-8">
                    {messages.map((msg, idx) => (
                      <ChatBubble key={msg.id} message={msg} index={idx} />
                    ))}
                  </div>
                </div>
  
                {/* Bottom Composer stays fixed in layout */}
                <div className="shrink-0 flex justify-center pt-4 px-4 pb-10 bg-linear-to-t from-background via-background to-transparent z-10">
                  <motion.div
                    layoutId="chat-input-wrapper"
                    className="w-full max-w-2xl"
                    transition={{ type: "spring", bounce: 0, duration: 0.6 }}
                  >
                    <ChatInput onSend={handleSendMessage} />
                  </motion.div>
                </div>
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer note stays visible in both chat states */}
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
              Created by Miles Moosavi, 2026
            </span>
          </div>
        </motion.footer>
      </main>
    </div>
  );
}
