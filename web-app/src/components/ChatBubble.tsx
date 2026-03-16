"use client";

import { motion } from "framer-motion";

export interface ChatMessage {
  id: string;
  sender: "user" | "funnel" | "model";
  content: string;
  timestamp: number;
  isLoading?: boolean;
}

interface ChatBubbleProps {
  message: ChatMessage;
}

const FunnelIcon = () => (
  <svg viewBox="0 0 400 400" className="w-5 h-5">
    <path
      fill="white"
      fillRule="evenodd"
      d="m 45 31 l 173 304 18 34 19 -34 v -94 l -65 -113 h 109 l 16 -27 h -141 l -25 -43 h 191 l 15 -26 z m 187 281 v -64 l -108 -189 h -38 z"
    />
  </svg>
);

const TypingIndicator = () => (
  <div className="flex gap-1.5 px-2 py-1 items-center h-6">
    <motion.div
      animate={{ opacity: [0.3, 1, 0.3] }}
      transition={{ duration: 1.2, repeat: Infinity, delay: 0 }}
      className="w-1.5 h-1.5 rounded-full bg-white/40"
    />
    <motion.div
      animate={{ opacity: [0.3, 1, 0.3] }}
      transition={{ duration: 1.2, repeat: Infinity, delay: 0.2 }}
      className="w-1.5 h-1.5 rounded-full bg-white/40"
    />
    <motion.div
      animate={{ opacity: [0.3, 1, 0.3] }}
      transition={{ duration: 1.2, repeat: Infinity, delay: 0.4 }}
      className="w-1.5 h-1.5 rounded-full bg-white/40"
    />
  </div>
);

export default function ChatBubble({ message }: ChatBubbleProps) {
  const isUser = message.sender === "user";
  const isFunnel = message.sender === "funnel";

  return (
    <motion.div
      initial={
        isUser
          ? { opacity: 0, y: 120, scale: 1 }
          : { opacity: 0, x: -20, scale: 0.95 }
      }
      animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
      transition={
        isUser
          ? { type: "spring", stiffness: 400, damping: 30, mass: 1 }
          : { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
      }
      className={`flex w-full mb-6 ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div className={`group flex flex-col gap-1 max-w-[85%] ${isUser ? "items-end" : "items-start"}`}>
        <div className={`flex items-end gap-2 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
          {/* Avatar */}
          {!isUser && (
            <div className="shrink-0">
              <div className="w-8 h-8 rounded-full bg-black border border-white/10 flex items-center justify-center shadow-md">
                {isFunnel && <FunnelIcon />}
              </div>
            </div>
          )}

          <div
            className={`relative px-4 py-[10px] ${
              isUser
                ? "bg-[#007AFF] text-white rounded-[20px] rounded-br-[1px]"
                : "bg-[#3A3A3C] text-[#F5F5F7] rounded-[20px] rounded-bl-[1px]"
            }`}
          >
            {/* Speech Bubble Tail */}
            {isUser ? (
              <svg
                viewBox="0 0 10 16"
                width="10"
                height="16"
                className="absolute bottom-0 -right-[8px] z-10"
                style={{ fill: "#007AFF" }}
              >
                <path d="M0 0C0 0 0 11 0 16H10C6.90795 16 4.19502 11.0125 3.33235 5.99478C2.56942 1.55648 1.48834 -0.344177 0 0Z" />
              </svg>
            ) : (
              <svg
                viewBox="0 0 10 16"
                width="10"
                height="16"
                className="absolute bottom-0 -left-[8px] z-10"
                style={{ fill: "#3A3A3C" }}
              >
                <path d="M10 0C10 0 10 11 10 16H0C3.09205 16 5.80498 11.0125 6.66765 5.99478C7.43058 1.55648 8.51166 -0.344177 10 0Z" />
              </svg>
            )}

            {message.isLoading ? (
              <TypingIndicator />
            ) : (
              <span className="text-[15px] leading-relaxed whitespace-pre-wrap block">
                {message.content}
              </span>
            )}
          </div>
        </div>

        {/* Timestamp */}
        <div
          className={`text-[10px] px-1 font-medium tracking-tight opacity-0 group-hover:opacity-40 transition-opacity duration-150 uppercase ${
            !isUser ? "ml-10" : "mr-2"
          }`}
          style={{ color: "var(--text-primary)" }}
        >
          {new Date(message.timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>
    </motion.div>
  );
}

