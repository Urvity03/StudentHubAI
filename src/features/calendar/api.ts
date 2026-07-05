import { createMockResource } from "@/shared/lib/create-mock-resource";
import type { CalendarEvent } from "@/features/calendar/types";

const MOCK_EVENTS: CalendarEvent[] = [
  { id: "e-1", title: "Signals & Systems lecture", date: "Mon, Jul 6", time: "9:00 AM", category: "class" },
  { id: "e-2", title: "Problem set 6 due", date: "Mon, Jul 6", time: "11:59 PM", category: "deadline" },
  { id: "e-3", title: "Organic Chemistry lab", date: "Tue, Jul 7", time: "11:00 AM", category: "class" },
  { id: "e-4", title: "Study block: thermodynamics", date: "Wed, Jul 8", time: "4:00 PM", category: "study" },
  { id: "e-5", title: "Microeconomics midterm", date: "Fri, Jul 10", time: "10:00 AM", category: "exam" },
];

export const useCalendarEvents = createMockResource(MOCK_EVENTS);
