import { createMockResource } from "@/shared/lib/create-mock-resource";
import type { ChatMessage, Conversation } from "@/features/ai-assistant/types";

const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: "c-1",
    title: "Explain the Carnot cycle",
    lastMessagePreview: "So the efficiency only depends on the two temperatures?",
    updatedAt: "2 hours ago",
    messages: [
      { id: "m-1", role: "user", content: "Can you explain the Carnot cycle simply?", timestamp: "10:02 AM" },
      {
        id: "m-2",
        role: "assistant",
        content:
          "It's an idealized four-step cycle (two isothermal, two adiabatic) that gives the theoretical maximum efficiency for a heat engine operating between two temperatures.",
        timestamp: "10:02 AM",
      },
      { id: "m-3", role: "user", content: "So the efficiency only depends on the two temperatures?", timestamp: "10:04 AM" },
    ],
  },
  {
    id: "c-2",
    title: "Quiz me on microeconomics",
    lastMessagePreview: "Question 3: What distinguishes an oligopoly from...",
    updatedAt: "Yesterday",
    messages: [
      { id: "m-4", role: "user", content: "Quiz me on market structures before my midterm.", timestamp: "Yesterday" },
      {
        id: "m-5",
        role: "assistant",
        content: "Question 1: What's the key difference between perfect competition and monopolistic competition?",
        timestamp: "Yesterday",
      },
    ],
  },
  {
    id: "c-3",
    title: "Summarize Chapter 4",
    lastMessagePreview: "Here's a condensed summary of the recrystallization...",
    updatedAt: "3 days ago",
    messages: [
      { id: "m-6", role: "user", content: "Summarize chapter 4 of the organic chemistry textbook.", timestamp: "3 days ago" },
      {
        id: "m-7",
        role: "assistant",
        content: "Here's a condensed summary of the recrystallization and purification techniques covered in chapter 4...",
        timestamp: "3 days ago",
      },
    ],
  },
];

export const useConversations = createMockResource(MOCK_CONVERSATIONS);

/**
 * Simulated assistant reply. This is the seam that gets replaced with a real
 * model call once the AI backend is wired up — the chat UI never changes.
 */
export async function sendMessage(conversationId: string, content: string): Promise<ChatMessage> {
  void conversationId;
  void content;
  await new Promise((resolve) => setTimeout(resolve, 900));
  return {
    id: `m-${Date.now()}`,
    role: "assistant",
    content:
      "This is a placeholder response — once connected to the AI backend, this will be grounded in your actual notes and course material.",
    timestamp: "Just now",
  };
}
