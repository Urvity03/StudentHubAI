import { Calendar } from "lucide-react";

import { useTimetable } from "@/features/timetable/api";
import { EmptyState } from "@/shared/components/feedback/empty-state";
import { ListSkeleton } from "@/shared/components/feedback/loading";
import { PageHeader } from "@/shared/components/page-header";
import { Card, CardContent } from "@/shared/ui/card";
import type { TimetableSlot } from "@/features/timetable/types";

const DAYS: TimetableSlot["day"][] = ["Mon", "Tue", "Wed", "Thu", "Fri"];

export default function TimetablePage() {
  const { data: slots, isLoading } = useTimetable();

  return (
    <div className="space-y-6">
      <PageHeader title="Timetable" description="Your weekly class schedule." />
      {isLoading ? (
        <ListSkeleton rows={5} />
      ) : slots && slots.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
          {DAYS.map((day) => {
            const daySlots = slots
              .filter((slot) => slot.day === day)
              .sort((a, b) => a.time.localeCompare(b.time));
            return (
              <div key={day} className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{day}</p>
                {daySlots.length === 0 ? (
                  <Card className="border-dashed">
                    <CardContent className="p-4 text-xs text-muted-foreground">No classes</CardContent>
                  </Card>
                ) : (
                  daySlots.map((slot) => (
                    <Card key={slot.id}>
                      <CardContent className="space-y-1 p-4">
                        <p className="font-mono text-xs font-medium tabular-nums text-primary">{slot.time}</p>
                        <p className="text-sm font-medium text-foreground">{slot.course}</p>
                        <p className="text-xs text-muted-foreground">{slot.room}</p>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <EmptyState
          icon={Calendar}
          title="No classes scheduled"
          description="Add your courses to build out your weekly timetable."
        />
      )}
    </div>
  );
}
