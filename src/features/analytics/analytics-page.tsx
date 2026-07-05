import { Clock, Flame, Target, TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { useCourseProgress, useWeeklyStudyHours } from "@/features/analytics/api";
import { CardGridSkeleton } from "@/shared/components/feedback/loading";
import { PageHeader } from "@/shared/components/page-header";
import { StatCard } from "@/shared/components/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Progress } from "@/shared/ui/progress";

export default function AnalyticsPage() {
  const { data: studyHours, isLoading: hoursLoading } = useWeeklyStudyHours();
  const { data: courseProgress, isLoading: progressLoading } = useCourseProgress();

  return (
    <div className="space-y-6">
      <PageHeader title="Analytics" description="A clear picture of your workload and progress this semester." />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Weekly study hours" value="19h" icon={Clock} trend={{ value: "+4h vs last week", direction: "up" }} />
        <StatCard label="Current streak" value="12 days" icon={Flame} trend={{ value: "Personal best", direction: "up" }} />
        <StatCard label="Avg. course completion" value="70%" icon={Target} />
        <StatCard label="CGPA trend" value="3.68" icon={TrendingUp} trend={{ value: "+0.10 this semester", direction: "up" }} />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Study hours per week</CardTitle>
          </CardHeader>
          <CardContent className="h-64 pt-2">
            {hoursLoading ? (
              <CardGridSkeleton count={1} className="h-full grid-cols-1" />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={studyHours} margin={{ top: 8, right: 12, left: -12, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                  <XAxis dataKey="week" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      background: "hsl(var(--popover))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "var(--radius-md)",
                      fontSize: 12,
                    }}
                  />
                  <Bar dataKey="hours" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Course completion</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-2">
            {progressLoading ? (
              <CardGridSkeleton count={4} className="grid-cols-1" />
            ) : (
              courseProgress?.map((course) => (
                <div key={course.id} className="space-y-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-foreground">{course.course}</span>
                    <span className="font-mono text-muted-foreground tabular-nums">{course.completion}%</span>
                  </div>
                  <Progress value={course.completion} />
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
