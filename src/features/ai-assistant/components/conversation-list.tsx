import { MessageSquarePlus } from "lucide-react";

import { Button } from "@/shared/ui/button";
import { ScrollArea } from "@/shared/ui/scroll-area";
import { cn } from "@/shared/lib/utils";
import type { Conversation } from "@/features/ai-assistant/types";

interface ConversationListProps {
  conversations: Conversation[];
  activeId: string | undefined;
  onSelect: (id: string) => void;
  onNewConversation: () => void;
}

export function ConversationList({ conversations, activeId, onSelect, onNewConversation }: ConversationListProps) {
  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-border p-3">
        <Button size="sm" className="w-full" onClick={onNewConversation}>
          <MessageSquarePlus className="size-4" /> New conversation
        </Button>
      </div>
      <ScrollArea className="flex-1">
        <div className="space-y-1 p-2">
          {conversations.map((conversation) => (
            <button
              key={conversation.id}
              type="button"
              onClick={() => onSelect(conversation.id)}
              className={cn(
                "w-full rounded-[var(--radius-md)] px-3 py-2.5 text-left transition-colors duration-[var(--duration-fast)]",
                activeId === conversation.id
                  ? "bg-primary/10 text-primary"
                  : "text-foreground hover:bg-secondary",
              )}
            >
              <p className="truncate text-sm font-medium">{conversation.title}</p>
              <p className="truncate text-xs text-muted-foreground">{conversation.lastMessagePreview}</p>
              <p className="mt-0.5 text-[11px] text-muted-foreground/70">{conversation.updatedAt}</p>
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
