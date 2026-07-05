import { ClipboardList } from "lucide-react";

import { EmptyState } from "@/shared/components/feedback/empty-state";
import { CardGridSkeleton } from "@/shared/components/feedback/loading";
import { PageHeader } from "@/shared/components/page-header";
import { Card, CardContent } from "@/shared/ui/card";
import { Progress } from "@/shared/ui/progress";
import { cn } from "@/shared/lib/utils";
import { useApp } from "@/shared/providers/use-app";

export default function AttendancePage() {
  const { attendance, isLoading } = useApp();

  return (
    <div className="space-y-6">
      <PageHeader title="Attendance" description="Your attendance percentage against each course's requirement." />
      {isLoading ? (
        <CardGridSkeleton count={4} />
      ) : attendance.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {attendance.map((course) => {
            const percent = Math.round((course.attended / course.total) * 100);
            const isAtRisk = percent < course.requiredPercent;
            return (
              <Card key={course.id}>
                <CardContent className="space-y-3 p-5">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-foreground">{course.course}</p>
                    <p className={cn("font-mono text-sm font-semibold tabular-nums", isAtRisk ? "text-destructive" : "text-success")}>
                      {percent}%
                    </p>
                  </div>
                  <Progress value={percent} indicatorClassName={isAtRisk ? "bg-destructive" : undefined} />
                  <p className="text-xs text-muted-foreground">
                    {course.attended} of {course.total} classes attended · requires {course.requiredPercent}%
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <EmptyState
          icon={ClipboardList}
          title="No attendance data"
          description="Attendance records will appear here once your courses are connected."
        />
      )}
    </div>
  );
}
