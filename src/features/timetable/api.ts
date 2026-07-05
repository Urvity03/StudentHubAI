import { createMockResource } from "@/shared/lib/create-mock-resource";
import type { TimetableSlot } from "@/features/timetable/types";

const MOCK_SLOTS: TimetableSlot[] = [
  { id: "t-1", day: "Mon", time: "9:00 – 10:15", course: "Signals & Systems", room: "Rm 204" },
  { id: "t-2", day: "Mon", time: "11:00 – 12:15", course: "Organic Chemistry", room: "Lab 3" },
  { id: "t-3", day: "Tue", time: "10:00 – 11:15", course: "Microeconomics", room: "Rm 118" },
  { id: "t-4", day: "Wed", time: "9:00 – 10:15", course: "Signals & Systems", room: "Rm 204" },
  { id: "t-5", day: "Wed", time: "13:00 – 14:15", course: "Software Engineering", room: "Rm 310" },
  { id: "t-6", day: "Thu", time: "11:00 – 12:15", course: "Organic Chemistry", room: "Lab 3" },
  { id: "t-7", day: "Fri", time: "10:00 – 11:15", course: "Microeconomics", room: "Rm 118" },
];

export const useTimetable = createMockResource(MOCK_SLOTS);
