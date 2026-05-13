"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChatMessage } from "@/types/chat";
import { BaseBubble } from "./BaseBubble";
import { useAutoResize } from "@/hooks/useAutoResize";
import { useCopy } from "@/hooks/useCopy";

/* ─── Specialized Action Buttons ─── */
function UserMessageActions({
  content,
  onTriggerEdit
}: {
  content: string;
  onTriggerEdit: () => void;
}) {
  const { copied, copy } = useCopy();

  return (
    <div className="flex items-center gap-0.5">
      <button
        className="p-1 rounded hover:bg-white/10 transition-colors cursor-pointer"
        title="Edit"
        onClick={onTriggerEdit}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/60">
          <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
        </svg>
      </button>

      <button
        className="p-1 rounded hover:bg-white/10 transition-colors cursor-pointer"
        title={copied ? "Copied!" : "Copy"}
        onClick={() => copy(content)}
      >
        <AnimatePresence mode="wait">
          {copied ? (
            <motion.svg key="check" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.1 }}
              width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-white/60">
              <motion.polyline points="4 12 9 17 20 6" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.15, ease: "easeOut" }} />
            </motion.svg>
          ) : (
            <motion.svg key="copy" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.1 }}
              width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/60">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </motion.svg>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
}

/* ─── Subclass: EditingUserBubble ─── */
function EditingUserBubble({ 
  message, 
  index,
  editedContent, 
  setEditedContent, 
  onSave, 
  onCancel,
  isInitialMount
}: { 
  message: ChatMessage; 
  index: number;
  editedContent: string; 
  setEditedContent: (s: string) => void; 
  onSave: () => void; 
  onCancel: () => void;
  isInitialMount: boolean;
}) {
  const editRef = useRef<HTMLTextAreaElement>(null);

  useAutoResize({
    ref: editRef,
    value: editedContent,
    maxHeight: 200
  });

  useEffect(() => {
    if (editRef.current) {
      const el = editRef.current;
      el.focus();
      el.setSelectionRange(el.value.length, el.value.length);
      el.scrollTop = el.scrollHeight;
    }
  }, []);

  return (
    <BaseBubble 
      message={message} 
      index={index} 
      isUser={true} 
      isEditing={true} 
      isInitialMount={isInitialMount}
      showTail={false}
      bubbleClassName="w-full min-w-[320px] overflow-hidden px-4 py-2.5 bg-[#007AFF] text-white rounded-[20px]"
    >
      <motion.div layout="position" className="flex flex-col gap-3 py-1">
        <motion.div 
          layout="position" 
          initial={{ borderColor: "rgba(255, 255, 255, 0)" }} 
          animate={{ borderColor: "rgba(255, 255, 255, 0.2)" }} 
          className="rounded-xl border p-2 pr-3 focus-within:border-white/40 transition-colors"
        >
          <textarea
            ref={editRef}
            className="w-full bg-transparent text-white pl-2 pr-1 py-1 outline-none resize-none text-[15px] leading-relaxed chatbox-scroll block"
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            style={{ overflowY: 'auto' }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                onSave();
              } else if (e.key === 'Escape') {
                onCancel();
              }
            }}
          />
        </motion.div>
        <motion.div layout="position" className="flex justify-end gap-2">
          <button onClick={onCancel} className="px-4 py-1.5 rounded-full text-[13px] font-medium hover:bg-white/10 transition-colors cursor-pointer">Cancel</button>
          <button onClick={onSave} className="px-4 py-1.5 rounded-full text-[13px] font-medium bg-white text-black hover:bg-white/90 transition-all active:scale-95 cursor-pointer shadow-sm">Save</button>
        </motion.div>
      </motion.div>
    </BaseBubble>
  );
}

/* ─── Subclass: StandardUserBubble ─── */
function StandardUserBubble({ 
  message, 
  index,
  onTriggerEdit,
  isInitialMount
}: { 
  message: ChatMessage; 
  index: number;
  onTriggerEdit: () => void;
  isInitialMount: boolean;
}) {
  return (
    <div className="flex flex-col items-end group">
      <BaseBubble 
        message={message} 
        index={index} 
        isUser={true} 
        isInitialMount={isInitialMount}
        bubbleClassName="px-4 py-2.5 bg-[#007AFF] text-white rounded-[20px]"
        tailColor="#007AFF"
        actions={<UserMessageActions content={message.content} onTriggerEdit={onTriggerEdit} />}
      >
        <div className="text-[15px] leading-normal wrap-break-word whitespace-pre-wrap">{message.content}</div>
      </BaseBubble>
    </div>
  );
}

/* ─── Subclass root: UserBubble ─── */
export function UserBubble({ 
  message, 
  index, 
  isEditing, 
  setIsEditing, 
  onEdit,
  onCancel
}: { 
  message: ChatMessage; 
  index: number; 
  isEditing: boolean; 
  setIsEditing: (b: boolean) => void;
  onEdit?: (id: string, newContent: string) => void;
  onCancel?: () => void;
}) {
  const [editedContent, setEditedContent] = useState(message.content);
  const [isInitialMount, setIsInitialMount] = useState(true);

  useEffect(() => {
    // Distinguish initial mount (for bottom fly-in) from subsequent toggles (for morph transitions).
    // This state change is intentionally synchronous to prevent animation glitches.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsInitialMount(false);
  }, []);

  const handleSave = () => {
    if (onEdit) onEdit(message.id, editedContent);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedContent(message.content);
    setIsEditing(false);
    if (onCancel) onCancel();
  };

  if (isEditing) {
    return (
      <EditingUserBubble 
        message={message} 
        index={index} 
        editedContent={editedContent} 
        setEditedContent={setEditedContent}
        onSave={handleSave}
        onCancel={handleCancel}
        isInitialMount={isInitialMount}
      />
    );
  }

  return (
    <StandardUserBubble 
      message={message} 
      index={index} 
      onTriggerEdit={() => setIsEditing(true)} 
      isInitialMount={isInitialMount}
    />
  );
}
