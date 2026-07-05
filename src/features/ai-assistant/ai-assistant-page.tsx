import { useState } from "react";
import { MessageSquare } from "lucide-react";

import { useConversations } from "@/features/ai-assistant/api";
import { ChatWindow } from "@/features/ai-assistant/components/chat-window";
import { ConversationList } from "@/features/ai-assistant/components/conversation-list";
import { EmptyState } from "@/shared/components/feedback/empty-state";
import { ListSkeleton } from "@/shared/components/feedback/loading";
import { PageHeader } from "@/shared/components/page-header";
import { Card } from "@/shared/ui/card";
import { useToast } from "@/shared/hooks/use-toast";

export default function AiAssistantPage() {
  const { data: conversations, isLoading } = useConversations();
  const [selectedId, setSelectedId] = useState<string | undefined>(undefined);
  const { toast } = useToast();

  // Derived rather than synced via effect: falls back to the first
  // conversation once data loads, without ever calling setState from an
  // effect body.
  const activeId = selectedId ?? conversations?.[0]?.id;
  const activeConversation = conversations?.find((c) => c.id === activeId);

  return (
    <div className="flex h-[calc(100dvh-8.5rem)] flex-col gap-6 lg:h-[calc(100dvh-7rem)]">
      <PageHeader title="Study Assistant" description="Grounded in your notes, assignments, and course material." />
      {isLoading ? (
        <ListSkeleton rows={4} />
      ) : conversations && conversations.length > 0 ? (
        <Card className="flex flex-1 overflow-hidden p-0">
          <div className="hidden w-64 shrink-0 border-r border-border sm:block">
            <ConversationList
              conversations={conversations}
              activeId={activeId}
              onSelect={setSelectedId}
              onNewConversation={() =>
                toast({ title: "New conversation", description: "Starting a fresh chat." })
              }
            />
          </div>
          <div className="min-w-0 flex-1">
            {activeConversation ? (
              <ChatWindow key={activeConversation.id} conversation={activeConversation} />
            ) : null}
          </div>
        </Card>
      ) : (
        <EmptyState
          icon={MessageSquare}
          title="No conversations yet"
          description="Start a conversation to get help with a concept, an assignment, or exam prep."
        />
      )}
    </div>
  );
}
