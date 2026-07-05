import { Link } from "react-router-dom";
import { ArrowRight, CalendarClock, CheckSquare, Flame, GraduationCap } from "lucide-react";

import { AssignmentStatusBadge } from "@/features/assignments/components/status-badge";
import { PageHeader } from "@/shared/components/page-header";
import { StatCard } from "@/shared/components/stat-card";
import { CardGridSkeleton, ListSkeleton } from "@/shared/components/feedback/loading";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { cn } from "@/shared/lib/utils";
import { useApp } from "@/shared/providers/use-app";
import type { DeadlineUrgency } from "@/features/deadlines/types";

const URGENCY_DOT: Record<DeadlineUrgency, string> = {
  overdue: "bg-destructive",
  urgent: "bg-warning",
  upcoming: "bg-muted-foreground/40",
};

export default function DashboardHomePage() {
  const { deadlines, assignments, isLoading } = useApp();

  const activeAssignments = assignments.filter((a) => a.status !== "graded").slice(0, 4);

  return (
    <div className="space-y-6">
      <PageHeader title="Welcome back, Aditi" description="Here's what's happening across your courses." />

      {isLoading ? (
        <CardGridSkeleton count={4} />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard label="Due this week" href="/dashboard/deadlines" value={String(deadlines.length)} icon={CalendarClock} />
          <StatCard label="Open assignments" href="/dashboard/assignments" value={String(activeAssignments?.length ?? 0)} icon={CheckSquare} />
          <StatCard label="Current CGPA" href="/dashboard/cgpa" value="3.68" icon={GraduationCap} trend={{ value: "+0.10", direction: "up" }} />
          <StatCard label="Study streak" href="/dashboard/analytics" value="12 days" icon={Flame} trend={{ value: "Personal best", direction: "up" }} />
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <CardTitle>Upcoming deadlines</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/dashboard/deadlines">
                View all <ArrowRight className="size-3.5" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-3 pt-0">
            {isLoading ? (
              <ListSkeleton rows={3} />
            ) : (
              deadlines.slice(0, 4).map((deadline) => (
                <div key={deadline.id} className="flex items-center gap-3 rounded-[var(--radius-md)] border border-border p-3">
                  <span className={cn("size-2 shrink-0 rounded-full", URGENCY_DOT[deadline.urgency])} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-foreground">{deadline.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {deadline.course} · {deadline.dueLabel}
                    </p>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <CardTitle>Active assignments</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/dashboard/assignments">
                View all <ArrowRight className="size-3.5" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-3 pt-0">
            {isLoading ? (
              <ListSkeleton rows={3} />
            ) : (
              activeAssignments.map((assignment) => (
                <div key={assignment.id} className="flex items-center justify-between gap-3 rounded-[var(--radius-md)] border border-border p-3">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-foreground">{assignment.title}</p>
                    <p className="text-xs text-muted-foreground">{assignment.course} · {assignment.dueDate}</p>
                  </div>
                  <AssignmentStatusBadge status={assignment.status} />
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="bg-secondary/40">
        <CardContent className="flex flex-col items-start justify-between gap-4 p-5 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-semibold text-foreground">Need help with something specific?</p>
            <p className="text-sm text-muted-foreground">Ask the study assistant — it knows your notes and assignments.</p>
          </div>
          <Button asChild>
            <Link to="/dashboard/assistant">
              Open assistant <ArrowRight className="size-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
