"use client";

import { motion } from "framer-motion";
import { ChatMessage } from "@/types/chat";

export interface BaseBubbleProps {
  message: ChatMessage;
  index: number;
  isUser: boolean;
  children: React.ReactNode;
  isEditing?: boolean;
  isInitialMount?: boolean;
  avatar?: React.ReactNode;
  bubbleClassName?: string;
  showTail?: boolean;
  tailColor?: string;
  actions?: React.ReactNode;
}

export function Timestamp({ timestamp, isUser, actions }: { timestamp: number; isUser: boolean; actions?: React.ReactNode }) {
  return (
    <motion.div
      layout="position"
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`flex items-center gap-1.5 text-[10px] px-1 font-medium tracking-tight uppercase opacity-0 group-hover:opacity-40 transition-opacity duration-200 ${
        !isUser ? "ml-10" : "mr-2"
      }`}
      style={{ color: "var(--text-primary)" }}
    >
      <span>
        {new Date(timestamp).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </span>
      {actions && (
        <>
          <span className="opacity-40">&middot;</span>
          <div className="flex items-center gap-1">
            {actions}
          </div>
        </>
      )}
    </motion.div>
  );
}

export const BaseBubble = ({ 
  message, 
  index, 
  isUser, 
  children, 
  isEditing = false, 
  isInitialMount = true,
  avatar, 
  bubbleClassName = "",
  showTail = true,
  tailColor,
  actions
}: BaseBubbleProps) => {
  return (
    <div className={`flex w-full mb-6 ${isUser ? "justify-end" : "justify-start"} ${isEditing ? "relative z-30" : "relative z-0"}`}>
      <motion.div 
        layout="position"
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={`group flex flex-col gap-1 min-w-0 ${isEditing ? "w-full max-w-full" : "max-w-[85%]"} ${isUser ? "items-end" : "items-start"}`}
      >
        <motion.div 
          layout="position"
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className={`flex items-end gap-2 min-w-0 ${isEditing ? "w-full" : "max-w-full"} ${isUser ? "flex-row-reverse" : "flex-row"}`}
        >
          {avatar}
          
          <motion.div
            layout="position"
            layoutId={`bubble-${message.id}`}
            initial={
              isUser
                ? (isEditing 
                  ? { opacity: 0, x: 200, y: 0, scale: 0.95 }
                  : (isInitialMount 
                      ? { opacity: 1, y: index === 0 ? 350 : 120, x: 0, scale: 0.1 }
                      : false))
                : { opacity: 0, x: -20, scale: 0.8 }
            }
            animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            exit={
              isUser
                ? { opacity: 0, x: 200, scale: 0.95, transition: { duration: 0.2 } }
                : { opacity: 0, x: -20, scale: 0.8, transition: { duration: 0.2 } }
            }
            transition={
              isEditing 
                ? { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
                : isUser
                ? { type: "spring", stiffness: 400, damping: 30, mass: 0.7 }
                : { delay: 0.6, duration: 0.5, ease: [0.16, 1, 0.3, 1] }
            }
            className={`relative min-w-0 ${bubbleClassName} ${
              showTail && tailColor ? (isUser ? "imessage-tail-user" : "imessage-tail-model") : ""
            }`}
            style={{
              ...(tailColor ? { '--tail-bg': tailColor } as React.CSSProperties : {})
            }}
          >
            {children}
          </motion.div>
        </motion.div>
        <Timestamp timestamp={message.timestamp} isUser={isUser} actions={actions} />
      </motion.div>
    </div>
  );
};
