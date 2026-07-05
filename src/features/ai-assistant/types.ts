export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export interface Conversation {
  id: string;
  title: string;
  lastMessagePreview: string;
  updatedAt: string;
  messages: ChatMessage[];
}
