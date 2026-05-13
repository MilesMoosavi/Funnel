"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ChatInput from "@/components/ChatInput";
import NewChatScreen from "@/components/NewChatScreen";
import ChatBubble from "@/components/ChatBubble";
import { useChat } from "@/hooks/useChat";

export default function ChatWindow() {
  const {
    messages,
    editingMessageId,
    sendMessage,
    editMessage,
    cancelEdit,
    triggerPreviousMessageEdit
  } = useChat();

  const chatScrollRef = useRef<HTMLDivElement>(null);
  const chatInputRef = useRef<HTMLTextAreaElement>(null);

  const [visibleIds, setVisibleIds] = useState<Set<string>>(new Set());

  const handleVisibility = (id: string, isVisible: boolean) => {
    setVisibleIds(prev => {
      const next = new Set(prev);
      if (isVisible) next.add(id);
      else next.delete(id);
      return next;
    });
  };

  const focusChatInput = () => {
    setTimeout(() => chatInputRef.current?.focus(), 0);
  };

  const scrollToBottom = (smooth = true) => {
    if (!chatScrollRef.current) return;
    chatScrollRef.current.scrollTo({
      top: chatScrollRef.current.scrollHeight,
      behavior: smooth ? "smooth" : "auto",
    });
  };

  // Scroll on new messages
  useEffect(() => {
    if (messages.length === 0) return;
    scrollToBottom(true);
  }, [messages.length]);

  const handleSendMessage = (content: string) => {
    sendMessage(content);
  };

  const handleEditMessage = (id: string, newContent: string) => {
    editMessage(id, newContent);
    focusChatInput();
    setTimeout(() => scrollToBottom(true), 100);
  };

  const handleCancelEdit = () => {
    cancelEdit();
    focusChatInput();
  };

  // Compute funnel message metadata for avatar flyout animations.
  // flyoutSourceId determines which FunnelAvatar holds the shared layoutId
  // (the "funnel-logo" that morphs from the hero screen).
  const funnelMessages = messages.filter(m => m.sender === "funnel");
  const firstFunnelId = funnelMessages[0]?.id ?? null;
  const lastFunnelId = funnelMessages[funnelMessages.length - 1]?.id ?? null;

  // Find the most recent (highest index) funnel message that is currently visible
  let flyoutSourceId: string | null = null;
  for (let i = funnelMessages.length - 1; i >= 0; i--) {
    if (visibleIds.has(funnelMessages[i].id)) {
      flyoutSourceId = funnelMessages[i].id;
      break;
    }
  }

  // If there's exactly one funnel message, it always owns the layoutId
  // so the initial fly-in animation from NewChatScreen works correctly
  if (!flyoutSourceId && funnelMessages.length === 1) {
    flyoutSourceId = firstFunnelId;
  }

  return (
    <div className="flex-1 min-h-0 flex flex-col w-full h-full relative">
      <AnimatePresence>
        {messages.length === 0 ? (
          <motion.div 
            key="new-chat-pane" 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0 } }}
            transition={{ duration: 0.3 }}
            className="flex-1 min-h-0 overflow-y-auto flex flex-col items-center"
          >
            <div className="w-full max-w-2xl flex flex-col items-center gap-6 px-4 py-8 flex-1">
              <div className="flex-1 flex flex-col items-center justify-center w-full h-full">
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col items-center gap-12 w-full"
                >
                  <NewChatScreen />
                  <motion.div
                    layoutId="chat-input-wrapper"
                    className="w-full max-w-2xl"
                    transition={{ type: "spring", bounce: 0, duration: 0.6 }}
                  >
                    <ChatInput onSend={handleSendMessage} onArrowUp={triggerPreviousMessageEdit} />
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="active-chat-pane" 
            initial={{ opacity: 1 }} // FIXED: No opacity fade to prevent logo transparency
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex-1 min-h-0 flex flex-col absolute inset-0"
          >
            <div
              ref={chatScrollRef}
              className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden flex flex-col items-center"
            >
              <div className="w-full max-w-2xl px-4 py-8">
                {messages.map((msg, idx) => (
                  <motion.div
                    key={msg.id}
                    onViewportEnter={() => handleVisibility(msg.id, true)}
                    onViewportLeave={() => handleVisibility(msg.id, false)}
                    viewport={{ root: chatScrollRef, amount: 0.05 }}
                    className="w-full flex justify-center"
                  >
                    <div className="w-full max-w-full">
                      <ChatBubble
                        message={msg}
                        index={idx}
                        isEditing={editingMessageId === msg.id}
                        onEdit={handleEditMessage}
                        onCancel={handleCancelEdit}
                        isFirstFunnelResponse={msg.id === firstFunnelId}
                        isLatestFunnelResponse={msg.id === lastFunnelId}
                        isFlyoutSource={msg.id === flyoutSourceId}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="shrink-0 flex justify-center pb-8 px-4 relative z-10">
              <motion.div
                layoutId="chat-input-wrapper"
                className="w-full max-w-2xl"
                transition={{ type: "spring", bounce: 0, duration: 0.6 }}
              >
                <ChatInput 
                  ref={chatInputRef}
                  onSend={handleSendMessage} 
                  onArrowUp={triggerPreviousMessageEdit} 
                />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
