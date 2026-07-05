import { GraduationCap, TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

import { calculateCgpa, useSemesterGpas } from "@/features/cgpa/api";
import { EmptyState } from "@/shared/components/feedback/empty-state";
import { CardGridSkeleton } from "@/shared/components/feedback/loading";
import { PageHeader } from "@/shared/components/page-header";
import { StatCard } from "@/shared/components/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";

export default function CgpaPage() {
  const { data: semesters, isLoading } = useSemesterGpas();

  return (
    <div className="space-y-6">
      <PageHeader title="CGPA Tracker" description="Your grade trend across every completed semester." />
      {isLoading ? (
        <CardGridSkeleton count={2} className="sm:grid-cols-2 lg:grid-cols-2" />
      ) : semesters && semesters.length > 0 ? (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <StatCard
              label="Current CGPA"
              value={calculateCgpa(semesters).toFixed(2)}
              icon={GraduationCap}
              trend={{ value: "+0.10 from last semester", direction: "up" }}
            />
            <StatCard
              label="Total credits completed"
              value={String(semesters.reduce((sum, s) => sum + s.credits, 0))}
              icon={TrendingUp}
            />
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Semester GPA trend</CardTitle>
            </CardHeader>
            <CardContent className="h-72 pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={semesters} margin={{ top: 8, right: 12, left: -12, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                  <XAxis dataKey="semester" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                  <YAxis domain={[0, 4]} tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      background: "hsl(var(--popover))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "var(--radius-md)",
                      fontSize: 12,
                    }}
                  />
                  <Line type="monotone" dataKey="gpa" stroke="hsl(var(--primary))" strokeWidth={2.5} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </>
      ) : (
        <EmptyState
          icon={GraduationCap}
          title="No semester data yet"
          description="Add your completed semesters to start tracking your CGPA trend."
        />
      )}
    </div>
  );
}
