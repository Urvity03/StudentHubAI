import { CalendarDays } from "lucide-react";

import { useCalendarEvents } from "@/features/calendar/api";
import { EmptyState } from "@/shared/components/feedback/empty-state";
import { ListSkeleton } from "@/shared/components/feedback/loading";
import { PageHeader } from "@/shared/components/page-header";
import { Badge } from "@/shared/ui/badge";
import type { CalendarEvent } from "@/features/calendar/types";

const CATEGORY_STYLE: Record<CalendarEvent["category"], { label: string; variant: "default" | "secondary" | "destructive" | "warning" }> = {
  class: { label: "Class", variant: "secondary" },
  deadline: { label: "Deadline", variant: "warning" },
  exam: { label: "Exam", variant: "destructive" },
  study: { label: "Study block", variant: "default" },
};

export default function CalendarPage() {
  const { data: events, isLoading } = useCalendarEvents();

  return (
    <div className="space-y-6">
      <PageHeader title="Calendar" description="Classes, deadlines, and exams in one upcoming feed." />
      {isLoading ? (
        <ListSkeleton rows={5} />
      ) : events && events.length > 0 ? (
        <div className="divide-y divide-border rounded-[var(--radius-lg)] border border-border">
          {events.map((event) => (
            <div key={event.id} className="flex items-center justify-between gap-4 p-4">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-foreground">{event.title}</p>
                <p className="font-mono text-xs tabular-nums text-muted-foreground">
                  {event.date} · {event.time}
                </p>
              </div>
              <Badge variant={CATEGORY_STYLE[event.category].variant}>
                {CATEGORY_STYLE[event.category].label}
              </Badge>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={CalendarDays}
          title="Nothing on your calendar"
          description="Classes, deadlines, and exams will appear here as they're added."
        />
      )}
    </div>
  );
}
