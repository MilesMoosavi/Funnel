"use client";

import { useState, useCallback } from "react";
import { type ChatMessage } from "@/types/chat";

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);

  const sendMessage = useCallback((content: string) => {
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
    
    // TODO: Connect to actual backend/extension orchestrator here
    // Currently simulating model response for UI testing
    setTimeout(() => {
      setMessages((prev) => 
        prev.map(msg => 
          msg.id === funnelMsgId 
            ? { 
                ...msg, 
                content: "This is a simulated response. Once the extension is connected, real LLM outputs will appear here.", 
                isLoading: false 
              }
            : msg
        )
      );
    }, 2000);

    console.log("[Funnel] Prompt submitted:", content);
  }, []);

  const editMessage = useCallback((id: string, newContent: string) => {
    setMessages((prev) =>
      prev.map((msg) => (msg.id === id ? { ...msg, content: newContent } : msg))
    );
    setEditingMessageId(null);
  }, []);

  const cancelEdit = useCallback(() => {
    setEditingMessageId(null);
  }, []);

  const triggerPreviousMessageEdit = useCallback(() => {
    const lastUserMsg = [...messages].reverse().find(m => m.sender === "user");
    if (lastUserMsg) {
      setEditingMessageId(lastUserMsg.id);
    }
  }, [messages]);

  return {
    messages,
    editingMessageId,
    setEditingMessageId,
    sendMessage,
    editMessage,
    cancelEdit,
    triggerPreviousMessageEdit,
  };
}
