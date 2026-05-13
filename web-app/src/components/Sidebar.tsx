"use client";

import { motion } from "framer-motion";
import { SidebarHeader } from "./sidebar/SidebarHeader";
import { ChatList } from "./sidebar/ChatList";
import { UserProfile } from "./sidebar/UserProfile";

interface SidebarProps {
  isLoggedIn: boolean;
  displayName: string | null;
  isOpen: boolean;
  onToggle: () => void;
  onNewChat?: () => void;
}

export default function Sidebar({
  isLoggedIn,
  displayName,
  isOpen,
  onToggle,
  onNewChat,
}: SidebarProps) {
  return (
    <motion.aside
      initial={false}
      animate={{
        x: isOpen ? 0 : "-17.5rem",
        opacity: isOpen ? 1 : 0,
        width: isOpen ? "17.5rem" : 0,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="flex flex-col h-full overflow-hidden shrink-0"
      style={{
        background: "var(--bg-secondary)",
        borderRight: isOpen ? "1px solid var(--border-subtle)" : "none",
      }}
    >
      <SidebarHeader onToggle={onToggle} onNewChat={onNewChat} />
      <ChatList isLoggedIn={isLoggedIn} />
      <UserProfile isLoggedIn={isLoggedIn} displayName={displayName} />
    </motion.aside>
  );
}
