export interface ChatMessage {
  id: string;
  sender: "user" | "funnel" | "model";
  content: string;
  timestamp: number;
  isLoading?: boolean;
}
