import { useState } from "react";
import { Loader2, Send, Sparkles } from "lucide-react";

import { sendMessage } from "@/features/ai-assistant/api";
import { Avatar, AvatarFallback } from "@/shared/ui/avatar";
import { Button } from "@/shared/ui/button";
import { ScrollArea } from "@/shared/ui/scroll-area";
import { Textarea } from "@/shared/ui/textarea";
import { cn } from "@/shared/lib/utils";
import type { Conversation } from "@/features/ai-assistant/types";

export function ChatWindow({ conversation }: { conversation: Conversation }) {
  const [messages, setMessages] = useState(conversation.messages);
  const [draft, setDraft] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSend = async () => {
    const content = draft.trim();
    if (!content || isSending) return;

    const userMessage = {
      id: `local-${Date.now()}`,
      role: "user" as const,
      content,
      timestamp: "Just now",
    };
    setMessages((prev) => [...prev, userMessage]);
    setDraft("");
    setIsSending(true);
    const reply = await sendMessage(conversation.id, content);
    setMessages((prev) => [...prev, reply]);
    setIsSending(false);
  };

  return (
    <div className="flex h-full flex-col">
      <ScrollArea className="flex-1">
        <div className="space-y-5 p-5">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn("flex items-start gap-3", message.role === "user" && "flex-row-reverse")}
            >
              <Avatar className="mt-0.5 size-7 shrink-0">
                <AvatarFallback className={cn(message.role === "assistant" && "bg-primary/15 text-primary")}>
                  {message.role === "assistant" ? <Sparkles className="size-3.5" /> : "AR"}
                </AvatarFallback>
              </Avatar>
              <div
                className={cn(
                  "max-w-[75%] rounded-[var(--radius-lg)] px-4 py-2.5 text-sm",
                  message.role === "assistant"
                    ? "bg-secondary text-foreground"
                    : "bg-primary text-primary-foreground",
                )}
              >
                <p>{message.content}</p>
                <p
                  className={cn(
                    "mt-1 text-[11px]",
                    message.role === "assistant" ? "text-muted-foreground" : "text-primary-foreground/70",
                  )}
                >
                  {message.timestamp}
                </p>
              </div>
            </div>
          ))}
          {isSending ? (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Loader2 className="size-3.5 animate-spin" /> Thinking…
            </div>
          ) : null}
        </div>
      </ScrollArea>
      <div className="flex items-end gap-2 border-t border-border p-3">
        <Textarea
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              void handleSend();
            }
          }}
          placeholder="Ask about your notes, an assignment, or a concept…"
          rows={1}
          className="min-h-9 resize-none"
        />
        <Button size="icon" onClick={() => void handleSend()} disabled={!draft.trim() || isSending} aria-label="Send message">
          <Send className="size-4" />
        </Button>
      </div>
    </div>
  );
}
