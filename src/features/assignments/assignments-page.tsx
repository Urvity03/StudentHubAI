import { CheckSquare } from "lucide-react";

import { AssignmentStatusBadge } from "@/features/assignments/components/status-badge";
import { EmptyState } from "@/shared/components/feedback/empty-state";
import { ListSkeleton } from "@/shared/components/feedback/loading";
import { PageHeader } from "@/shared/components/page-header";
import { useApp } from "@/shared/providers/use-app";

export default function AssignmentsPage() {
  const { assignments, isLoading } = useApp();

  return (
    <div className="space-y-6">
      <PageHeader title="Assignments" description="Every assignment across every course, in one list." />
      {isLoading ? (
        <ListSkeleton rows={5} />
      ) : assignments.length > 0 ? (
        <div className="divide-y divide-border rounded-[var(--radius-lg)] border border-border">
          {assignments.map((assignment) => (
            <div key={assignment.id} className="flex items-center justify-between gap-4 p-4">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-foreground">{assignment.title}</p>
                <p className="text-xs text-muted-foreground">
                  {assignment.course} · {assignment.dueDate}
                  {assignment.grade ? ` · ${assignment.grade}` : ""}
                </p>
              </div>
              <AssignmentStatusBadge status={assignment.status} />
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={CheckSquare}
          title="No assignments yet"
          description="Once your courses are connected, assignments will show up here automatically."
        />
      )}
    </div>
  );
}
