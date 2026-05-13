"use client";

import { useState, useEffect } from "react";
import { UserBubble } from "./chat/UserBubble";
import { ModelBubble } from "./chat/ModelBubble";
import { ChatMessage } from "@/types/chat";

export type { ChatMessage };

interface ChatBubbleProps {
  message: ChatMessage;
  index: number;
  isEditing?: boolean;
  onEdit?: (id: string, newContent: string) => void;
  onCancel?: () => void;
  isFirstFunnelResponse?: boolean;
  isLatestFunnelResponse?: boolean;
  isFlyoutSource?: boolean;
}

export default function ChatBubble({ 
  message, 
  index, 
  isEditing: isEditingProp = false, 
  onEdit, 
  onCancel, 
  isFirstFunnelResponse,
  isLatestFunnelResponse,
  isFlyoutSource
}: ChatBubbleProps) {
  const [isEditing, setIsEditing] = useState(isEditingProp);

  useEffect(() => {
    setIsEditing(isEditingProp);
  }, [isEditingProp]);

  if (message.sender === "user") {
    return (
      <UserBubble 
        message={message} 
        index={index} 
        isEditing={isEditing} 
        setIsEditing={setIsEditing} 
        onEdit={onEdit} 
        onCancel={onCancel}
      />
    );
  }

  return (
    <ModelBubble 
      message={message} 
      isFirstFunnelResponse={isFirstFunnelResponse}
      isLatestFunnelResponse={isLatestFunnelResponse}
      isFlyoutSource={isFlyoutSource}
    />
  );
}
