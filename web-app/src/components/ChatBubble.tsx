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
  index: number;
}

const FunnelIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 400 400" className={className}>
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

export default function ChatBubble({ message, index }: ChatBubbleProps) {
  const isUser = message.sender === "user";
  const isFunnel = message.sender === "funnel";

  // Slow motion factor
  const SLOW = 1;

  return (
    <div className={`flex w-full mb-6 ${isUser ? "justify-end" : "justify-start"}`}>
      <div className={`group flex flex-col gap-1 max-w-[85%] ${isUser ? "items-end" : "items-start"}`}>
        <div className={`flex items-end gap-2 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
          
          {/* Avatar Container */}
          {!isUser && (
            <div className="shrink-0 relative w-8 h-8 flex items-center justify-center">
              {/* The "F" Logo morphing in */}
              <motion.div
                layoutId={isFunnel ? "funnel-logo" : undefined}
                transition={{
                  duration: 0.6 * SLOW,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{ zIndex: 2 }}
              >
                {isFunnel && <FunnelIcon />}
              </motion.div>

              {/* The Circulating Circle Animation */}
              <svg className="absolute inset-0 w-8 h-8 -rotate-90 overflow-visible" style={{ zIndex: 1 }}>
                {/* Background Fill (appears after closure) */}
                <motion.circle
                  cx="16"
                  cy="16"
                  r="15.5"
                  initial={{ fill: "rgba(0,0,0,0)" }}
                  animate={{ fill: "rgba(0,0,0,1)" }}
                  transition={{ 
                    delay: 0.8 * SLOW, // Wait for morph + draw
                    duration: 0.3 * SLOW 
                  }}
                />
                {/* Border Draw */}
                <motion.circle
                  cx="16"
                  cy="16"
                  r="15.5"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="1"
                  fill="none"
                  strokeDasharray="100"
                  initial={{ strokeDashoffset: 100 }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{ 
                    delay: 0.45 * SLOW, // Start slightly before F fully settles
                    duration: 0.4 * SLOW,
                    ease: "easeInOut"
                  }}
                />
              </svg>
            </div>
          )}

          {/* Message Bubble */}
          <motion.div
            initial={
              isUser
                ? { 
                    opacity: 1, 
                    y: index === 0 ? 350 : 120, // Emerging from behind the input
                    x: 0, 
                    scale: 0.1,
                  }
                : { opacity: 0, x: -20, scale: 0.8 }
            }
            animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            transition={
              isUser
                ? {
                    type: "spring",
                    stiffness: 400,
                    damping: 30,
                    mass: 0.7,
                  }
                : {
                    delay: 0.6 * SLOW,
                    duration: 0.5 * SLOW,
                    ease: [0.16, 1, 0.3, 1],
                  }
            }
            className={`relative px-4 py-2.5 ${
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
                className="absolute bottom-0 -right-2 z-10"
                style={{ fill: "#007AFF" }}
              >
                <path d="M0 0C0 0 0 11 0 16H10C6.90795 16 4.19502 11.0125 3.33235 5.99478C2.56942 1.55648 1.48834 -0.344177 0 0Z" />
              </svg>
            ) : (
              <svg
                viewBox="0 0 10 16"
                width="10"
                height="16"
                className="absolute bottom-0 -left-2 z-10"
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
          </motion.div>
        </div>

        {/* Timestamp */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ delay: isUser ? 0.3 * SLOW : 1.0 * SLOW }}
          className={`text-[10px] px-1 font-medium tracking-tight uppercase ${
            !isUser ? "ml-10" : "mr-2"
          }`}
          style={{ color: "var(--text-primary)" }}
        >
          {new Date(message.timestamp).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </motion.div>
      </div>
    </div>
  );
}
