import { CalendarClock } from "lucide-react";

import { useDeadlines } from "@/features/deadlines/api";
import { EmptyState } from "@/shared/components/feedback/empty-state";
import { ListSkeleton } from "@/shared/components/feedback/loading";
import { PageHeader } from "@/shared/components/page-header";
import { Badge } from "@/shared/ui/badge";
import { cn } from "@/shared/lib/utils";
import type { DeadlineUrgency } from "@/features/deadlines/types";

const URGENCY_STYLES: Record<DeadlineUrgency, { dot: string; badge: "destructive" | "warning" | "secondary"; label: string }> = {
  overdue: { dot: "bg-destructive", badge: "destructive", label: "Overdue" },
  urgent: { dot: "bg-warning", badge: "warning", label: "Due soon" },
  upcoming: { dot: "bg-muted-foreground/40", badge: "secondary", label: "Upcoming" },
};

export default function DeadlinesPage() {
  const { data: deadlines, isLoading } = useDeadlines();

  return (
    <div className="space-y-6">
      <PageHeader title="Deadlines" description="Ranked by how soon they'll cause a problem if ignored." />
      {isLoading ? (
        <ListSkeleton rows={4} />
      ) : deadlines && deadlines.length > 0 ? (
        <div className="space-y-3">
          {deadlines.map((deadline) => {
            const style = URGENCY_STYLES[deadline.urgency];
            return (
              <div
                key={deadline.id}
                className="flex items-center gap-4 rounded-[var(--radius-lg)] border border-border p-4"
              >
                <span className={cn("size-2 shrink-0 rounded-full", style.dot)} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">{deadline.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {deadline.course} · {deadline.dueLabel}
                  </p>
                </div>
                <Badge variant={style.badge}>{style.label}</Badge>
              </div>
            );
          })}
        </div>
      ) : (
        <EmptyState
          icon={CalendarClock}
          title="Nothing due"
          description="You're all caught up — new deadlines will appear here as they come in."
        />
      )}
    </div>
  );
}
